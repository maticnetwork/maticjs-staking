import { StakingClient } from "@maticnetwork/maticjs-staking";
import { user1, rpc, user2 } from "../config";

export const privateKey = user1.privateKey;
export const from = user1.address;
export const to = user2.address;
export const toPrivateKey = user2.privateKey;

export const RPC = rpc;

export const stakingClient = new StakingClient();


