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
        <a-sub-menu :key="topMenu.key" v-for="topMenu in menuConfig">
          <span slot="title"><a-icon :type="topMenu.icon" /><span>{{topMenu.title}}</span></span>
          <a-menu-item v-for="subMenu in topMenu.children"  :key="subMenu.link">{{subMenu.title}}</a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="agent">
          <span slot="title"><a-icon type="mail" /><span>代理推广</span></span>
          <a-menu-item key="33">我的推广</a-menu-item>
          <a-menu-item key="55">返利记录</a-menu-item>
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
      <a-layout-footer style="textAlign: center" v-if="!isPC">
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
  mt4_create:{title:"开立账户",link:"mt4_create",rootKey:'mt4_account'},
  mt4_overview:{title:"账号列表",link:"mt4_overview",rootKey:'mt4_account'},
  mt4_modifypwd:{title:"修改密码",link:"mt4_modifypwd",rootKey:'mt4_account'},
  mt4_bind:{title:"绑定账号",link:"mt4_bind",rootKey:'mt4_account'},
  mt4_findpwd:{title:"忘记密码",link:"mt4_findpwd",rootKey:'mt4_account'},

  mt4_trade:{title:'MT4交易管理'},
  mt4_trade_history:{title:"交易记录：持仓和历史记录",link:"mt4_trade_history",rootKey:'mt4_trade'},
  _1:{title:"我要跟单：前往activ8",link:"mt4_findpwd",rootKey:'mt4_trade'},
  _2:{title:"在线入金",link:"mt4_findpwd",rootKey:'mt4_trade'},
  _3:{title:"出金申请",link:"mt4_findpwd",rootKey:'mt4_trade'},
  _4:{title:"出入金记录",link:"mt4_findpwd",rootKey:'mt4_trade'},

}
import { mapState, mapMutations
, mapActions, mapGetters } from 'vuex'
import helper from './../../utils/helper.js'
import NavUser from './../views/navUser.vue'
import NavMt4 from './../views/navMt4.vue'
export default {
  name: 'MainLayout',
  data() {
    return {
      mode: 'inline',
      theme: 'light',
      current: ['4'],
      collapsed: false,
      header: {
      },
      config,
      menuConfig:[
        {
          key:'user',
          title:'个人信息',
          link:null,
          icon:'user',
          ...config.user,
          children:[
            config.mine_cards,
            config.mine_real,
            config.modifypwd,
          ],
        }, {
          key:'mt4_account',
          title:'个人信息',
          link:null,
          icon:'user',
          ...config.mt4_account,
          children:[
            config.mt4_create,
            config.mt4_overview,
            config.mt4_modifypwd,
            config.mt4_bind,
            config.mt4_findpwd,
          ],
        }
        , {
          key:'mt4_trade',
          title:'MT4交易管理',
          link:null,
          icon:'user',
          ...config.mt4_trade,
          children:[
            config.mt4_trade_history,
            // config.mt4_overview,
            // config.mt4_modifypwd,
            // config.mt4_bind,
            // config.mt4_findpwd,
          ],
        }
      ],
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
    // routePath(path){
    //   let paths =[]
    //   paths.push(path)
    //   let rootKey =this.config[path].rootKey
    //   while(rootKey){
    //     paths.push(this.config[rootKey])
    //     rootKey = this.config[rootKey].rootKey
    //   }
    //   this.keyPath = paths
    // },
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

}

</style>
