<template>
  <div class="mt4_money_bill-page">
    mt4_money_bill
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
export default {
  name:'mt4_money_bill',
  data() {
    return {
      
    }
  },
  created(){
    this.getList({
      mt4Uid:this.currentMt4Uid,
      type:'withdraw',
    
    })
  },
  methods: {
    ...mapActions('mt4Balance',['getList'])
  },
  computed: {
    ...mapState('mt4AC',['currentMt4Uid'])
  },
  components: {},
}
</script>

<style lang='scss' scoped>

</style>
