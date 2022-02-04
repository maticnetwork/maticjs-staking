import { from, stakingClient, privateKey, RPC } from "./client";
import { expect } from 'chai'
import { ABIManager } from '@maticnetwork/maticjs'
import { providers, Wallet } from "ethers";


describe('Staking Client', () => {

    const abiManager = new ABIManager("testnet", "mumbai");
    const parentPrivder = new providers.JsonRpcProvider(RPC.parent);
    const childProvider = new providers.JsonRpcProvider(RPC.child);

    before(() => {
        return Promise.all([
            stakingClient.init({
                // log: true,
                network: 'testnet',
                version: 'mumbai',
                parent: {
                    provider: new Wallet(privateKey, parentPrivder),
                    defaultConfig: {
                        from
                    }
                },
                child: {
                    provider: new Wallet(privateKey, childProvider),
                    defaultConfig: {
                        from
                    }
                }
            }),
            abiManager.init()
        ]);
    });

    it('temp', () => {
        expect(true).equal(true);
    })
});