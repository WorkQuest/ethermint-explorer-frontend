import loaderModes from '~/store/main/loaderModes';

export default () => ({
  isLoading: true,
  loaderStatusText: 'Loading',
  loaderMode: loaderModes.default,
  isLoaderBackgroundHider: true,
  loaderProgress: 0,
  tokensData: {
    wqt: {},
    nativeToken: {
      symbol: 'WUSD',
      decimals: 18,
    },
  },
});
