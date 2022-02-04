import { from, stakingClient, VALIDATOR_ADDRESS } from "./client";
import { expect } from 'chai'

describe('validatorShare', () => {

    const validatorShare = stakingClient.validatorShare(VALIDATOR_ADDRESS);

    it('getBalance', async () => {
        const fee = await validatorShare.getBalance(from);
        expect(fee).to.be.an('string')
        expect(Number(fee)).gte(0);
    })

    it('getExchangeRate', async () => {
        const fee = await validatorShare.getExchangeRate();
        expect(fee).to.be.an('string')
        expect(Number(fee)).gte(0);
    })

    it('getMinAmountToStake', async () => {
        const fee = await validatorShare.getMinAmountToStake();
        expect(fee).to.be.an('string')
        expect(Number(fee)).gte(0);
    })

    it('getLiquidRewards', async () => {
        const fee = await validatorShare.getLiquidRewards(from);
        expect(fee).to.be.an('string')
        expect(Number(fee)).gte(0);
    })

    it('getOldUnbonds', async () => {
        const fee = await validatorShare.getOldUnbonds(from);
        expect(fee).to.be.an('array')
    })

    it('getNewUnbonds', async () => {
        const fee = await validatorShare.getNewUnbonds(from, 1);
        expect(fee).to.be.an('array')
    })
});