<template>
  <div class="mt4_trade_history-page">
    <div class="choose-box">
      <a-radio-group v-model="listType" style="margin:8px">
        <a-radio-button value="trade">交易记录</a-radio-button>
        <a-radio-button value="open">持仓订单</a-radio-button>
      </a-radio-group>
    </div>
    <div class="search-box">
      <a-range-picker
        :ranges="{ '今天': [moment(), moment()], '近一周': [moment().add(-6,'day'), moment()] }"
        :defaultValue="[moment().add(-6,'day'), moment()]"
        @change="onDateRangeChange" 
      />
      <a-button @click="getList" type="primary">search</a-button>
    </div>
     <div>
       <a-table :columns="columns"
           :rowKey="rowKey"
           :dataSource="list"
           :pagination="pagination"
           :loading="loading"
           @change="handleTableChange"
           v-if="isPC"
         >
        <template slot="openTime" slot-scope="openTime">
          <span class="time">
            {{openTime|timeFull}}
          </span>
        </template>
        <template slot="closeTime" slot-scope="closeTime">
          <span class="time">
            {{closeTime|timeFull}}
          </span>
        </template>
       </a-table>
     </div>
  </div>
</template>

<script>
  const columns = [{
    title: 'MT4 ID',
    dataIndex: 'mt4Uid',
    // sorter: true,
    // width: '20%',
    // scopedSlots: { customRender: 'name' },
  }, 
  // {
  //   title: '名字',
  //   dataIndex: 'fullName',
  //   // filters: [
  //   //   { text: 'Male', value: 'male' },
  //   //   { text: 'Female', value: 'female' },
  //   // ],
  //   width: '20%',
  // },
  {
    title:"orderId",
    dataIndex:"orderId",
    sorter:true,
    // scopedSlots: { customRender: 'action' },
  },{
    title:"数量",
    dataIndex:"amount",
    width:'60px',
  },{
    title:"开仓价",
    dataIndex:"openPrice",
    width:"90px",
  },{
    title:"开仓时间",
    dataIndex:"openTime",
    width:"150px",
    scopedSlots: { customRender: 'openTime' },
  },{
    title:"平仓价",
    dataIndex:"closePrice",
    width:"90px",
  },{
    title:"平仓时间",
    dataIndex:"closeTime",
    width:"150px",
    scopedSlots: { customRender: 'closeTime' },
  },{
    title:"止损价",
    dataIndex:"stopLoss",
  },{
    title:"止盈价",
    dataIndex:"takeProfit",
  },{
    title:"隔夜利息",
    dataIndex:"rollver",
  },{
    title:"获利",
    dataIndex:"profit",
    // width:'60px',
  },{
    title:"orderId",
    dataIndex:"ord123erId",
  }];
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
export default {
  name:'mt4_trade_history',
  data() {
    return {
      listType:'trade',
      loading: false,
      columns:columns,
      startDate:'',
      endDate:'',
      _pagination:{
        current:0,
      },
    }
  },
  created(){
    // this.getList()
    // setTimeout(()=> {
    // this.getTradeHistory()
    // }, 3000);
  },
  methods: {
    onDateRangeChange(date, dateString){
      // console.log('%c date, dateString','color:red',date, dateString)
      this.startDate = dateString[0]
      this.endDate = dateString[1]
    },
    rowKey(record){
      return record.orderId
    },
    handleTableChange(pagination){
      console.log('%c pagination','color:red',pagination)
      this._pagination = pagination
      this.$nextTick(() => {
         
      this.getList()
      })
    },
    getList(){
      this._getList({
        page:this.pagination.current,
        limit:this.pagination.pageSize,
        st:this.startDate,
        et:this.endDate,
      })
    },
    ...mapActions('trade',{
      tradeListGet:"getTradeHistory",
      openListGet:"getOpenHistory",
    }),
  },
  computed: {
    pagination(){
      let pagination = this._pagination
      console.log('%c this pagination','color:red',pagination)
      return Object.assign({
        pageSize:10,
        showSizeChanger:true,
        size:'small',
        total:this._list.ttlQty,
      },pagination)
    },
    _getList(){
      return this[`${this.listType}ListGet`]
    },
    _list(){
      return this[`${this.listType}List`] || {}
    },
    list(){
      return this._list.list
    },
    ...mapState('trade',['summeray','tradeList','openList']),
    ...mapState('app',['isPC']),
    ...mapState('mt4AC',['currentMt4Uid']),
  },
  watch:{
    ttlQty(v){
      this.pagination.total = v
    },
    currentMt4Uid(v){
      this.getList()
    },
  },
  components: {},
}
</script>

<style lang='scss' scoped>

.time{
  font-size: 12px;
}
</style>
<style lang='scss'>
.mt4_trade_history-page{
  .ant-table-tbody{
    font-size: 12px;
  }
  .ant-table-tbody{
    /*color:red;*/
  }
}
</style>