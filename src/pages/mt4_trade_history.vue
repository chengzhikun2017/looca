<template>
  <div class="mt4_trade_history-page">
      trade history
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
export default {
  name:'mt4_trade_history',
  data() {
    return {
      
    }
  },
  created(){
    this.getCurrentHistory()
  },
  methods: {
    ...mapActions('trade',['getCurrentHistory']),
  },
  computed: {
    ...mapState('mt4AC',[]),
  },
  components: {},
}
</script>

<style lang='scss' scoped>

</style>
