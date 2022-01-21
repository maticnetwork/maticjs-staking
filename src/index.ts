import { BridgeClient, IPOSClientConfig } from "@maticnetwork/maticjs";
import { StakeManager, ValidatorShare } from "./contracts";

export class StakingClient extends BridgeClient<IPOSClientConfig> {
    stakeManager: StakeManager;

    init(config: IPOSClientConfig) {
        const client = this.client;
        client.init(config).then(_ => {
            const mainPlasmaContracts = client.mainPlasmaContracts;
            const stakeManagerProxyAddress = mainPlasmaContracts.StakeManagerProxy;
            this.stakeManager = new StakeManager(client, stakeManagerProxyAddress);
        })
    }

    validatorShare(address: string) {
        return new ValidatorShare(
            this.client,
            address
        )
    }
}