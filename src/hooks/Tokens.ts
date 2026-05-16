// @ts-nocheck
export function useAllTokens(): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()
  const userAddedTokens = useUserAddedTokens()
  const allTokens = useCombinedActiveList()

  return useMemo(() => {
    if (!chainId) return {}
    
    // Clean and safe way to check tokens without messing up brackets
    const tokensMap = allTokens[chainId] ? allTokens[chainId] : {}
    
    return Object.keys(tokensMap).reduce<{ [address: string]: Token }>(
      (tokenMap, address) => {
        tokenMap[address] = tokensMap[address]
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

    // Clean and safe way to check unsupported tokens
    const unsupportedMap = unsupportedTokensMap[chainId] ? unsupportedTokensMap[chainId] : {}

    return Object.keys(unsupportedMap).reduce<{ [address: string]: Token }>(
      (tokenMap, address) => {
        tokenMap[address] = unsupportedMap[address]
        return tokenMap
      },
      {}
    )
  }, [chainId, unsupportedTokensMap])
}