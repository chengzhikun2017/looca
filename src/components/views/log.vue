<template>
  <!-- <div class="log-vue" v-if='false'> -->
  <div class="log-vue" v-if='true'>
    <div class="log-box">
      <div class="header">
        <img src="" alt="" class="log">
        <span class="title">Loo&co</span>
      </div>
      <div class="tabs-box">
        <a-tabs defaultActiveKey="2" @change="callback">
          <a-tab-pane tab="立即登录" key="1">
            <Log></Log>
          </a-tab-pane>
          <a-tab-pane tab="免费注册" key="2" forceRender>
            <Sign></Sign>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Log from "./login.vue"
import Sign from "./signup.vue"
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
  components: {
    Log,
    Sign,
  },
}

</script>
<style lang='scss' scoped>
.log-vue {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  left: 0;
  top: 0;
  z-index: 2;
}

.tabs-box {
  padding:20px;
  padding-top: 40px;
  border-radius: 5px;
  background: #fff;
}

.log-box {
  width: 360px;
  margin: 0 auto;
  margin-top: 80px;
  .header {
    height: 30px;
    .title{
      color: #eee;
      font-style: italic;
      font-weight: bold;
      font-size: 18px;
      margin-left: 20px;
    }
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
    text-align: center;
  }
}
</style>
