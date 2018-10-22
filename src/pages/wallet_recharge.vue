<template>
  <div class="wallet_recharge-page">
    <div class="wallet_recharge-title">
      <a-steps :current="current" :status="stepStatus">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div v-if="current === 0" class="wallet_recharge-content" flex="dir:top main:center cross:center">
      <div class="wallet_recharge-table">
        <a-form >
          <a-form-item :wrapperCol="{ span: 18 }" label='充值货币' :labelCol="{ span: 6 }" >
            <span>美金</span>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 18 }" label='充值金额' :labelCol="{ span: 6 }" :validateStatus="input.status.amount.validateStatus" :help="input.status.amount.help">
            <div class="wallet_recharge-input">
              <a-input :placeholder="`请输入金额，最少${MIN_AMOUNT}美金`" type="number" ref="inputPassword" v-model="input.values.amount" @blur="validate('amount')" @focus="clearValidation('amount')">
              </a-input>
            </div>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 18 }" label='支付金额' :labelCol="{ span: 6 }" :help="`实时汇率：1美金兑换${usdRate}人民币`">
            <div>根据实时汇率自动计算</div>
            <div>{{formData.amount*usdRate*100 | money}}</div>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 24}">
            <div class="bttn-box">
              <a-button type='primary' @click="goPayQR">
                下一步
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div v-if="'手动' == '自动' && current === 1" class="wallet_recharge-content">
      <a-row class="wallet_recharge-content-grid">
        <a-col :xs="24" :sm="12">
          <div class="wallet_recharge-content-pay" flex="dir:top main:center cross:center">
            <img class="wallet_recharge-content-pay-type" src="@/assets/logo_alipay.jpg" alt="">
            <!-- <div class="wallet_recharge-content-pay-way">请使用支付宝APP</div>
            <div class="wallet_recharge-content-pay-note">扫一扫付款（元）</div> -->
            <div class="wallet_recharge-content-pay-money">{{formData.amount*usdRate*100 | money}}</div>
            <div class="wallet_recharge-content-pay-qrcode" :class="{'overdate': isOverdate}">
              <img style="width: 100%" :src="payInfo.qrcodeUrl" alt="支付宝收款二维码">
              <div class="wallet_recharge-content-pay-qrcode-overdate">已过期</div>
            </div>
            <!-- <div class="wallet_recharge-content-upload phone">
              <ImageUpload :editing="true" v-model="billImageUrl" uploadText="上传账单详情截图" label="支付凭证" />
            </div> -->
          </div>
        </a-col>
        <a-col :xs="24" :sm="12">
          <div class="wallet_recharge-table" >
            <a-form>
              <a-form-item class="" :wrapperCol="{ span: 18}" label='账单截图' :labelCol="{ span: 6 }">
                <ImageUpload :editing="true" v-model="billImageUrl" uploadText="上传账单详情截图" label="支付凭证" />
              </a-form-item>
              <a-form-item :wrapperCol="{ span: 18}" label='备注' :labelCol="{ span: 6 }">
                <a-input type="textarea" v-model="remark" placeholder="如需备注请输入"></a-input>
              </a-form-item>

              <a-form-item :wrapperCol="{ span: 24}">
                <div class="wallet_recharge-btns bttn-box">
                  <a-button type='primary' @click="onConfirmed">
                    提交
                  </a-button>
                  <a-button  class="pc"  @click="prev">
                    上一步
                  </a-button>
                  <div class="prev-box phone">
                    <span class="prev" @click="prev">
                      上一步
                    </span>
                  </div>
                </div>
              </a-form-item>
            </a-form>
          </div>
        </a-col>
      </a-row>
      <div class="wallet_recharge-content-note">
        <h3 class="wallet_recharge-content-note-title">重要提示</h3>
        <!-- 这里的提示信息是需要动态替换的 -->
        <p class="wallet_recharge-content-note-item">1. 支付宝实名校验：{{payInfo.name}}，若错误请勿继续转账</p>
        <p class="wallet_recharge-content-note-item">2. 支付宝转账备注填写：{{phone}}（LoocoGlobal账号）</p>
        <p class="wallet_recharge-content-note-item">3. 转账完成后，前往我的>账单，截图该笔账单详情</p>
      </div>
    </div>
    <div v-if="'自动' == '自动' && current === 1" class="wallet_recharge-content">
      <a-row class="wallet_recharge-content-grid">
        <a-col :xs="24" :sm="12">
          <div class="wallet_recharge-content-pay" flex="dir:top main:center cross:center">
            <img class="wallet_recharge-content-pay-type" src="@/assets/logo_alipay.jpg" alt="">
            <!-- <div class="wallet_recharge-content-pay-way">请使用支付宝APP</div>
            <div class="wallet_recharge-content-pay-note">扫一扫付款（元）</div> -->
            <div class="wallet_recharge-content-pay-money">{{formData.amount*usdRate*100 | money}}</div>
            <div class="wallet_recharge-content-pay-qrcode" :class="{'overdate': isOverdate}">
              <img style="width: 100%" :src="payInfo.qrcodeUrl" alt="支付宝收款二维码">
              <div class="wallet_recharge-content-pay-qrcode-overdate">已过期</div>
            </div>
            <!-- <div class="wallet_recharge-content-upload phone">
              <ImageUpload :editing="true" v-model="billImageUrl" uploadText="上传账单详情截图" label="支付凭证" />
            </div> -->
          </div>
        </a-col>
        <a-col :xs="24" :sm="12">
          <div class="wallet_recharge-table" >
            <p class="wallet_recharge-table-msg">打开支付宝扫一扫</p>
            <p class="wallet_recharge-table-msg">过期后请勿转账，不自动到账</p>
            <div class="wallet_recharge-table-msg">
              <clock :seconds="10" @finish="test"></clock>
            </div>
            <a-form>
              <a-form-item :wrapperCol="{ span: 24}">
                <div class="wallet_recharge-btns bttn-box">
                  <a-button type='primary' @click="onConfirmed">
                    放弃支付
                  </a-button>
                  <a-button  class="pc"  @click="prev">
                    上一步
                  </a-button>
                  <div class="prev-box phone">
                    <span class="prev" @click="prev">
                      上一步
                    </span>
                  </div>
                  <p class="wallet_recharge-btns-note">
                    支付完成，页面未跳转
                  </p>
                </div>
              </a-form-item>
            </a-form>
          </div>
        </a-col>
      </a-row>
      <div class="wallet_recharge-content-note">
        <h3 class="wallet_recharge-content-note-title">重要提示</h3>
        <!-- 这里的提示信息是需要动态替换的 -->
        <p class="wallet_recharge-content-note-item">1. 支付宝转账页面请输入相同转账金额，否则不会到账</p>
        <p class="wallet_recharge-content-note-item">2. 二维码一次有效，请勿重复转账</p>
      </div>
    </div>
    <div v-if="current === 2" class="wallet_recharge-content">
      <div v-if="rechargeSucceed" class="wallet_recharge-content-success" flex="dir:top main:center cross:center">
        <a-icon class="wallet_recharge-icon-success" type="check-circle" />
        <div class="wallet_recharge-content-title">操作成功</div>
        <p>请联系客服完成充值，10分钟到账</p>
        <div class="wallet_recharge-table" >
          <div class="bttn-box wallet_recharge-table-btn">
            <a-button type='primary' @click="reset">
              继续充值
            </a-button>
            <a-button type='primary' @click="viewBill">
              查看账单
            </a-button>
          </div>
        </div>
      </div>
      <div v-if="rechargeFailed" class="wallet_recharge-content-error" flex="dir:top main:center cross:center">
        <a-icon class="wallet_recharge-icon-error" type="close-circle" />
        <div class="wallet_recharge-content-title">操作失败</div>
        <!-- 错误信息不确定，你自行修改 -->
        <p>{{errorResponse.message}}</p>
        <a-button type='primary' @click="reset">
          重新提交
        </a-button>
      </div>
      <div class="wallet_recharge-content-note">
        <h3 class="wallet_recharge-content-note-title">如有问题，请联系客服</h3>
        <p class="wallet_recharge-content-note-item">客服QQ: 83166672</p>
        <p class="wallet_recharge-content-note-item">客服电话：4000577009</p>
      </div>
    </div>
  </div>
</template>
<script>
import Clock from '@/components/container/Clock'
let newInput = new inputHelper.newInput(['amount','remark'])
import helper from '../utils/helper.js'
import inputMixin from './../components/mixin/input.js'
import inputHelper from './../utils/inputHelper.js'
import { ValidationSet } from './../utils/inputHelper.js'
import ImageUpload from './../components/container/imageUpload.vue'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
const defaultData = {
  selectedCardIndex: null,
  current: 0,
  remark:'',
  steps: [{
    title: '充值金额',
    content: 'First-content',
  }, {
    title: '扫码支付',
    content: 'Second-content',
  }, {
    title: '完成',
    content: 'Last-content',
  }],
  billImageUrl:'',
  confirmVisible: false,
  rechargeSucceed: false,
  successResponse: {},
  errorResponse: {},
  rechargeFailed: false,
}
export default {
  mixins: [inputMixin],
  data() {
    let newInput = new inputHelper.newInput(['amount'])
    return {
      input:newInput,
      ...defaultData,
      MIN_AMOUNT:100,
      // beforeUpload: () => {},
      // loading: null,
      // imageUrl: null
      isOverdate: false
    }
  },
  methods: {
    test () {
      this.isOverdate = true
    },
    next() {
      this.current++
    },
    prev() {
      this.current--
    },
    reset() {
      Object.assign(this, defaultData)
      this.formData.amount = ''
    },
    viewBill(){
      helper.goPage('/wallet_bills?initialType=pay')
      // goPage('/wallet_history')
    },
    onConfirmed() {
      let params = {
        dollar: this.formData.amount * 100,
        remark: this.remark,
        remarkUrl:this.billImageUrl,
        // bankCardId: this.listDC[this.selectedCardIndex].id,
        // dollar2RMBRate: this.usdRate,
        // dollarRateId: this.rateId,
      }
      console.log('%c recharge','color:red',params)
      this.recharge(params).then((res) => {
        this.rechargeSucceed = true
        this.successResponse = res
      }).catch((err) => {
        this.rechargeFailed = true
        this.errorResponse = err
        this.steps[2].title = "失败"
      }).finally(() => {
        this.next()
      })
    },
    goPage(path){
      helper.goPage(path)
    },
    goPayQR() {
      if (!this.checkValid()) {
        return
      }
      this.next()
    },
    checkValid() {
      let amount = this.formData.amount
      if (amount < this.MIN_AMOUNT) {
        this.input.status.amount =
          inputHelper.createStatus(2, '金额不能小于' + this.MIN_AMOUNT + '美金')
        return false
      }
      return true
    },
    ...mapActions('cards', ['getListDC']),
    ...mapActions('wallet', ['recharge','getCurrency','getPayAccount']),
  },
  created(){
    this.getCurrency()
    this.getPayAccount()
  },
  components:{
    ImageUpload,
    Clock
  },
  computed:{
    usdRate() {
      return this.currency.usd2rmb.rate
    },
    stepStatus(){
      //      wait process finish error
      if(this.rechargeFailed){
        return "error"
      }
      return "process"
    },
    ...mapState('wallet',['payInfo','currency']),
    ...mapState('account',['phone']),
  },
}
</script>

<style lang="scss" scoped>
  $prefix: "wallet_recharge";
  @import '@/styles/steps/index.scss';
  .#{$prefix}-page {
    .#{$prefix}-content {
      .#{$prefix}-table {
        width: 100%;
        max-width: 460px;
        // .#{$prefix}-money {
        //   font-size: 24px;
        //   font-weight: 500;
        //   color: #f5222d;
        // }
        &-msg {
          text-align: center;
          margin: 0;
          margin-top: 2px;
          font-size: 13px;
        }
        .#{$prefix}-table-btn {
          margin-top: 20px;
          button {
            margin-bottom: 10px;
          }
        }
      }
      .#{$prefix}-btns-note {
        text-decoration: underline;
        text-align: center;
      }
      .#{$prefix}-content-pay {
        &-type {
          width: 120px;
        }
        .#{$prefix}-content-pay-way {
          font-weight: 500;
          font-size: 14px;
          color: rgba(0,0,0,.85)
        }
        .#{$prefix}-content-pay-note {
          font-size: 16px;
          padding-top: 10px;
          color: rgba(0,0,0,.65)
        }
        .#{$prefix}-content-pay-money {
          margin-top: 18px;
          font-size: 18px;
          line-height: 1;
          color: #f5222d;
          font-weight: 600;
        }
        .#{$prefix}-content-pay-qrcode {
          margin-bottom: 10px;
          width: 100%;
          max-width: 160px;
          background: #fafafa;
          position: relative;
          &-overdate{
            display: none;
          }
          &.overdate .#{$prefix}-content-pay-qrcode-overdate{
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, .6);
            color: rgba(6, 6, 6, .8);
            font-size: 28px;
            font-weight: 800;
          }
          img {
            width: 100%;
          }
          .#{$prefix}-content-pay-qrcode-image {
            width: 100%;
          }
        }
      }
      .#{$prefix}-content-upload {
        margin: 10px;
      }
      .#{$prefix}-content-upload-dragger {
        margin-bottom: 10px;
        .ant-upload-drag-icon {
          margin-bottom: 15px !important;
          .anticon{
            font-size: 36px !important;
          }
        }
        .ant-upload-text {
          font-size: 14px !important;
          padding: 0 10px;
        }
        .ant-upload-hint {
          font-size: 12px !important;
        }
      }
    }
  }
  @media (min-width: 575px) {
    .#{$prefix}-page {
      .#{$prefix}-content-grid {
        padding-top: 25px;
      }
      .#{$prefix}-input {
        padding-right: 38px;
      }
      .#{$prefix}-table-btn {
        padding-left: 30px;
      }
      .#{$prefix}-table-msg {
        text-align: left !important;
        margin: 10px 0 !important;
      }
      .#{$prefix}-btns {
        text-align: left;
        padding-top: 10px;
        &.bttn-box:before {
          width: 0 !important;
        }
        &-note {
          margin-top: 5px;
          padding-left: 24px;
          text-align: left !important;
        }
      }
    }
  }
</style>
