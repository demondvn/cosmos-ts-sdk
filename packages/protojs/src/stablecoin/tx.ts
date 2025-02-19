/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "nibiru.stablecoin.v1";

/**
 * MsgMintStable: Msg to mint NUSD. A user deposits NIBI and collateral and gets
 * NUSD in return. The amount of NUSD received depends on the current price set
 * by the oracle library and the current collateral ratio for the protocol.
 */
export interface MsgMintStable {
  creator: string;
  stable?: Coin;
}

/**
 * MsgMintStableResponse specifies the amount of NUSD token the user will receive after their
 * mint transaction
 */
export interface MsgMintStableResponse {
  stable?: Coin;
  usedCoins: Coin[];
  feesPayed: Coin[];
}

/**
 * MsgBurnStable allows users to burn NUSD in exchange for NIBI and collateral.
 * The amount of NIBI and Collateral received depends on the current price set by
 * the x/oracle library and the current collateral ratio.
 */
export interface MsgBurnStable {
  creator: string;
  stable?: Coin;
}

/**
 * MsgBurnStableResponse specifies the amount of collateral and governance
 * token the user will receive after their burn transaction.
 */
export interface MsgBurnStableResponse {
  collateral?: Coin;
  gov?: Coin;
  feesPayed: Coin[];
}

/** MsgRecollateralize */
export interface MsgRecollateralize {
  creator: string;
  coll?: Coin;
}

/** MsgRecollateralizeResponse is the output of a successful 'Recollateralize' */
export interface MsgRecollateralizeResponse {
  /** Gov (sdk.Coin): Tokens rewarded to the caller in exchange for her collateral. */
  gov?: Coin;
}

/** MsgBuyback */
export interface MsgBuyback {
  creator: string;
  /**
   * Gov (sdk.Coin): Tokens the caller wants to sell to the protocol in exchange
   * for collateral.
   */
  gov?: Coin;
}

/** MsgBuybackResponse is the output of a successful 'Buyback' */
export interface MsgBuybackResponse {
  /** Coll (sdk.Coin): Tokens sold to the caller in exchange for her collateral. */
  coll?: Coin;
}

function createBaseMsgMintStable(): MsgMintStable {
  return { creator: "", stable: undefined };
}

export const MsgMintStable = {
  encode(message: MsgMintStable, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.stable !== undefined) {
      Coin.encode(message.stable, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintStable {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintStable();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.stable = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMintStable {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      stable: isSet(object.stable) ? Coin.fromJSON(object.stable) : undefined,
    };
  },

  toJSON(message: MsgMintStable): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.stable !== undefined && (obj.stable = message.stable ? Coin.toJSON(message.stable) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMintStable>, I>>(object: I): MsgMintStable {
    const message = createBaseMsgMintStable();
    message.creator = object.creator ?? "";
    message.stable = (object.stable !== undefined && object.stable !== null)
      ? Coin.fromPartial(object.stable)
      : undefined;
    return message;
  },
};

function createBaseMsgMintStableResponse(): MsgMintStableResponse {
  return { stable: undefined, usedCoins: [], feesPayed: [] };
}

export const MsgMintStableResponse = {
  encode(message: MsgMintStableResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stable !== undefined) {
      Coin.encode(message.stable, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.usedCoins) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.feesPayed) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintStableResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintStableResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stable = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.usedCoins.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.feesPayed.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMintStableResponse {
    return {
      stable: isSet(object.stable) ? Coin.fromJSON(object.stable) : undefined,
      usedCoins: Array.isArray(object?.usedCoins) ? object.usedCoins.map((e: any) => Coin.fromJSON(e)) : [],
      feesPayed: Array.isArray(object?.feesPayed) ? object.feesPayed.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgMintStableResponse): unknown {
    const obj: any = {};
    message.stable !== undefined && (obj.stable = message.stable ? Coin.toJSON(message.stable) : undefined);
    if (message.usedCoins) {
      obj.usedCoins = message.usedCoins.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.usedCoins = [];
    }
    if (message.feesPayed) {
      obj.feesPayed = message.feesPayed.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.feesPayed = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMintStableResponse>, I>>(object: I): MsgMintStableResponse {
    const message = createBaseMsgMintStableResponse();
    message.stable = (object.stable !== undefined && object.stable !== null)
      ? Coin.fromPartial(object.stable)
      : undefined;
    message.usedCoins = object.usedCoins?.map((e) => Coin.fromPartial(e)) || [];
    message.feesPayed = object.feesPayed?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgBurnStable(): MsgBurnStable {
  return { creator: "", stable: undefined };
}

export const MsgBurnStable = {
  encode(message: MsgBurnStable, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.stable !== undefined) {
      Coin.encode(message.stable, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnStable {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnStable();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.stable = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBurnStable {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      stable: isSet(object.stable) ? Coin.fromJSON(object.stable) : undefined,
    };
  },

  toJSON(message: MsgBurnStable): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.stable !== undefined && (obj.stable = message.stable ? Coin.toJSON(message.stable) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBurnStable>, I>>(object: I): MsgBurnStable {
    const message = createBaseMsgBurnStable();
    message.creator = object.creator ?? "";
    message.stable = (object.stable !== undefined && object.stable !== null)
      ? Coin.fromPartial(object.stable)
      : undefined;
    return message;
  },
};

function createBaseMsgBurnStableResponse(): MsgBurnStableResponse {
  return { collateral: undefined, gov: undefined, feesPayed: [] };
}

export const MsgBurnStableResponse = {
  encode(message: MsgBurnStableResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.collateral !== undefined) {
      Coin.encode(message.collateral, writer.uint32(10).fork()).ldelim();
    }
    if (message.gov !== undefined) {
      Coin.encode(message.gov, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.feesPayed) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnStableResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnStableResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collateral = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.gov = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.feesPayed.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBurnStableResponse {
    return {
      collateral: isSet(object.collateral) ? Coin.fromJSON(object.collateral) : undefined,
      gov: isSet(object.gov) ? Coin.fromJSON(object.gov) : undefined,
      feesPayed: Array.isArray(object?.feesPayed) ? object.feesPayed.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgBurnStableResponse): unknown {
    const obj: any = {};
    message.collateral !== undefined &&
      (obj.collateral = message.collateral ? Coin.toJSON(message.collateral) : undefined);
    message.gov !== undefined && (obj.gov = message.gov ? Coin.toJSON(message.gov) : undefined);
    if (message.feesPayed) {
      obj.feesPayed = message.feesPayed.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.feesPayed = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBurnStableResponse>, I>>(object: I): MsgBurnStableResponse {
    const message = createBaseMsgBurnStableResponse();
    message.collateral = (object.collateral !== undefined && object.collateral !== null)
      ? Coin.fromPartial(object.collateral)
      : undefined;
    message.gov = (object.gov !== undefined && object.gov !== null) ? Coin.fromPartial(object.gov) : undefined;
    message.feesPayed = object.feesPayed?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgRecollateralize(): MsgRecollateralize {
  return { creator: "", coll: undefined };
}

export const MsgRecollateralize = {
  encode(message: MsgRecollateralize, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.coll !== undefined) {
      Coin.encode(message.coll, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRecollateralize {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRecollateralize();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.coll = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRecollateralize {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      coll: isSet(object.coll) ? Coin.fromJSON(object.coll) : undefined,
    };
  },

  toJSON(message: MsgRecollateralize): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.coll !== undefined && (obj.coll = message.coll ? Coin.toJSON(message.coll) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRecollateralize>, I>>(object: I): MsgRecollateralize {
    const message = createBaseMsgRecollateralize();
    message.creator = object.creator ?? "";
    message.coll = (object.coll !== undefined && object.coll !== null) ? Coin.fromPartial(object.coll) : undefined;
    return message;
  },
};

function createBaseMsgRecollateralizeResponse(): MsgRecollateralizeResponse {
  return { gov: undefined };
}

export const MsgRecollateralizeResponse = {
  encode(message: MsgRecollateralizeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gov !== undefined) {
      Coin.encode(message.gov, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRecollateralizeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRecollateralizeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gov = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRecollateralizeResponse {
    return { gov: isSet(object.gov) ? Coin.fromJSON(object.gov) : undefined };
  },

  toJSON(message: MsgRecollateralizeResponse): unknown {
    const obj: any = {};
    message.gov !== undefined && (obj.gov = message.gov ? Coin.toJSON(message.gov) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRecollateralizeResponse>, I>>(object: I): MsgRecollateralizeResponse {
    const message = createBaseMsgRecollateralizeResponse();
    message.gov = (object.gov !== undefined && object.gov !== null) ? Coin.fromPartial(object.gov) : undefined;
    return message;
  },
};

function createBaseMsgBuyback(): MsgBuyback {
  return { creator: "", gov: undefined };
}

export const MsgBuyback = {
  encode(message: MsgBuyback, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.gov !== undefined) {
      Coin.encode(message.gov, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBuyback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBuyback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.gov = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBuyback {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      gov: isSet(object.gov) ? Coin.fromJSON(object.gov) : undefined,
    };
  },

  toJSON(message: MsgBuyback): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.gov !== undefined && (obj.gov = message.gov ? Coin.toJSON(message.gov) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBuyback>, I>>(object: I): MsgBuyback {
    const message = createBaseMsgBuyback();
    message.creator = object.creator ?? "";
    message.gov = (object.gov !== undefined && object.gov !== null) ? Coin.fromPartial(object.gov) : undefined;
    return message;
  },
};

function createBaseMsgBuybackResponse(): MsgBuybackResponse {
  return { coll: undefined };
}

export const MsgBuybackResponse = {
  encode(message: MsgBuybackResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.coll !== undefined) {
      Coin.encode(message.coll, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBuybackResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBuybackResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coll = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBuybackResponse {
    return { coll: isSet(object.coll) ? Coin.fromJSON(object.coll) : undefined };
  },

  toJSON(message: MsgBuybackResponse): unknown {
    const obj: any = {};
    message.coll !== undefined && (obj.coll = message.coll ? Coin.toJSON(message.coll) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBuybackResponse>, I>>(object: I): MsgBuybackResponse {
    const message = createBaseMsgBuybackResponse();
    message.coll = (object.coll !== undefined && object.coll !== null) ? Coin.fromPartial(object.coll) : undefined;
    return message;
  },
};

/** Msg defines the x/stablecoin Msg service. */
export interface Msg {
  /**
   * MintStable defines a method for trading a mixture of GOV and COLL to mint an
   * equivalent value of stablecoins.
   */
  MintStable(request: MsgMintStable): Promise<MsgMintStableResponse>;
  /**
   * BurnStable defines a method for redeeming/burning stablecoins to receive an
   * equivalent value as a mixture of governance and collateral tokens.
   */
  BurnStable(request: MsgBurnStable): Promise<MsgBurnStableResponse>;
  /**
   * Recollateralize defines a method for manually adding collateral to the
   * protocol in exchange for an equivalent stablecoin value in governance tokens
   * plus a small bonus.
   */
  Recollateralize(request: MsgRecollateralize): Promise<MsgRecollateralizeResponse>;
  /**
   * Buyback defines a method for manually adding NIBI to the protocol
   * in exchange for an equivalent stablecoin value in collateral, effectively
   * executing a share buyback for Nibiru Chain. The NIBI purchased by the protocol
   * is then burned, distributing value to all NIBI hodlers.
   */
  Buyback(request: MsgBuyback): Promise<MsgBuybackResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.MintStable = this.MintStable.bind(this);
    this.BurnStable = this.BurnStable.bind(this);
    this.Recollateralize = this.Recollateralize.bind(this);
    this.Buyback = this.Buyback.bind(this);
  }
  MintStable(request: MsgMintStable): Promise<MsgMintStableResponse> {
    const data = MsgMintStable.encode(request).finish();
    const promise = this.rpc.request("nibiru.stablecoin.v1.Msg", "MintStable", data);
    return promise.then((data) => MsgMintStableResponse.decode(new _m0.Reader(data)));
  }

  BurnStable(request: MsgBurnStable): Promise<MsgBurnStableResponse> {
    const data = MsgBurnStable.encode(request).finish();
    const promise = this.rpc.request("nibiru.stablecoin.v1.Msg", "BurnStable", data);
    return promise.then((data) => MsgBurnStableResponse.decode(new _m0.Reader(data)));
  }

  Recollateralize(request: MsgRecollateralize): Promise<MsgRecollateralizeResponse> {
    const data = MsgRecollateralize.encode(request).finish();
    const promise = this.rpc.request("nibiru.stablecoin.v1.Msg", "Recollateralize", data);
    return promise.then((data) => MsgRecollateralizeResponse.decode(new _m0.Reader(data)));
  }

  Buyback(request: MsgBuyback): Promise<MsgBuybackResponse> {
    const data = MsgBuyback.encode(request).finish();
    const promise = this.rpc.request("nibiru.stablecoin.v1.Msg", "Buyback", data);
    return promise.then((data) => MsgBuybackResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
