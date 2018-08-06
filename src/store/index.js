import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import common from './common'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    common,
  }
})

export default store