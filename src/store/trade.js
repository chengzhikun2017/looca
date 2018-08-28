import fetch from './../utils/fetch.js'
import helper from '../utils/helper.js'
import { vueApp } from './../main.js'
const platform = helper.getPlatForm()
const isPC = helper.isPC()

export default {
  namespaced: true,
  state: {
    tradeList:{
      list:[],
      ttlPage:0,
      ttlQty:0,
    },
    openList:{
      list:[],
      ttlPage:0,
      ttlQty:0,
    },
    list:[],
    ttlQty:0,
    ttlPage:0,
  },
  getters: {},
  mutations: {
    reset(state){
      
    },
  },
  actions: {
    getTradeHistory({state},params){
      if(params===undefined){
        params = {}
      }
      var promise = fetch({
        url: "trade/history",
        params:{
          mt4Uid:vueApp.$store.state.mt4AC.currentMt4Uid,
          page:params.page||1,
          limit:params.limit||10,
          st:params.st,
          et:params.et,
        },
      },{
        showLoading:false,
      })
      promise.then(res => {
        state.tradeList.list = res.list
        state.tradeList.ttlQty = res.total
        state.tradeList.ttlPage = res.pages
        console.log('%c getTradeHistory','color:red',res)
      })
      .finally(() => {
      })
      return promise
    },
    getOpenHistory({state},params){
      if(params===undefined){
        params = {}
      }
      var promise = fetch({
        url: "trade/opening",
        params:{
          mt4Uid:vueApp.$store.state.mt4AC.currentMt4Uid,
          page:params.page||1,
          limit:params.limit||10,
          st:params.st,
          et:params.et,
        },
      },{
        showLoading:false,
      })
      promise.then(res => {
        state.openList.list = res.list
        state.openList.ttlQty = res.total
        state.openList.ttlPage = res.pages
        console.log('%c getOpenHistory','color:red',res)
      })
      .finally(() => {
      })
      return promise
    },
    getTradeCount({state},params){
      var promise = fetch({
        url:"trade/count",
        params:{
          mt4Uid: vueApp.$store.state.mt4AC.currentMt4Uid,
          page:params.page||1,
          limit:params.limit||10,
          st:params.st,
          et:params.et,
        },
      })
      return promise
    },
  }
}
  