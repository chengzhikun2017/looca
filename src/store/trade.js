import fetch from './../utils/fetch.js'
import helper from '../utils/helper.js'
import { vueApp } from './../main.js'
const platform = helper.getPlatForm()
const isPC = helper.isPC()

export default {
  namespaced: true,
  state: {
    tradeList: {
      syncSuccess: false,
      list: [],
      ttlPage: 0,
      ttlQty: 0,
    },
    openList: {
      list: [],
      ttlPage: 0,
      ttlQty: 0,
      syncSuccess: false,
    },
    summary: {
      loss: null, //亏损笔数
      total: null, //总笔数
      win: null, //盈利笔数
      profit: null, //总实际盈利
    },
  },
  getters: {},
  mutations: {
    reset(state) {

    },
  },
  actions: {
    getTradeHistory({ state, dispatch }, params) {
      if (params === undefined) {
        params = {}
      }
      var promise = fetch({
        url: "trade/history",
        params: {
          mt4Uid: vueApp.$store.state.mt4AC.currentMt4Uid,
          page: params.page || 1,
          limit: params.limit || 10,
          st: params.st,
          et: params.et,
        },
      }, {
        showLoading: false,
      })
      promise.then(res => {
          dispatch('getTradeCount')
          console.log('%c res', 'color:red', res)
          state.tradeList.list = res.data.list
          state.tradeList.ttlQty = res.data.total
          state.tradeList.ttlPage = res.data.pages
          state.tradeList.syncSuccess = res.syncSuccess
          console.log('%c getTradeHistory', 'color:red', res)
        })
        .finally(() => {})
      return promise
    },
    getOpenHistory({ state }, params) {
      if (params === undefined) {
        params = {}
      }
      var promise = fetch({
        url: "trade/opening",
        params: {
          mt4Uid: vueApp.$store.state.mt4AC.currentMt4Uid,
          page: params.page || 1,
          limit: params.limit || 10,
          st: params.st,
          et: params.et,
        },
      }, {
        showLoading: false,
      })
      promise.then(res => {
          state.openList.list = res.data
          state.openList.ttlQty = res.data.length
          state.openList.syncSuccess = res.syncSuccess
          console.log('%c getOpenHistory', 'color:red', res)
        })
        .finally(() => {})
      return promise
    },
    getTradeCount({ state }, params) {
      if (state.summary.loss !== null) {
        return
      }
      var promise = fetch({
        url: "trade/count",
        params: {
          mt4Uid: vueApp.$store.state.mt4AC.currentMt4Uid,
          // page:params.page||1,
          // limit:params.limit||10,
          // st:params.st,
          // et:params.et,
        },
      })
      promise.then((res) => {
        state.summary = res
      })
      return promise
    },
  }
}
