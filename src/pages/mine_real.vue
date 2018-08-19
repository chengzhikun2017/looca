<template>
  <div class="mine-real-vue">
    <div class="mine-real-status">
      <a-alert
        :message="authStatus"
        :type="alertType"
        showIcon
      >
        <div v-if="authStatus === '认证失败'" slot="description">
          {{authInfo.remark}}
        </div>
        <div v-else slot="description">修改认证资料需提交后台审核</div>
      </a-alert>
    </div>
    <a-form>
      <a-form-item :wrapperCol="{ span: 18 }" label='姓名' :labelCol="{ span: 6 }" :validateStatus="input.status.name.validateStatus" :help="input.status.name.help">
        <a-input :placeholder="editing?'请输入真实姓名':'未填写'" ref="inputname" v-model="input.values.name" @blur="validate('name')" @focus="clearValidation('name')" :disabled="!editing">
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='身份证' :labelCol="{ span: 6 }" :validateStatus="input.status.idCardNo.validateStatus" :help="input.status.idCardNo.help">
        <a-input :placeholder="editing?'请输入身份证号码':'未填写'" ref="inputidCardNo" v-model="input.values.idCardNo" @blur="validate('idCardNo')" @focus="clearValidation('idCardNo')" :disabled="!editing">
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='邮箱' :labelCol="{ span: 6 }" :validateStatus="input.status.email.validateStatus" :help="input.status.email.help">
        <a-input :placeholder="editing?'请输入邮箱地址':'未填写'" ref="inputemail" v-model="input.values.email" @blur="validate('email')" @focus="clearValidation('email')" :disabled="!editing">
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='身份证正面' :labelCol="{ span: 6 }" :validateStatus="input.status.email.validateStatus" :help="input.status.email.help">
        <ImageUpload :editing="editing" v-model="idCardUrl" label="身份证正面 " />
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='身份证反面' :labelCol="{ span: 6 }" :validateStatus="input.status.email.validateStatus" :help="input.status.email.help">
        <ImageUpload :editing="editing" v-model="idCardUrl2" label="身份证反面 " />
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24}" v-if="editing">
        <div class="bttn-box">
          <a-button  @click.native="editing=false" htmlType='submit'>
            取消
          </a-button>
          <a-button type='primary' @click.native="handleSubmit" htmlType='submit'>
            提交
          </a-button>
        </div>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24}" v-if="!editing">
        <div class="bttn-box">
          <a-button @click="editing=true">
            编辑
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
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters
} from 'vuex'
import ImageUpload from './../components/container/imageUpload.vue'


export default {
  name: 'mine_real',
  mixins: [inputMixin],
  data() {
    var newInput = new inputHelper.newInput(['name', 'email', 'idCardNo'])
    return {
      input: newInput,
      editing: true,
      idCardUrl:'',
      idCardUrl2:'',
    }
  },
  created() {
    console.log('%c isRealNamed','color:red',this.isRealNamed)
    if(this.isRealNamed){
      this.initData()
    }

  },
  methods: {
    initData(){
      this.idCardUrl2=this.authInfo.idCardUrl2
      this.idCardUrl=this.authInfo.idCardUrl
      this.formData.name = this.authInfo.name
      this.formData.email = this.authInfo.email
      this.formData.idCardNo = this.authInfo.idCardNo
      this.editing = false
    },
    handleSubmit() {
      this.$modal.confirm({
          title: '确认提交',
          content: `提交实名信息后将进入人工审核阶段，已认证实名信息和状态将被覆盖`,
          onCancel(){},
          cancelText:'取消',
          onOk:()=> {
            this.confirmSubmit()
          },
          closable:true,
          maskClosable:true,
      })
    },
    confirmSubmit(){
      let params = this.getParams()
      this.authVerify(params)
      .then(res=>{
        this.editing = false
        this.$message.info('提交成功，等待审核')
      })
    },
    getParams() {
      return {
        idCardUrl: this.idCardUrl,
        idCardUrl2: this.idCardUrl2,
        idCardNo: this.formData.idCardNo,
        name: this.formData.name,
        email: this.formData.email,
      }
    },
    ...mapActions('account', ['authVerify']),
  },
  watch:{
    isRealNamed(v){
      if(v){
        this.initData()
      }
    }
  },
  computed: {
    ...mapState('account', ['authInfo', 'isRealNamed']),
    alertType() {
      switch(this.authInfo && this.authInfo.status) {
        case 0: return 'info';
        case 1: return 'warning';
        case 2: return 'success';
        case 3: return 'error';
        default: return 'info';
      }
    },
    authStatus() {
      switch(this.authInfo && this.authInfo.status) {
        case 0: return '等待认证';
        case 1: return '等待审核';
        case 2: return '认证通过';
        case 3: return '认证失败';
        default: return '';
      }
    }
  },
  components: {
    ImageUpload,
  },
}

</script>
<style lang='scss' scoped>
.pic {
  width: 128px;
  height: 128px;
}

</style>
<style lang="scss">
.mine-real-vue {
  .mine-real-status {
    width: 100%;
    max-width: 500px;
    margin-bottom: 10px;
  }
}
</style>
