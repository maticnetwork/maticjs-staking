import { BaseToken, Converter, IPOSClientConfig, ITransactionOption, TYPE_AMOUNT, Web3SideChainClient } from "@maticnetwork/maticjs";

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
        });
    }

    getExchangeRate() {
        return this.getMethod("exchangeRate").then(method => {
            return this.processRead(method);
        });
    }

    getOldUnbonds(address: string) {
        return this.getMethod("unbonds", address).then(method => {
            return this.processRead(method);
        });
    }

    getNewUnbonds(address: string, nonce) {
        return this.getMethod("unbonds_new", address, nonce).then(method => {
            return this.processRead(method);
        });
    }


    getLiquidRewards(address: string) {
        return this.getMethod("getLiquidRewards", address).then(method => {
            return this.processRead(method);
        });
    }

    getMinAmountToStake() {
        return this.getMethod("minAmount").then(method => {
            return this.processRead(method);
        });
    }

    /**
     * return balance of shares of delegator
     *
     * @return {*} 
     * @memberof ValidatorShare
     */
    getBalance(address: string) {
        return this.getMethod("balanceOf", address).then(method => {
            return this.processRead(method);
        });
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
    delegateAmount(amount: TYPE_AMOUNT, minAmountToStake: TYPE_AMOUNT, option?: ITransactionOption) {
        return this.getMethod(
            "buyVoucher",
            Converter.toHex(amount),
            Converter.toHex(minAmountToStake)
        ).then(method => {
            return this.processWrite(method, option);
        });
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
    removeDelegatedAmount(amount: TYPE_AMOUNT, maximumSharesToBurn: TYPE_AMOUNT, option?: ITransactionOption) {
        return this.getMethod(
            "sellVoucher_new",
            Converter.toHex(amount),
            Converter.toHex(maximumSharesToBurn)
        ).then(method => {
            return this.processWrite(method, option);
        });
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
    claimDelegatedAmount(nonce: TYPE_AMOUNT, option?: ITransactionOption) {
        return this.getMethod(
            "unstakeClaimTokens_new",
            Converter.toHex(nonce),
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    /**
     * restake the earned rewards
     *
     * @return {*} 
     * @memberof ValidatorShare
     */
    restakeReward(option?: ITransactionOption) {
        return this.getMethod(
            "restake",
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    /**
     * withdraw earned rewards
     *
     * @return {*} 
     * @memberof ValidatorShare
     */
    withdrawRewards(option?: ITransactionOption) {
        return this.getMethod(
            "withdrawRewards",
        ).then(method => {
            return this.processWrite(method, option);
        });
    }



}