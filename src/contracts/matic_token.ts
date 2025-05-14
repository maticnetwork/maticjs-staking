import { BaseToken, IPOSClientConfig, ITransactionOption, MAX_AMOUNT, TYPE_AMOUNT, Web3SideChainClient, Converter } from "@maticnetwork/maticjs";

export class MaticToken extends BaseToken<IPOSClientConfig> {

    stakeManagerAddress: string;

    constructor(client: Web3SideChainClient<IPOSClientConfig>, address: string, stakeManagerAddress: string) {
        super(
            {
                isParent: true,
                address: address,
                name: "ERC20",
                bridgeType: 'plasma'
            },
            client
        );
        this.stakeManagerAddress = stakeManagerAddress;
    }

    protected getMethod(name: string, ...args) {
        return this.getContract().then(contract => {
            return contract.method(name, ...args);
        });
    }

    getAllowanceForStakingManager(userAddress: string) {
        return this.getMethod(
            "allowance",
            userAddress,
            this.stakeManagerAddress
        ).then(method => {
            return this.processRead(method);
        });
    }

    approveMaxForStakingManager(option?: ITransactionOption) {
        return this.getMethod(
            "approve",
            this.stakeManagerAddress,
            MAX_AMOUNT
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    getBalance(userAddress: string) {
        return this.getMethod(
            "balanceOf",
            userAddress,
        ).then(method => {
            return this.processRead(method);
        });
    }

    async getPermitData(
        amount: TYPE_AMOUNT,
        spender: string
      ): Promise<{ v: number; r: string; s: string; deadline: number }> {
        debugger
        const client = this.client.parent[this.client.config.network].provider;
        const [account] = await client.getAccounts();
        const contract = await this.getContract();
        // const name = await this.processRead<string>(contract.method('name'));
        // to increase speed, we can hardcode the name
        const name = 'Polygon Ecosystem Token';
        const nonce = await this.processRead<string>(contract.method('nonces', account));
        const version = await this.processRead<string>(contract.method('version'));
        const chainId = await client.getChainId();
      
        const deadline = Math.floor(Date.now() / 1000) + 1800; // 30 mins from now
        const value = Converter.toHex(amount);
      
        const domain = {
          name,
          version: version,
          chainId,
          verifyingContract: this.contractParam.address,
        };
      
        const types = {
          Permit: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' },
          ],
        };
      
        const message = {
          owner: account,
          spender,
          value,
          nonce,
          deadline,
        };
      
        const signature = await client.signTypedData(account, {
          types: { ...types, EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' }
          ] },
          primaryType: 'Permit',
          domain,
          message,
        });
      
        const sig = signature.startsWith('0x') ? signature.slice(2) : signature;
        const r = '0x' + sig.substring(0, 64);
        const s = '0x' + sig.substring(64, 128);
        let v = parseInt(sig.substring(128, 130), 16);
        if (v < 27) v += 27;
      
        return { v, r, s, deadline };
      }
}
