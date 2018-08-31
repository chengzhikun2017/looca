import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import common from './common'
import account from './account'
import feedback from './feedback'
import cards from './cards'
import trade from './trade'
import mt4AC from './mt4AC'
import wallet from './wallet'
import mt4Balance from './mt4Balance'
import broker from './broker'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    common,
    feedback,
    cards,
    account,
    trade,
    mt4AC,
    mt4Balance,
    wallet,
    // broker,
  }
})

export default store