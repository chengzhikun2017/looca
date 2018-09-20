<template>
  <div class="l-login">
    <a-form @submit="handleSubmit">
      <a-form-item :wrapperCol="{ span: 24 }" :validateStatus="input.status.phone.validateStatus" :help="input.status.phone.help">
        <a-input key="loginPhone" size=large placeholder="手机号" ref="inputPhone" v-model="input.values.phone" @blur="validate('phone')" @focus="clearValidation('phone')">
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" :validateStatus="input.status.password.validateStatus" :help="input.status.password.help">
        <a-input key="loginPwd" size=large placeholder="密码" type="password" ref="inputPassword" v-model="input.values.password" @blur="validate('password')" @focus="clearValidation('password')">
          <a-icon slot="prefix" type="lock" />
        </a-input>
      </a-form-item>
      <a-form-item :labelCol="{ span: 24 }" :wrapperCol="{ span: 24 }">
        <a-checkbox @change="onSavePwdChange" v-model="savePassword">
          记住我
        </a-checkbox>
        <span class="forget-pwd" @click="forgetPwd">忘记密码</span>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24}">
        <!-- <div class="bttn-box"> -->
          <a-button size=large type='primary' htmlType='submit'>
            登录
          </a-button>
        <!-- </div> -->
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import helper from '../../utils/helper.js'
import { mapState, mapMutations
, mapActions, mapGetters } from 'vuex'
import regs from './../../utils/regs.js'
import inputHelper from './../../utils/inputHelper.js'
import {ValidationSet} from './../../utils/inputHelper.js'
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
    var newInput = new inputHelper.newInput(['phone', "password"])
    newInput.values.phone=localStorage.account
    newInput.values.password = localStorage.password
    ValidationSet.phone(newInput,'phone')
    ValidationSet.password(newInput,'password')
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
    forgetPwd(){
      this.setFindPwd(true)
      // helper.goPage('/findpwd')
    },
    onSavePwdChange() {

    },
    handleSubmit() {
      console.log('%c form', 'color:red', this.input.validateAll())
      if (this.input.validateAll()) {
        this._login()
      }
      // getFieldDecorator
    },
    _login() {
      this.login({
        phone: this.formData.phone,
        password: this.formData.password,
        save: this.savePassword,
      })
    },
    ...mapMutations('account',['setFindPwd']),
    ...mapActions('account', ['login']),
  },
  computed: {

  },
  components: {},
}

</script>
<style lang='scss' scoped>
.bttn-box {
  text-align: center;
}

.l-login {
  margin-top: 10px;
  .forget-pwd {
    color: #1890ff;
    line-height: 1;
    font-size: 14px;
    margin: 13px 0;
    float: right;
    opacity: .5;
    text-align: right;
    &:hover {
      cursor: pointer;
    }
  }
}

</style>
<style lang="scss">
.l-login {
  .ant-input-prefix {
    color: #d9d9d9;
  }
  .ant-btn {
    width: 100%;
  }
}

</style>
