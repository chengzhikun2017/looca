<template>
  <div class="brokerage_withdraw-page">
    <a-form>
      <a-form-item :wrapperCol="{ span: 18 }" label='钱包余额' :labelCol="{ span: 6 }">
        <span>${{money.balance | money}}（人民币金额 ¥{{money.balance*usdRate | money}})</span>
      </a-form-item>
      <!-- :help="input.status.amount.help" -->
      <a-form-item :wrapperCol="{ span: 18 }" label='提现金额' :labelCol="{ span: 6 }" :validateStatus="input.status.amount.validateStatus" :help="`剩余可提现佣金￥{money.brokerage/100}`">
        <div class="wallet_withdraw-input">
          <a-input :placeholder="`请输入金额`" type="number" ref="inputPassword" v-model="input.values.amount" @blur="validate('amount')" @focus="clearValidation('amount')">
          </a-input>
        </div>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='银行卡：' :labelCol="{ span: 6 }">
        <a-button @click="submit">提交</a-button>
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
</template>
<script>
import inputMixin from './../components/mixin/input.js'
import inputHelper from './../utils/inputHelper.js'
import { ValidationSet } from './../utils/inputHelper.js'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  mixins: [inputMixin],
  name: 'brokerage_withdraw',
  data() {
    let newInput = new inputHelper.newInput(['amount'])
    return {
      input: newInput,
    }
  },
  methods: {
    submit(){
      this.payByBrokerage(this.formData.amount)
    },
    ...mapActions('broker',[]),
    ...mapActions('wallet',['payByBrokerage']),
  },
  computed: {
    ...mapState('wallet',['money'])
  },
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
