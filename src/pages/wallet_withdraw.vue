<template>
  <div class="wallet_withdraw-page">
    <div class="wallet_withdraw-title">
      <a-steps :current="current" :status="stepStatus" >
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div v-if="current === 0" class="wallet_withdraw-content" flex="dir:top main:center cross:center">
      <a-alert class="wallet_withdraw-alert" :message="`人民币汇率:${usdRate}`" type="info" showIcon closable />
      <div class="wallet_withdraw-table">
        <a-form>
          <a-form-item :wrapperCol="{ span: 18 }" label='钱包余额' :labelCol="{ span: 6 }" >
            <span>${{money.balance | money}}（人民币金额 ¥{{money.balance*usdRate | money}})</span>
          </a-form-item>

          <a-form-item :wrapperCol="{ span: 18 }" label='提现金额' :labelCol="{ span: 6 }" :validateStatus="input.status.amount.validateStatus" :help="input.status.amount.help">
            <div class="wallet_withdraw-input">
              <a-input :placeholder="`请输入金额，最少${MIN_AMOUNT}美金`" type="number" ref="inputPassword" v-model="input.values.amount" @blur="validate('amount')" @focus="clearValidation('amount')">
              </a-input>
            </div>
          </a-form-item>

          <a-form-item :wrapperCol="{ span: 18 }" label='银行卡：' :labelCol="{ span: 6 }" >
            <div class="wallet_withdraw-input">
              <a-select  v-model="selectedCardIndex" :defaultValue='0'>
                <a-select-option v-for="(card,index) in listDC" :key="index">{{card.bankName}}{{" "}}{{card.cardNum | bankCard}}</a-select-option>
              </a-select>
            </div>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 24}">
            <div class="bttn-box">
              <a-button type='primary' @click.native="withdrawNext">
                下一步
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div v-if="current === 1" class="wallet_withdraw-content" flex="dir:top main:center cross:center">
      <a-alert class="wallet_withdraw-alert" :message="`人民币汇率:${usdRate}`" type="info" showIcon closable />
      <div class="wallet_withdraw-table">
        <a-form >
          <a-form-item :wrapperCol="{ span: 18 }" label='提现金额' :labelCol="{ span: 6 }" >
            ¥<span>{{formData.amount*100|money}}</span> （人民币金额 ¥{{formData.amount*100*usdRate | money}}）
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 18 }" label='银行卡：' :labelCol="{ span: 6 }" >
            <div class="wallet_withdraw-card">
              <Card :info="listDC[selectedCardIndex]" :type="2"></Card>
            </div>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 24}">
            <div class="bttn-box">
              
              <a-button type='primary' @click.native="prev">
                上一步
              </a-button>
              <a-button type='primary'@click.native="onConfirmed">
                提交
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div v-if="current === 2" class="wallet_withdraw-content">
      <div v-if="false" class="wallet_withdraw-content-success" flex="dir:top main:center cross:center">
        <a-icon class="wallet_withdraw-icon-success" type="check-circle" />
        <div class="wallet_withdraw-content-title">操作成功</div>
        <p>预计1-2个工作日到账</p>
        <div class="wallet_withdraw-table" >
          <a-form>
            <a-form-item :wrapperCol="{ span: 18 }" class="wallet_withdraw-table-item" label='提现账户：' :labelCol="{ span: 6 }" >
              <span>中国银行(8769)</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="wallet_withdraw-table-item" label='提现金额' :labelCol="{ span: 6 }" >
              <span class="wallet_withdraw-money">$3333</span><div class="wallet_withdraw-money-note">（人民币：¥8888，汇率：6.1817）</div>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 24}">
              <div class="bttn-box wallet_withdraw-table-btn">
                <a-button type='primary' htmlType='submit'>
                  再提一笔
                </a-button>
                <a-button type='primary' htmlType='submit'>
                  查看账单
                </a-button>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div class="wallet_withdraw-content-error" flex="dir:top main:center cross:center">
        <a-icon class="wallet_withdraw-icon-error" type="close-circle" />
        <div class="wallet_withdraw-content-title">操作失败</div>
        <p>{{errorResponse.message}}</p>
        <a-button @click.native="failedBack">
          重新提交
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
  import inputMixin from './../components/mixin/input.js'
  import inputHelper from './../utils/inputHelper.js'
  import { ValidationSet } from './../utils/inputHelper.js'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
const defaultData = {
  selectedCardIndex:null,
  current: 0,
  steps: [{
    title: '填写提现信息',
    content: 'First-content',
  }, {
    title: '确认提现信息',
    content: 'Second-content',
  }, {
    title: '完成',
    content: 'Last-content',
  }],
  confirmVisible: false,
  rechargeSucceed:false,
  successResponse:{},
  errorResponse:{},
  rechargeFailed:false,
}
const Card = () =>
import ('./../components/container/cardDC.vue')
export default {
  mixins: [inputMixin],
  data() {
    let newInput = new inputHelper.newInput(['amount'])
    return {
      input:newInput,
      MIN_AMOUNT:1000,
      ...defaultData,
    }
  },
  created(){
    this.getListDC()
  },
  methods: {
    next() {
      this.current++
    },
    prev() {
      this.current--
    },
    failedBack(){
      Object.assign(this,defaultData)
      this.formData.amount = ''
    },
    onConfirmed(){
      let params = {
        dollar:this.formData.amount*100,
        bankCardId:this.listDC[this.selectedCardIndex].id,
        dollar2RMBRate:this.usdRate,
        dollarRateId:this.rateId,
      }
      this.withdraw(params).then((res) => {
        this.rechargeSucceed = true
        this.successResponse = res
      }).catch((err) => {
        this.rechargeFailed = true
        this.errorResponse = err
        this.steps[2].title="失败"
      }).finally(() => {
        this.next() 
      })
    },
    withdrawNext() {
      if(!this.checkValid()){
        return
      }
      this.next()
      // this.confirmVisible = true
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
    ...mapActions('cards',['getListDC']),
    ...mapActions('wallet',['withdraw']),
  },
  computed:{
    usdRate(){
      return this.currency.usd2rmb.rate
    },
    rateId(){
      return this.currency.usd2rmb.id
    },
    stepStatus(){
      //      wait process finish error
      if(this.rechargeFailed){
        return "error"
      }
      return "process"
    },
    ...mapState('cards',['listDC']),
    ...mapState('wallet',['currency','money']),
  },
  components: {
    Card
  }
}
</script>
<style lang="scss" scoped>
  $prefix: "wallet_withdraw";
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
          padding: 10px;
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
</style>
