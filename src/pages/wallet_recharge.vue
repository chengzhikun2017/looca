<template>
  <div class="wallet_recharge-page">
    <div class="wallet_recharge-title">
      <a-steps :current="current">
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
          <a-form-item :wrapperCol="{ span: 18 }" label='支付金额' :labelCol="{ span: 6 }" :help="`实时汇率：1美金兑换${usdRate}民币`">
            <div>根据实时汇率自动计算</div>
            <div>{{formData.amount*usdRate*100 | money}}</div>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 24}">
            <div class="bttn-box">

              <a-button type='primary' @click="rechargeNext">
                下一步
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div v-if="current === 1" class="wallet_recharge-content" flex="dir:top main:center cross:center">
      <div class="wallet_recharge-content-pay" flex="dir:top main:center cross:center">
        <div class="wallet_recharge-content-pay-way">请使用支付宝APP</div>
        <div class="wallet_recharge-content-pay-note">扫一扫付款（元）</div>
        <div class="wallet_recharge-content-pay-money">{{formData.amount*usdRate*100 | money}}</div>
        <div class="wallet_recharge-content-pay-qrcode">
          <img :src="payInfo.qrcodeUrl" alt="支付宝收款二维码">
        </div>
      </div>
      <ImageUpload :editing="true" v-model="billImageUrl" uploadText="上传账单详情截图" label="支付凭证" />
      <a-input v-model="remark" placeholder="备注"></a-input>
      <div class="wallet_recharge-content-upload-dragger pc">
        <!-- <a-upload-dragger name="file" :multiple="true" action="/api/upload/image" @change="handleChange">
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">将文件拖到此处, 或点击上传</p>
          <p class="ant-upload-hint">上传账单详情截图</p>
        </a-upload-dragger> -->
      </div>
      <!-- <div class="wallet_recharge-content-upload phone">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action="//jsonplaceholder.typicode.com/posts/"
          :beforeUpload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="" />
          <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </div> -->
      <a-button @click="prev">
        上一步
      </a-button>
      <a-button type="primary" @click="onConfirmed">提交</a-button>
      <div class="wallet_recharge-content-note">
        <h3 class="wallet_recharge-content-note-title">重要提示</h3>
        <!-- 这里的提示信息是需要动态替换的 -->
        <p class="wallet_recharge-content-note-item">1. 支付宝实名校验：陶雨xxx，若错误请勿继续转账</p>
        <p class="wallet_recharge-content-note-item">2. 转账备注填写：17702103430（LoocoGlobal账号）</p>
        <p class="wallet_recharge-content-note-item">3. 转账完成后，前往我的>账单，截图该笔账单详情</p>
      </div>
    </div>
    <div v-if="current === 2" class="wallet_recharge-content">
      <div class="wallet_recharge-content-success" flex="dir:top main:center cross:center">
        <a-icon class="wallet_recharge-icon-success" type="check-circle" />
        <div class="wallet_recharge-content-title">操作成功</div>
        <p>请等待系统处理</p>
        <div class="wallet_recharge-table" >
          <div class="bttn-box wallet_recharge-table-btn">
            <a-button type='primary' @click="reset">
              继续充值
            </a-button>
            <a-button type='primary'>
              查看账单
            </a-button>
          </div>
        </div>
        <div class="wallet_recharge-content-note">
          <h3 class="wallet_recharge-content-note-title">如有问题，请联系客服</h3>
          <p class="wallet_recharge-content-note-item">电话：111</p>
          <p class="wallet_recharge-content-note-item">QQ：11111</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    let newInput = new inputHelper.newInput(['amount','remark'])
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
      MIN_AMOUNT:1000,
      // beforeUpload: () => {},
      // loading: null,
      // imageUrl: null
    }
  },
  methods: {

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
    rechargeNext() {
      if (!this.checkValid()) {
        return
      }
      this.next()
      // this.confirmVisible = true
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
    ...mapActions('wallet', ['recharge']),
  },
  components:{
    ImageUpload,
  },
  computed:{
    usdRate() {
      return this.currency.usd2rmb.rate
    },
    ...mapState('wallet',['payInfo','currency']),
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
        .#{$prefix}-table-btn {
          margin-top: 20px;
          button {
            margin-bottom: 10px;
          }
        }
      }
      .#{$prefix}-content-pay {
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
          font-size: 18px;
          line-height: 36px;
          color: #f5222d;
          font-weight: 600;
        }
        .#{$prefix}-content-pay-qrcode {
          margin-bottom: 10px;
          width: 100%;
          max-width: 160px;
          height: 160px;
          background: #fafafa;
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
      .#{$prefix}-input {
        padding-right: 38px;
      }
      .#{$prefix}-table-btn {
        padding-left: 30px;
      }
    }
  }
</style>
