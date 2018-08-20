import fetch from './../utils/fetch.js'
import helper from '../utils/helper.js'
import { vueApp } from './../main.js'
const platform = helper.getPlatForm()
const isPC = helper.isPC()

export default {
  namespaced: true,
  state:{

  },
  getters: {},
  mutations: {
  },
  actions: {
    getWallet({}){
      let promise = fetch({
        url:'balance/wallet'
      })
      return promise
    },
  }
}
