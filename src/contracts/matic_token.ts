import { BaseToken, IPOSClientConfig, MAX_AMOUNT, Web3SideChainClient } from "@maticnetwork/maticjs";

export class MaticToken extends BaseToken<IPOSClientConfig> {

    stakeManagerAddress: string;

    constructor(client: Web3SideChainClient<IPOSClientConfig>, address: string, stakeManagerAddress: string) {
        super(
            {
                isParent: true,
                address: address,
                name: "ERC20",
                bridgeType: 'plasma'
            },
            client
        );
        this.stakeManagerAddress = stakeManagerAddress;
    }

    protected getMethod(name: string, ...args) {
        return this.getContract().then(contract => {
            return contract.method(name, ...args);
        });
    }

    getAllowanceForStakingManager(userAddress: string) {
        return this.getMethod(
            "allowance",
            userAddress,
            this.stakeManagerAddress
        ).then(method => {
            return this.processRead(method);
        });
    }

    approveMaxForStakingManager() {
        return this.getMethod(
            "approve",
            this.stakeManagerAddress,
            MAX_AMOUNT
        ).then(method => {
            return this.processWrite(method);
        });
    }

    getBalance(userAddress: string) {
        return this.getMethod(
            "balanceOf",
            userAddress,
        ).then(method => {
            return this.processRead(method);
        });
    }
}