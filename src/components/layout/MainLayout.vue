<template>
  <a-layout id="appLayout" :class="isPC?'pc':'phone'">
    <a-layout-sider breakpoint="lg" v-model="collapsed" collapsedWidth="0" @collapse="onCollapse" ref="sider">
      <a-menu ref="menu" theme="dark" mode="inline" :openKeys="openKeys" @openChange="onOpenChange" v-model="current" @click="onItemClick">
        <component v-for="topMenu in menuConfig" :is="topMenu.noChild?'aMenuItem':'aSubMenu'" :key="topMenu.noChild?topMenu.link:topMenu.key" v-if="!topMenu.hide">
          <!-- 有子菜单用 key做key, 无子菜单用link -->
          <!-- link 需唯一（有些不稳健， 可以考虑重复link加标识符  link+'~~1'） -->
          <span slot="title" v-if="!topMenu.noChild">
            <a-icon :type="topMenu.icon"/>
            <span>{{topMenu.title}}</span>
          </span>
          <a-menu-item v-for="subMenu in topMenu.children" v-if="!subMenu.hide&&!topMenu.noChild" :key="subMenu.link">{{subMenu.title}}</a-menu-item>
          <a-icon :type="topMenu.icon" v-if="topMenu.noChild" type="link" />
          <span v-if="topMenu.noChild">{{topMenu.title}}</span>
        </component>
      </a-menu>
      <div class="logo" flex="main:center cross:center" v-if="true">
        <img class="logo-image" src="@/assets/display/logo1.png" alt="">
        <div class="logo-title">乐恺环球</div>
      </div>
      <div class="user-setting-box" :class="isPC?'':'phone'">
        <div class="btn" @click="logout" >
          <a-icon type="logout" />
        </div>
      </div>
    </a-layout-sider>
    <a-layout @click.native="onMainBodyClick" >
      <a-layout-header :style="{ background: '#fff', padding: 0 }" v-if="isPC">
        <slot name="header"></slot>
        <div class="nav-user">
          <!-- <NavMt4></NavMt4> -->
          <NavUser></NavUser>
        </div>
      </a-layout-header>
      <a-layout-content class="content-layout" >
        <div class="breadcrumb">
          <a-breadcrumb separator=">">
            <a-breadcrumb-item>{{''}}</a-breadcrumb-item>
            <a-breadcrumb-item :key='key' v-for="key in keyPath">
              <a href="javascript:void(0)" v-if="config[key].link" @click="go('/'+key)">
                <a-icon :type="config[key].icon" v-if="config[key].icon"></a-icon>
                {{config[key].title}}
              </a>
              <span v-else>
                <a-icon :type="config[key].icon" v-if="config[key].icon"></a-icon>
                {{config[key].title}}
              </span>
            </a-breadcrumb-item>
            <!-- <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item> -->
            <!-- <a-breadcrumb-item>An Application</a-breadcrumb-item> -->
          </a-breadcrumb>
          <span class="back-icon l-pointer-blue" @click="goUpLv" v-if="showBackIcon">
            <a-icon type="arrow-left" />
          </span>
        </div>
        <div class="content" :class="isPC?'':'phone'" :style="{height:contentHeight}">
          <Loading></Loading>
          <slot></slot>
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center" v-if="isPC">
        Ant Design ©2016 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
// 64+69+24
//
const config = {
  user: { title: '个人信息', icon: 'user', },
  mine_cards: { title: "我的银行卡", link: "mine_cards", rootKey: 'user' },
  mine_real: { title: "开户信息", link: "mine_real", rootKey: 'user' },
  modifypwd: { title: "修改密码", link: "modifypwd", rootKey: 'user' },

  mt4_account: { title: 'MT4账户管理' },
  mt4_create: { title: "开立账户", link: "mt4_create", rootKey: 'mt4_overview' },
  mt4_overview: { title: "MT4账户", link: "mt4_overview", isRoot: true },
  mt4_modifypwd: { title: "修改密码", link: "mt4_modifypwd", rootKey: 'mt4_overview' },
  mt4_bind: { title: "绑定账号", link: "mt4_bind", rootKey: 'mt4_overview' },
  mt4_findpwd: { title: "忘记密码", link: "mt4_findpwd", rootKey: 'mt4_overview' },

  mt4_trade: { title: 'MT4交易管理' },
  mt4_trade_history: { title: "交易记录：持仓和历史记录", link: "mt4_trade_history", rootKey: 'mt4_overview' },
  mt4_recharge: { title: "在线入金", link: "mt4_recharge", rootKey: 'mt4_overview' },
  mt4_withdraw: { title: "出金申请", link: "mt4_withdraw", rootKey: 'mt4_overview' },
  mt4_money_bill: { title: "出入金记录", link: "mt4_money_bill", rootKey: 'mt4_overview' },

  wallet: { title: '资产管理' },
  wallet_review: { title: "我的钱包", link: "wallet_review", rootKey: 'user' },
  wallet_withdraw: { title: "余额提现", link: "wallet_withdraw", rootKey: 'wallet_review' },
  wallet_recharge: { title: "余额充值", link: "wallet_recharge", rootKey: 'wallet_review' },
  wallet_history: { title: "钱包记录", link: "wallet_history", rootKey: 'wallet_review' },
  brokerage_withdraw: { title: "佣金提现", link: "brokerage_withdraw", rootKey: 'wallet_review' },

  agent: { title: "代理推广" },
  agent_promote: { title: "我的推广", link: "agent_promote", rootKey: 'agent' },
  agent_overview: { title: "我的客户", link: "agent_overview", rootKey: 'agent' },
  agent_profit_overview: { title: "返现记录", link: "agent_profit_overview", rootKey: 'agent' },
}
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters
} from 'vuex'
import helper from './../../utils/helper.js'
import NavUser from './../views/navUser.vue'
// import NavMt4 from './../views/navMt4.vue'
import { Menu } from 'vue-antd-ui'
import Loading from '../pageLoading.js'
export default {
  name: 'MainLayout',
  data() {
    return {
      openKeys: [''],
      mode: 'inline',
      theme: 'light',
      current: [],
      collapsed: false,
      header: {},
      config,
      keyPath: [],
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

  created() {},
  mounted() {
    // this.initOpenKeys()
    this.initSider()
    this.$nextTick(() => {
      this.setMenuCurrent()
    })
  },
  methods: {
    // init(){

    // },
    // initOpenKeys(){
    //   console.log('%c routePath','color:red',this.routePath)
    //   let path = this.routePath
    //   this.current = [path]
    //   let rootKey = this.config[path].rootKey
    //   this.openKeys = [rootKey]
    // },
    closeOtherSubMenu(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    onOpenChange(openKeys) {
      this.closeOtherSubMenu(openKeys)
    },
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
      this.go('/' + e.key)
      this.keyPath = e.keyPath.reverse()
      this.hideMobileSider()
    },
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    go(path) {
      helper.goPage(path)
    },
    setCurrent(keyPath) {
      this.current = [keyPath[0]]
      if (keyPath[1]) {
        this.current.push(keyPath[1])
      }
    },
    setOpenKeys(keyPath) {
      this.openKeys = [keyPath[0]]
    },
    onKeyPathEmpty(){
      this.openKeys = []
      this.current = []
    },
    // setOpenKeysByPath(path) {
    //   this.current = [path]
    //   if (!this.config[path]) {
    //     return
    //   }
    //   let rootKey = this.config[path].rootKey || path
    //   this.openKeys = [rootKey]
    // },
    goUpLv() {
      helper.goPage('/'+this.topLvKey)
    },
    setKeyPathByPath(path) {
      let keyPath = []
      // console.log('%c path','color:red',path)
      // console.log('%c this.config','color:red',this.config)
      if(!this.config[path]){
        return []
      }
      let rootKey = this.config[path].rootKey
      keyPath.unshift(path)
      while (rootKey) {
        keyPath.unshift(rootKey)
        rootKey = this.config[rootKey].rootKey
      }
      this.keyPath = keyPath
      return keyPath
    },
    setMenuCurrent(){
      if(!this.routePath){
        return
      }
      let keyPath = this.setKeyPathByPath(this.routePath)
      if(keyPath.length === 0){
        this.onKeyPathEmpty()
        return
      }
      console.log('%c keyPath','color:red',keyPath)
      this.setCurrent(keyPath)
      this.setOpenKeys(keyPath)
    },
    ...mapActions('account',['logout'])
  },
  watch: {
    routePath(path) {
      this.setMenuCurrent()
    },
  },
  computed: {
    topLvKey(){
      return this.keyPath[this.keyPath.length-2]
    },
    showBackIcon(){
      if(this.config[this.topLvKey]){
        return this.config[this.topLvKey].link
      }
    },
    rootSubmenuKeys() {
      return this.menuConfig.map((item) => {
        if (item.noChild !== true) {
          return item.key
        } else {
          return item.link
        }
      })
    },
    // menuConfigObj(){
    //   let config = {} 
    //   this.menuConfig.forEach((item,index) => {
    //     config[item.key] = item
    //   })
    //   return config
    // },
    menuConfig() {
      return [{ //user
        key: 'user',
        link: null,
        icon: 'user',
        ...config.user,
        children: [
          config.mine_real,
          config.wallet_review,
          { ...config.mine_cards, hide: !this.realNameAuthed },
          config.modifypwd,
        ],
      }, { //mt4_account
        // key:'mt4_overview',
        noChild: true,
        hide: !this.realNameAuthed,
        // link:"mt4_overview",
        icon: 'profile',
        ...config.mt4_overview,
        children: [
          config.mt4_create,
          config.mt4_modifypwd,
          config.mt4_bind,
          config.mt4_findpwd,
          config.mt4_money_bill,
        ],
      }, { //mt4_trade
        key: 'mt4_trade',
        hide: this.list.length === 0,
        link: null,
        icon: 'user',
        hide: true,
        ...config.mt4_trade,
        children: [
          config.mt4_trade_history,
          config.mt4_recharge,
          config.mt4_withdraw,
          config.mt4_money_bill,
        ],
      }, { //wallet
        key: 'wallet',
        hide: !this.realNameAuthed,
        hide: true,
        link: null,
        icon: 'user',
        ...config.wallet,
        children: [
          config.wallet_review,
          config.wallet_withdraw,
          config.wallet_recharge,
          config.wallet_history,
        ],
      }, { //agent
        key: 'agent',
        link: null,
        icon: 'share-alt',
        ...config.agent,
        children: [
          config.agent_promote,
          config.agent_overview,
          config.agent_profit_overview,
        ],
      }, ]
    },
    routePath() {
      return this.$route.path.split('/')[1]
    },
    contentHeight() {
      let height
      if(this.isPC){
        height = this.windowHeight - (64 + 24 + 69 ) 
      }else {
        height = this.windowHeight - 12 - 35
      }
      return height + 'px'
    },
    siderHeight() {
      return this.windowHeight - 64 + 'px'
    },

    ...mapState('app', ['windowHeight', 'isPC']),
    ...mapState('mt4AC', ['list']),
    ...mapGetters('account', ['realNameAuthed']),
  },
  components: {
    NavUser,
    // NavMt4,
    Loading,
    // SubMenu:Menu.SubMenu,
    // MenuItem:Menu.Item,
  },
}

</script>
<style lang='scss' scoped>
.breadcrumb {
  position: relative;
  .back-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    margin:auto 0;
    padding:0 5px;
    right: 0;
    font-size: 22px;
    display: flex;
  }
}
.phone .breadcrumb{
  margin-left: 40px;
}
.logo {
  width: 100%;
  height: 64px; // background: rgba(0, 111, 111, 1);
  // background: #f5222d;
  background: #002140; // background: linear-gradient(to bottom right, #fe7244 , #fe0000); /* 标准的语法 */
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  .logo-image {
    width: auto;
    height: 46px;
  }
  .logo-title {
    padding-top: 3px;
    padding-left: 10px;
    color: white;
    font-size: 22px;
  }
}

.nav-user {
  height: 100%;
  position: absolute;
  right: 20px;
  top: 0;
  display: flex;
  align-items: center;
}
.pc {
  .content-layout{
    margin:24px 16px 0;
  }
}
.phone{
 .content-layout{
  margin: 12px 0 0;
}
}
.content {
  padding: 24px;
  background: #fff;
  min-height: 480px;
  overflow: auto;
  position: relative;
}
.content.phone {
  padding: 12px;
}
.breadcrumb {
  margin-bottom: 10px;
}
.user-setting-box.phone{
  .btn{
    padding:4px;
    line-height: 1;
  }
  color:#fff;
  position: absolute;
  bottom: 5px;
  left: 5px;
}
</style>
<style lang="scss">
.ant-layout-sider-children{
  position: relative;
}
#appLayout {
  height: 100%;
  .ant-menu-item,
  .ant-menu-submenu-title {
    text-align: left;
  }
  .ant-layout-sider-zero-width-trigger{
    top: 0;
  }
  .ant-breadcrumb-separator {
    margin: 2px;
  }
  .ant-layout-header {
    position: relative;
  }
  .ant-layout-sider {
    height: 100%;
    .ant-menu-root {
      padding-top: 64px;
      max-height: 100%;
      height: 100%;
      overflow-y: auto;
    }
  }
  .ant-menu-dark {
    background: rgba(0, 0, 0, .65);
  }
}

</style>
