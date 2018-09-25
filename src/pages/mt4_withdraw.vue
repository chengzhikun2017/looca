<template>
  <div class="mt4_withdraw-page">
    <div class="mt4_withdraw-title">
      <a-steps :current="current" :status="stepStatus">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div v-if="current === 0" class="mt4_withdraw-content" flex="dir:top main:center cross:center">
      <a-alert class="mt4_withdraw-alert" message="重要说明" type="info" showIcon>
        <div slot="description">
          <div>1. 务必取消跟单</div>
          <div>2. 平仓所有仓位</div>
          <div>3. 出金至钱包余额，如果提现，请到我的钱包里申请提现。</div>
        </div>
      </a-alert>
      <div class="mt4_withdraw-table">
        <a-form >
          <a-form-item :wrapperCol="{ span: 18 }" label='MT4账号：' :labelCol="{ span: 6 }">
            <div class="mt4_withdraw-input">
              <a-input placeholder="默认根据账户显示" disabled :value="currentMt4Uid">
              </a-input>
            </div>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 18 }" label='出金金额：' :labelCol="{ span: 6 }">
            <div class="mt4_withdraw-input">
              <a-radio-group name="radioGroup" v-model="amountType">
                <a-radio value="full">全部提取</a-radio>
                <a-radio value="part">自定义</a-radio>
              </a-radio-group>
            </div>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 18 }" v-if="amountType==='part'" label='出金金额：' :labelCol="{ span: 6 }">
            <div class="mt4_withdraw-input">
              <a-input :placeholder="`账户余额$${Number(currentMt4Info.balanceFee/100).toFixed(2)}`" v-model="amount" type="number">
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
      <div class="mt4_withdraw-content-note">
        <p class="mt4_withdraw-content-note-title">如有问题，请联系客服</p>
        <p class="mt4_withdraw-content-note-item">QQ：1231</p>
        <p class="mt4_withdraw-content-note-item">电话：34223</p>
      </div>
    </div>
    <div v-if="current === 1 " class="mt4_withdraw-content">
      <div v-if="rechargeSucceed" class="mt4_withdraw-content-success" flex="dir:top main:center cross:center">
        <a-icon class="mt4_withdraw-icon-success" type="check-circle" />
        <div class="mt4_withdraw-content-title">出金成功</div>
        <div class="mt4_withdraw-table">
          <a-form>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_withdraw-table-item" label='MT4账号' :labelCol="{ span: 6 }">
              <span> {{successResponse.mt4Uid}}</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_withdraw-table-item" label='出金金额' :labelCol="{ span: 6 }">
              <span>${{successResponse.dollar}}</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_withdraw-table-item" label='手续费' :labelCol="{ span: 6 }">
              <!-- <span v-if="!successResponse.serviceFee">
              </span> -->
              <span v-if="successResponse.serviceFee">
                {{successResponse.serviceFee|money}}
              </span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_withdraw-table-item" label='MT4订单号' :labelCol="{ span: 6 }">
              <span>{{successResponse.orderId}}</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_withdraw-table-item" label='业务编号' :labelCol="{ span: 6 }">
              <span>{{successResponse.tradeNo}}</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_withdraw-table-item" label='提交时间' :labelCol="{ span: 6 }">
              <span>{{successResponse.createTime | timeFull}}</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_withdraw-table-item" label='状态' :labelCol="{ span: 6 }">
              <!-- //出金状态：0正在处理、1完成、2失败 -->
              <span> {{successResponse.status | moneyBillStatus}}</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 24}">
              <div class="bttn-box mt4_withdraw-table-btn">
                <a-button type='primary' @click="viewRecord">
                  查看出入金流水
                </a-button>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div v-if="rechargeFailed" class="mt4_withdraw-content-error" flex="dir:top main:center cross:center">
        <a-icon class="mt4_withdraw-icon-error" type="close-circle" />
        <div class="mt4_withdraw-content-title">出金失败</div>
        <p>{{errorResponse.message}}</p>
        <a-button type='primary' @click.native="failedBack">
          返回
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import inputMixin from './../components/mixin/input.js'
import inputHelper from './../utils/inputHelper.js'
import helper from './../utils/helper.js'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
const defaultData = {
  current: 0,
  steps: [{
    title: '填写出金信息',
  }, {
    title: '完成',
  }],
  // confirmVisible: false,
  rechargeSucceed: false,
  successResponse: {},
  errorResponse: {},
  rechargeFailed: false,
  amountType: 'full',
  amount: '',
}
export default {
  // mixins: [inputMixin],
  data() {
    // let newInput = new inputHelper.newInput(['amount'])
    // inputHelper.ValidationSet.amount('amount')
    return {
      // input:newInput,
      ...defaultData,
    }
  },
  filters: {
    status(value){
      
    },
  },
  methods: {
    failedBack() {
      Object.assign(this, defaultData)
    },
    submit() {
      // if(this.validateAll()){
      //   return
      // }
      if(this.amountType==='part'&&!(parseInt(this.amount)>0)){
        this.$message.error('请填写正确金额')
        return
      }

      let params = {
        mt4Uid: this.currentMt4Uid,
        // amount: this.formData.amount,
        amount: this.amount,
        type: this.amountType,
      }
      this.withdraw(params).then((res) => {
        this.rechargeSucceed = true
        this.successResponse = res
      }).catch((err) => {
        console.log('%c err', 'color:red', err)
        this.rechargeFailed = true
        this.errorResponse = err
        this.steps[1].title = "失败"
      }).finally(() => {
        this.next()
      })
    },
    viewRecord() {
      helper.goPage('/mt4_money_bill')
    },
    next() {
      this.current++
        this.confirmVisible = false
    },
    prev() {
      this.current--
    },
    handleSubmit() {
      this.submit()
      // this.confirmVisible = true
    },
    handleChange() {},
    ...mapActions('mt4Balance', ['withdraw']),
  },
  computed: {
    stepStatus() {
      //      wait process finish error
      if (this.rechargeFailed) {
        return "error"
      }
      return "process"
    },
    ...mapState('mt4AC', ['currentMt4Uid','currentMt4Info']),
    ...mapState('wallet', ['money']),
  },
}

</script>
<style lang="scss" scoped>
$prefix: "mt4_withdraw";
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
      margin-top: 10px;
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
    }
  }
}

@media (min-width: 575px) {
  .#{$prefix}-page {
    .#{$prefix}-table {
      margin-top: 20px;
    }
    .#{$prefix}-table-item {
      padding: 10px;
    }mt
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

.mt4_withdraw-confirm-account,
.mt4_withdraw-confirm-money {
  font-size: 16px;
  font-weight: 500;
}

.mt4_withdraw-confirm-money {
  color: #f5222d;
}

</style>
