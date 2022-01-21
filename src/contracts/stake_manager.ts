import { BaseToken, Converter, IPOSClientConfig, TYPE_AMOUNT, Web3SideChainClient } from "@maticnetwork/maticjs";

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

    getMethod(name: string, ...args) {
        return this.getContract().then(contract => {
            return contract.method(name, ...args);
        })
    }

    getCheckPointReward() {
        return this.getMethod("CHECKPOINT_REWARD").then(method => {
            return this.processRead(method);
        })
    }

    getWithdrawalDelay() {
        return this.getMethod("WITHDRAWAL_DELAY").then(method => {
            return this.processRead(method);
        })
    }

    getLockedStatus() {
        return this.getMethod("locked").then(method => {
            return this.processRead(method);
        })
    }

    getValidatorDetails(validatorId) {
        return this.getMethod("validators", validatorId).then(method => {
            return this.processRead(method);
        })
    }

    getMinHeimdallFee() {
        return this.getMethod("minHeimdallFee").then(method => {
            return this.processRead(method);
        })
    }


    stakeFor(userAddress: string, amount: TYPE_AMOUNT, heimdallFee: TYPE_AMOUNT, acceptDelegation, signerPubkey) {
        return this.getMethod(
            "stakeFor",
            Converter.toHex(userAddress),
            Converter.toHex(amount),
            Converter.toHex(heimdallFee),
            acceptDelegation,
            signerPubkey
        ).then(method => {
            return this.processWrite(method);
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
    addTopUpForHeimdallFee(userAddress: string, amount: TYPE_AMOUNT) {
        return this.getMethod(
            "topUpForFee",
            Converter.toHex(userAddress),
            Converter.toHex(amount),
        ).then(method => {
            return this.processWrite(method);
        });
    }

    unStake(validatorId) {
        return this.getMethod(
            "unstake",
            Converter.toHex(validatorId)
        ).then(method => {
            return this.processWrite(method);
        })
    }

    claimStakedAmount(validatorId) {
        return this.getMethod(
            "unstakeClaim",
            Converter.toHex(validatorId)
        ).then(method => {
            return this.processWrite(method);
        })
    }

    reStake(validatorId, amount: TYPE_AMOUNT) {
        return this.getMethod(
            "restake",
            Converter.toHex(validatorId),
            Converter.toHex(amount)
        ).then(method => {
            return this.processWrite(method);
        })
    }

    withdrawRewardForValidator(validatorId) {
        return this.getMethod(
            "withdrawRewards",
            Converter.toHex(validatorId)
        ).then(method => {
            return this.processWrite(method);
        })
    }

    migrateDelegation(fromValidatorId, toValidatorId, amount: TYPE_AMOUNT) {
        return this.getMethod(
            "migrateDelegation",
            Converter.toHex(fromValidatorId),
            Converter.toHex(toValidatorId),
            Converter.toHex(amount)
        ).then(method => {
            return this.processWrite(method);
        })
    }

}