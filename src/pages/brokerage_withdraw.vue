<template>
  <div class="brokerage_withdraw-page">
    <a-form>
      <a-form-item :wrapperCol="{ span: 18 }" label='钱包余额' :labelCol="{ span: 6 }">
        <span>${{money.balance | money}}（人民币金额 ¥{{money.balance*usdRate | money}})</span>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='提现金额' :labelCol="{ span: 6 }" :validateStatus="input.status.amount.validateStatus" :help="input.status.amount.help">
        <div class="wallet_withdraw-input">
          <a-input :placeholder="`请输入金额`" type="number" ref="inputPassword" v-model="input.values.amount" @blur="validate('amount')" @focus="clearValidation('amount')">
          </a-input>
        </div>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24}">
        <div class="bttn-box">
          <a-button type='primary' @click.native="handleSubmit" htmlType='submit'>
            提交
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
    ValidationSet.amount(newInput,'amount')
    return {
      input: newInput,
    }
  },
  created(){
    this.getCurrency()
  },
  methods: {
    handleSubmit(){
      if(!this.validateAll()){
        return
      }
      this.payByBrokerage(this.formData.amount)
    },
    ...mapActions('broker',[]),
    ...mapActions('wallet', ['withdraw', 'getCurrency','payByBrokerage']),
  },
  computed: {
    usdRate() {
      return this.currency.usd2rmb.rate
    },
    ...mapState('wallet', ['currency', 'money']),
  },
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
