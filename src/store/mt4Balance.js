import fetch from './../utils/fetch.js'
import helper from '../utils/helper.js'
import { vueApp } from './../main.js'
const platform = helper.getPlatForm()
const isPC = helper.isPC()

class defaultState{
  constructor() {
    this.list = []
    this.ttlQty = 0
    this.ttlPage = 0
  }
}
export default {
  namespaced: true,
  state: new defaultState,
  getters: {},
  mutations: {
    resetList(state){
      Object.assign(state,new defaultState)
    },
  },  
  actions: {
    getList({state}, params) {
      // mt4Uid : MT4账号
      // type : 类型 :  withdraw出金、deposit入金、withdraw_follow_settlement跟单结算（出金的一种）
      // page : 页码，默认1
      // limit : 每页个数，默认10
      // st : 起始时间，格式yyyy-mm-dd，
      // et : 结束时间（包含），格式yyyy-mm-dd，前端可以默认筛选最近一周数据
        console.log('%c params in store','color:red',params)
      let promise = fetch({
        url: 'mt4Balance/list',
        params,
      },{showLoading:false})
      promise.then(res => {
        state.list = res.list
        state.ttlQty = res.total
        state.ttlPage = res.pages
      })
      return promise
    },
    withdraw({}, mt4Uid) {
      //出金（提示客户先取消跟单，平仓所有仓位后方可出金，如有问题请联系客服）
      let promise = fetch({
        url: 'mt4Balance/withdraw',
        params: {
          mt4Uid: mt4Uid,
        },
      }, {
        rejectErr: true,
      })
      return promise
    },
    deposit({}, { amount, mt4Uid }) {
      //amount：金额，单位分，美元 ，入金金额不得低于钱包余额，后期会增加单次最低入金金额
      let promise = fetch({
        url: 'mt4Balance/deposit',
        params: {
          mt4Uid,
          amount,
        },
      }, {
        rejectErr: true,
      })
      return promise
    },
  }
}
