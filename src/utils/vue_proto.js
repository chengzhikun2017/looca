import Vue from 'vue'
import moment from 'moment'

Vue.prototype.$showLoading = (loadingText) => {
  vueApp.$store.commit('feedback/showLoading', loadingText)
}
Vue.prototype.$hideLoading = () => {
  vueApp.$store.commit('feedback/hideLoading')
}
Vue.prototype.moment = moment