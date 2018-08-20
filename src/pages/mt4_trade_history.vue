<template>
  <div class="mt4_trade_history-page">
     <div v-if="listGot">
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
      loading: false,
      columns:columns,
      pagination:{
        pageSize:10,
        showSizeChanger:true,
        current:3,
        size:'small',
        total:0,
      },
    }
  },
  created(){
    this.getCurrentHistory()
    // setTimeout(()=> {
    // this.getCurrentHistory()
    // }, 3000);
  },
  methods: {
    rowKey(record){
      return record.orderId
    },
    handleTableChange(pagination){
      console.log('%c pagination','color:red',pagination)
      this.pagination = pagination
      this.getList()
    },
    getList(){
      this.getCurrentHistory({
        page:this.pagination.current,
        limit:this.pagination.pageSize,
      })
    },
    ...mapActions('trade',['getCurrentHistory']),
  },
  computed: {
    // pagination:{
    //   get(){
    //     return this._pagination
    //   },
    //   set(v){
    //     // v.total = this.ttlQty
    //     this._pagination = v
    //   },
    // },
    ...mapState('trade',['listGot','list','ttlQty']),
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