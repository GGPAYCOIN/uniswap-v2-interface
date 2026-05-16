import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from './NetworkConnector'

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL || 'https://rpc.gghyper.net'
export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '2121216')

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL }
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

// 🚀 1. Here is the injected connector with your Chain ID (2121216) added!
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 2121216]
})

// 🚀 2. MetaMask Auto-Network Adder
export async function setupGgPayNetwork(): Promise<boolean> {
  const provider = (window as any).ethereum
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x205c70' }],
      })
      return true
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x205c70',
                chainName: 'GGPAY Mainnet',
                nativeCurrency: {
                  name: 'GGPAY',
                  symbol: 'GGPAY',
                  decimals: 18,
                },
                rpcUrls: ['https://rpc.gghyper.net'],
                blockExplorerUrls: ['https://explorer.gghyper.net'],
              },
            ],
          })
          return true
        } catch (addError) {
          return false
        }
      }
      return false
    }
  }
  return false
}