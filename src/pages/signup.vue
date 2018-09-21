<template>
  <div class="signup-page">
    <h1 class="title">
      注册账号
      <a-divider />
    </h1>
    <div class="box">
      <Sign></Sign>
    </div>
  </div>
</template>

<script>
const Sign  = ()=> import ('../components/views/signup.vue')
export default {
  name:'signup',
  data() {
    return {
      
    }
  },
  methods: {},
  computed: {},
  components: {
    Sign,
  },
}
</script>

<style lang='scss' scoped>
.signup-page {
  position: fixed;
  overflow: auto;
  /*position: absolute;*/
  width: 100%;
  height: 100%;
  background: #fff;
  left: 0;
  top: 0;
  z-index: 99999;
  overflow: auto;
  /*padding:0 20px;*/
  .title{
    color:#666;
    font-size: 20px;
    text-align: center;
    line-height: 1;
    margin-top: 24px;
  }
  .box{
    padding:20px;
  }
}
</style>
