import Vue from 'vue'

Vue.prototype.$showLoading = (loadingText) => {
  vueApp.$store.commit('feedback/showLoading', loadingText)
}
Vue.prototype.$hideLoading = () => {
  vueApp.$store.commit('feedback/hideLoading')
}