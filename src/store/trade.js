import fetch from './../utils/fetch.js'
import helper from '../utils/helper.js'
import { vueApp } from './../main.js'
const platform = helper.getPlatForm()
const isPC = helper.isPC()


export default {
  namespaced: true,
  state: {
    list:[],
    listGot:false,
    ttlQty:0,
    ttlPage:0,
  },
  getters: {},
  mutations: {
  },
  actions: {
    getCurrentHistory({state},params){
      state.listGot = false
      // state.loadingList = true
      if(params===undefined){
        params = {}
      }
      var promise = fetch({
        url: "trade/history",
        params:{
          mt4Uid:vueApp.$store.state.mt4AC.currentMt4Uid,
          page:params.page||1,
          limit:params.limit||10
        },
      })
      promise.then(res => {
        state.list = res
        console.log('%c getCurrentHistory','color:red',res)
      })
      .finally(() => {
        // state.loadingList = false 
        state.listGot = true
      })
      return promise
    },
  }
}
