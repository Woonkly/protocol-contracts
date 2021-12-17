import { JsonRpcEngine } from "json-rpc-engine";
import type { SafeEventEmitterProvider } from "eth-json-rpc-middleware/dist/utils/cache";
export declare function estimate(provider: any, estimate?: JsonRpcEngine | string, force?: boolean): SafeEventEmitterProvider;
