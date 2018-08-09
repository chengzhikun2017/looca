export default {
  namespaced:true,
  state: {
    isLoading: false,
    loadingText: '请稍后',
  },
  getters: {},
  actions: {},
  mutations: {
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

