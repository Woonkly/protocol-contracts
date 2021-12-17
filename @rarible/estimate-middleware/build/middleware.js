"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateGasMiddliware = void 0;
var tslib_1 = require("tslib");
var json_rpc_engine_1 = require("json-rpc-engine");
/**
 * Estimates gas for transaction if gas not defined
 * @param engine JsonRpcEngine to use for gas estimation
 * @param force set true if estimate tx even if gas is provided
 */
function estimateGasMiddliware(engine, force) {
    var _this = this;
    if (force === void 0) { force = false; }
    return (0, json_rpc_engine_1.createAsyncMiddleware)(function (req, _, next) { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () {
        var tx, gasPrice, estimateParams, response;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(req.method === "eth_sendTransaction")) return [3 /*break*/, 2];
                    if (!req.params) return [3 /*break*/, 2];
                    tx = req.params[0];
                    if (!isTransactionParams(tx)) return [3 /*break*/, 2];
                    if (!(force || typeof tx.gas === "undefined")) return [3 /*break*/, 2];
                    gasPrice = tx.gasPrice, estimateParams = (0, tslib_1.__rest)(tx, ["gasPrice"]);
                    return [4 /*yield*/, engine.handle((0, tslib_1.__assign)((0, tslib_1.__assign)({}, req), { params: [estimateParams], method: "eth_estimateGas" }))];
                case 1:
                    response = _a.sent();
                    if (isJSONRpcResponse(response)) {
                        if (response.error) {
                            throw response.error;
                        }
                        if (response.result) {
                            tx["gas"] = response.result;
                        }
                    }
                    _a.label = 2;
                case 2: return [4 /*yield*/, next()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.estimateGasMiddliware = estimateGasMiddliware;
function isJSONRpcResponse(x) {
    return typeof x === "object" && x !== null && "jsonrpc" in x && "id" in x;
}
function isTransactionParams(x) {
    return typeof x === "object" && x !== null && "from" in x;
}
