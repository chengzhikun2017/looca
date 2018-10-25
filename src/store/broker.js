import fetch from './../utils/fetch.js'
import helper from '../utils/helper.js'
import { vueApp } from './../main.js'
const platform = helper.getPlatForm()
const isPC = helper.isPC()
class List {
  constructor() {
    this.list = []
    this.count = {}
    this.total = 0
    this.pages = 0
  }
}

export default {
  namespaced: true,
  state: {
    partners: [],
    partnersGot:false,
    userList: new List,
    mt4List: new List,
    profitList: new List,
    openOrderList: new List,
    historyOrderList: new List,
  },
  getters: {},
  mutations: {

  },
  actions: {
    upgradeAgent({state},params) {
      // targetUid:客户uid
      // level:代理等级，有三级、二级、一级，对应的level 为 4、3、2
      let promise = fetch({
        url:'broker/user/setBrokerLevel',
        params,
      })
      return promise
    },
    getPartner({ state },force) {
      if(!force && state.partnersGot){
        return
      }
      let promise = fetch({
        url: "broker/user/partner",
      }, { showLoading: false })
      promise.then((res) => {
        state.partners = res
        state.partnersGot = true
        vueApp.$bus.emit('partners_got')
        // console.log('%c partners_got','color:red',)
      })
      return promise
    },
    getUsers({ state }, params) {
      let promise = fetch({
        url: "broker/user/finds",
        params: {
          page: 1,
          limit: 10,
          ...params,
        },
      }, { showLoading: false })
      promise.then((res) => {
        state.userList = Object.assign(state.userList, res)
      })
      return promise
    },
    getMt4AC({ state }, params) {
      let promise = fetch({
        url: "broker/mt4Account/finds",
        params: {
          page: 1,
          limit: 10,
          ...params,
        },
      }, { showLoading: false })
      promise.then((res) => {
        state.mt4List = Object.assign(state.mt4List, res)
      })
      return promise
    },
    getOpenOrder({ state }, params) {
      let promise = fetch({
        url: "broker/mt4Order/opening",
        params: {
          page: 1,
          limit: 10,
          ...params,
        },
      }, { showLoading: false })
      promise.then((res) => {
        state.openOrderList = Object.assign(state.openOrderList, res)
      })
      return promise
    },
    getHistoryOrder({ state }, params) {
      let promise = fetch({
        url: "broker/mt4Order/history",
        params: {
          page: 1,
          limit: 10,
          ...params,
        },
      }, { showLoading: false })
      promise.then((res) => {
        state.historyOrderList = Object.assign(state.historyOrderList, res)
      })
      return promise
    },
    getProfit({ state }, params) {
      let promise = fetch({
        url: "broker/comminssion/finds",
        params: {
          page: 1,
          limit: 10,
          ...params,
        },
      }, { showLoading: false })
      promise.then((res) => {
        state.profitList = Object.assign(state.profitList, res)
      })
      return promise
    },
    getFollowDetail({state},tradeNo){
      // tradeNo: 业务编号
      // page: 页码， 默认1开始
      // limit: 每页个数，默认10
      let promise = fetch({
        url: "broker/comminssion/followDetail",
        params: {
          page: 1,
          limit: 99999,
          tradeNo,
          // ...params,
        },
      }, { showLoading: false })
      return promise
    }
  }
}
