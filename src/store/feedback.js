export default {
  namespaced: true,
  state: {
    isLoading: 0,
    loadingText: '请稍后',
    pageLoading: 0,
    pageLoadingText: "请稍后",
  },
  getters: {},
  actions: {},
  mutations: {
    hidePageLoading(s) {
      if (s.pageLoading > 0) {
        s.pageLoading--
      }
    },
    showPageLoading(s, loadingText) {
      s.pageLoading++
        if (!loadingText) {
          loadingText = '请稍后'
        }
        s.pageLoadingText = loadingText
    },
    hideLoading(s) {
      if (s.isLoading > 0) {
        s.isLoading--
      }
    },
    showLoading(s, loadingText) {
      s.isLoading++
        if (!loadingText) {
          loadingText = '请稍后'
        }
        s.loadingText = loadingText
    },
  }
}
