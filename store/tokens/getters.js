export default {
  getAllTokensCount: (state) => state.allTokens.count,
  getAllTokens: (state) => state.allTokens.tokens,
  getCurrentToken: (state) => state.currentToken?.token || {},
  getCurrentTokenTransfers: (state) => state.currentToken.transfersList.rows,
  getCurrentTokenTransfersCount: (state) => state.currentToken.transfersList.count,
  getCurrentTokenHolders: (state) => state.currentToken.holdersList.rows,
  getCurrentTokenHoldersCount: (state) => state.currentToken.holdersList.count,
  getAccountTokensCount: (state) => state.accountTokens.count,
  getAccountTokens: (state) => state.accountTokens.tokens,
  getWUSDTokenData: (state) => state.wusd,
  getWUSDTokenSymbol: (state) => state.wusd.symbol,
  getWUSDTokenDecimals: (state) => state.wusd.decimals,
};
