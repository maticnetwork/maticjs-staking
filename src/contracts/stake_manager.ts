import { BaseToken, Converter, IPOSClientConfig, ITransactionOption, TYPE_AMOUNT, Web3SideChainClient } from "@maticnetwork/maticjs";

export class StakeManager extends BaseToken<IPOSClientConfig> {

    constructor(client: Web3SideChainClient<IPOSClientConfig>, address: string) {
        super(
            {
                isParent: true,
                address: address,
                name: "StakeManager",
                bridgeType: 'plasma'
            },
            client
        );
    }

    protected getMethod(name: string, ...args) {
        return this.getContract().then(contract => {
            return contract.method(name, ...args);
        });
    }

    getCheckPointReward() {
        return this.getMethod("CHECKPOINT_REWARD").then(method => {
            return this.processRead(method);
        });
    }

    getWithdrawalDelay() {
        return this.getMethod("WITHDRAWAL_DELAY").then(method => {
            return this.processRead(method);
        });
    }

    getLockedStatus() {
        return this.getMethod("locked").then(method => {
            return this.processRead(method);
        });
    }

    getValidatorDetails(validatorId) {
        return this.getMethod("validators", validatorId).then(method => {
            return this.processRead(method);
        });
    }

    getMinHeimdallFee() {
        return this.getMethod("minHeimdallFee").then(method => {
            return this.processRead<string>(method);
        });
    }


    stakeFor(userAddress: string, amount: TYPE_AMOUNT, heimdallFee: TYPE_AMOUNT, acceptDelegation, signerPubkey, option?: ITransactionOption) {
        return this.getMethod(
            "stakeFor",
            Converter.toHex(userAddress),
            Converter.toHex(amount),
            Converter.toHex(heimdallFee),
            acceptDelegation,
            signerPubkey
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    /**
     * add fee to heimdall chain for doing transacion for validator
     *
     * @param {string} userAddress
     * @param {TYPE_AMOUNT} amount
     * @return {*} 
     * @memberof StakeManager
     */
    addTopUpForHeimdallFee(userAddress: string, amount: TYPE_AMOUNT, option?: ITransactionOption) {
        return this.getMethod(
            "topUpForFee",
            Converter.toHex(userAddress),
            Converter.toHex(amount),
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    unStake(validatorId, option?: ITransactionOption) {
        return this.getMethod(
            "unstake",
            Converter.toHex(validatorId)
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    claimStakedAmount(validatorId, option?: ITransactionOption) {
        return this.getMethod(
            "unstakeClaim",
            Converter.toHex(validatorId)
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    reStake(validatorId, amount: TYPE_AMOUNT, option?: ITransactionOption) {
        return this.getMethod(
            "restake",
            Converter.toHex(validatorId),
            Converter.toHex(amount)
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    withdrawRewardForValidator(validatorId, option?: ITransactionOption) {
        return this.getMethod(
            "withdrawRewards",
            Converter.toHex(validatorId)
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    migrateDelegation(fromValidatorId, toValidatorId, amount: TYPE_AMOUNT, option?: ITransactionOption) {
        return this.getMethod(
            "migrateDelegation",
            Converter.toHex(fromValidatorId),
            Converter.toHex(toValidatorId),
            Converter.toHex(amount)
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    updateCommissionRate(validatorId: TYPE_AMOUNT, validatorCommission: TYPE_AMOUNT, option?: ITransactionOption) {
        return this.getMethod(
            "updateCommissionRate",
            Converter.toHex(validatorId),
            Converter.toHex(validatorCommission),
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    updateSigner(validatorId: TYPE_AMOUNT, publicKey: string, option?: ITransactionOption) {
        return this.getMethod(
            "updateSigner",
            Converter.toHex(validatorId),
            publicKey,
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

}