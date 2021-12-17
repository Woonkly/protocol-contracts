"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimate = void 0;
var eth_json_rpc_middleware_1 = require("eth-json-rpc-middleware");
var json_rpc_engine_1 = require("json-rpc-engine");
var middleware_1 = require("./middleware");
function estimate(provider, estimate, force) {
    var engine = new json_rpc_engine_1.JsonRpcEngine();
    engine.push((0, middleware_1.estimateGasMiddliware)(getEstimateEngine(provider, estimate), force));
    engine.push((0, eth_json_rpc_middleware_1.providerAsMiddleware)(provider));
    return (0, eth_json_rpc_middleware_1.providerFromEngine)(engine);
}
exports.estimate = estimate;
function getEstimateEngine(provider, estimate) {
    if (estimate === undefined) {
        var estimateEngine = new json_rpc_engine_1.JsonRpcEngine();
        estimateEngine.push((0, eth_json_rpc_middleware_1.providerAsMiddleware)(provider));
        return estimateEngine;
    }
    else if (typeof estimate === "string") {
        var engine = new json_rpc_engine_1.JsonRpcEngine();
        engine.push((0, eth_json_rpc_middleware_1.createFetchMiddleware)({ rpcUrl: estimate }));
        return engine;
    }
    else {
        return estimate;
    }
}
