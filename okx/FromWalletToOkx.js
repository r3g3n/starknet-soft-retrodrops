import Web3 from 'web3';
import {chainContract, rpc} from "../utils/other.js";
import helpersFunctions from "../utils/helpersClass.js";
import {Account, CallData, RpcProvider} from "starknet";
import ConfirmTx from '../utils/txPayload.js'

export default class FromWalletToOkx{
    
    constructor(config, configBridge, addressesAndKeys, logger,okecx,addressIndex,StarknetOkx) {
        this.config = config;
        this.addressesAndKeys = addressesAndKeys
        this.logger = logger;
        this.addressToWithDrawal = okecx
        this.addressIndex = addressIndex
        this.helpersFunctions = new helpersFunctions()
        this.StarknetOkx = StarknetOkx
        
    }

    async execute() {
        
        switch (this.config.withdrawalFromNetwork){
            case 'Arbitrum One':
                return await this.WithDrawalFromEVM()
            case 'StarkNet':
                return await this.withdrawalFromStarknet()
        }
       
    }

    async WithDrawalFromEVM(){
        this.logger.info(`[Account ${this.addressIndex}][WithdrawalToOkx][Arbitrum] - Start withdrawal ETH to OKX`)
        const explorer = 'https://arbiscan.io/'
        const web3 = new Web3(rpc.ARB);
        const reserve_amount = (Math.random() * (this.config.amountToSaveOnWallet[1] - this.config.amountToSaveOnWallet[0]) + this.config.amountToSaveOnWallet[0]).toFixed(5)
        
        const account = web3.eth.accounts.privateKeyToAccount(this.addressesAndKeys.mmKey.trim());
        const balance = await web3.eth.getBalance(account.address)
        
        const amountToWithDrawal = balance - BigInt(reserve_amount * 10**18)
        
        

        const nonce  = await web3.eth.getTransactionCount(account.address)

        let transaction = {
            'chainId': 42161,
            'to': this.addressToWithDrawal,
            'value': 0,
            'gas': 0,
            'type': '0x2',
            'maxFeePerGas': 0,
            'maxPriorityFeePerGas': 0,
            'nonce': nonce
        }
        
        const estimatedGas = await web3.eth.estimateGas({ from: account.address, value: BigInt(amountToWithDrawal) })
        const estimatedGasPrice = await web3.eth.getGasPrice()
        const estimatedFee = estimatedGas*estimatedGasPrice

        transaction['gas'] = estimatedGas
        transaction['maxFeePerGas'] = BigInt((await web3.eth.getGasPrice() * BigInt(110)) / BigInt(100));

        transaction['maxPriorityFeePerGas'] = BigInt(await web3.eth.getGasPrice())

        const value  = amountToWithDrawal - estimatedFee

        transaction['value'] = BigInt(value - (value * BigInt(1)/BigInt(100)))

        
        const signedTx = await web3.eth.accounts.signTransaction(transaction, account.privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)

        this.logger.info(`[Account ${this.addressIndex}][WithdrawalFromWallet][EVM] - WithdrawalFromWallet successfully, TX HASH: ${explorer}${receipt.transactionHash}`)
    }

    async withdrawalFromStarknet(){
        
        const reserve_amount = BigInt(10**18*(Math.random() * (this.config.amountToSaveOnWallet[1] - this.config.amountToSaveOnWallet[0]) + this.config.amountToSaveOnWallet[0]).toFixed(5))
        const balance = await this.helpersFunctions.balanceCheckerForToken('ETH',this.addressesAndKeys.starkAddress,undefined)
        let valueToWithdrawal = balance - reserve_amount
        valueToWithdrawal = valueToWithdrawal - (valueToWithdrawal * BigInt(1)/BigInt(100))
        
        const provider = new RpcProvider({ nodeUrl: rpc.Starknet });
        const account = new Account(provider, this.addressesAndKeys.starkAddress , this.addressesAndKeys.startPrivateKey);

        let txPayload = [{
            contractAddress : chainContract.Starknet.ETH, 
            entrypoint: "transfer", 
            calldata: CallData.compile({
                recipient: this.StarknetOkx,
                amount: {low:BigInt(valueToWithdrawal), high: 0n},
            })
        }]

        

        const res = (await account.estimateInvokeFee(txPayload)).overall_fee

        valueToWithdrawal = valueToWithdrawal - res 
        this.logger.info(`[Account ${this.addressIndex}][Withdrawal][Starknet] - Start withdrawal from wallet to OKX | Amount ${Number(valueToWithdrawal) / ((10**18))}`)

        txPayload = [{
            contractAddress : chainContract.Starknet.ETH, 
            entrypoint: "transfer", 
            calldata: CallData.compile({
                recipient: this.StarknetOkx,
                amount: {low:BigInt(valueToWithdrawal), high: 0n},
            })
        }]

        await new ConfirmTx(txPayload,account,provider,this.logger,`[Account ${this.addressIndex}][Withdrawal][Starknet]`).execute()
    }
}
