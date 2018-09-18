import fetch from './../utils/fetch.js'
import helper from '../utils/helper.js'
import { vueApp } from './../main.js'
const platform = helper.getPlatForm()
const isPC = helper.isPC()
const addCalculatedRmb = function(item){
  item.rmb = item.dollar * item.dollar2rmbRate
  return item
}
class emptyList{
  constructor(){
    this.payList=[]
    this.payListTtl=0
    this.payListTilPage=0
    this.withdrawList=[]
    this.withdrawListTtl=0
    this.withdrawListTilPage=0
  }
}
export default {
  namespaced: true,
  state:{
    money:{
      brokerage:0,
      balance:0,
      totalBrokerage:0,
    },
    payList:[],
    payListTtl:0,
    payListTilPage:0,
    withdrawList:[],
    withdrawListTtl:0,
    withdrawListTilPage:0,
    currency:{
      usd2rmb:{
        id:null,
        rate:null,
        updateTime:null,
        collectTime:null,
      },
    },
    payInfoLoaded:false,
    payInfo:{},
  },
  getters: {
    payInfoGot(state){
      return state.payInfo.id!==undefined
    },
    currencyGot(state){
      return {
        usd2rmb:state.currency.usd2rmb.id!==undefined
      }
    },
  },
  mutations: {
    resetList(state){
      Object.assign(state,new emptyList)
    },
  },
  actions: {
    getPayList({state},params){
      // page : 页码，默认1
      // limit : 每页个数，默认10
      // st : 起始时间，格式yyyy-mm-dd，
      // et : 结束时间（包含），格式yyyy-mm-dd，前端可以默认筛选最近一周数据
      let promise = fetch({
        url:'balance/pay/list',
        params:{
          page:params.page||1,
          limit:params.limit||10,
          st:params.st,
          et:params.et,
        },
      },{showLoading:false})
      promise.then((res) => {
        state.payList = res.list.map(addCalculatedRmb)
        state.payListTtl = res.total
        state.payListTilPage = res.pages
        console.log('%c wallet list','color:red',res) 
      })
      return promise
    },
    getWithdrawList({state},params){
      // page : 页码，默认1
      // limit : 每页个数，默认10
      // st : 起始时间，格式yyyy-mm-dd，
      // et : 结束时间（包含），格式yyyy-mm-dd
      let promise = fetch({
        url:'balance/withdraw/list',
        params:{
          page:params.page||1,
          limit:params.limit||10,
          st:params.st,
          et:params.et,
        },
      },{showLoading:false})
      promise.then((res) => {
        state.withdrawList = res.list.map(addCalculatedRmb)
        state.withdrawListTtl = res.total
        state.withdrawListTilPage = res.pages
        console.log('%c wallet list','color:red',res) 
      })
      return promise
    },
    withdrawBrokerage({},dollar){
      let promise = fetch({
        url:'balance/payByBrokerage',
        params:{
          dollar,
        },
      })
      promise.then((res) => {
         vueApp.$message.info("提现成功")
      })
      return promise
    },
    getPayAccount({state}){
      fetch({
        url:'balance/alipay/account',
      }).then(res=>{
        state.payInfo = res
      })
    },
    getCurrency({state}){
      fetch({
        url:'tool/dollar2RMBRate',
      },{
      })
      .then(res=>{
        console.log('%c currnecy res','color:red',res)
        state.currency.usd2rmb = res 
      })
    },
    getWallet({state}){
      let promise = fetch({
        url:'balance/wallet'
      },{
        showLoading:false,
      })
      promise.then((res) => {
        state.money = res
      })
      return promise
    },
    recharge({state,getters},params){
      if(!getters.payInfoGot){
        console.error("payInfo is not recieved")
        vueApp.$message.error('payInfo is not recieved')
        return
      }
      if(!getters.currencyGot.usd2rmb){
        console.error("has no currency of usd2rmb")
        vueApp.$message.error('has no currency of usd2rmb')
        return 
      }
      // alipayAccountId :支付宝收款账号ID /balance/alipay/account接口返回的id
      // dollar2RMBRate :兑换汇率，/tool/dollar2RMBRate接口返回的rate
      // dollarRateId :兑换汇率ID，/tool/dollar2RMBRate接口返回的id
      
      // dollar :充值金额美元，单位分
      // remark :备注
      // remarkUrl :账单图片url，通过/image/upload上传返回的url
      let promise = fetch({
        url:'balance/pay',
        params:{
          ...params,
          dollar2RMBRate:state.currency.usd2rmb.rate,
          dollarRateId:state.currency.usd2rmb.id,
          alipayAccountId:state.payInfo.id,
        },
      })
      return promise
    },
    payByBrokerage({state},dollar){
      let promise = fetch({
        url:'balance/payByBrokerage',
        params:{
          dollar,
        },
      })

      return promise
    },
    withdraw({state},params) {
      // dollar : 提现金额美元，单位分
      // bankCardId : 银行卡id
      // dollar2RMBRate : 兑换汇率，/tool/dollar2RMBRate接口返回的rate
      // dollarRateId : 兑换汇率ID，/tool/dollar2RMBRate接口返回的id
      let promise = fetch({
        url:'balance/withdraw',
        params:{
          ...params,
          dollar2RMBRate:state.currency.usd2rmb.rate,
          dollarRateId:state.currency.usd2rmb.id,
        },
      },{
        rejectErr:true
      })
      return promise
    },
  }
}
