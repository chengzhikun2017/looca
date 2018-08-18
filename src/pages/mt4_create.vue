<template>
  <div class="mt4_create-page">
    <a-form @submit="handleSubmit">
      <a-form-item :wrapperCol="{ span: 18 }" label='交易密码' :labelCol="{ span: 6 }" :validateStatus="input.status.password.validateStatus" :help="input.status.password.help">
        <a-input placeholder="请输入交易密码" type="password" ref="inputPassword" v-model="input.values.password" @blur="validate('password')" @focus="clearValidation('password')">
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='重复交易密码' :labelCol="{ span: 6 }" :validateStatus="input.status.repassword.validateStatus" :help="input.status.repassword.help">
        <a-input placeholder="请再次输入交易密码" type="password" ref="inputrepassword" v-model="input.values.repassword" @blur="validate('repassword')" @focus="clearValidation('repassword')">
        </a-input>
      </a-form-item>
      
      <a-form-item :wrapperCol="{ span: 18 }" label='只读密码' :labelCol="{ span: 6 }" :validateStatus="input.status.password2.validateStatus" :help="input.status.password2.help">
        <a-input placeholder="请输入只读密码" type="password" ref="inputPassword2" v-model="input.values.password2" @blur="validate('password2')" @focus="clearValidation('password2')">
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='重复只读密码' :labelCol="{ span: 6 }" :validateStatus="input.status.repassword2.validateStatus" :help="input.status.repassword2.help">
        <a-input placeholder="请再次输入只读密码" type="password" ref="inputrepassword2" v-model="input.values.repassword2" @blur="validate('repassword2')" @focus="clearValidation('repassword2')">
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
import helper from './../utils/helper.js'
import inputMixin from './../components/mixin/input.js'
import inputHelper from './../utils/inputHelper.js'
import { ValidationSet } from './../utils/inputHelper.js'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'mt4_create',
  data() {
    let newInput = new inputHelper.newInput(['password','password2','repassword','repassword2'])
    ValidationSet.password(newInput,'password')
    ValidationSet.password(newInput,'repassword')
    ValidationSet.password(newInput,'password2')
    ValidationSet.password(newInput,'repassword2')
    newInput.values.password='111111111111'
    newInput.values.repassword='111111111111'
    newInput.values.password2='11111111111'
    newInput.values.repassword2='11111111111'
    return {
      input: newInput,
    }
  },
  mixins: [inputMixin],
  created(){
  },
  methods: {
    cancelCreate(){
      
    },
    handleSubmit(){
      console.log('%c flag','color:red',this.checkValid())
      if(!this.checkValid()){
        return
      }
      let params = this.getParams()
      console.log('%c params----','color:red',params)
      this.create(params)
      .then((res) => {
        helper.goPage(-1) 
      })
    },
    getParams(){
      return {
        server:this.$route.params.server,
        password:this.formData.password,
        password2:this.formData.password2,
      }
    },
    checkValid(){
      let flag = true
      console.log('%c this.validateAll()','color:red',this.validateAll())
      if(!this.validateAll()){
        return false
      }
      let data = this.formData
      if(data.password!==data.repassword){
        this.input.status.password = inputHelper.createStatus(2,'两次输入密码不一致')
        this.input.status.repassword = inputHelper.createStatus(2,'两次输入密码不一致')
        flag = false
      }
      if(data.password2!==data.repassword2){
        this.input.status.password2 = inputHelper.createStatus(2,'两次输入密码不一致')
        this.input.status.repassword2 = inputHelper.createStatus(2,'两次输入密码不一致')
        flag = false
      }
      return flag
    },  
    ...mapActions("mt4AC",['create',])
  },
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
