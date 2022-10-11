/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";

export const protobufPackage = "nibiru.perp.v1";

/**
 * Emitted when a position changes.
 * TODO: Is there a way to split this into different events without creating too much complexity?
 */
export interface PositionChangedEvent {
  /** identifier of the corresponding virtual pool for the position */
  pair: string;
  /** owner of the position. */
  traderAddress: string;
  /** amount of margin backing the position. */
  margin?: Coin;
  /** margin * leverage * vPrice. 'notional' is the virtual size times the virtual price on 'vpool'. */
  positionNotional: string;
  /** magnitude of the change to vsize. The vsize is the amount of base assets for the position, margin * leverage * priceBasePerQuote. */
  exchangedPositionSize: string;
  /** transaction fee paid */
  transactionFee?: Coin;
  /** position virtual size after the change */
  positionSize: string;
  /** realize profits and losses after the change */
  realizedPnl: string;
  /** unrealized profits and losses after the change */
  unrealizedPnlAfter: string;
  /**
   * Amount of bad debt cleared by the PerpEF during the change.
   * Bad debt is negative net margin past the liquidation point of a position.
   */
  badDebt?: Coin;
  /** amt of margin (y) lost due to liquidation */
  liquidationPenalty: string;
  /**
   * Mark price, synonymous with mark price in this context, is the quotient of
   * the quote reserves and base reserves
   */
  markPrice: string;
  /**
   * A funding payment made or received by the trader on the current position.
   * 'fundingPayment' is positive if 'owner' is the sender and negative if 'owner'
   * is the receiver of the payment. Its magnitude is abs(vSize * fundingRate).
   * Funding payments act to converge the mark price (vPrice) and index price
   * (average price on major exchanges).
   */
  fundingPayment: string;
  /** The block number at which this position was changed. */
  blockHeight: Long;
  /** The block time in unix milliseconds at which this position was changed. */
  blockTimeMs: Long;
}

/** Emitted when a position is liquidated. */
export interface PositionLiquidatedEvent {
  /** identifier of the corresponding virtual pool for the position */
  pair: string;
  /** owner of the position. */
  traderAddress: string;
  /** margin * leverage * vPrice. 'notional' is the virtual size times  the virtual price on 'vpool'. */
  exchangedQuoteAmount: string;
  /** virtual amount of base assets for the position, which would be margin * leverage * priceBasePerQuote. */
  exchangedPositionSize: string;
  /** Address of the account that executed the tx. */
  liquidatorAddress: string;
  /** Commission (in margin units) received by 'liquidator'. */
  feeToLiquidator?: Coin;
  /** Commission (in margin units) given to the ecosystem fund. */
  feeToEcosystemFund?: Coin;
  /** Bad debt (margin units) cleared by the PerpEF during the tx. Bad debt is negative net margin past the liquidation point of a position. */
  badDebt?: Coin;
  /** Remaining margin in the position after liquidation */
  margin?: Coin;
  /** Remaining position notional in the position after liquidation */
  positionNotional: string;
  /** Remaining position size in the position after liquidation */
  positionSize: string;
  /** Unrealized PnL in the position after liquidation */
  unrealizedPnl: string;
  /** Spot price of the vAMM after liquidation */
  markPrice: string;
  /** The block number at which this liquidation occured. */
  blockHeight: Long;
  /** The unix timestamp in milliseconds at which this liquidation occured. */
  blockTimeMs: Long;
}

/** Emitted when a position is settled. */
export interface PositionSettledEvent {
  /** Identifier for the virtual pool of the position. */
  pair: string;
  /** Owner of the position. */
  traderAddress: string;
  /** Settled coin as dictated by the settlement price of the vpool. */
  settledCoins: Coin[];
}

/** Emitted when a new funding rate is calculated. */
export interface FundingRateChangedEvent {
  /** The pair for which the funding rate was calculated. */
  pair: string;
  /** The mark price of the pair. */
  markPrice: string;
  /** The oracle index price of the pair. */
  indexPrice: string;
  /** The latest funding rate. */
  latestFundingRate: string;
  /** The latest premium fraction just calculated. */
  latestPremiumFraction: string;
  /**
   * The latest cumulative premium fraction.
   * The funding payment a position will pay is the difference between this value
   * and the latest cumulative premium fraction on the position, multiplied by the position size.
   */
  cumulativePremiumFraction: string;
  /** The block number at which the funding rate was calculated. */
  blockHeight: Long;
  /** The block time in unix milliseconds at which the funding rate was calculated. */
  blockTimeMs: Long;
}

function createBasePositionChangedEvent(): PositionChangedEvent {
  return {
    pair: "",
    traderAddress: "",
    margin: undefined,
    positionNotional: "",
    exchangedPositionSize: "",
    transactionFee: undefined,
    positionSize: "",
    realizedPnl: "",
    unrealizedPnlAfter: "",
    badDebt: undefined,
    liquidationPenalty: "",
    markPrice: "",
    fundingPayment: "",
    blockHeight: Long.ZERO,
    blockTimeMs: Long.ZERO,
  };
}

export const PositionChangedEvent = {
  encode(message: PositionChangedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pair !== "") {
      writer.uint32(10).string(message.pair);
    }
    if (message.traderAddress !== "") {
      writer.uint32(18).string(message.traderAddress);
    }
    if (message.margin !== undefined) {
      Coin.encode(message.margin, writer.uint32(26).fork()).ldelim();
    }
    if (message.positionNotional !== "") {
      writer.uint32(34).string(message.positionNotional);
    }
    if (message.exchangedPositionSize !== "") {
      writer.uint32(42).string(message.exchangedPositionSize);
    }
    if (message.transactionFee !== undefined) {
      Coin.encode(message.transactionFee, writer.uint32(50).fork()).ldelim();
    }
    if (message.positionSize !== "") {
      writer.uint32(58).string(message.positionSize);
    }
    if (message.realizedPnl !== "") {
      writer.uint32(66).string(message.realizedPnl);
    }
    if (message.unrealizedPnlAfter !== "") {
      writer.uint32(74).string(message.unrealizedPnlAfter);
    }
    if (message.badDebt !== undefined) {
      Coin.encode(message.badDebt, writer.uint32(82).fork()).ldelim();
    }
    if (message.liquidationPenalty !== "") {
      writer.uint32(90).string(message.liquidationPenalty);
    }
    if (message.markPrice !== "") {
      writer.uint32(98).string(message.markPrice);
    }
    if (message.fundingPayment !== "") {
      writer.uint32(106).string(message.fundingPayment);
    }
    if (!message.blockHeight.isZero()) {
      writer.uint32(112).int64(message.blockHeight);
    }
    if (!message.blockTimeMs.isZero()) {
      writer.uint32(120).int64(message.blockTimeMs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PositionChangedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePositionChangedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pair = reader.string();
          break;
        case 2:
          message.traderAddress = reader.string();
          break;
        case 3:
          message.margin = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.positionNotional = reader.string();
          break;
        case 5:
          message.exchangedPositionSize = reader.string();
          break;
        case 6:
          message.transactionFee = Coin.decode(reader, reader.uint32());
          break;
        case 7:
          message.positionSize = reader.string();
          break;
        case 8:
          message.realizedPnl = reader.string();
          break;
        case 9:
          message.unrealizedPnlAfter = reader.string();
          break;
        case 10:
          message.badDebt = Coin.decode(reader, reader.uint32());
          break;
        case 11:
          message.liquidationPenalty = reader.string();
          break;
        case 12:
          message.markPrice = reader.string();
          break;
        case 13:
          message.fundingPayment = reader.string();
          break;
        case 14:
          message.blockHeight = reader.int64() as Long;
          break;
        case 15:
          message.blockTimeMs = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PositionChangedEvent {
    return {
      pair: isSet(object.pair) ? String(object.pair) : "",
      traderAddress: isSet(object.traderAddress) ? String(object.traderAddress) : "",
      margin: isSet(object.margin) ? Coin.fromJSON(object.margin) : undefined,
      positionNotional: isSet(object.positionNotional) ? String(object.positionNotional) : "",
      exchangedPositionSize: isSet(object.exchangedPositionSize) ? String(object.exchangedPositionSize) : "",
      transactionFee: isSet(object.transactionFee) ? Coin.fromJSON(object.transactionFee) : undefined,
      positionSize: isSet(object.positionSize) ? String(object.positionSize) : "",
      realizedPnl: isSet(object.realizedPnl) ? String(object.realizedPnl) : "",
      unrealizedPnlAfter: isSet(object.unrealizedPnlAfter) ? String(object.unrealizedPnlAfter) : "",
      badDebt: isSet(object.badDebt) ? Coin.fromJSON(object.badDebt) : undefined,
      liquidationPenalty: isSet(object.liquidationPenalty) ? String(object.liquidationPenalty) : "",
      markPrice: isSet(object.markPrice) ? String(object.markPrice) : "",
      fundingPayment: isSet(object.fundingPayment) ? String(object.fundingPayment) : "",
      blockHeight: isSet(object.blockHeight) ? Long.fromValue(object.blockHeight) : Long.ZERO,
      blockTimeMs: isSet(object.blockTimeMs) ? Long.fromValue(object.blockTimeMs) : Long.ZERO,
    };
  },

  toJSON(message: PositionChangedEvent): unknown {
    const obj: any = {};
    message.pair !== undefined && (obj.pair = message.pair);
    message.traderAddress !== undefined && (obj.traderAddress = message.traderAddress);
    message.margin !== undefined && (obj.margin = message.margin ? Coin.toJSON(message.margin) : undefined);
    message.positionNotional !== undefined && (obj.positionNotional = message.positionNotional);
    message.exchangedPositionSize !== undefined && (obj.exchangedPositionSize = message.exchangedPositionSize);
    message.transactionFee !== undefined &&
      (obj.transactionFee = message.transactionFee ? Coin.toJSON(message.transactionFee) : undefined);
    message.positionSize !== undefined && (obj.positionSize = message.positionSize);
    message.realizedPnl !== undefined && (obj.realizedPnl = message.realizedPnl);
    message.unrealizedPnlAfter !== undefined && (obj.unrealizedPnlAfter = message.unrealizedPnlAfter);
    message.badDebt !== undefined && (obj.badDebt = message.badDebt ? Coin.toJSON(message.badDebt) : undefined);
    message.liquidationPenalty !== undefined && (obj.liquidationPenalty = message.liquidationPenalty);
    message.markPrice !== undefined && (obj.markPrice = message.markPrice);
    message.fundingPayment !== undefined && (obj.fundingPayment = message.fundingPayment);
    message.blockHeight !== undefined && (obj.blockHeight = (message.blockHeight || Long.ZERO).toString());
    message.blockTimeMs !== undefined && (obj.blockTimeMs = (message.blockTimeMs || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PositionChangedEvent>, I>>(object: I): PositionChangedEvent {
    const message = createBasePositionChangedEvent();
    message.pair = object.pair ?? "";
    message.traderAddress = object.traderAddress ?? "";
    message.margin = (object.margin !== undefined && object.margin !== null)
      ? Coin.fromPartial(object.margin)
      : undefined;
    message.positionNotional = object.positionNotional ?? "";
    message.exchangedPositionSize = object.exchangedPositionSize ?? "";
    message.transactionFee = (object.transactionFee !== undefined && object.transactionFee !== null)
      ? Coin.fromPartial(object.transactionFee)
      : undefined;
    message.positionSize = object.positionSize ?? "";
    message.realizedPnl = object.realizedPnl ?? "";
    message.unrealizedPnlAfter = object.unrealizedPnlAfter ?? "";
    message.badDebt = (object.badDebt !== undefined && object.badDebt !== null)
      ? Coin.fromPartial(object.badDebt)
      : undefined;
    message.liquidationPenalty = object.liquidationPenalty ?? "";
    message.markPrice = object.markPrice ?? "";
    message.fundingPayment = object.fundingPayment ?? "";
    message.blockHeight = (object.blockHeight !== undefined && object.blockHeight !== null)
      ? Long.fromValue(object.blockHeight)
      : Long.ZERO;
    message.blockTimeMs = (object.blockTimeMs !== undefined && object.blockTimeMs !== null)
      ? Long.fromValue(object.blockTimeMs)
      : Long.ZERO;
    return message;
  },
};

function createBasePositionLiquidatedEvent(): PositionLiquidatedEvent {
  return {
    pair: "",
    traderAddress: "",
    exchangedQuoteAmount: "",
    exchangedPositionSize: "",
    liquidatorAddress: "",
    feeToLiquidator: undefined,
    feeToEcosystemFund: undefined,
    badDebt: undefined,
    margin: undefined,
    positionNotional: "",
    positionSize: "",
    unrealizedPnl: "",
    markPrice: "",
    blockHeight: Long.ZERO,
    blockTimeMs: Long.ZERO,
  };
}

export const PositionLiquidatedEvent = {
  encode(message: PositionLiquidatedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pair !== "") {
      writer.uint32(10).string(message.pair);
    }
    if (message.traderAddress !== "") {
      writer.uint32(18).string(message.traderAddress);
    }
    if (message.exchangedQuoteAmount !== "") {
      writer.uint32(26).string(message.exchangedQuoteAmount);
    }
    if (message.exchangedPositionSize !== "") {
      writer.uint32(34).string(message.exchangedPositionSize);
    }
    if (message.liquidatorAddress !== "") {
      writer.uint32(42).string(message.liquidatorAddress);
    }
    if (message.feeToLiquidator !== undefined) {
      Coin.encode(message.feeToLiquidator, writer.uint32(50).fork()).ldelim();
    }
    if (message.feeToEcosystemFund !== undefined) {
      Coin.encode(message.feeToEcosystemFund, writer.uint32(58).fork()).ldelim();
    }
    if (message.badDebt !== undefined) {
      Coin.encode(message.badDebt, writer.uint32(66).fork()).ldelim();
    }
    if (message.margin !== undefined) {
      Coin.encode(message.margin, writer.uint32(74).fork()).ldelim();
    }
    if (message.positionNotional !== "") {
      writer.uint32(82).string(message.positionNotional);
    }
    if (message.positionSize !== "") {
      writer.uint32(90).string(message.positionSize);
    }
    if (message.unrealizedPnl !== "") {
      writer.uint32(98).string(message.unrealizedPnl);
    }
    if (message.markPrice !== "") {
      writer.uint32(106).string(message.markPrice);
    }
    if (!message.blockHeight.isZero()) {
      writer.uint32(112).int64(message.blockHeight);
    }
    if (!message.blockTimeMs.isZero()) {
      writer.uint32(120).int64(message.blockTimeMs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PositionLiquidatedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePositionLiquidatedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pair = reader.string();
          break;
        case 2:
          message.traderAddress = reader.string();
          break;
        case 3:
          message.exchangedQuoteAmount = reader.string();
          break;
        case 4:
          message.exchangedPositionSize = reader.string();
          break;
        case 5:
          message.liquidatorAddress = reader.string();
          break;
        case 6:
          message.feeToLiquidator = Coin.decode(reader, reader.uint32());
          break;
        case 7:
          message.feeToEcosystemFund = Coin.decode(reader, reader.uint32());
          break;
        case 8:
          message.badDebt = Coin.decode(reader, reader.uint32());
          break;
        case 9:
          message.margin = Coin.decode(reader, reader.uint32());
          break;
        case 10:
          message.positionNotional = reader.string();
          break;
        case 11:
          message.positionSize = reader.string();
          break;
        case 12:
          message.unrealizedPnl = reader.string();
          break;
        case 13:
          message.markPrice = reader.string();
          break;
        case 14:
          message.blockHeight = reader.int64() as Long;
          break;
        case 15:
          message.blockTimeMs = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PositionLiquidatedEvent {
    return {
      pair: isSet(object.pair) ? String(object.pair) : "",
      traderAddress: isSet(object.traderAddress) ? String(object.traderAddress) : "",
      exchangedQuoteAmount: isSet(object.exchangedQuoteAmount) ? String(object.exchangedQuoteAmount) : "",
      exchangedPositionSize: isSet(object.exchangedPositionSize) ? String(object.exchangedPositionSize) : "",
      liquidatorAddress: isSet(object.liquidatorAddress) ? String(object.liquidatorAddress) : "",
      feeToLiquidator: isSet(object.feeToLiquidator) ? Coin.fromJSON(object.feeToLiquidator) : undefined,
      feeToEcosystemFund: isSet(object.feeToEcosystemFund) ? Coin.fromJSON(object.feeToEcosystemFund) : undefined,
      badDebt: isSet(object.badDebt) ? Coin.fromJSON(object.badDebt) : undefined,
      margin: isSet(object.margin) ? Coin.fromJSON(object.margin) : undefined,
      positionNotional: isSet(object.positionNotional) ? String(object.positionNotional) : "",
      positionSize: isSet(object.positionSize) ? String(object.positionSize) : "",
      unrealizedPnl: isSet(object.unrealizedPnl) ? String(object.unrealizedPnl) : "",
      markPrice: isSet(object.markPrice) ? String(object.markPrice) : "",
      blockHeight: isSet(object.blockHeight) ? Long.fromValue(object.blockHeight) : Long.ZERO,
      blockTimeMs: isSet(object.blockTimeMs) ? Long.fromValue(object.blockTimeMs) : Long.ZERO,
    };
  },

  toJSON(message: PositionLiquidatedEvent): unknown {
    const obj: any = {};
    message.pair !== undefined && (obj.pair = message.pair);
    message.traderAddress !== undefined && (obj.traderAddress = message.traderAddress);
    message.exchangedQuoteAmount !== undefined && (obj.exchangedQuoteAmount = message.exchangedQuoteAmount);
    message.exchangedPositionSize !== undefined && (obj.exchangedPositionSize = message.exchangedPositionSize);
    message.liquidatorAddress !== undefined && (obj.liquidatorAddress = message.liquidatorAddress);
    message.feeToLiquidator !== undefined &&
      (obj.feeToLiquidator = message.feeToLiquidator ? Coin.toJSON(message.feeToLiquidator) : undefined);
    message.feeToEcosystemFund !== undefined &&
      (obj.feeToEcosystemFund = message.feeToEcosystemFund ? Coin.toJSON(message.feeToEcosystemFund) : undefined);
    message.badDebt !== undefined && (obj.badDebt = message.badDebt ? Coin.toJSON(message.badDebt) : undefined);
    message.margin !== undefined && (obj.margin = message.margin ? Coin.toJSON(message.margin) : undefined);
    message.positionNotional !== undefined && (obj.positionNotional = message.positionNotional);
    message.positionSize !== undefined && (obj.positionSize = message.positionSize);
    message.unrealizedPnl !== undefined && (obj.unrealizedPnl = message.unrealizedPnl);
    message.markPrice !== undefined && (obj.markPrice = message.markPrice);
    message.blockHeight !== undefined && (obj.blockHeight = (message.blockHeight || Long.ZERO).toString());
    message.blockTimeMs !== undefined && (obj.blockTimeMs = (message.blockTimeMs || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PositionLiquidatedEvent>, I>>(object: I): PositionLiquidatedEvent {
    const message = createBasePositionLiquidatedEvent();
    message.pair = object.pair ?? "";
    message.traderAddress = object.traderAddress ?? "";
    message.exchangedQuoteAmount = object.exchangedQuoteAmount ?? "";
    message.exchangedPositionSize = object.exchangedPositionSize ?? "";
    message.liquidatorAddress = object.liquidatorAddress ?? "";
    message.feeToLiquidator = (object.feeToLiquidator !== undefined && object.feeToLiquidator !== null)
      ? Coin.fromPartial(object.feeToLiquidator)
      : undefined;
    message.feeToEcosystemFund = (object.feeToEcosystemFund !== undefined && object.feeToEcosystemFund !== null)
      ? Coin.fromPartial(object.feeToEcosystemFund)
      : undefined;
    message.badDebt = (object.badDebt !== undefined && object.badDebt !== null)
      ? Coin.fromPartial(object.badDebt)
      : undefined;
    message.margin = (object.margin !== undefined && object.margin !== null)
      ? Coin.fromPartial(object.margin)
      : undefined;
    message.positionNotional = object.positionNotional ?? "";
    message.positionSize = object.positionSize ?? "";
    message.unrealizedPnl = object.unrealizedPnl ?? "";
    message.markPrice = object.markPrice ?? "";
    message.blockHeight = (object.blockHeight !== undefined && object.blockHeight !== null)
      ? Long.fromValue(object.blockHeight)
      : Long.ZERO;
    message.blockTimeMs = (object.blockTimeMs !== undefined && object.blockTimeMs !== null)
      ? Long.fromValue(object.blockTimeMs)
      : Long.ZERO;
    return message;
  },
};

function createBasePositionSettledEvent(): PositionSettledEvent {
  return { pair: "", traderAddress: "", settledCoins: [] };
}

export const PositionSettledEvent = {
  encode(message: PositionSettledEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pair !== "") {
      writer.uint32(10).string(message.pair);
    }
    if (message.traderAddress !== "") {
      writer.uint32(18).string(message.traderAddress);
    }
    for (const v of message.settledCoins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PositionSettledEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePositionSettledEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pair = reader.string();
          break;
        case 2:
          message.traderAddress = reader.string();
          break;
        case 3:
          message.settledCoins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PositionSettledEvent {
    return {
      pair: isSet(object.pair) ? String(object.pair) : "",
      traderAddress: isSet(object.traderAddress) ? String(object.traderAddress) : "",
      settledCoins: Array.isArray(object?.settledCoins) ? object.settledCoins.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: PositionSettledEvent): unknown {
    const obj: any = {};
    message.pair !== undefined && (obj.pair = message.pair);
    message.traderAddress !== undefined && (obj.traderAddress = message.traderAddress);
    if (message.settledCoins) {
      obj.settledCoins = message.settledCoins.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.settledCoins = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PositionSettledEvent>, I>>(object: I): PositionSettledEvent {
    const message = createBasePositionSettledEvent();
    message.pair = object.pair ?? "";
    message.traderAddress = object.traderAddress ?? "";
    message.settledCoins = object.settledCoins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFundingRateChangedEvent(): FundingRateChangedEvent {
  return {
    pair: "",
    markPrice: "",
    indexPrice: "",
    latestFundingRate: "",
    latestPremiumFraction: "",
    cumulativePremiumFraction: "",
    blockHeight: Long.ZERO,
    blockTimeMs: Long.ZERO,
  };
}

export const FundingRateChangedEvent = {
  encode(message: FundingRateChangedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pair !== "") {
      writer.uint32(10).string(message.pair);
    }
    if (message.markPrice !== "") {
      writer.uint32(18).string(message.markPrice);
    }
    if (message.indexPrice !== "") {
      writer.uint32(26).string(message.indexPrice);
    }
    if (message.latestFundingRate !== "") {
      writer.uint32(34).string(message.latestFundingRate);
    }
    if (message.latestPremiumFraction !== "") {
      writer.uint32(42).string(message.latestPremiumFraction);
    }
    if (message.cumulativePremiumFraction !== "") {
      writer.uint32(50).string(message.cumulativePremiumFraction);
    }
    if (!message.blockHeight.isZero()) {
      writer.uint32(56).int64(message.blockHeight);
    }
    if (!message.blockTimeMs.isZero()) {
      writer.uint32(64).int64(message.blockTimeMs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FundingRateChangedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFundingRateChangedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pair = reader.string();
          break;
        case 2:
          message.markPrice = reader.string();
          break;
        case 3:
          message.indexPrice = reader.string();
          break;
        case 4:
          message.latestFundingRate = reader.string();
          break;
        case 5:
          message.latestPremiumFraction = reader.string();
          break;
        case 6:
          message.cumulativePremiumFraction = reader.string();
          break;
        case 7:
          message.blockHeight = reader.int64() as Long;
          break;
        case 8:
          message.blockTimeMs = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FundingRateChangedEvent {
    return {
      pair: isSet(object.pair) ? String(object.pair) : "",
      markPrice: isSet(object.markPrice) ? String(object.markPrice) : "",
      indexPrice: isSet(object.indexPrice) ? String(object.indexPrice) : "",
      latestFundingRate: isSet(object.latestFundingRate) ? String(object.latestFundingRate) : "",
      latestPremiumFraction: isSet(object.latestPremiumFraction) ? String(object.latestPremiumFraction) : "",
      cumulativePremiumFraction: isSet(object.cumulativePremiumFraction)
        ? String(object.cumulativePremiumFraction)
        : "",
      blockHeight: isSet(object.blockHeight) ? Long.fromValue(object.blockHeight) : Long.ZERO,
      blockTimeMs: isSet(object.blockTimeMs) ? Long.fromValue(object.blockTimeMs) : Long.ZERO,
    };
  },

  toJSON(message: FundingRateChangedEvent): unknown {
    const obj: any = {};
    message.pair !== undefined && (obj.pair = message.pair);
    message.markPrice !== undefined && (obj.markPrice = message.markPrice);
    message.indexPrice !== undefined && (obj.indexPrice = message.indexPrice);
    message.latestFundingRate !== undefined && (obj.latestFundingRate = message.latestFundingRate);
    message.latestPremiumFraction !== undefined && (obj.latestPremiumFraction = message.latestPremiumFraction);
    message.cumulativePremiumFraction !== undefined &&
      (obj.cumulativePremiumFraction = message.cumulativePremiumFraction);
    message.blockHeight !== undefined && (obj.blockHeight = (message.blockHeight || Long.ZERO).toString());
    message.blockTimeMs !== undefined && (obj.blockTimeMs = (message.blockTimeMs || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FundingRateChangedEvent>, I>>(object: I): FundingRateChangedEvent {
    const message = createBaseFundingRateChangedEvent();
    message.pair = object.pair ?? "";
    message.markPrice = object.markPrice ?? "";
    message.indexPrice = object.indexPrice ?? "";
    message.latestFundingRate = object.latestFundingRate ?? "";
    message.latestPremiumFraction = object.latestPremiumFraction ?? "";
    message.cumulativePremiumFraction = object.cumulativePremiumFraction ?? "";
    message.blockHeight = (object.blockHeight !== undefined && object.blockHeight !== null)
      ? Long.fromValue(object.blockHeight)
      : Long.ZERO;
    message.blockTimeMs = (object.blockTimeMs !== undefined && object.blockTimeMs !== null)
      ? Long.fromValue(object.blockTimeMs)
      : Long.ZERO;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
