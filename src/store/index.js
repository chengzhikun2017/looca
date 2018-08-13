import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import common from './common'
import account from './account'
import feedback from './feedback'
import cards from './cards'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    common,
    feedback,
    cards,
    account,
  }
})

export default store