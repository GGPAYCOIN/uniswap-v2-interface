import { JSBI, Percent, Token, WETH } from '@uniswap/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { injected } from '../connectors'

// GGPAY Chain Configuration
export const GGPAY_CHAIN_ID = 2121216 
export const ROUTER_ADDRESS = '0xaf0ed8b0e017a7dc311dc206107caf95c262c361'
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export { PRELOADED_PROPOSALS } from './proposals'

// GGPAY Tokens (ALL addresses strictly lowercased to guarantee NO checksum invariant crashes)
export const WGGPAY = new Token(
  GGPAY_CHAIN_ID as any,
  '0x96371352960b0fe65d52f6538ddf744a66a453a3',
  18,
  'WGGPAY',
  'Wrapped GGPAY'
)

// Safely inject custom chain WETH
// @ts-ignore
WETH[GGPAY_CHAIN_ID] = WGGPAY

// Here was the fatal error earlier, now fixed strictly to lowercase
export const DAI = new Token(GGPAY_CHAIN_ID as any, '0x6b175474e89094c44da98b954eedeac495271d0f', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(GGPAY_CHAIN_ID as any, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', 6, 'USDC', 'USD Coin')
export const USDT = new Token(GGPAY_CHAIN_ID as any, '0xdac17f958d2ee523a2206206994597c13d831ec7', 6, 'Tether USD', 'Tether USD')
export const WBTC = new Token(GGPAY_CHAIN_ID as any, '0x2260fac5e5542a773aa44fbcfedf7c1239181313', 8, 'WBTC', 'Wrapped Bitcoin')

export const AVERAGE_BLOCK_TIME_IN_SECS = 3
export const PROPOSAL_LENGTH_IN_BLOCKS = 40320
export const PROPOSAL_LENGTH_IN_SECS = AVERAGE_BLOCK_TIME_IN_SECS * PROPOSAL_LENGTH_IN_BLOCKS

export const GOVERNANCE_ADDRESS = '0x5e4be8bc9637f0eaa1a755019e06a68ce081d58f'
export const TIMELOCK_ADDRESS = '0x1a9c8182c09f50c8318d769245bea52c32be35bc'

const UNI_ADDRESS = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

export const UNI: { [chainId: number]: Token } = {
  [GGPAY_CHAIN_ID]: new Token(GGPAY_CHAIN_ID as any, UNI_ADDRESS, 18, 'UNI', 'Uniswap')
}

export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [UNI_ADDRESS]: 'UNI',
  [GOVERNANCE_ADDRESS]: 'Governance',
  [TIMELOCK_ADDRESS]: 'Timelock'
}

export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId: number]: string } = {
  [GGPAY_CHAIN_ID]: '0x090d4613473dee047c3f2706764f49e0821d256e'
}

export const BASES_TO_CHECK_TRADES_AGAINST: { [chainId: number]: Token[] } = {
  [GGPAY_CHAIN_ID]: [WGGPAY, DAI, USDC, USDT, WBTC]
}

export const CUSTOM_BASES: { [chainId: number]: { [tokenAddress: string]: Token[] } } = {
  [GGPAY_CHAIN_ID]: {}
}

export const SUGGESTED_BASES: { [chainId: number]: Token[] } = {
  [GGPAY_CHAIN_ID]: [WGGPAY, DAI, USDC, USDT, WBTC]
}

export const BASES_TO_TRACK_LIQUIDITY_FOR: { [chainId: number]: Token[] } = {
  [GGPAY_CHAIN_ID]: [WGGPAY, DAI, USDC, USDT, WBTC]
}

export const PINNED_PAIRS: { readonly [chainId: number]: [Token, Token][] } = {
  [GGPAY_CHAIN_ID]: [
    [USDC, USDT],
    [DAI, USDT]
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  }
}

export const NetworkContextName = 'NETWORK'
export const INITIAL_ALLOWED_SLIPPAGE = 50
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)
export const BIG_INT_ZERO = JSBI.BigInt(0)
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE)
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE)
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE)
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE)
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE)
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16))
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))
export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')
export const BLOCKED_ADDRESSES: string[] = []