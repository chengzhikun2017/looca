import Vue from 'vue'
import moment from 'moment'
window.moment = moment
Vue.prototype.$showLoading = (loadingText) => {
  vueApp.$store.commit('feedback/showLoading', loadingText)
}
Vue.prototype.$hideLoading = () => {
  vueApp.$store.commit('feedback/hideLoading')
}
Vue.prototype.$showPageLoading = (loadingText) => {
  vueApp.$store.commit('feedback/showPageLoading', loadingText)
}
Vue.prototype.$hidePageLoading = () => {
  vueApp.$store.commit('feedback/hidePageLoading')
}
Vue.prototype.moment = moment