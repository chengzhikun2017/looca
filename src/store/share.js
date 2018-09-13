import fetch from './../utils/fetch.js'
import helper from '../utils/helper.js'
import { vueApp } from './../main.js'
const platform = helper.getPlatForm()
const isPC = helper.isPC()
// 代理级别
// 0：无
// 1：股东
// 2：经理
// 3：组长
// 4：小喽喽


export default {
  namespaced: true,
  state: {
    shareInfo: {

    },
    incomeList: [],
    guestList: [],
    incomeCount: {},
    guestCount: {},
  },
  getters: {
    incomeSummary(state) {
      let count = state.incomeCount
      return {
        follow: count.follow,
        point: count.point,
        total: count.follow + count.point,
      }
    },
    guestSummary(state) {
      let count = state.guestCount
      return Object.assign({
        total: count.lv1 + count.lv2 + count.lv3
      }, count)
    },
  },
  mutations: {

  },

  actions: {
    getGuestCount({ state }) {
      let promise = fetch({
          url: "share/guestCount",
        })
        .then((res) => {
          state.guestCount = res
        })
      return promise
    },
    getShareInfo({ state }) {
      let promise = fetch({
          url: 'share/mine',
        })
        .then(res => {
          console.log('%c shareInfo', 'color:red', res)
          state.shareInfo = res
        })
      return promise
    },
    getIncomeCount({ state }) {
      let promise = fetch({
          url: 'share/incomeCount',
        })
        .then((res) => {
          state.incomeCount = res
        })
    },
    getGuestList({state},params) {
      params = Object.assign({
        page: 1,
        limit: 9999,
        // depth: 级别， 1、2、3 ，不填写或者空字符为全部
      }, params)
      let promise = fetch({
          url: 'share/guest',
          params,
        })
        .then((res) => {
          state.guestList = res
        })
      return promise
    },
    getIncomeList({ state }, params) {
      params = Object.assign({
        page: 1,
        limit: 10,
        // st：起始时间，格式yyyy-mm-dd，
        // et：结束时间（包含），格式yyyy-mm-dd，前端可以默认筛选最近一周数据
        // type:null,//point ：点差， follow：跟单，不填写空字符串为全部
        // depth: 级别， 1、2、3 ，不填写或者空字符为全部
      }, params)
      let promise = fetch({
          url: 'share/income',
          params,
        })
        .then((res) => {
          state.incomeList = res
        })
      return promise
    },
  }
}
