<template>
  <div>
    <BrokerAsyncTip></BrokerAsyncTip>
    <div class="l-search-box">
      <div class="agent_overview-search">
        <a-radio-group v-model="listType" style="margin:8px">
          <a-radio-button value="open">持仓订单</a-radio-button>
          <a-radio-button value="history">历史记录</a-radio-button>
        </a-radio-group>
        <PartnerSelect v-model="partnerUid"></PartnerSelect>
        <DepthSelect v-model="depth"></DepthSelect>
        <Mt4TypeSelect v-model="mt4Type"></Mt4TypeSelect>
        <AccountTypeSelect v-model="accountType"></AccountTypeSelect>
        <a-range-picker :ranges="{ '今天': [moment(), moment()], '近一周': [moment().add(-6,'day'), moment()] }" :defaultValue="[defaultStart,defaultEnd]" @change="onDateRangeChange" style="width: 240px" />
        <a-input style="width: 150px" v-model="search" placeholder="手机号/姓名" @keydown.enter="searchList" />
        <a-button @click="searchList" type="primary">查询</a-button>
      </div>
    </div>
    <div class="list broker-list pc">
      <a-table :pagination="pagination" bordered :dataSource="list.list" :rowKey="rowkey" :columns="columns" @change="onTableChange" :loading="loading">
        <template slot="action" slot-scope="createTime">
          <a-button size="small" type="primary" @click="">MT4账户</a-button>
          <a-button size="small" type="primary" @click="">MT4交易</a-button>
          <a-button size="small" type="primary" @click="">佣金报表</a-button>
        </template>
        <template slot="time" slot-scope="time">
          {{time | timeFull}}
        </template>
        <template slot="index" slot-scope="text, record, index">
          {{index + 1}}
        </template>
        <template slot="level" slot-scope="level">
          {{level | agentLevel}}
        </template>
        <template slot="user_account_type" slot-scope="user_account_type">
          {{user_account_type | guestType}}
        </template>
        <template slot="depth" slot-scope="depth">
          {{depth | guestDepth}}
        </template>
        <template slot="money" slot-scope="money">
          {{money | money}}
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import brokerSearchInputs from '../components/mixin/brokerSearchInputs.js'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import dateRange from './../components/mixin/dateRange.js'
import helper from '../utils/helper.js'
const CR = 'customRender'
const SS = 'scopedSlots'
const TT = 'title'
const DI = 'dataIndex'
const columnsOpen = [
  // {
  //   title: '关系',
  //   dataIndex: 'depth',
  //   // scopedSlots: { customRender: 'depth' },
  // }, 
  { title: "序列号", [DI]: "uid" },
  { title: "MT4账号", [DI]: "mt4_uid" },
  { title: "名字", [DI]: "name", width: "70px" },
  { title: "手机号", [DI]: "phone", width: "110px" },
  { title: "客户类型", [DI]: "user_account_type", [SS]: {
      [CR]: 'user_account_type' }, },
  { title: "客户关系", [DI]: "depth", [SS]: {
      [CR]: 'depth' }, },
  { title: "订单号", [DI]: "order_id", },
  { title: "交易对", [DI]: "symbol", },
  // { title: "方向", [DI]: "action", },
  { title: "数量", [DI]: "amount", },
  { title: "开仓价", [DI]: "open_price", },
  { title: "开仓时间", [DI]: "open_time", [SS]: {
      [CR]: 'time' }, },
  { title: "止损价", [DI]: "stop_loss", [SS]: {
      [CR]: 'money' }, },
  { title: "止盈价", [DI]: "take_profit", [SS]: {
      [CR]: 'money' }, },
  { title: "手续费", [DI]: "service_fee", [SS]: {
      [CR]: 'money' }, },
  { title: "库存费", [DI]: "rollver", [SS]: {
      [CR]: 'money' }, },
  { title: "亏盈", [DI]: "profit", },
]
const columnsHistory = [
  { title: "序列号", [DI]: "uid" ,[SS]:{[CR]:'index'}},
  { title: "MT4账号", [DI]: "mt4_uid" },
  { title: "名字", [DI]: "name", width: "70px" },
  { title: "手机号", [DI]: "phone", width: "110px" },
  { title: "客户类型", [DI]: "user_account_type", [SS]: {[CR]: 'user_account_type' }, },
  { title: "客户关系", [DI]: "depth", [SS]: {[CR]: 'depth' }, },
  { title: "订单号", [DI]: "order_id", },
  { title: "交易对", [DI]: "symbol", },
  // { title: "方向", [DI]: "action", },
  { title: "数量", [DI]: "amount", },
  { title: "开仓价", [DI]: "open_price", },
  { title: "平仓价", [DI]: "close_price", },
  { title: "开仓时间", [DI]: "open_time", [SS]: {[CR]: 'time' }, },
  { title: "平仓时间", [DI]: "close_time", [SS]: {[CR]: 'time' }, },
  { title: "止损价", [DI]: "stop_loss", [SS]: {[CR]: 'money' }, },
  { title: "止盈价", [DI]: "take_profit", [SS]: {[CR]: 'money' }, },
  { title: "手续费", [DI]: "service_fee", [SS]: {[CR]: 'money' }, },
  { title: "库存费", [DI]: "rollver", [SS]: {[CR]: 'money' }, },
  { title: "亏盈", [DI]: "profit", },
  { title: "净值", [DI]: "actual_profit", [SS]: {[CR]: 'money' }, },

]
export default {
  name: 'broker_trade',
  mixins: [brokerSearchInputs, dateRange],
  data() {
    return {
      listType: 'open',
      search: '',
      loading: false,
      currentPage: 1,
      savedParams: {
        listType: 'open'
      },
      getMethod: null
    }
  },
  created() {
    if(this.queryPhone){
      this.search = this.queryPhone
      this.partnerUid = this.queryPartnerUid
    }
    this.searchList()
  },
  methods: {
    searchList() {
      let params = {
        search: this.search,
        listType: this.listType,
        partnerUid: this.partnerUid,
        depth: this.depth,
        accountType: this.accountType,
        mt4AccountType: this.mt4Type,
        st: this.startDate,
        et: this.endDate,
      }
      this.savedParams = params
      this.currentPage = 1
      if (this.savedParams.listType === 'open') {
        this.getMethod = this.getOpenOrder
      } else if (this.savedParams.listType === 'history') {
        this.getMethod = this.getHistoryOrder
      }
      setTimeout(() => {
        this.getList()
      }, 20);
    },
    addFooterCount(){
      this.$nextTick(() => {
        if( this.list.length === 0 ){
          helper.removeTableFooter()
          return
        }
        let count = this.list.count
        let obj = {
          amount:count.total_amount,
          profit:count.total_profit,
          rollver:count.total_rollver,
          service_fee:count.total_service_fee/100,
        }
        if(this.savedParams.listType === "history"){
          obj.actual_profit = count.total_actual_profit
        }
        let data = helper.createTableFootData(this.columns,obj)
        helper.addTableFooter(data) 
      })
    },
    getList() {
      let params = {
        ...this.savedParams,
        page: this.pagination.current,
        limit: this.pagination.pageSize,
      }
      this.loading = true
      this.getMethod(params)
        .then(() => {
          this.addFooterCount()
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
    onTableChange(pagination) {
      this.currentPage = pagination.current
      this.getList()
      console.log('%c pagination', 'color:red', pagination)
    },
    rowkey(item, index) {
      return index
    },
    ...mapActions('broker', ["getOpenOrder", 'getHistoryOrder']),
  },
  computed: {
    columns() {
      if (this.savedParams.listType === 'open') {
        return columnsOpen
      } else if (this.savedParams.listType === 'history') {
        return columnsHistory
      }
    },
    // getMethod() {
    //   if(this.savedParams.listType === 'open'){
    //     return this.getOpenOrder
    //   }else if(this.savedParams.listType === 'history' ){
    //     return this.getHistoryOrder
    //   }
    // },
    list() {
      if (this.savedParams.listType === 'open') {
        return this.openOrderList
      } else if (this.savedParams.listType === 'history') {
        return this.historyOrderList
      }
    },
    pagination() {
      return {
        pageSize: 10,
        // showSizeChanger: true,
        size: 'small',
        total: this.list.total,
        current: this.currentPage,
      }
    },
    ...mapState('broker', ["openOrderList", "historyOrderList"]),
  },
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
