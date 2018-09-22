<template>
  <div class="signup-page">
    <h1 class="title">
      注册账号
      <a-divider />
    </h1>
    <div class="box">
      <div class="container"> 
        <Sign></Sign>
      </div>
    </div>
  </div>
</template>

<script>
const Sign  = ()=> import ('../components/views/signup.vue')
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
export default {
  name:'signup',
  data() {
    return {
      
    }
  },
  mounted(){
    this.setShareInfo({uid:this.$route.query.uid})
  },
  methods: {
    ...mapMutations('account',['setShareInfo']),
  },
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
  /*background: #000;*/
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
    display: flex;
    justify-content: center;
    
  }
  .container{
    width: 320px;
  }
}
</style>
