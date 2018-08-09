export default {
  namespaced:true,
  state: {
    isLoading: 0,
    loadingText: '请稍后',
  },
  getters: {},
  actions: {},
  mutations: {
    hideLoading(s) {
      if (s.isLoading > 0) {
        console.log('s',s.isLoading)
        s.isLoading--
      }
    },
    showLoading(s, loadingText) {
      console.log('s',s.isLoading)
      s.isLoading++
      if (!loadingText) {
        loadingText = '请稍后'
      }
      s.loadingText = loadingText
    },
  }
}

