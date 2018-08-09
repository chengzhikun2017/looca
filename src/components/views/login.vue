<template>
  <div class="login-vue">
    <a-form @submit="handleSubmit" >
      <!-- component  input key -->
      <a-form-item :wrapperCol="{ span: 24 }" :validateStatus="input.status.phone.validateStatus" :help="input.status.phone.help">
        <a-input placeholder="123" ref="inputPhone" v-model="input.values.phone" @blur="validate('phone')" @focus="clearValidation('phone')">
          <a-icon slot="prefix" type="user" />
          <!-- <a-icon slot=suffix type="close-circle-o" /> -->
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 12 }" :validateStatus="'warning'">
        <a-input type="password" v-model="input.values.password" >
          <a-icon slot="prefix" type="lock" />
        </a-input>
      </a-form-item>
      <a-form-item :labelCol="formTailLayout.labelCol" :wrapperCol="formTailLayout.wrapperCol">
        <!-- <a-checkbox @change="onSavePwdChange" v-model="savePassword">
          记住我
        </a-checkbox>
        <span class="forget-pwd">忘记密码</span> -->
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24}" validateStatus="error" help="hhhh">
        <div class="bttn-box">
          <a-button type='primary' htmlType='submit'>
            Submit
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import regs from './../../utils/regs.js'
import inputHelper from './../../utils/inputHelper.js'
import inputMixin from './../../components/mixin/input.js'
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
}
const formTailLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24, offset: 0 },
}

export default {
  name: 'login',
  mixins: [inputMixin],
  data() {
    var newInput = new inputHelper.newInput(['phone', "password","savePassword"])
    newInput.setValidation('phone', (value) => {
      if (!value) {
        return inputHelper.statusEmpty
      } else if (!regs.phone.test(value)) {
        return inputHelper.createStatus(2, "不正确")
      }
    })

    return {
      savePassword: true,
      formItemLayout,
      formTailLayout,
      input: newInput,
    }
  },
  mounted() {
    this.$refs.inputPhone.focus()
  },
  methods: {
    onSavePwdChange() {

    },
    //mixin
    // onInputBlur(key) {
    //   this.input.validation[key]()
    // },
    // onInputFocus(key) {
    //   this.input.clearStatus(key)
    // },
    handleSubmit() {
      console.log('%c form', 'color:red', this.form.getFieldsValue())
      // getFieldDecorator
    },
    login() {

    },
    // calPhoneValid() {
    //   if (!this.input.values.phone) {
    //     this.phoneValid = inputHelper.statusEmpty
    //   } else if (!regs.phone.test(this.input.values.phone)) {
    //     this.phoneValid = inputHelper.createStatus(2, "不正确")
    //   }
    // },
  },
  computed: {

  },
  components: {},
}

</script>
<style lang='scss' scoped>
/*.bttn-box {
  text-align: center;
}

.login-vue {
  margin-top: 10px;
  .forget-pwd{
    color: #1890ff;
    line-height: 1;
    font-size: 14px;
    margin: 13px 0;
    float: right;
    opacity: .5;
    text-align: right;
    &:hover{
      cursor: pointer;
    }
  }
}*/


</style>
<style lang="scss">
/*.login-vue {
  .ant-input-prefix {
    color: #d9d9d9;
  }
  .ant-btn{
    width:100%;
  }
}*/
</style>
