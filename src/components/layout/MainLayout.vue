<template>
  <a-layout id="appLayout">
    <a-layout-sider breakpoint="lg" v-model="collapsed" collapsedWidth="0" @collapse="onCollapse" ref="sider" >
      <div class="logo" />
      <a-menu ref="menu" theme="dark" mode="inline" v-model="current":defaultSelectedKeys="['4']" @click="onItemClick">
        <a-menu-item key="1" @click.native="go('/test5')" @click="onItemClick">
          <a-icon type="user" />
          <span class="nav-text" >test 5</span>
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
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="mail" /><span>Navigation 2</span></span>
          <a-menu-item key="9">Option 9</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout @click.native="onMainBodyClick">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" >
        <slot name="header"></slot>
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
import { mapState, mapMuations, mapActions, mapGetters } from 'vuex'
import helper from './../../utils/helper.js'
export default {
  name: 'MainLayout',
  data() {
    console.log('data')
    return {
      mode: 'inline',
      theme: 'light',
      current: ['4'],
      collapsed:false,
      //item 从 store 中获取
    }
  },
  created(){
    console.log('%c main layout created','color:red',)
  },
  mounted(){
    this.initSider()
  },
  methods: {
    onMainBodyClick(){
      this.hideMobileSider()
    },
    initSider(){
      if(this.isPC){
        return
      }
      let el = this.$refs.sider.$el
      el.style.position="absolute"
      el.style.height="100%"
      el.style.zIndex="2"
    },
    hideSider(){
      this.collapsed = true
    },
    showSider(){
      this.collapsed = false
    },
    hideMobileSider(){
      if(!this.isPC){
        this.hideSider()
      }
    },
    onItemClick(e){
      this.hideMobileSider()
      // this.$refs.sider.setCollapsed(true,'clickMenuItem')
    },
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    go(path){
      helper.goPage(path)
    },
  },
  computed: {
    contentHeight() {
      return this.windowHeight - (64 + 69 + 24) + 'px'
    },

    ...mapState('app', ['windowHeight','isPC'])
  },
  components: {},
}

</script>
<style lang='scss' scoped>
#appLayout .logo {
  height: 32px;
  background: rgba(255, 255, 255, .2);
  margin: 16px;
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
#appLayout{
  .ant-menu-item,.ant-menu-submenu-title{
    text-align: left;
  }
}
</style>
