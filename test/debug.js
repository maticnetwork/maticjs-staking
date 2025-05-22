const { StakingClient } = require("@maticnetwork/maticjs-staking");
const { use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-ethers");
use(Web3ClientPlugin);
const { ethers } = require("ethers");

const { user1, rpc, pos, user2, validatorAddress } = require("./config");
const from = user1.address;
const privateKey = user1.privateKey;

const execute = async () => {
    const client = new StakingClient();
    await client.init({
        log: true,
        network: 'mainnet',
        version: 'v1',
        parent: {
            provider: new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(rpc.parent)),
            defaultConfig: {
                from
            }
        },
        child: {
            provider: new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(rpc.child)),
            defaultConfig: {
                from
            }
        }
    });
    console.log("init called");

    let amount = '1'
    const permitData = await client.polToken.getPermitData(amount, "0x5e3Ef299fDDf15eAa0432E6e66473ace8c13D908")
    console.log(permitData)

    const DelegateWithPermit = await client.validatorShare('0xa180Dd33e0fe5f8c2a4022d613145c383BE5F6a6')
        .delegateAmountPOLwithPermit(
            amount, amount,
            permitData.deadline,
            permitData.v,
            permitData.r,
            permitData.s,
            { returnTransaction: true }
        )
    return (console.log(DelegateWithPermit))

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
