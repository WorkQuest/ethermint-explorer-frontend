import loaderModes from '~/store/main/loaderModes';
import { error, output, searchResponseTypes } from '~/utils';
import { connectWallet, fetchContractData } from '~/utils/web3';
import { ERROR } from '~/utils/RPCTypes';

export default {
  setLoading({ commit }, value) {
    commit('setLoading', value);
    commit('setStatusText', '');
    commit('setLoaderMode', loaderModes.default);
    commit('setLoaderProgress', 0);
    commit('setIsLoaderBackgroundHider', false);
  },
  setIsLoaderBackgroundHider({ commit }, value) {
    commit('setIsLoaderBackgroundHider', value);
  },
  setStatusText({ commit }, value) {
    commit('setStatusText', value);
  },
  setLoaderMode({ commit }, value) {
    commit('setLoaderMode', value);
  },
  setLoaderProgress({ commit }, value) {
    commit('setLoaderProgress', value);
  },
  showToast(app, value) {
    this._vm.$bvToast.toast(value.text, {
      title: value.title || 'Error',
      variant: 'warning',
      solid: true,
      href: value.href || '',
      toaster: 'b-toaster-bottom-right',
      appendToast: true,
      toastClass: 'custom-toast-width',
      bodyClass: 'custom-toast-width',
    });
  },
  async searchHandler({ dispatch, commit }, { q, type }) {
    try {
      const response = await this.$axios.$get('search', { params: { q, type } });
      /** @property  { object } response  */
      /** @property  { boolean } response.ok  */
      /** @property  { object } response.result  */
      /** @property  { number } response.result.searchType  */
      /** @property  { object } [response.result.searchResult]  */
      /** @property  { string } [response.result.searchResult.number]  */
      if (response.ok && response.result.searchResult) {
        const { searchType } = response.result;
        const { locale } = this.$i18n;
        let result;
        switch (searchType) {
          case 0:
            result = response.result.searchResult.number;
            break;
          case 5:
            result = q;
            commit('tokens/setSearchResult', response.result.searchResult, { root: true });
            break;
          default: {
            result = q;
            break;
          }
        }
        return output(searchResponseTypes(searchType, result));
      }
      return response;
    } catch (e) {
      return error(e.code || 500, 'searchHandler', e);
    }
  },
  async requestFromBlockchain({ _ }, {
    type, abi, address, method, params,
  }) {
    return await fetchContractData(type, abi, address, method, params);
  },
  async connectWallet({ dispatch }) {
    const connect = await connectWallet();
    console.log('connect: ', connect);
    if (!connect.ok) {
      const { locale } = this.$i18n;
      const { web3 } = this.$i18n.messages[locale];
      switch (connect.code) {
        case (ERROR.METAMASK_IS_NOT_INSTALLED): {
          const text = web3.errors.installMetamask;
          await dispatch('showToast', {
            text,
            href: 'https://metamask.io/',
          });
          break;
        }
        case (ERROR.NETWORK_MISSING): {
          const text = web3.errors.networkMissing;
          await dispatch('showToast', { text });
          break;
        }
        case (ERROR.USER_REJECT): {
          const text = web3.errors.connectAccount;
          await dispatch('showToast', { text });
          break;
        }
        default: {
          break;
        }
      }
    }
  },
};
