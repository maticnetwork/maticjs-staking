import { BridgeClient, IPOSClientConfig } from "@maticnetwork/maticjs";
import { MaticToken, StakeManager, ValidatorShare } from "./contracts";

export class StakingClient extends BridgeClient<IPOSClientConfig> {
    stakeManager: StakeManager;
    maticToken: MaticToken;
    polToken: MaticToken;

    init(config: IPOSClientConfig) {
        const client = this.client;
        return client.init(config).then(_ => {
            const mainPlasmaContracts = client.mainPlasmaContracts;
            const stakeManagerProxyAddress = mainPlasmaContracts.StakeManagerProxy;
            const maticTokenAddress = mainPlasmaContracts.Tokens.MaticToken;
            const polTokenAddress = mainPlasmaContracts.PolygonEcosystemToken;
            this.stakeManager = new StakeManager(client, stakeManagerProxyAddress);
            this.maticToken = new MaticToken(client, maticTokenAddress, stakeManagerProxyAddress);
            this.polToken = new MaticToken(client, polTokenAddress, stakeManagerProxyAddress);
        });
    }

    validatorShare(address: string) {
        return new ValidatorShare(
            this.client,
            address
        );
    }

}