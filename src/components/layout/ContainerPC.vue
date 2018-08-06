<template>
  <a-layout id="appLayout">
    <a-layout-sider breakpoint="lg" collapsedWidth="0" @collapse="onCollapse">
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['4']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span class="nav-text">nav 22</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="user" />
          <span class="nav-text">nav 4</span>
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
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div class="content" :style="{height:contentHeight}">
          content
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
import { mapState, mapMuations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'ContainerPC',
  data() {
    return {
      mode: 'inline',
      theme: 'light',
      current: ['mail'],
    }
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    }
  },
  computed: {
    contentHeight() {
      return this.windowHeight - (64 + 69 + 24) + 'px'
    },
    ...mapState('app', ['windowHeight'])
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
}

</style>
<style lang="scss">
#appLayout{
  .ant-menu-item,.ant-menu-submenu-title{
    text-align: left;
  }
}
</style>
