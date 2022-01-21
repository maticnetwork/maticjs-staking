import { BaseToken, Converter, IPOSClientConfig, TYPE_AMOUNT, Web3SideChainClient } from "@maticnetwork/maticjs";

export class ValidatorShare extends BaseToken<IPOSClientConfig> {

    constructor(client: Web3SideChainClient<IPOSClientConfig>, address: string) {
        super(
            {
                isParent: true,
                address: address,
                name: "ValidatorShare",
                bridgeType: 'plasma'
            },
            client
        );
    }

    protected getMethod(name: string, ...args) {
        return this.getContract().then(contract => {
            return contract.method(name, ...args);
        })
    }

    getExchangeRate() {
        return this.getMethod("exchangeRate").then(method => {
            return this.processRead(method);
        })
    }

    getOldUnbonds() {
        return this.getMethod("unbonds").then(method => {
            return this.processRead(method);
        })
    }

    getNewUnbonds() {
        return this.getMethod("unbonds_new").then(method => {
            return this.processRead(method);
        })
    }


    getLiquidRewards(address: string) {
        return this.getMethod("getLiquidRewards", address).then(method => {
            return this.processRead(method);
        })
    }

    getMinAmountToStake() {
        return this.getMethod("minAmount").then(method => {
            return this.processRead(method);
        })
    }

    getBalance() {
        return this.getMethod("balanceOf").then(method => {
            return this.processRead(method);
        })
    }

    /**
     * delegate amount to validator
     *
     *  internally it calls method - **buyVoucher**
     * 
     * @param {TYPE_AMOUNT} amount
     * @param {TYPE_AMOUNT} minAmountToStake
     * @return {*} 
     * @memberof ValidatorShare
     */
    delegateAmount(amount: TYPE_AMOUNT, minAmountToStake: TYPE_AMOUNT) {
        return this.getMethod(
            "buyVoucher",
            Converter.toHex(amount),
            Converter.toHex(minAmountToStake)
        ).then(method => {
            return this.processWrite(method);
        })
    }

    /**
     *  unstake delegated amount
     *
     * internally it calls - **sellVoucher_new**
     * 
     * @param {TYPE_AMOUNT} amount
     * @param {TYPE_AMOUNT} maximumSharesToBurn
     * @return {*} 
     * @memberof ValidatorShare
     */
    removeDelegatedAmount(amount: TYPE_AMOUNT, maximumSharesToBurn: TYPE_AMOUNT) {
        return this.getMethod(
            "sellVoucher_new",
            Converter.toHex(amount),
            Converter.toHex(maximumSharesToBurn)
        ).then(method => {
            return this.processWrite(method);
        })
    }

    /**
     * claim the delegated amount by supplying nonce
     *
     * internally it calls - **unstakeClaimTokens_new**
     * 
     * @param {TYPE_AMOUNT} nonce
     * @return {*} 
     * @memberof ValidatorShare
     */
    claimDelegatedAmount(nonce: TYPE_AMOUNT) {
        return this.getMethod(
            "unstakeClaimTokens_new",
            Converter.toHex(nonce),
        ).then(method => {
            return this.processWrite(method);
        })
    }

    /**
     * restake the earned rewards
     *
     * @return {*} 
     * @memberof ValidatorShare
     */
    restakeReward() {
        return this.getMethod(
            "restake",
        ).then(method => {
            return this.processWrite(method);
        })
    }

    /**
     * withdraw earned rewards
     *
     * @return {*} 
     * @memberof ValidatorShare
     */
    withdrawRewards() {
        return this.getMethod(
            "withdrawRewards",
        ).then(method => {
            return this.processWrite(method);
        })
    }



}