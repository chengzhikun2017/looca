import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import common from './common'
import account from './account'
import feedback from './feedback'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    common,
    feedback,
    account,
  }
})

export default store