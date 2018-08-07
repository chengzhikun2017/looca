<template>
  <div class="log-vue" v-if='false'>
    <div class="log-box">
      <div class="header">
        <img src="" alt="" class="log">
      </div>
      <div class="tabs-box">
        <a-tabs defaultActiveKey="1" @change="callback">
          <a-tab-pane tab="立即登录" key="1">

          </a-tab-pane>
          <a-tab-pane tab="免费注册" key="2" forceRender>
          </a-tab-pane>
          <!-- <a-tab-pane tab="Tab 3" key="3">Content of Tab Pane 3</a-tab-pane> -->
        </a-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'log',
  data() {
    return {

    }
  },
  methods: {
    callback(...args) {
      console.log('%c args', 'color:red', args)
    },
  },
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>
.log-vue {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  left: 0;
  top: 0;
}

.tabs-box {
  padding:20px;
  padding-top: 40px;
  border-radius: 5px;
  background: #fff;
}

.log-box {
  width: 400px;
  margin: 0 auto;
  margin-top: 80px;
  .header {
    border: 1px solid red;
    height: 30px;
  }
}

</style>
<style lang="scss">

.log-vue{
  .ant-tabs-nav{
    width: 100%;
  }
  .ant-tabs-tab{
    width:50%;
    margin-right: 0;
  }
}
</style>
