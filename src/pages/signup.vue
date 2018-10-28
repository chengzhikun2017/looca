<template>
  <div class="signup-page">
    <h1 class="main-title">
        欢迎注册
      <a-divider/>
    </h1>
    <div class="box">
      <div class="l-log-header">
        <img src="../assets/display/logo.png" alt="" class="logo">
        <span class="title">Looco Global & 乐恺环球</span>
      </div>
      <div class="container"> 
        <Sign></Sign>
        <div class="sign-bottom">
          <span class="login l-pointer" @click="goPage('/mine_real')">已有账号？立即登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Sign  = ()=> import ('../components/views/signup.vue')
import helper from '../utils/helper.js'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
export default {
  name:'signup',
  data() {
    return {
      
    }
  },
  mounted(){
    this.setShareInfo({uid:this.$route.query.uid})
  },
  methods: {
    goPage(path) {
      console.log('%c go page','color:red',)
      helper.goPage(path)
    },
    ...mapMutations('account',['setShareInfo']),
  },
  computed: {},
  components: {
    Sign,
  },
}
</script>

<style lang='scss' scoped>
.l-log-header .title{
  color:#ccc;
}
.signup-page {
  position: fixed;
  overflow: auto;
  /*position: absolute;*/
  width: 100%;
  height: 100%;
  background: #FFF;
  /*background: #000;*/
  left: 0;
  top: 0;
  z-index: 999;
  overflow: auto;
  /*padding:0 20px;*/
  .main-title{
    color:#999;
    font-size: 20px;
    text-align: center;
    line-height: 1;
    margin-top: 24px;
  }
  .box{
    /*display: flex;*/

    width: 360px;
    /*justify-content: center;*/
    margin: 0 auto;
  }
  .container{
    border-radius: 5px;
    width: 360px;
    /*padding:20px;*/
    background: #fff;
  }
}
.sign-bottom {
  text-align: right;
  color: #1890ff;
}
.login {
  height: 32px;
  font-size: 14px;
  line-height: 32px;
}
</style>
