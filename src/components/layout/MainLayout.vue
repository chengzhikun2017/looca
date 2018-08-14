<template>
  <a-layout id="appLayout">
    <a-layout-sider breakpoint="lg" v-model="collapsed" collapsedWidth="0" @collapse="onCollapse" ref="sider">
      <a-menu ref="menu" theme="dark" mode="inline" v-model="current" :defaultSelectedKeys="['4']" @click="onItemClick">
        <a-menu-item key="1" @click.native="go('/test5')" @click="onItemClick">
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
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
          <a-menu-item key="mine_cards">我的银行卡</a-menu-item>
          <a-menu-item key="mine_real">实名信息</a-menu-item>
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="mail" /><span>Navigation 2</span></span>
          <a-menu-item key="9">Option 9</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
          <a-menu-item key="11">Option 10</a-menu-item>
          <a-menu-item key="12">Option 10</a-menu-item>
          <a-menu-item key="13">Option 10</a-menu-item>
          <a-menu-item key="14">Option 10</a-menu-item>
          <a-menu-item key="15">Option 10</a-menu-item>
          <a-menu-item key="16">Option 10</a-menu-item>
        </a-sub-menu>
      </a-menu>
      <div class="logo" />
    </a-layout-sider>
    <a-layout @click.native="onMainBodyClick">
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <slot name="header"></slot>
        <div class="nav-user">
          <NavUser></NavUser>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div class="content" :style="{height:contentHeight}">
          <slot></slot>
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">
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
    console.log('%c main layout created', 'color:red', )
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
      console.log('%c e','color:red',e)
      switch(e.key){
        case "mine_cards":this.go('/mine_cards');break;
        case "mine_real":this.go('/mine_real');break;
      }
      this.hideMobileSider()
      // this.$refs.sider.setCollapsed(true,'clickMenuItem')
    },
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    go(path) {
      helper.goPage(path)
    },
  },
  computed: {
    contentHeight() {
      return this.windowHeight - (64 + 69 + 24) + 'px'
    },
    siderHeight() {
      return this.windowHeight - 64 + 'px'
    },
    ...mapState('app', ['windowHeight', 'isPC'])
  },
  components: {
    NavUser,
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
