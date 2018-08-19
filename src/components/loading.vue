<template>
  <div class="l-loading" v-if='isLoading>0'>
    <div class="container l-position-cc">
      <a-spin size="large" tip="loading"></a-spin>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'loading',
  data() {
    return {
      
    }
  },
  methods: {},
  computed: {
    ...mapState('feedback',['isLoading','loadingText'])
  },
  components: {},
}
</script>

<style lang='scss' scoped>
.l-loading{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  left: 0;
  top: 0;
  z-index: 9999;
  .container{
    width: 40px;
    height: 40px;
  }
}
</style>
