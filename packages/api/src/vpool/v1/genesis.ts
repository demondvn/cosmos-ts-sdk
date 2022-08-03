/* eslint-disable */
import { Params } from './params'
import Long from 'long'
import { Pool } from './vpool'
import _m0 from 'protobufjs/minimal'

export const protobufPackage = 'nibiru.vpool.v1'

/** GenesisState defines the vpool module's genesis state. */
export interface GenesisState {
  vpools: Pool[]
  params?: Params
}

function createBaseGenesisState(): GenesisState {
  return { vpools: [], params: undefined }
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.vpools) {
      Pool.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseGenesisState()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.vpools.push(Pool.decode(reader, reader.uint32()))
          break
        case 2:
          message.params = Params.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): GenesisState {
    return {
      vpools: Array.isArray(object?.vpools) ? object.vpools.map((e: any) => Pool.fromJSON(e)) : [],
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    }
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {}
    if (message.vpools) {
      obj.vpools = message.vpools.map((e) => (e ? Pool.toJSON(e) : undefined))
    } else {
      obj.vpools = []
    }
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState()
    message.vpools = object.vpools?.map((e) => Pool.fromPartial(e)) || []
    message.params =
      object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined
    return message
  },
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

type KeysOfUnion<T> = T extends T ? keyof T : never
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
