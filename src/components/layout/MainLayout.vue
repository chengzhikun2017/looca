<template>
  <a-layout id="appLayout">
    <a-layout-sider breakpoint="lg" v-model="collapsed" collapsedWidth="0" @collapse="onCollapse" ref="sider">
      <a-menu ref="menu" theme="dark" mode="inline" :openKeys="openKeys" @openChange="onOpenChange" v-model="current" @click="onItemClick">

        <component 
          v-for="topMenu in menuConfig"
          :is="topMenu.noChild?'aMenuItem':'aSubMenu'"
          :key="topMenu.noChild?topMenu.link:topMenu.key"
          v-if="!topMenu.hide"
        >
          <span slot="title" v-if="!topMenu.noChild">
            <a-icon :type="topMenu.icon"/>
            <span>{{topMenu.title}}</span>
          </span>
          <a-menu-item v-for="subMenu in topMenu.children" v-if="!subMenu.hide&&!topMenu.noChild"  :key="subMenu.link">{{subMenu.title}}</a-menu-item>

          <a-icon type="pie-chart" v-if="topMenu.noChild"  />
          <span v-if="topMenu.noChild">{{topMenu.title}}</span>

        </component>

        <!-- <a-sub-menu :key="topMenu.key" v-for="topMenu in menuConfig" v-if="!topMenu.hide">
          <span slot="title">
            <a-icon :type="topMenu.icon"/>
            <span>{{topMenu.title}}</span>
          </span>
          <a-menu-item v-for="subMenu in topMenu.children" v-if="!subMenu.hide"  :key="subMenu.link">{{subMenu.title}}</a-menu-item>
        </a-sub-menu>
        <a-menu-item  key="mt4_overview">
          <a-icon type="pie-chart" />
        </a-menu-item> -->
      </a-menu>
      <div class="logo" flex="main:center cross:center">
        <img class="logo-image" src="@/assets/display/logo1.png" alt="">
        <div class="logo-title">乐恺环球</div>
      </div>
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
          <div class="breadcrumb">
            <a-breadcrumb>
              <a-breadcrumb-item>{{''}}</a-breadcrumb-item>
              <a-breadcrumb-item :key='key' v-for="key in keyPath">
                <a href="javascript:void(0)" v-if="config[key].link" @click="go('/'+key)">
                  {{config[key].title}}
                </a>
                <span v-else>
                  {{config[key].title}}
                </span>
              </a-breadcrumb-item>
              <!-- <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item> -->
              <!-- <a-breadcrumb-item>An Application</a-breadcrumb-item> -->
            </a-breadcrumb>
          </div>
        <div class="content" :style="{height:contentHeight}">
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
  user:{title:'个人信息'},
  mine_cards:{title:"我的银行卡",link:"mine_cards",rootKey:'user'},
  mine_real:{title:"实名信息",link:"mine_real",rootKey:'user'},
  modifypwd:{title:"修改密码",link:"modifypwd",rootKey:'user'},

  mt4_account:{title:'MT4账户管理'},
  mt4_create:{title:"开立账户",link:"mt4_create",rootKey:'mt4_overview'},
  mt4_overview:{title:"MT4账户",link:"mt4_overview",isRoot:true},
  mt4_modifypwd:{title:"修改密码",link:"mt4_modifypwd",rootKey:'mt4_overview'},
  mt4_bind:{title:"绑定账号",link:"mt4_bind",rootKey:'mt4_overview'},
  mt4_findpwd:{title:"忘记密码",link:"mt4_findpwd",rootKey:'mt4_overview'},

  mt4_trade:{title:'MT4交易管理'},
  mt4_trade_history:{title:"交易记录：持仓和历史记录",link:"mt4_trade_history",rootKey:'mt4_trade'},
  mt4_recharge:{title:"在线入金",link:"mt4_recharge",rootKey:'mt4_trade'},
  mt4_withdraw:{title:"出金申请",link:"mt4_withdraw",rootKey:'mt4_trade'},
  mt4_money_bill:{title:"出入金记录",link:"mt4_money_bill",rootKey:'mt4_trade'},

  wallet:{title:'资产管理'},
  wallet_review:{title:"我的钱包",link:"wallet_review",rootKey:'user'},
  wallet_withdraw:{title:"余额提现",link:"wallet_withdraw",rootKey:'wallet'},
  wallet_recharge:{title:"余额充值",link:"wallet_recharge",rootKey:'wallet'},
  wallet_history:{title:"钱包记录",link:"wallet_history",rootKey:'wallet'},

  agent:{title:"代理推广"},
  agent_promote:{title:"我的推广",link:"agent_promote",rootKey:'agent'},

}
import { mapState, mapMutations
, mapActions, mapGetters } from 'vuex'
import helper from './../../utils/helper.js'
import NavUser from './../views/navUser.vue'
import NavMt4 from './../views/navMt4.vue'
import {Menu} from 'vue-antd-ui'

export default {
  name: 'MainLayout',
  data() {
    return {
      rootSubmenuKeys: ['user', 'mt4_account', 'mt4_trade'],
      openKeys: [''],
      mode: 'inline',
      theme: 'light',
      current: ['4'],
      collapsed: false,
      header: {
      },
      config,
      keyPath:[],
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
    // this.initOpenKeys()
    this.initSider()
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
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
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
      console.log('%c loglog','color:red',arguments)
      this.go('/'+e.key)
      this.keyPath=e.keyPath.reverse()
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
      this.current = [path]
      if(!this.config[path]){
        return
      }
      let rootKey = this.config[path].rootKey || path
      this.openKeys = [rootKey]
      // let paths =[]
      // // // let rootKey =this.config[path].rootKey
      // while(rootKey){
      //   console.log('%c rootKey','color:red',rootKey)
      //   paths.push(this.config[rootKey])
      //   rootKey = this.config[rootKey].rootKey
      // }
      // this.keyPath = paths
    },
  },
  computed: {
    menuConfig(){
      return [
      {//user
        key:'user',
        link:null,
        icon:'user',
        ...config.user,
        children:[
          {...config.mine_cards,hide:!this.realNameAuthed},
          config.wallet_review,
          config.mine_real,
          config.modifypwd,
        ],
      },  {//mt4_account
        // key:'mt4_overview',
        noChild:true,
        hide:!this.realNameAuthed,
        // link:"mt4_overview",
        ...config.mt4_overview,
        children:[
          config.mt4_create,
          config.mt4_modifypwd,
          config.mt4_bind,
          config.mt4_findpwd,
        ],
      },{//mt4_trade
        key:'mt4_trade',
        hide:this.list.length===0,
        link:null,
        icon:'user',
        hide:true,
        ...config.mt4_trade,
        children:[
          config.mt4_trade_history,
          config.mt4_recharge,
          config.mt4_withdraw,
          config.mt4_money_bill,
        ],
      },{//wallet
        key:'wallet',
        hide:!this.realNameAuthed,
        hide:true,
        link:null,
        icon:'user',
        ...config.wallet,
        children:[
          config.wallet_review,
          config.wallet_withdraw,
          config.wallet_recharge,
          config.wallet_history,
        ],
      },{//agent
        key:'agent',
        link:null,
        icon:'user',
        ...config.agent,
        children:[
          config.agent_promote,
        ],
      },
    ]
    },
    routePath(){
      return this.$route.path.split('/')[1]
    },
    contentHeight() {
      return this.windowHeight - (64 + 69 + 24) + 'px'
    },
    siderHeight() {
      return this.windowHeight - 64 + 'px'
    },
    ...mapState('app', ['windowHeight', 'isPC']),
    ...mapState('mt4AC', ['list']),
    ...mapGetters('account', ['realNameAuthed']),
  },
  components: {
    NavUser,NavMt4,
    // SubMenu:Menu.SubMenu,
    // MenuItem:Menu.Item,
  },
}

</script>
<style lang='scss' scoped>
.logo {
  width: 100%;
  height: 64px;
  // background: rgba(0, 111, 111, 1);
  // background: #f5222d;
  background: #002140;
  // background: linear-gradient(to bottom right, #fe7244 , #fe0000); /* 标准的语法 */
  position: absolute;
  top: 0;
  left: 0;
  overflow:hidden;
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
.nav-user{
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
.breadcrumb{
  margin-bottom: 10px;
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
    }
  }
  .ant-menu-dark {
    background: rgba(0,0,0,.65);
  }
}
</style>
