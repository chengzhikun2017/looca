<template>
  <div class="mt4_money_bill-page">
    <div class="search-box">
      <a-radio-group v-model="listType" style="margin:8px">
        <a-radio-button value="withdraw">出金</a-radio-button>
        <a-radio-button value="deposit">入金</a-radio-button>
        <a-radio-button value="withdraw_follow_settlement">出金（跟单结算）</a-radio-button>
      </a-radio-group>
      <Mt4Select></Mt4Select>
      <a-range-picker :ranges="{ '今天': [moment(), moment()], '近一周': [moment().add(-6,'day'), moment()] }" :defaultValue="[moment().add(-6,'day'), moment()]" @change="onDateRangeChange" />
      <a-button @click="getList" type="primary">查询</a-button>
    </div>
    <div class="mt4_money_bill-search-table-divider"></div>
    <div>
      <a-table :columns="columns" :rowKey="rowKey" :dataSource="list" :pagination="pagination" :loading="loading" @change="handleTableChange" v-if="isPC">
        <template slot="cardNum" slot-scope="cardNum">
          {{cardNum|bankCard}}
        </template>
        <template slot="money" slot-scope="money">
          {{money|money}}
        </template>
        <template slot="status" slot-scope="status">
          {{status|statusFilter}}
        </template>
        <template slot="type" slot-scope="type">
          {{type|typeFilter}}
        </template>
        <template slot="withdrawStatus" slot-scope="withdrawStatus">
          {{withdrawStatus|withdrawStatus}}
        </template>
        <template slot="createTime" slot-scope="createTime">
          <span class="time">
            {{createTime|timeFull}}
          </span>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
const Mt4Select = ()=> import( '../components/views/mt4Select.vue')
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  }, {
    title: 'MT4账号',
    dataIndex: 'mt4Uid',
  },
  {
    title: "类型",
    dataIndex: "type",
    // sorter: true,
    scopedSlots: { customRender: 'type' },
  }, {
    title: "MT4订单号",
    dataIndex: "orderId",
    // width: '60px',
  }, {
    title: "金额($)",
    dataIndex: "dollar",
    scopedSlots: { customRender: 'money' },
    // width: "90px",
  }, {
    title: "手续费",
    dataIndex: "serviceFee",
    // width: "150px",
    scopedSlots: { customRender: 'money' },
  }, {
    title: "状态",
    dataIndex: "status",
    scopedSlots: { customRender: 'status' },
    // width: '60px',
  }, {
    title: "业务流水号",
    dataIndex: "tradeNo",
    // width: '60px',
  },  {
    title: "时间",
    dataIndex: "createTime",
    scopedSlots: { customRender: 'createTime' },
    // width: '60px',
  },

]
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'mt4_money_bill',
  data() {
    return {
      loading: false,
      listType:'withdraw',
      pagination: {
        pageSize: 2,
        showSizeChanger: true,
        current: 1,
        size: 'small',
        total: 0,
      },
      startDate:'',
      endDate:'',
      columns,
    }
  },
  created() {
    this.getList()
  },
  filters:{
    statusFilter(v){
      switch(v){
        case 0:return "正在处理";
        case 1:return "完成";
        case 2:return "失败";
      }
    },
    typeFilter(v){
      //withdraw 出金 、 deposit 入金 、 withdraw_follow_settlement
      switch(v){
        case 'withdraw':return "出金";
        case 'deposit':return "入金";
        case 'withdraw_follow_settlement':return "出金（跟单结算）";
      }
    },
  },
  methods: {
    rowKey(record) {
      return record.orderId
    },
    onDateRangeChange(date, dateString){
      // console.log('%c date, dateString','color:red',date, dateString)
      this.startDate = dateString[0]
      this.endDate = dateString[1]
    },
    handleTableChange(pagination) {
      this.pagination = pagination
      this.getList()
    },
    getList(){
      this._getList(this.params)
    },
    ...mapActions('mt4Balance', {
      _getList:'getList',
    })
  },
  computed: {
    params(){
      return {
        mt4Uid:this.currentMt4Uid,
        type:this.listType,
        page:this.pagination.current,
        limit:this.pagination.pageSize,
        st:this.startDate,
        et:this.endDate,
      }
    },
    ...mapState('mt4AC', ['currentMt4Uid']),
    ...mapState('mt4Balance', ['list','ttlQty','ttlPage']),
    ...mapState('app', ['isPC']),
  },
  components: {
    Mt4Select,
  },
}

</script>
<style lang='scss' scoped>
  $prefix: "mt4_money_bill";
  @import '@/styles/utils/divider.scss'
</style>
