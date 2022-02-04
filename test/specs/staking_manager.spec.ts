import { from, stakingClient, privateKey, RPC } from "./client";
import { expect } from 'chai'

describe('Staking manager', () => {

    it('getMinHeimdallFee', async () => {
        const fee = await stakingClient.stakeManager.getMinHeimdallFee();
        expect(fee).to.be.an('string')
        expect(Number(fee)).gte(0);
    })

    it('getWithdrawalDelay', async () => {
        const fee = await stakingClient.stakeManager.getWithdrawalDelay();
        expect(fee).to.be.an('string')
        expect(Number(fee)).gte(0);
    })

    it('getLockedStatus', async () => {
        const fee = await stakingClient.stakeManager.getLockedStatus();
        expect(fee).to.be.an('boolean')
    })

    it('getCheckPointReward', async () => {
        const fee = await stakingClient.stakeManager.getCheckPointReward();
        expect(fee).to.be.an('string')
        expect(Number(fee)).gte(0);
    })

    it('getValidatorDetails', async () => {
        const result = await stakingClient.stakeManager.getValidatorDetails(100);
        expect(result).to.be.an('array')
    })
});