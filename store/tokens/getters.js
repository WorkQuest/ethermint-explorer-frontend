export default {
  getAllTokensCount: (state) => state.allTokens.count,
  getAllTokens: (state) => state.allTokens.tokens,
  getCurrentToken: (state) => state.currentToken?.token || {},
  getCurrentTokenTransfers: (state) => state.currentToken.transfersList.rows,
  getCurrentTokenTransfersCount: (state) => state.currentToken.transfersList.count,
  getCurrentTokenHolders: (state) => state.currentToken.holdersList.rows,
  getCurrentTokenHoldersCount: (state) => state.currentToken.holdersList.count,
  getAllTokenTransfers: (state) => state.allTokenTransfers.transfers,
  getAllTokenTransfersCount: (state) => state.allTokenTransfers.count,
  getWQTTokenSymbol: (state) => state.wqt.symbol,
  getWQTTokenDecimals: (state) => state.wqt.decimals,
  getTokenPrice: (state) => (tokenSymbol) => state.tokenPrices.find((token) => token.symbol === tokenSymbol)?.price,
};
