import { BridgeClient, IPOSClientConfig } from "@maticnetwork/maticjs";
import { MaticToken, StakeManager, ValidatorShare } from "./contracts";

export class StakingClient extends BridgeClient<IPOSClientConfig> {
    stakeManager: StakeManager;
    maticToken: MaticToken;

    init(config: IPOSClientConfig) {
        const client = this.client;
        return client.init(config).then(_ => {
            const mainPlasmaContracts = client.mainPlasmaContracts;
            const stakeManagerProxyAddress = mainPlasmaContracts.StakeManagerProxy;
            const maticTokenAddress = mainPlasmaContracts.Tokens.MaticToken;
            this.stakeManager = new StakeManager(client, stakeManagerProxyAddress);
            this.maticToken = new MaticToken(client, maticTokenAddress, stakeManagerProxyAddress);
        });
    }

    validatorShare(address: string) {
        return new ValidatorShare(
            this.client,
            address
        );
    }

}