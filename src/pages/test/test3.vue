<template>
  <div class="test3">
    <box>
      <l-search-item >
        <DateRange @dateRangeChange="onChange"></DateRange>
      </l-search-item>
      <l-search-item>
        <DateRange @dateRangeChange="onChange"></DateRange>
      </l-search-item>
    </box>
    <ListPhone v-if="false" :data="data" :loading="loading" :loadmore="getData">
      <div slot-scope="props,index">{{props.item}}</div>
    </ListPhone>
    <!-- <div  v-infinite-scroll="handleInfiniteOnLoad" v-if=false :infinite-scroll-disabled="busy" :infinite-scroll-distance="80">
      <a-list :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a class="test" :href="item.actionType">{{item.symbol}}</a>
          <div>Content</div>
        </a-list-item>
        <div v-if="loading && !busy" class="demo-loading-container">
          <a-spin />
        </div>
      </a-list>
    </div> -->
  </div>
</template>
<script>
import _ from 'underscore'
const DateRange = ()=> import( '../../components/container/DateRange.vue')
const ListPhone = ()=> import( '../../components/container/ListPhone.vue')
const box = ()=> import( '../../components/container/SearchToggle.vue')

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
    onChange(date,strs){
      console.log('%c on date range change','color:red',date,strs)
    },
    getData(callback){
      console.log('%c get data','color:red',)
      let params = {
        // st,
        // et,
        page:this.currentPage,
      }
      this.loading = true
      this.getTradeHistory()
      .then(() => {
        if(this.data.length<10){
          this.tradeList.list.forEach((item) => {
            this.data.push(item)

            this.currentPage++
              callback && callback()
          })
        }
      })
      .finally(() => {
        // this.loading = false 
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
        // this.loading = false
        return
      }
      this.getData(() => {
        // this.loading = false 
      })
      
    },
    ...mapActions("trade", ['getTradeHistory']),
  },
  computed: {
    ...mapState('trade',['tradeList']),
  },
  components: {
    DateRange,box,ListPhone,
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
