<template>
  <div class="mine_real-page">
    <div class="mine_real-title">
      <a-steps :current="current" :status="stepStatus" >
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div class="mine_real-content" flex="dir:top main:center cross:center">
      <div class="mine_real-status">
        <alert
          showIcon :type="alertType"
          :title="authStatusText"
          :message="authStatusContent"
          >
          <div slot="description" class="mine_real-status-description">
            <h3 class="mine_real-status-description-title">温馨提示</h3>
            <!-- 这里的提示信息是需要动态替换的 -->
            <p class="mine_real-status-description-item">1.必须实名注册，否则无法提现</p>
            <p class="mine_real-status-description-item">2.法院黑名单请更换实名，否则会影响账户使用</p>
            <p class="mine_real-status-description-item">3.认证审核通过后，若要修改实名认证信息，请联系客服</p>
          </div>
        </alert>
      </div>
      <div class="mine_real-table" >
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
          <a-form-item :wrapperCol="{ span: 18 }" label='身份证正面' :labelCol="{ span: 6 }" :validateStatus="input.status.idCardUrl.validateStatus" :help="input.status.idCardUrl.help">
            <ImageUpload :editing="editing" v-model="input.values.idCardUrl" label="身份证正面 " />
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 18 }" label='身份证反面' :labelCol="{ span: 6 }" :validateStatus="input.status.idCardUrl2.validateStatus" :help="input.status.idCardUrl2.help">
            <ImageUpload :editing="editing" v-model="input.values.idCardUrl2" label="身份证反面 " />
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 24}" v-if="editing">
            <div class="bttn-box">
              <a-button v-if="authStatus===1 && false"  @click.native="editing=false" htmlType='submit'>
                取消
              </a-button>
              <a-button type='primary' @click.native="handleSubmit" htmlType='submit'>
                {{authStatus===0?"提交":"重新提交"}}
              </a-button>
            </div>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 24}" v-if="!editing&&authInfo.status!==2 && false">
            <div class="bttn-box">
              <a-button @click="editing=true">
                编辑
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
      <div class="mine_real-content-note">
        <p class="mine_real-content-note-title">如有问题，请联系客服</p>
        <p class="mine_real-content-note-item">QQ：1231</p>
        <p class="mine_real-content-note-item">电话：34223</p>
      </div>
    </div>
  </div>
</template>
<script>
import Alert from '@/components/alert.vue'
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
    var newInput = new inputHelper.newInput(['name', 'email', 'idCardNo','idCardUrl2','idCardUrl'])
    ValidationSet.email(newInput,'email')
    ValidationSet.name(newInput,'name')
    ValidationSet.id(newInput,'idCardNo')
    ValidationSet.upload(newInput,'idCardUrl','身份证正面')
    ValidationSet.upload(newInput,'idCardUrl2','身份证反面')
    return {
      input: newInput,
      editing: true,
      idCardUrl:'',
      idCardUrl2:'',
    }
  },
  created() {
    console.log('%c this','color:red',this)
    // this.getAuthInfo()
    // if(this.realNameLoaded){
      this.initData()
    // }

  },
  methods: {
    initData(){
      this.formData.idCardUrl2=this.authInfo.idCardUrl2 || ''
      this.formData.idCardUrl=this.authInfo.idCardUrl || ''
      this.formData.name = this.authInfo.name
      this.formData.email = this.authInfo.email
      this.formData.idCardNo = this.authInfo.idCardNo
      if(this.authInfo.status%3===0){//0 3
        this.editing = true
      }else{
        this.editing = false
      }
    },
    handleSubmit() {
      if(!this.validateAll()){

        return
      }
      this.$modal.confirm({
        title: '确认提交',
        content: `提交实名信息后将进入人工审核阶段`,
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
        idCardUrl: this.formData.idCardUrl,
        idCardUrl2: this.formData.idCardUrl2,
        idCardNo: this.formData.idCardNo,
        name: this.formData.name,
        email: this.formData.email,
      }
    },
    ...mapActions('account', ['authVerify','getAuthInfo']),
  },
  watch:{
    authStatus(status){
      if(status===2){
        this.authStatus = 2
      }
    },
    realNameLoaded(v){
      if(v){
        this.initData()
      }
    }
  },
  computed: {
    current(){
      let current = 0
      switch(this.authStatus){
        case 0: current = 0;break;
        case 1: current = 1;break;
        case 2:
        case 3:current =2;break;
      }
      return current
    },
    // editing(){
    //   // if(this.authStatus===2){
    //   //   return false
    //   // }
    // },
    steps(){
      return [{
        title: '填写开户资料'
      }, {
        title: '等待审核'
      }, {
        title: this.authStatus ===3 ?'认证失败':'完成'
      }]
    },
    authStatus(){
      return this.authInfo.status
    },
    ...mapGetters('account',['realNameLoaded']),
    ...mapState('account', ['authInfo',]),
    alertType() {
      switch(this.authInfo && this.authInfo.status) {
        case 0: return 'info';
        case 1: return 'warning';
        case 2: return 'success';
        case 3: return 'error';
        default: return 'info';
      }
    },
    authStatusText() {
      switch(this.authInfo && this.authInfo.status) {
        case 0: return '待提交';
        case 1: return '等待审核';
        case 2: return '认证通过';
        case 3: return '认证失败';
        default: return '';
      }
    },
    authStatusContent(){
      switch(this.authInfo && this.authInfo.status) {
        case 0: return '请填写开户资料';
        case 1: return '请耐心等待~';
        case 2: return '已认证通过，如需修改信息，请与客服联系';
        case 3: return this.authInfo.remark;
        default: return '';
      }
    },
    stepStatus(){
      //      wait process finish error
      if(this.authStatus===3){
        return "error"
      }
      return "process"
    }
  },
  components: {
    ImageUpload,
    Alert
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
  $prefix: "mine_real";
  @import '@/styles/steps/index.scss';
  .#{$prefix}-page {
    .#{$prefix}-status {
      width: 100%;
      max-width: 500px;
      margin-bottom: 10px;
      .#{$prefix}-status-description {
        margin-top: 10px;
        border-top: 1px solid rgba(0,0,0,.1);
        padding-top: 5px;
        font-size: 12px;
        color: #666;
        line-height: 12px;
        .#{$prefix}-status-description-title {
          padding-top: 10px;
          color: rgba(0, 0, 0, 0.6);
          font-weight: 400;
        }
        .#{$prefix}-status-description-item {
          padding: 0;
          margin: 0;
          line-height: 1.5;
        }
      }
    }
    .#{$prefix}-table {
      width: 100%;
      max-width: 460px;
    }
  }

  @media (min-width: 575px) {
    .#{$prefix}-page {
      .#{$prefix}-status {
      .#{$prefix}-status-description {
        .#{$prefix}-status-description-title {
          font-size: 15px;
        }
        .#{$prefix}-status-description-item {
          font-size: 13px;
        }
      }
    }
    }
  }
</style>
