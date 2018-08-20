<template>
  <a-layout id="appLayout">
    <a-layout-sider breakpoint="lg" v-model="collapsed" collapsedWidth="0" @collapse="onCollapse" ref="sider">
      <a-menu ref="menu" theme="dark" mode="inline" v-model="current" :defaultSelectedKeys="['4']" @click="onItemClick">
        <!-- <a-menu-item key="1" @click.native="go('/test5')" @click="onItemClick">
          <a-icon type="user" />
          <span class="nav-text">test 5</span>
        </a-menu-item>
        <a-menu-item key="2" @click.native="go('/test2')">
          <a-icon type="video-camera" />
          <span class="nav-text">test 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span class="nav-text">test 3</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="user" />
          <span class="nav-text">test 4</span>
        </a-menu-item> -->
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>个人信息</span></span>
          <a-menu-item key="mine_cards">我的银行卡</a-menu-item>
          <a-menu-item key="mine_real">实名信息</a-menu-item>
          <a-menu-item key="modifypwd">修改密码</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="mail" /><span>MT4账户管理</span></span>
          <a-menu-item key="mt4_overview">账号列表</a-menu-item>
          <a-menu-item key="mt4_modifypwd">修改密码</a-menu-item>
          <a-menu-item key="mt4_create">创建账号</a-menu-item>
          <a-menu-item key="mt4_bind">绑定账号</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="mail" /><span>MT4交易管理</span></span>
          <a-menu-item key="mt4_trade_history"> 交易记录：持仓和历史记录</a-menu-item>
<!--           <a-menu-item key="mt4_modifypwd">修改密码</a-menu-item>
          <a-menu-item key="mt4_create">创建账号</a-menu-item>
          <a-menu-item key="mt4_bind">绑定账号</a-menu-item> -->
        </a-sub-menu>
      </a-menu>
      <div class="logo" />
    </a-layout-sider>
    <a-layout @click.native="onMainBodyClick">
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <slot name="header"></slot>
        <div class="nav-user">
            <NavMt4></NavMt4>
            <NavUser></NavUser>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div class="content" :style="{height:contentHeight}">
          <slot></slot>
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center" v-if="!isPC">
        Ant Design ©2016 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
// 64+69+24
// 
import { mapState, mapMutations
, mapActions, mapGetters } from 'vuex'
import helper from './../../utils/helper.js'
import NavUser from './../views/navUser.vue'
import NavMt4 from './../views/navMt4.vue'
export default {
  name: 'MainLayout',
  data() {
    console.log('data')
    return {
      mode: 'inline',
      theme: 'light',
      current: ['4'],
      collapsed: false,
      header: {

      },
      //item 从 store 中获取
    }
  },
  provide() {
    return {
      setHeader: (header) => {
        this.header = header
      },
    }
  },

  created() {
  },
  mounted() {
    this.initSider()
  },
  methods: {
    onMainBodyClick() {
      this.hideMobileSider()
    },
    initSider() {
      if (this.isPC) {
        return
      }
      let el = this.$refs.sider.$el
      el.style.position = "absolute"
      el.style.height = "100%"
      el.style.zIndex = "2"
    },
    hideSider() {
      this.collapsed = true
    },
    showSider() {
      this.collapsed = false
    },
    hideMobileSider() {
      if (!this.isPC) {
        this.hideSider()
      }
    },
    onItemClick(e) {
      switch(e.key){
        case "mine_cards":this.go('/mine_cards');break;
        case "mine_real":this.go('/mine_real');break;
        case "modifypwd":this.go('/modifypwd');break;
        case "mt4_overview":this.go('/mt4_overview');break;
        case "mt4_modifypwd":this.go('/mt4_modifypwd');break;
        case "mt4_create":this.go('/mt4_create');break;
        case "mt4_bind":this.go('/mt4_bind');break;
        case "mt4_trade_history":this.go('/mt4_trade_history');break;
      }
      this.hideMobileSider()
    },
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    go(path) {
      helper.goPage(path)
    },
  },
  watch:{
    routePath(path){
      // let current=this.routePath.replace('/','')
      if(this.current[0]!==this.routePath){
        this.current[0] = this.routePath
      }
    },
  },
  computed: {
    routePath(){
      return this.$route.path.split('/')[1]
    },
    contentHeight() {
      return this.windowHeight - (64 + 69 + 24) + 'px'
    },
    siderHeight() {
      return this.windowHeight - 64 + 'px'
    },
    ...mapState('app', ['windowHeight', 'isPC'])
  },
  components: {
    NavUser,NavMt4,
  },
}

</script>
<style lang='scss' scoped>
.logo {
  width: 100%;
  height: 64px;
  background: rgba(0, 111, 111, 1);
  padding: 16px 0;
  position: absolute;
  top: 0;
  left: 0;
}
.nav-user{
  /*width: 32px;*/
  height: 100%;
  position: absolute;
  right: 20px;
  top: 0;
  display: flex;
  align-items: center;
}
.content {
  padding: 24px;
  background: #fff;
  min-height: 480px;
  overflow: auto;
  position: relative;
}

</style>
<style lang="scss">
#appLayout {
  height: 100%;
  .ant-menu-item,
  .ant-menu-submenu-title {
    text-align: left;
  }
  .ant-layout-header{
    position: relative;
  }
  .ant-layout-sider{
    height: 100%;
    .ant-menu-root {
      padding-top: 64px;
      max-height: 100%;
      height: 100%;
      overflow-y:auto;
      /*border:1px solid red;*/
    }
  }

}

</style>
