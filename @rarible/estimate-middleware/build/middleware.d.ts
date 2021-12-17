import type { JsonRpcEngine, JsonRpcMiddleware } from "json-rpc-engine";
import type { Block } from "eth-json-rpc-middleware/dist/utils/cache";
/**
 * Estimates gas for transaction if gas not defined
 * @param engine JsonRpcEngine to use for gas estimation
 * @param force set true if estimate tx even if gas is provided
 */
export declare function estimateGasMiddliware(engine: JsonRpcEngine, force?: boolean): JsonRpcMiddleware<string[], Block>;
