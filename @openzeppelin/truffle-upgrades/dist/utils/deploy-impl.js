"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployImpl = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const deploy_1 = require("./deploy");
const truffle_1 = require("./truffle");
const validations_1 = require("./validations");
const wrap_provider_1 = require("./wrap-provider");
async function deployImpl(Contract, requiredOpts, proxyAddress) {
    if (requiredOpts.kind === 'transparent') {
        requiredOpts.unsafeAllow.push('missing-public-upgradeto');
    }
    const provider = wrap_provider_1.wrapProvider(requiredOpts.deployer.provider);
    const { contracts_build_directory, contracts_directory } = truffle_1.getTruffleConfig();
    const validations = await validations_1.validateArtifacts(contracts_build_directory, contracts_directory);
    const linkedBytecode = await validations_1.getLinkedBytecode(Contract, provider);
    const version = upgrades_core_1.getVersion(Contract.bytecode, linkedBytecode);
    const layout = upgrades_core_1.getStorageLayout([validations], version);
    upgrades_core_1.assertUpgradeSafe([validations], version, requiredOpts);
    if (proxyAddress !== undefined) {
        const manifest = await upgrades_core_1.Manifest.forNetwork(provider);
        const currentImplAddress = await upgrades_core_1.getImplementationAddress(provider, proxyAddress);
        const currentLayout = await upgrades_core_1.getStorageLayoutForAddress(manifest, validations, currentImplAddress);
        upgrades_core_1.assertStorageUpgradeSafe(currentLayout, layout, requiredOpts);
    }
    return await upgrades_core_1.fetchOrDeploy(version, provider, async () => {
        const deployment = await deploy_1.deploy(requiredOpts.deployer, Contract);
        return { ...deployment, layout };
    });
}
exports.deployImpl = deployImpl;
//# sourceMappingURL=deploy-impl.js.map