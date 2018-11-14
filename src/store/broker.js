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
    setAgentLv(state,{uid,level}) {
      state.userList.list.find((item,index) => {
        if(item.uid == uid) {
          console.log('%c item','color:red',item)
          item.level = level
          // state.userList.list[index].level = level
          return true
        }
        //body 
      })
    },
  },
  actions: {
    getUserList({state,commit},params) {
      // partnerUid: uid为自己时获取我的客户，其它则为获取分公司的客户
      // childUid:一级客户uid，可选，默认为0，返回结果为一级客户
      let promise = fetch({
        url:'broker/user/proxy',
        params,
      },{showLoading:false,rejectErr:true})
      return promise
    },
    upgradeAgent({state,commit},params) {
      // targetUid:客户uid
      // level:代理等级，有三级、二级、一级，对应的level 为 4、3、2
      let promise = fetch({
        url:'broker/user/setBrokerLevel',
        params,
      },{showLoading:false,rejectErr:true})
      promise.then(() => {
        vueApp.$message.info('升级成功')
        commit('setAgentLv',{
          uid:params.targetUid,
          level:params.level,
        })
      })
      return promise
    },
    getPartner({ state },force) {
      if(!force && state.partnersGot){
        return new Promise((resolve,reject)=>{
          resolve(state.partners)
        })
      }
      let promise = fetch({
        url: "broker/user/partner",
      }, { showLoading: false })
      promise.then((res) => {
        state.partners = res
        state.partnersGot = true
        vueApp.$bus.emit('partners_got')
        // console.log('%c partners_got','color:red',res)
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
        console.log('%c get user ','color:red',res)
        console.log('%c params.depth','color:red',params.depth)
        res.list.forEach((item) => {
          item.depth = item.depth + ( params.depth || 0 )
        })
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
        res.list.forEach((item) => {
          item.depth = item.depth + ( params.depth || 0 )
        })
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
        res.list.forEach((item) => {
          item.depth = item.depth + ( params.depth || 0 )
        })
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
        res.list.forEach((item) => {
          item.depth = item.depth + ( params.depth || 0 )
        })
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
        res.list.forEach((item) => {
          item.depth = item.depth + ( params.depth || 0 )
        })
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
