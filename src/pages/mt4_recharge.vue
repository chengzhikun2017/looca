<template>
  <div class="mt4_recharge-page">
<!--     <a-modal
      title="确认信息"
      style="top: 20px;"
      :visible="confirmVisible"
      @ok="onConfirmed"
      @cancel="confirmVisible=false"
      okText="确认入金"
      cancelText="取消"
    >
      <p class="important-info">您将使用钱包余额入金</p>
      <p>MT4账号：<span class="mt4_recharge-confirm-account">{{currentMt4Uid}}</span></p>
      <p>钱包余额：<span class="mt4_recharge-confirm-account">${{money.balance | money}}</span></p>
      <p>入金金额：<span class="mt4_recharge-confirm-money">${{formData.amount}}</span></p>
    </a-modal> -->
    <div class="mt4_recharge-title">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div v-if="current === 0" class="mt4_recharge-content" flex="dir:top main:center cross:center">
      <div class="mt4_recharge-table">
        <a-form>
          <a-form-item :wrapperCol="{ span: 18 }" label='钱包余额' :labelCol="{ span: 6 }" >
            <span>${{money.balance | money}}</span>
          </a-form-item>
          <a-form-item  :wrapperCol="{ span: 18 }" label='MT4余额' :labelCol="{ span: 6 }" >
            <span v-if="currentMt4Info">${{currentMt4Info.balanceFee | money}}</span>
            <span v-if="!currentMt4Info">获取中...</span>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 18 }" label='MT4账号' :labelCol="{ span: 6 }">
            <div class="mt4_recharge-input">
              <a-input placeholder="默认根据账户显示" disabled :value="currentMt4Uid" ref="inputPassword">
              </a-input>
            </div>
          </a-form-item>
           <a-form-item :wrapperCol="{ span: 18 }" label='入金金额' :labelCol="{ span: 6 }" :validateStatus="input.status.amount.validateStatus" :help="input.status.amount.help">
            <div class="mt4_recharge-input">
              <a-input :placeholder="`请输入金额，最少${MIN_AMOUNT}美金`" type="number" ref="inputPassword" v-model="input.values.amount" @blur="validate('amount')" @focus="clearValidation('amount')">
              </a-input>
            </div>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 24}">
            <div class="bttn-box">
              <a-button type='primary' @click="handleSubmit">
                提交
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div v-if="current === 1 " class="mt4_recharge-content">
      <div v-if="rechargeSucceed" class="mt4_recharge-content-success" flex="dir:top main:center cross:center">
        <a-icon class="mt4_recharge-icon-success" type="check-circle" />
        <div class="mt4_recharge-content-title" >{{responseText}}</div>
        <!-- <div class="mt4_recharge-content-title" v-if="">处理中</div> -->
        <div class="mt4_recharge-table" >
          <a-form >
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_recharge-table-item" label='MT4账号' :labelCol="{ span: 6 }" >
              <span>{{successResponse.mt4Uid}}</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_recharge-table-item" label='入金金额' :labelCol="{ span: 6 }" >
              <span>${{successResponse.dollar | money}}</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_recharge-table-item" label='MT4订单号' :labelCol="{ span: 6 }" >
              <span>{{successResponse.orderId}}</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_recharge-table-item" label='业务编号' :labelCol="{ span: 6 }" >
              <span>{{successResponse.tradeNo}}</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_recharge-table-item" label='提交时间' :labelCol="{ span: 6 }" >
              <span>{{successResponse.createTime | timeFull}}</span>
            </a-form-item>
            
            <a-form-item :wrapperCol="{ span: 24}">
              <div class="bttn-box mt4_recharge-table-btn">
                <a-button type='primary' @click.native="goBill">
                  查看出入金流水
                </a-button>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div v-if="rechargeFailed" class="mt4_recharge-content-error" flex="dir:top main:center cross:center">
        <a-icon class="mt4_recharge-icon-error" type="close-circle" />
        <div class="mt4_recharge-content-title">入金失败</div>
        <!-- <p>{{failResponse}}</p> -->
        <a-button type='primary' @click="failedBack">
          返回
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import helper from '../utils/helper.js'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import inputMixin from './../components/mixin/input.js'
import inputHelper from './../utils/inputHelper.js'
import { ValidationSet } from './../utils/inputHelper.js'
class defaultData {
  constructor() {
    this.current= 0
    this.steps= [{
      title: '填写入金信息',
    }, {
      title: '完成',
    }]
    this.responseText="入金成功"
    this.rechargeSucceed= false
    this.successResponse= {}
    this.failResponse = {}
    this.rechargeFailed= false
  }
}
export default {
  created(){
      console.log('%c currentMt4Info','color:red',this.currentMt4Info)
    
  },
  data() {
    let newInput = new inputHelper.newInput(['amount'])
    return {
      input:newInput,
      MIN_AMOUNT:30,
      ...new defaultData,
    }
  },
  mixins: [inputMixin],
  filters:{
    status(value){
      let status
      switch(value){
        case 0:status = "正在处理"; break;
        case 1:status = "完成"; break;
        case 2:status = "失败"; break;
      }
    },
  },
  methods: {
    failedBack(){
      Object.assign(this,new defaultData)
    },
    onConfirmed(){
      this.submit()
    },
    submit(){
      this.deposit({
        mt4Uid:this.currentMt4Uid,
        amount:this.formData.amount*100,
      }).then((res) => {
        // console.log('%c res','color:red',res)
        //出金状态: 0正在处理、1完成、2失败
        let status = res.status
        if(status === 0 || status === 3) {
          //处理中
          this.responseText = '入金处理中'
          this.rechargeSucceed = true
          this.successResponse = res
        }else if(res.status === 1) {
          // success  
          this.rechargeSucceed = true
          this.successResponse = res
        }else {
          //failed
          this.rechargeFailed = true
          this.failResponse = res
          this.steps[1].title="失败"
        }
        this.next() 
      }).catch((err) => {
        this.next()
        this.rechargeFailed = true
        this.steps[1].title="失败"
      })
    },
    next() {
      this.current++
      this.confirmVisible = false
    },
    prev() {
      this.current--
    },
    goBill(){
      helper.goPage('/mt4_money_bill?initialType=recharge')
    },
    handleSubmit() {
      if(!this.checkValid()){
        return
      }
      if(this.formData.amount*100>this.money.balance){
        this.$modal.confirm({
          title:"余额不足",
          content:"您将使用钱包余额入金",
          okText:"前往充值",
          onOk:()=>{
            helper.goPage('/wallet_recharge')
          }
        })
        return
      }
      this.submit()
    },
    checkValid(){
      let amount = this.formData.amount
      if(amount<this.MIN_AMOUNT){
        this.input.status.amount = 
          inputHelper.createStatus(2,'金额不能小于'+this.MIN_AMOUNT+'美金')
        return false
      }
      return true
    },
    ...mapActions('mt4Balance',['deposit']),
  },
  computed:{
    ...mapState('mt4AC',['currentMt4Uid','currentMt4Info']),
    ...mapState('wallet',['money']),
  },
}
</script>

<style lang="scss" scoped>
  $prefix: "mt4_recharge";
  @import '@/styles/steps/index.scss';
  .#{$prefix}-page {
    .#{$prefix}-content {
      .#{$prefix}-alert {
        width: 100%;
        max-width: 460px;
      }
      .#{$prefix}-table {
        margin-bottom: 20px;
        width: 100%;
        max-width: 460px;
        .#{$prefix}-money {
          font-size: 24px;
          font-weight: 500;
          color: #f5222d;
        }
        .#{$prefix}-table-item {
          background: #fafafa;
          /*padding: 10px;*/
          margin-bottom: 0 !important;
        }
        .#{$prefix}-table-btn {
          margin-top: 20px;
        }
      }
    }
  }

  @media (min-width: 575px) {
    .#{$prefix}-page {
      .#{$prefix}-table-item {
        padding: 10px;
      }
      .#{$prefix}-input {
        padding-right: 38px;
      }
      .#{$prefix}-table-btn {
        padding-left: 30px;
        margin-top: 20px;
      }
      .#{$prefix}-card {
        padding-right: 38px;
      }
      .#{$prefix}-money-note {
        display: inline-block;
      }
    }
  }
  .#{$prefix}-confirm-account, .#{$prefix}-confirm-money {
    font-size: 16px;
    font-weight: 500;
  }
  .#{$prefix}-confirm-money {
    color: #f5222d;
  }
</style>
