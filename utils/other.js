import { General } from '../setting/config.js';


export const rpc = {
    Starknet: 'https://starknet-mainnet.public.blastapi.io',
    ARB: 'https://arb1.arbitrum.io/rpc'
}

export const explorerTx = {
    Starknet: 'https://starkscan.co/tx/',
}

export const poolIds = {
    'ETH/USDC': '0x1',
    'USDC/ETH': '0x1',
    'ETH/DAI': '0x2',
    'DAI/ETH': '0x2',
    'USDC/WBTC': '0x3',
    'WBTC/USDC': '0x3',
    'ETH/USDT': '0x4',
    'USDT/ETH': '0x4',
    'USDC/USDT': '0x5',
    'USDT/USDC': '0x5',
    'USDC/DAI': '0x6',
    'DAI/USDC': '0x6',
};

export const poolTokens = {
    MySwap: {
        '0x1': { token_a: 'ETH', token_b: 'USDC' },
        '0x2': { token_a: 'DAI', token_b: 'ETH' },
        '0x3': { token_a: 'WBTC', token_b: 'USDC' },
        '0x4': { token_a: 'ETH', token_b: 'USDT' },
        '0x5': { token_a: 'USDC', token_b: 'USDT' },
        '0x6': { token_a: 'DAI', token_b: 'USDC' },
    },
    JediSwap: {
        ETHUSDC :  {reserve0: 'ETH' , reserve1: 'USDC'},
        ETHUSDT :  {reserve0: 'ETH' , reserve1: 'USDT'},
        DAIETH  :  {reserve0: 'DAI' , reserve1: 'ETH' },
        DAIUSDC :  {reserve0: 'DAI' , reserve1: 'USDC'},
        DAIUSDT :  {reserve0: 'DAI' , reserve1: 'USDT'},
        DAIWBTC :  {reserve0: 'DAI' , reserve1: 'WBTC'},
        USDCUSDT:  {reserve0: 'USDC' , reserve1: 'USDT'},
        WBTCUSDC:  {reserve0: 'WBTC', reserve1: 'USDC'},
        WBTCUSDT:  {reserve0: 'WBTC', reserve1: 'USDT'},
        WBTCETH:   {reserve0: 'WBTC', reserve1: 'ETH'},
    },
    _10KSwap: {
        ETHUSDC :  {reserve0: 'ETH' , reserve1: 'USDC'},
        ETHUSDT :  {reserve0: 'ETH' , reserve1: 'USDT'},
        DAIETH  :  {reserve0: 'DAI' , reserve1: 'ETH' },
        DAIUSDC :  {reserve0: 'DAI' , reserve1: 'USDC'},
        DAIUSDT :  {reserve0: 'DAI' , reserve1: 'USDT'},
        DAIWBTC :  {reserve0: 'DAI' , reserve1: 'WBTC'},
        USDCUSDT:  {reserve0: 'USDC' , reserve1: 'USDT'},
        WBTCUSDC:  {reserve0: 'WBTC', reserve1: 'USDC'},
        WBTCUSDT:  {reserve0: 'WBTC', reserve1: 'USDT'},
        WBTCETH:   {reserve0: 'WBTC', reserve1: 'ETH'},
    }
};

export const chainContract = {
    Starknet: {
        ABI:            '0x048624e084dc68d82076582219c7ed8cb0910c01746cca3cd72a28ecfe07e42d',
        ETH:            '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
        USDC:           '0x053C91253BC9682c04929cA02ED00b3E423f6710D2ee7e0D5EBB06F3eCF368A8',
        USDT:           '0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8',
        DAI:            '0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3',
        WBTC:           '0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac',
        ETHUSDCLP:      '0x022b05f9396d2c48183f6deaf138a57522bcc8b35b67dee919f76403d1783136',
        MySwapRouter:   '0x010884171baf1914edc28d7afb619b40a4051cfae78a094a55d230f19e944a28',
        StarknetId:     '0x05dbdedc203e92749e2e746e2d40a768d966bd243df04a6b712e222bc040a9af',
        NostraiETH:     '0x070f8a4fcd75190661ca09a7300b7c93fab93971b67ea712c664d7948a8a54c6',
        NostradETH:     '0x040b091cb020d91f4a4b34396946b4d4e2a450dbd9410432ebdbfe10e55ee5e5',
        StargateBridge: '0x073314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82',
        NostraiUSDC:    '0x029959a546dda754dc823a7b8aa65862c5825faeaaf7938741d8ca6bfdc69e4e',
        NostradUSDC:    '0x03b6058a9f6029b519bc72b2cc31bcb93ca704d0ab79fec2ae5d43f79ac07f7a',
        MySwap: {
            Router: '0x010884171baf1914edc28d7afb619b40a4051cfae78a094a55d230f19e944a28',
            ETHUSDC: '0x022b05f9396d2c48183f6deaf138a57522bcc8b35b67dee919f76403d1783136',
            ETHUSDT: '0x041f9a1e9a4d924273f5a5c0c138d52d66d2e6a8bee17412c6b0f48fe059ae04',
            DAIETH: '0x07c662b10f409d7a0a69c8da79b397fd91187ca5f6230ed30effef2dceddc5b3',
            DAIUSDC: '0x0611e8f4f3badf1737b9e8f0ca77dd2f6b46a1d33ce4eed951c6b18ac497d505',
            USDCUSDT: '0x01ea237607b7d9d2e9997aa373795929807552503683e35d8739f4dc46652de1',
            WBTCUSDC: '0x025b392609604c75d62dde3d6ae98e124a31b49123b8366d7ce0066ccb94f696',
        },
        JediSwap: {
            Router: '0x041fd22b238fa21cfcf5dd45a8548974d8263b3a531a60388411c5e230f97023',
            ETHUSDC: '0x04d0390b777b424e43839cd1e744799f3de6c176c7e32c1812a41dbd9c19db6a',
            ETHUSDT: '0x045e7131d776dddc137e30bdd490b431c7144677e97bf9369f629ed8d3fb7dd6',
            DAIETH: '0x07e2a13b40fc1119ec55e0bcf9428eedaa581ab3c924561ad4e955f95da63138',
            DAIUSDC: '0x00cfd39f5244f7b617418c018204a8a9f9a7f72e71f0ef38f968eeb2a9ca302b',
            DAIUSDT: '0x00f0f5b3eed258344152e1f17baf84a2e1b621cd754b625bec169e8595aea767',
            DAIWBTC: '0x039c183c8e5a2df130eefa6fbaa3b8aad89b29891f6272cb0c90deaa93ec6315',
            USDCUSDT: '0x05801bdad32f343035fb242e98d1e9371ae85bc1543962fedea16c59b35bd19b',
            WBTCUSDC: '0x005a8054e5ca0b277b295a830e53bd71a6a6943b42d0dbb22329437522bc80c8',
            WBTCUSDT: '0x044d13ad98a46fd2322ef2637e5e4c292ce8822f47b7cb9a1d581176a801c1a0',
            WBTCETH: '0x260e98362e0949fefff8b4de85367c035e44f734c9f8069b6ce2075ae86b45c'
        },
        _10KSwap: {
            Router: '0x07a6f98c03379b9513ca84cca1373ff452a7462a3b61598f0af5bb27ad7f76d1',
            ETHUSDC: '0x000023c72abdf49dffc85ae3ede714f2168ad384cc67d08524732acea90df325',
            ETHUSDT: '0x05900cfa2b50d53b097cb305d54e249e31f24f881885aae5639b0cd6af4ed298',
            DAIETH: '0x017e9e62c04b50800d7c59454754fe31a2193c9c3c6c92c093f2ab0faadf8c87',
            DAIUSDC: '0x02e767b996c8d4594c73317bb102c2018b9036aee8eed08ace5f45b3568b94e5',
            DAIUSDT: '0x041d52e15e82b003bf0ad52ca58393c87abef3e00f1bf69682fd4162d5773f8f',
            DAIWBTC: '0x00f9d8f827734f5fd54571f0e78398033a3c1f1074a471cd4623f2aa45163718',
            USDCUSDT: '0x041a708cf109737a50baa6cbeb9adf0bf8d97112dc6cc80c7a458cbad35328b0',
            WBTCUSDC: '0x022e45d94d5c6c477d9efd440aad71b2c02a5cd5bed9a4d6da10bb7c19fd93ba',
            WBTCUSDT: '0x050031010bcee2f43575b3afe197878e064e1a03c12f2ff437f29a2710e0b6ef',
            WBTCETH: '0x02a6e0ecda844736c4803a385fb1372eff458c365d2325c7d4e08032c7a908f3',
        },
        SithSwap:{
            Router: '0x028c858a586fa12123a1ccb337a0a3b369281f91ea00544d0c086524b759f627',
            ETHUSDC: '0x030615bec9c1506bfac97d9dbd3c546307987d467a7f95d5533c2e861eb81f3f',
            ETHUSDT: '0x00691fa7f66d63dc8c89ff4e77732fff5133f282e7dbd41813273692cc595516',
            DAIETH: '0x0032ebb8e68553620b97b308684babf606d9556d5c0a652450c32e85f40d000d',
            DAIUSDC: '0x015e9cd2d4d6b4bb9f1124688b1e6bc19b4ff877a01011d28c25c9ee918e83e5',
            USDCUSDT: '0x0601f72228f73704e827de5bcd8dadaad52c652bb1e42bf492d90bbe22df2cec',
            DAIUSDT: '0x07eb597ad7d9ba28ea1db162cdb99e265fe22bcb00e9b690e188c2203de9e005',
            WBTCETH: '0x0260e98362e0949fefff8b4de85367c035e44f734c9f8069b6ce2075ae86b45c',
        }
    },
    approveAmount: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
}

export const SrcDstTokens = {
    MySwap: [
        { token: 'ETH', minBalance: getMinBalance('ETH'), toTokens: ['USDC', 'USDT', 'DAI'] },
        { token: 'USDC', minBalance: getMinBalance('USDC'), toTokens: ['USDT', 'DAI', 'WBTC'] },
        { token: 'USDT', minBalance: getMinBalance('USDT'), toTokens: ['USDC'] },
        { token: 'DAI', minBalance: getMinBalance('DAI'), toTokens: ['USDC'] },
        { token: 'WBTC', minBalance: getMinBalance('WBTC'), toTokens: ['USDC'] },
    ],
    JediSwap: [
        { token: 'ETH', minBalance: getMinBalance('ETH'), toTokens: ['USDC', 'USDT', 'DAI', 'WBTC'] },
        { token: 'USDC', minBalance: getMinBalance('USDC'), toTokens: ['USDT', 'DAI', 'WBTC'] },
        { token: 'USDT', minBalance: getMinBalance('USDT'), toTokens: ['USDC', 'DAI', 'WBTC'] },
        { token: 'DAI', minBalance: getMinBalance('DAI'), toTokens: ['USDC', 'USDT', 'WBTC'] },
        { token: 'WBTC', minBalance: getMinBalance('WBTC'), toTokens: ['USDC', 'USDT', 'DAI'] }
    ],
    _10KSwap: [
        { token: 'ETH', minBalance: getMinBalance('ETH'), toTokens: ['USDC', 'USDT', 'DAI', 'WBTC'] },
        { token: 'USDC', minBalance: getMinBalance('USDC'), toTokens: ['USDT', 'DAI', 'WBTC'] },
        { token: 'USDT', minBalance: getMinBalance('USDT'), toTokens: ['USDC', 'DAI', 'WBTC'] },
        { token: 'DAI', minBalance: getMinBalance('DAI'), toTokens: ['USDC', 'USDT', 'WBTC'] },
        { token: 'WBTC', minBalance: getMinBalance('WBTC'), toTokens: ['USDC', 'USDT', 'DAI'] },
    ],
    SithSwap: [
        { token: 'ETH', minBalance: getMinBalance('ETH'), toTokens: ['USDC', 'USDT', 'DAI'] },
        { token: 'USDC', minBalance: getMinBalance('USDC'), toTokens: ['USDT', 'DAI'] },
        { token: 'USDT', minBalance: getMinBalance('USDT'), toTokens: ['USDC', 'DAI'] },
        { token: 'DAI', minBalance: getMinBalance('DAI'), toTokens: ['USDC', 'USDT'] },
    ]
};

function getMinBalance(tokenName){
    switch (tokenName){
        case 'ETH':
            return General.ethBalance * 10**18
        case 'USDC':
            return General.usdcBalance * 10**6
        case 'USDT':
            return General.usdtBalance* 10**6
        case 'WBTC':
            return General.wbtcBalance * 10**8
        case 'DAI':
            return General.daiBalance * 10**18
    }
}

