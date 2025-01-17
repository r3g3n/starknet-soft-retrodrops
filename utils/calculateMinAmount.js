import {chainContract, poolTokens, rpc} from "./other.js"
import {Contract, RpcProvider} from 'starknet';


export default class minAmount {

    constructor (src,dst,moduleName,pool_id,abies){
        this.src = src 
        this.dst = dst 
        this.moduleName = moduleName
        this.pool_id = pool_id
        this.abies = abies   
    }

    async execute (amount){
        return await this.callMinAmount(this.abies,amount)
    }
    async callMinAmount(abies,amount) {
        const minAmountFunctions = {
          JediSwap: this.JediSwapMinAmount.bind(this),
          _10KSwap: this.defaultMinAmount.bind(this),
          SithSwap: this.SithSwapMinAmount.bind(this),
          MySwap: this.MySwapMinAmount.bind(this),
        };
      
        const minAmountFunction = minAmountFunctions[this.moduleName];
        if (!minAmountFunction) {
          throw new Error("Invalid moduleName");
        }
      
        return await minAmountFunction(amount);
      }

    async defaultMinAmount(amount){
       
            const provider = new RpcProvider({ nodeUrl: rpc.Starknet });
            const contract = new Contract(this.abies.mainAbi, chainContract.Starknet[this.moduleName].Router, provider);
        
            const slippage = BigInt(5); 
            const divider = BigInt(1000);
        
            const [reserveSrc, reserveDst] = await this.callGetReserves(this.abies);

            const maxSrcAmount = { low: BigInt(amount), high: 0n };
            const minSrcAmount = (maxSrcAmount.low) - (((maxSrcAmount.low) * slippage) / divider);
            const maxDstAmount = await this.callGetAmountOut(contract,maxSrcAmount,reserveSrc,reserveDst);
            const minDstAmount = maxDstAmount - ((maxDstAmount * slippage) / divider);

            return {minSrcAmount, maxDstAmount, minDstAmount};
    }

    async JediSwapMinAmount(amount){

        const provider = new RpcProvider({ nodeUrl: rpc.Starknet });
        const contract = new Contract(this.abies.mainAbi, chainContract.Starknet[this.moduleName].Router, provider);

        const slippage = BigInt(5);
        const divider = BigInt(1000);

        const [reserveSrc, reserveDst] = await this.callGetReserves(this.abies);

        const maxSrcAmount = { low: BigInt(amount), high: 0n };
        const minSrcAmount = (maxSrcAmount.low) - (((maxSrcAmount.low) * slippage) / divider);

        const maxDstAmount = await this.callGetAmountOut(contract,maxSrcAmount,reserveSrc,reserveDst);
        const minDstAmount = maxDstAmount - ((maxDstAmount * slippage) / divider);

        return {minSrcAmount, maxDstAmount, minDstAmount};
    }

    async MySwapMinAmount(amount){

        const provider = new RpcProvider({ nodeUrl: rpc.Starknet });

        const contract = new Contract(this.abies.mainAbi, chainContract.Starknet.MySwapRouter, provider);
        const pool = await contract.get_pool(this.pool_id);
        if (!pool) {
            throw new Error("Pool object is undefined.");
        }

        const poolTokensForCurrentPool = poolTokens.MySwap[this.pool_id];
        let poolSrc, poolDst;

        if (this.src === poolTokensForCurrentPool.token_a) {
            poolSrc = pool.pool.token_a_reserves.low;
            poolDst = pool.pool.token_b_reserves.low;
        } else {
            poolSrc = pool.pool.token_b_reserves.low;
            poolDst = pool.pool.token_a_reserves.low;
        }

        const fee = BigInt(parseFloat(pool.pool.fee_percentage) / 100);
        
        const srcAmount = BigInt(amount);
        const slippage = BigInt(5);
        const divider = BigInt(1000);

        const minSrcAmount = srcAmount - ((srcAmount * slippage) / divider);
        const maxDstAmount = (srcAmount * poolDst) / (poolSrc + srcAmount);
        const maxDstAmountFee = maxDstAmount - ((maxDstAmount * fee) / divider);
        const minDstAmount = maxDstAmountFee - ((maxDstAmountFee * slippage) / divider);
        return {minSrcAmount, maxDstAmount, minDstAmount};

    }
    

    async SithSwapMinAmount(amount){

        const provider = new RpcProvider({ nodeUrl: rpc.Starknet });

        const contract = new Contract(this.abies.mainAbi, chainContract.Starknet.SithSwap.Router, provider);
    
        const slippage = BigInt(5);
        const divider = BigInt(1000);

        const srcAmount = { low: BigInt(amount), high: 0n };
        
        const minSrcAmount = srcAmount.low - ((srcAmount.low * slippage) / divider);
        const maxDstAmount = await this.callGetAmountOut(contract,srcAmount,0,0);
        
        const minDstAmount = maxDstAmount - ((maxDstAmount * slippage) / divider)

        return {minSrcAmount, maxDstAmount, minDstAmount};
}

    async callGetReserves(abies) {
        switch (this.moduleName) {
          case "JediSwap":
          case "_10KSwap":
          
            return await this.defaultgetReserves(abies)
          case "SithSwap":
          case "MySwap":
            return [0,0]; 
          default:
            throw new Error("Invalid moduleName");
        }
      }
    
    async callMaxDstAmount(contract,maxSrcAmount,reserveSrc,reserveDst){
        switch (this.moduleName){
            case "JediSwap":
            case "_10KSwap":          
                return (await contract.getAmountIn({ low: BigInt(maxSrcAmount), high: 0n },reserveSrc,reserveDst)).amountIn.low                
            case "SithSwap":
                return (await contract.getAmountOut({ low: BigInt(maxSrcAmount), high: 0n },chainContract.Starknet[this.src],chainContract.Starknet[this.dst])).amount.low
            case "MySwap":
                return await this.callMinAmountForAddLP(maxSrcAmount)
        }
    }

    async callGetAmountOut(contract,maxSrcAmount,reserveSrc,reserveDst){
        
        switch (this.moduleName){
            case "JediSwap":
                return (await contract.get_amount_out(maxSrcAmount, reserveSrc, reserveDst)).amountOut.low
            case "_10KSwap":
                return (await contract.getAmountOut(maxSrcAmount, reserveSrc, reserveDst)).amountOut.low;
            case "SithSwap":
                return (await contract.getAmountOut(maxSrcAmount,chainContract.Starknet[this.src],chainContract.Starknet[this.dst])).amount.low
        }
    }

    async defaultgetReserves(abies) {

        const provider = new RpcProvider({ nodeUrl: rpc.Starknet });

        const key1 = `${this.src.toUpperCase()}${this.dst.toUpperCase()}`;
        const key2 = `${this.dst.toUpperCase()}${this.src.toUpperCase()}`;

        const contractAddress = chainContract.Starknet[this.moduleName][key1] || chainContract.Starknet[this.moduleName][key2] || undefined;


        if (!contractAddress) {
            throw new Error(`Invalid src-dst pair: ${this.src}-${this.dst}`);
        }

        const poolToken = poolTokens[this.moduleName][key1] || poolTokens[this.moduleName][key2];

        const contract = new Contract(abies.reserveAbi, contractAddress, provider);

        const reserves  = (await contract.getReserves?.()) || (await contract.get_reserves?.());
        let reserveSrc, reserveDst;
        if (poolToken.reserve0 === this.src) {
            reserveSrc = reserves.reserve0;
            reserveDst = reserves.reserve1;
        } else {
            reserveSrc = reserves.reserve1;
            reserveDst = reserves.reserve0;
        }

        return [reserveSrc, reserveDst];

    }

    async callMinAmountForAddLP(amount){
        const provider = new RpcProvider({ nodeUrl: rpc.Starknet });

        const contract = new Contract(this.abies.mainAbi, chainContract.Starknet.MySwapRouter, provider);
        const pool = await contract.get_pool(this.pool_id);
        if (!pool) {
            throw new Error("Pool object is undefined.");
        }

        const poolTokensForCurrentPool = poolTokens.MySwap[this.pool_id];
        let poolSrc, poolDst;

        if (this.src === poolTokensForCurrentPool.token_a) {
            poolSrc = pool.pool.token_a_reserves.low;
            poolDst = pool.pool.token_b_reserves.low;
        } else {
            poolSrc = pool.pool.token_b_reserves.low;
            poolDst = pool.pool.token_a_reserves.low;
        }
        amount = amount + (amount * (BigInt(10)))/(BigInt(1000))
        let maxDstAmoun = BigInt(amount);
        return (poolSrc * maxDstAmoun) / (poolDst - maxDstAmoun)

    }
}