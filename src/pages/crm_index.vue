<template>
  <div class="crm-index">
    <a-layout>
      <a-layout-sider>Sider</a-layout-sider>
      <a-layout>
        <a-layout-header>
          <a-menu v-model="current" mode="horizontal">
            <a-menu-item key="app" disabled>
              111
              <a-icon type="appstore" />Navigation Two
            </a-menu-item>
            <a-menu-item key="mail">
              Navigation One
            </a-menu-item>
                  <a-sub-menu title="子菜单">
              <a-menu-item>子菜单项</a-menu-item>
            </a-sub-menu>
                  <a-menu-item key="app" disabled>
              <a-icon type="appstore" />Navigation Two
            </a-menu-item>
                  <a-sub-menu>
              <span slot="title"><a-icon type="setting" />Navigation Three - Submenu</span>
              <a-menu-item-group title="Item 1">
                <a-menu-item key="setting:1">Option 1</a-menu-item>
                <a-menu-item key="setting:2">Option 2</a-menu-item>
              </a-menu-item-group>
              <a-menu-item-group title="Item 2">
                <a-menu-item key="setting:3">Option 3</a-menu-item>
                <a-menu-item key="setting:4">Option 4</a-menu-item>
              </a-menu-item-group>
            </a-sub-menu>
                  <a-menu-item key="alipay">
              <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
            </a-menu-item>
          </a-menu>
        </a-layout-header>
        <a-layout-content>Content</a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>

  </div>
</template>
<script>
export default {
  name: 'crm_index',
  data() {
    return {
      mode: 'inline',
           theme: 'light',
      current: ['mail'],
    }
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
