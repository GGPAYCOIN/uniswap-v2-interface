// @ts-nocheck
export function useAllTokens(): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()
  const userAddedTokens = useUserAddedTokens()
  const allTokens = useCombinedActiveList()

  return useMemo(() => {
    if (!chainId) return {}
    
    // Safely get tokens for the current chain, default to empty object if not found
    const tokensForChain = allTokens[chainId] || {}
    
    return Object.keys(tokensForChain).reduce<{ [address: string]: Token }>(
      (tokenMap, address) => {
        tokenMap[address] = tokensForChain[address]
        return tokenMap
      },
      { ...userAddedTokens }
    )
  }, [chainId, userAddedTokens, allTokens])
}

export function useUnsupportedTokens(): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()
  const unsupportedTokensMap = useUnsupportedTokenList()

  return useMemo(() => {
    if (!chainId) return {}

    // Safely get unsupported tokens for the current chain, default to empty object
    const unsupportedTokensForChain = unsupportedTokensMap[chainId] || {}

    return Object.keys(unsupportedTokensForChain).reduce<{ [address: string]: Token }>(
      (tokenMap, address) => {
        tokenMap[address] = unsupportedTokensForChain[address]
        return tokenMap
      },
      {}
    )
  }, [chainId, unsupportedTokensMap])
}