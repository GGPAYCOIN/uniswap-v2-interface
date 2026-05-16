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