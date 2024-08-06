const dotenv = require('dotenv');
const path = require('path');
const env = dotenv.config({
    path: path.join(__dirname, '.env')
});
module.exports = {
    rpc: {
        parent: process.env.ROOT_RPC,
        child: process.env.MATIC_RPC || 'https://rpc-amoy.polygon.technology',
    },
    validatorAddress: '0x6169b708dA400bd5fd90a9ffA30114e61298D444',
    user1: {
        "privateKey": process.env.USER1_PRIVATE_KEY,
        "address": process.env.USER1_FROM
    },
    user2: {
        address: process.env.USER2_FROM, // Your address
        "privateKey": process.env.USER2_PRIVATE_KEY,
    },
}
