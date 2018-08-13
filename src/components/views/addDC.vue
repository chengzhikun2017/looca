<template>
  <div class="addDC-vue">
    <a-form @submit="handleSubmit">
      <a-form-item :wrapperCol="{ span: 18 }" label='姓名' :labelCol="{ span: 6 }" :validateStatus="input.status.name.validateStatus" :help="input.status.name.help">
        <a-input placeholder="请输入姓名"  ref="inputname" v-model="input.values.name" @blur="validate('name')" @focus="clearValidation('name')">
          <!-- <a-icon slot="prefix" type="user" /> -->
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label="卡号" :labelCol="{ span: 6 }" :validateStatus="input.status.cardNo.validateStatus" :help="input.status.cardNo.help">
        <a-input placeholder="请输入银行卡号"  ref="inputcardNo" v-model="input.values.cardNo" @blur="validate('cardNo')" @focus="clearValidation('cardNo')">
          <!-- <a-icon slot="prefix" type="user" /> -->
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='银行' :labelCol="{ span: 6 }" :validateStatus="input.status.bankName.validateStatus" :help="input.status.bankName.help">
        <a-input placeholder="银行名称"  ref="inputbankName" v-model="input.values.bankName" @blur="validate('bankName')" @focus="clearValidation('bankName')">
          <!-- <a-icon slot="prefix" type="user" /> -->
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='支行名称' :labelCol="{ span: 6 }" :validateStatus="input.status.bankBranch.validateStatus" :help="input.status.bankBranch.help">
        <a-input placeholder="支行名称"  ref="inputbankBranch" v-model="input.values.bankBranch" @blur="validate('bankBranch')" @focus="clearValidation('bankBranch')">
          <!-- <a-icon slot="prefix" type="user" /> -->
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24}">
        <div class="bttn-box">
          <a-button type='primary' htmlType='submit'>
            提交
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { mapState, mapMuations, mapActions, mapGetters } from 'vuex'
import inputHelper from './../../utils/inputHelper.js'
import { ValidationSet } from './../../utils/inputHelper.js'
import inputMixin from './../../components/mixin/input.js'

export default {
  name: 'addDC',
  mixins:[inputMixin],
  data() {
    var newInput = new inputHelper.newInput(["name","cardNo","bankName","bankBranch",])
    return {
      input:newInput
    }
  },
  methods: {
    handleSubmit(){
      let params = this.getCardParms()
      this.addDC(params)
    },
    getCardParms(){
      return {
        name:this.formData.name,
        bankBranch:this.formData.bankBranch,
        bankName:this.formData.bankName,
        cardNo:this.formData.cardNo,
      }
    },
    ...mapActions('cards',['addDC'])
  },
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
