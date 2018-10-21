<template>
  <!-- <div class="l-log" v-if='false'> -->
  <div class="l-log" v-if='true'>
    <div class="log-box" :class="isPC?'':'phone'">
      <div class="l-log-header">
        <img src="../../assets/display/logo.png" alt="" class="logo">
        <span class="title">Looco Global & 乐恺环球</span>
      </div>
      <div class="tabs-box">
        <a-tabs :activeKey="activeKey"  @change="callback" v-if="!isFindpwd">
          <a-tab-pane tab="立即登录" key="1">
            <Log></Log>
          </a-tab-pane>
          <a-tab-pane tab="免费注册" key="2" forceRender>
            <Sign></Sign>
          </a-tab-pane>
        </a-tabs>
        <div class="find-pwd" v-if="isFindpwd">
          <span class="back" @click='setFindPwd(false)'>
            <a-icon type="arrow-left" />
          </span>
          <p class="text">
            找回密码
          </p>
          <Sign :type="2"></Sign>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
const Log = ()=> import ("./login.vue")
const Sign = ()=> import ("./signup.vue")
export default {
  name: 'log',
  data() {
    return {
      activeKey:'1',
    }
  },
  provide(){
    return {
      switchTab:this.switchTab,
    }
  },
  methods: {
    switchTab(key){
      this.activeKey = key
    },
    callback(key) {
      this.activeKey = key
      // console.log('%c args', 'color:red', args)
    },
    ...mapMutations('account', ['setFindPwd'])
  },
  computed: {
    ...mapState('account', ['isFindpwd']),
    ...mapState('app', ['isPC']),
  },
  components: {
    Log,
    Sign,
  },
}

</script>
<style lang='scss' scoped>
.l-log {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  left: 0;
  top: 0;
  z-index: 5;
  overflow: auto;
  .logo {
    width: 20px;
  }
}

.find-pwd {
  position: relative;
  .back {
    font-size: 20px;
    color: #1890ff;
    position: absolute;
    left: 0;
    top: 0;
    padding: 0 5px;
     :hover {
      cursor: pointer;
      opacity: .6;
    }
  }
  .text {
    text-align: right;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
  }
}

.tabs-box {
  padding: 20px;
  padding-top: 40px;
  border-radius: 5px;
  background: #fff;
}

.log-box {
  width: 360px;
  margin: 0 auto;
  margin-top: 80px;

}

.log-box.phone {
  margin-top: 50px;
  .tabs-box{
    padding-top: 20px;
  }
}

</style>
<style lang="scss">
#app .l-log .ant-form-item {
  margin-bottom: 20px;
  .ant-form-item{
    display:flex;
  }
  .ant-form-item-label{
    width: 25%;
  }
  .ant-form-item-control-wrapper{
    width: 100%;
  }
}

.l-log {

  .ant-tabs-nav {
    width: 100%;
  }
  .ant-tabs-tab {
    width: 50%;
    margin-right: 0 !important;
    text-align: center;
  }
  .ant-tabs-nav-container-scrolling .ant-tabs-tab-next.ant-tabs-tab-arrow-show,
  .ant-tabs-tab-prev.ant-tabs-tab-arrow-show {
    margin: 0;
  }
}

</style>
