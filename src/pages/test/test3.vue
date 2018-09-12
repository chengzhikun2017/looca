<template>
  <div class="test3">
    <DateRange ></DateRange>
    <div  v-infinite-scroll="handleInfiniteOnLoad" v-if=false :infinite-scroll-disabled="busy" :infinite-scroll-distance="80">
      <a-list :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a class="test" :href="item.actionType">{{item.symbol}}</a>
            <!-- <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> -->
          <div>Content</div>
        </a-list-item>
        <div v-if="loading && !busy" class="demo-loading-container">
          <a-spin />
        </div>
      </a-list>
    </div>
  </div>
</template>
<script>
const DateRange = ()=> import( '../../components/container/DateRange.vue')

import Vue from 'vue'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'test3',
  data() {
    return {
      busy: false,
      data: [],
      loading: false,
      currentPage:1,
    }
  },
  created() {
    // setTimeout(()=> {
    //   Vue.prototype.__test = '111'
    //   // this.__test = 3000
    // }, 3000);
    this.getData()
  },
  methods: {
    getData(callback){
      console.log('%c get data','color:red',)
      let params = {
        // st,
        // et,
        page:this.currentPage,
      }
      this.getTradeHistory()
      .then(() => {
        this.tradeList.list.forEach((item) => {
          this.data.push(item) 
          this.currentPage++
          callback&&callback()
        })
      })
    },
    handleInfiniteOnLoad() {
      console.log('%c infinite scroll','color:red',)
      const data = this.data
      this.loading = true
      if (data.length > this.tradeList.ttlQty-60) {
        this.$message.warning('Infinite List loaded all')
        console.log('%c loaded all','color:red',)
        this.busy = true
        this.loading = false
        return
      }
      this.getData(() => {
        this.loading = false 
      })
      
    },
    ...mapActions("trade", ['getTradeHistory']),
  },
  computed: {
    ...mapState('trade',['tradeList']),
  },
  components: {
    DateRange,
  },
}

</script>
<style lang='scss' scoped>


</style>
<style >
.test3{
  height: 100%;
}
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 300px;
}

.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
.test {
  height: 100px;
}
</style>
