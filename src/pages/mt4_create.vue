<template>
  <div class="mt4_create-page">
    <p class="title">{{title}}</p>
    <!-- <div class="choose-type">
      <a-radio-group name="radioGroup" v-model="type" v-if="server==='live'">
        <a-radio value="normal">普通账户</a-radio>
        <a-radio value="follow">跟单账户</a-radio>
      </a-radio-group>
    </div> -->
    <a-form >
      <a-form-item :wrapperCol="{ span: 18 }" label='交易密码' :labelCol="{ span: 6 }" :validateStatus="input.status.password.validateStatus" :help="input.status.password.help">
        <a-input placeholder="请输入交易密码"  ref="inputPassword" v-model="input.values.password" @blur="validate('password')" @focus="clearValidation('password')">
        </a-input>
      </a-form-item>
     <!--  <a-form-item :wrapperCol="{ span: 18 }" label='重复交易密码' :labelCol="{ span: 6 }" :validateStatus="input.status.repassword.validateStatus" :help="input.status.repassword.help">
        <a-input placeholder="请再次输入交易密码"  ref="inputrepassword" v-model="input.values.repassword" @blur="validate('repassword')" @focus="clearValidation('repassword')">
        </a-input>
      </a-form-item> -->
      
      <a-form-item :wrapperCol="{ span: 18 }" label='只读密码' :labelCol="{ span: 6 }" :validateStatus="input.status.password2.validateStatus" :help="input.status.password2.help">
        <a-input placeholder="请输入只读密码"  ref="inputPassword2" v-model="input.values.password2" @blur="validate('password2')" @focus="clearValidation('password2')">
          <a-tooltip slot="addonAfter" placement="left" >
            <template slot='title'>
              只读密码：仅用于登录查看无法交易
            </template>
            <a-icon  type="question-circle-o"/>
          </a-tooltip>
        </a-input>
      </a-form-item>
      <!-- <a-form-item :wrapperCol="{ span: 18 }" label='重复只读密码' :labelCol="{ span: 6 }" :validateStatus="input.status.repassword2.validateStatus" :help="input.status.repassword2.help">
        <a-input placeholder="请再次输入只读密码"  ref="inputrepassword2" v-model="input.values.repassword2" @blur="validate('repassword2')" @focus="clearValidation('repassword2')">
        </a-input>
      </a-form-item> -->

      <a-form-item :wrapperCol="{ span: 24}">
        <div class="bttn-box">
          <a-button type='primary' htmlType='submit' @click="handleSubmit">
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
    // let newInput = new inputHelper.newInput(['password','password2','repassword','repassword2'])
    let newInput = new inputHelper.newInput(['password','password2'])
    ValidationSet.mt4Pwd(newInput,'password')
    // ValidationSet.mt4Pwd(newInput,'repassword')
    ValidationSet.mt4Pwd(newInput,'password2')
    // ValidationSet.mt4Pwd(newInput,'repassword2')
    return {
      input: newInput,
    }
  },
  mixins: [inputMixin],
  methods: {
    handleSubmit(){
      if(!this.checkValid()){
        return
      }
      let params = this.getParams()
      this.create(params)
      .then((res) => {
        helper.replaceRouter("/mt4_overview") 
      })
    },
    getParams(){
      return {
        // server:this.server,
        type:this.type,
        password:this.formData.password,
        password2:this.formData.password2,
      }
    },
    checkValid(){
      let flag = true
      if(!this.validateAll()){
        return false
      }
      // let data = this.formData
      // if(data.password!==data.repassword){
      //   this.input.status.password = inputHelper.createStatus(2,'两次输入密码不一致')
      //   this.input.status.repassword = inputHelper.createStatus(2,'两次输入密码不一致')
      //   flag = false
      // }
      // if(data.password2!==data.repassword2){
      //   this.input.status.password2 = inputHelper.createStatus(2,'两次输入密码不一致')
      //   this.input.status.repassword2 = inputHelper.createStatus(2,'两次输入密码不一致')
      //   flag = false
      // }
      return flag
    },  
    ...mapActions("mt4AC",['create',])
  },
  created(){
    console.log('%c this','color:red',this)
  },
  computed: {
    type(){
      return this.$route.params.type
    },
    title(){
      if(this.type === 'normal'){
        return "创建普通账户"
      }else if(this.type === 'follow'){
        return "创建跟单账户"
      }
    },
    __header(){
      return this.title
    },
  },
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
