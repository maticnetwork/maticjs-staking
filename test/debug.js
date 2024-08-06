const { StakingClient } = require("@maticnetwork/maticjs-staking");
const { use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");
use(Web3ClientPlugin);

const HDWalletProvider = require("@truffle/hdwallet-provider");

const { user1, rpc, pos, user2, validatorAddress } = require("./config");
const from = user1.address;
const privateKey = user1.privateKey;

const execute = async () => {
    const client = new StakingClient();
    await client.init({
        log: true,
        network: 'testnet',
        version: 'amoy',
        parent: {
            provider: new HDWalletProvider(privateKey, rpc.parent),
            defaultConfig: {
                from
            }
        },
        child: {
            provider: new HDWalletProvider(privateKey, rpc.child),
            defaultConfig: {
                from
            }
        }
    });
    console.log("init called");

    const value = await client.stakeManager.getTotalStake()
    return console.log(value)

    const minHeimdallFee = await client.validatorShare(validatorAddress).getNewUnbonds(from, 1);
    return console.log(minHeimdallFee)
};

execute().then(_ => {
    process.exit(0)
}).catch(err => {
    console.error(err);
    process.exit(0);
})
