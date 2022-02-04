import { StakingClient } from "@maticnetwork/maticjs-staking";
import { user1, rpc, user2, validatorAddress } from "../config";

export const privateKey = user1.privateKey;
export const from = user1.address;
export const to = user2.address;
export const toPrivateKey = user2.privateKey;

export const RPC = rpc;
export const VALIDATOR_ADDRESS = validatorAddress;

export const stakingClient = new StakingClient();


