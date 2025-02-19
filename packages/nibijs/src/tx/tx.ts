import {
  AccountData,
  Coin,
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
  OfflineSigner,
  Registry,
} from "@cosmjs/proto-signing"
import {
  calculateFee,
  DeliverTxResponse,
  GasPrice,
  SigningStargateClient,
  SigningStargateClientOptions,
  StdFee,
} from "@cosmjs/stargate"
import { Chain, go } from "../chain"
import { ErrorTxBroadcast, ErrorTxSimulation, instanceOfError } from "../chain/error"
import { BankMsgs } from "../msg/bank"
import { registerTypes as registerPerp } from "../msg/perp"
import { registerTypes as registerSpot } from "../msg/spot"
import { TxMessage } from "../msg/types"
import { NibiruQueryClient } from "../query"
import { getRegistry } from "./signer"

export type Address = string
export type CosmosSigner =
  | (OfflineSigner & OfflineDirectSigner)
  | DirectSecp256k1HdWallet

/**
 * TxCmd is analagous to the 'nibid tx' command of the nibid CLI.
 *
 * @export
 * @class TxCmd
 * @typedef {TxCmd}
 */
export class TxCmd {
  client: SigningStargateClient
  chain: Chain
  directSigner: OfflineDirectSigner
  gasPrice: string
  queryClient: NibiruQueryClient
  fee?: StdFee

  constructor(
    client: SigningStargateClient,
    directSigner: OfflineDirectSigner,
    chain: Chain,
    queryClient: NibiruQueryClient,
    gasPrice?: Coin,
  ) {
    this.client = client
    this.queryClient = queryClient
    this.chain = chain
    this.directSigner = directSigner
    this.fee = undefined
    this.gasPrice = gasPrice ? `${gasPrice.amount}${gasPrice.denom}` : "0.25unibi"
  }

  withFee(gasLimit: number, gasPrice: string | GasPrice = "1unibi") {
    this.fee = calculateFee(Math.round(gasLimit), gasPrice)
    return this
  }

  /**
   * Simulates a transaction containing the given list of tx messages, 'msgs' and
   * returns an estimate of how many gas units are required.
   *
   * @async
   * @param {...TxMessage[]} msgs
   * @returns {Promise<number>} - expected gas cost (units of unibi)
   */
  async simulate(...msgs: TxMessage[]): Promise<number> {
    const addr = await this.directSigner.getAccounts()
    return this.client.simulate(addr[0].address, msgs, undefined)
  }

  async signAndBroadcast(...msgs: TxMessage[]): Promise<DeliverTxResponse | Error> {
    const accounts = await this.directSigner.getAccounts()
    let err = await this.ensureFee(...msgs)
    if (err) {
      return err
    }

    const broadcastResp = await go(
      this.client.signAndBroadcast(accounts[0].address, msgs, this.fee ?? "auto"),
    )
    const txResp = broadcastResp.res
    err = broadcastResp.err
    if (err) {
      return new ErrorTxBroadcast(err.message)
    } else {
      return txResp as DeliverTxResponse
    }
  }

  async mustSignAndBroadcast(...msgs: TxMessage[]): Promise<DeliverTxResponse> {
    const txResp = await this.signAndBroadcast(...msgs)
    if (!instanceOfError(txResp)) {
      return txResp
    } else {
      throw txResp
    }
  }

  async ensureFee(...msgs: TxMessage[]): Promise<Error | undefined> {
    const addSimulatedFeeToCmd = async () => {
      const gasUsedInSim = await this.simulate(...msgs)
      let gasLimit: number = gasUsedInSim * 1.25
      if (gasLimit < 420_000) gasLimit = 420_000
      this.withFee(gasLimit)
    }

    let err: Error | undefined
    if (!this.fee) {
      let { err } = await go(addSimulatedFeeToCmd())
      // If an error occurs, try waiting another block for account sequence problems
      if (err) {
        await this.queryClient.waitForNextBlock()
        ;({ err } = await go(addSimulatedFeeToCmd()))
      }
    }
    if (err) {
      err = new ErrorTxSimulation(err.message, err.stack)
    }
    return err
  }

  async sendTokens(to: string, coins: Coin[]) {
    const [{ address: from }] = await this.directSigner.getAccounts()
    const msgSend = BankMsgs.Send(from, to, coins)
    return this.signAndBroadcast(msgSend)
  }

  getAccounts(): Promise<readonly AccountData[]> {
    return this.directSigner.getAccounts()
  }
}

function registerModules(): Registry {
  const registry = getRegistry()
  registerSpot(registry)
  registerPerp(registry)
  return registry
}

export async function newTxCmd(
  chain: Chain,
  signer: (OfflineSigner & OfflineDirectSigner) | DirectSecp256k1HdWallet,
  gasPriceCoin?: Coin,
): Promise<TxCmd> {
  const registry = registerModules()

  const gasPrice: GasPrice = gasPriceCoin
    ? coinToGasPrice(gasPriceCoin)
    : coinToGasPrice({ amount: "0.25", denom: chain.feeDenom })

  const sgOptions: SigningStargateClientOptions = {
    registry,
    gasPrice,
  }
  const client = await SigningStargateClient.connectWithSigner(
    chain.endptTm, // may need endptGrpc
    signer,
    sgOptions,
  )
  const queryClient = await NibiruQueryClient.connect(chain.endptTm)
  return new TxCmd(client, signer, chain, queryClient, gasPriceCoin)
}

function coinToGasPrice(coin: Coin): GasPrice {
  const { amount, denom } = coin
  return GasPrice.fromString(amount + denom)
}

function coinToString(coin: Coin): string {
  return coin.amount + coin.denom
}
