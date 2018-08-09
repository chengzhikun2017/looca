<template>
  <div class="loading-vue" v-if='isLoading>0'>
    
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
.loading-vue{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  left: 0;
  top: 0;
  z-index: 999;
}
</style>
