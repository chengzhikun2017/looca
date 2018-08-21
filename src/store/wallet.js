import fetch from './../utils/fetch.js'
import helper from '../utils/helper.js'
import { vueApp } from './../main.js'
const platform = helper.getPlatForm()
const isPC = helper.isPC()

export default {
  namespaced: true,
  state:{
    brokerage:0,
    balance:0,
    totalBrokerage:0,
  },
  getters: {},
  mutations: {
  },
  actions: {
    getWallet({state}){
      let promise = fetch({
        url:'balance/wallet'
      })
      promise.then((res) => {
        console.log('%c res','color:red',res)
        state.brokerage = res.brokerage
        state.balance = res.balance
        state.totalBrokerage = res.totalBrokerage
      })
      return promise
    },
  }
}
