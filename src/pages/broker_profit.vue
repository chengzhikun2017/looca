<template>
  <div>
    <BrokerAsyncTip></BrokerAsyncTip>
    <div class="l-search-box">
      <div class="agent_overview-search">
        <a-radio-group v-model="listType" style="margin:8px">
          <a-radio-button value="point">手续费</a-radio-button>
          <a-radio-button value="follow">跟单佣金</a-radio-button>
        </a-radio-group>
        <PartnerSelect v-model="partnerUid" :containSelf="true"></PartnerSelect>
        <DepthSelect v-model="depth"></DepthSelect>
        <!-- <Mt4TypeSelect v-model="mt4Type"></Mt4TypeSelect> -->
        <!-- <AccountTypeSelect v-model="accountType"></AccountTypeSelect> -->
        <a-range-picker :ranges="{ '今天': [moment(), moment()], '近一周': [moment().add(-6,'day'), moment()] }" :defaultValue="[defaultStart,defaultEnd]" @change="onDateRangeChange" style="width: 240px" />

        <a-input style="width: 150px" v-model="childSearch" placeholder="代理商手机号/姓名" @keydown.enter="searchList" />
        <a-input style="width: 100px" v-model="search" placeholder="手机号/姓名" @keydown.enter="searchList" />
        <a-button @click="searchList" type="primary">查询</a-button>
      </div>
    </div>
    <div class="list broker-list ">
      <a-table :pagination="pagination" bordered :dataSource="list.list" :rowKey="rowkey" :columns="columns" @change="onTableChange" :loading="loading">
        <template slot="action" slot-scope="text,record,index">
          <a-button size="small" type="primary" @click="viewDetail(record)">
            详情
          </a-button>
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
    <div class="list-detail ">
      <a-modal  width="1248px" title="跟单详情" :visible="listDetailShow" @ok="handleOk"  @cancel="handleCancel">
        <div class="broker-list">
        <a-table :pagination="false"  bordered :dataSource="followDetailList" :rowKey="rowkey2" :columns="detailColums"  :loading="followDetailLoading">
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
          followCycleSt 至 followSettlementTradeNo
          <template slot="period" slot-scope="text,record">
            {{record.followCycleSt|timeFull}} ~ {{record.followCycleEt|timeFull}}
            <!-- followCycleSt 至 followSettlementTradeNo -->
          </template>
        </a-table>
        </div>
      </a-modal>

    </div>
  </div>
</template>

<script>
import helper from './../utils/helper.js'
import brokerSearchInputs from '../components/mixin/brokerSearchInputs.js'
import dateRange from './../components/mixin/dateRange.js'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
const CR = 'customRender'
const SS = 'scopedSlots'
const TT = 'title'
const DI = 'dataIndex'
const columnsPoint = [
  { title: "序列号", [DI]: "",[SS]:{[CR]:'index'} },
  { title: "代理商名字", [DI]: "name" },
  { title: "代理商手机号", [DI]: "phone", width: "70px" },
  { title: "客户名字", [DI]: "guest_name", width: "110px" },
  { title: "客户手机号", [DI]: "guest_phone" },
  { title: "客户关系", [DI]: "depth", [SS]: {[CR]: 'depth' }, },
  { title: "类型", [DI]: "type" ,[SS]: {[CR]: 'type' }, },
  { title: "订单号", [DI]: "order_id", },
  { title: "交易对", [DI]: "symbol", },
  { title: "方向", [DI]: "action", },
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
  { title: "佣金", [DI]: "fee", [SS]: {[CR]: 'money' },},
  { title: "时间", [DI]: "create_time", [SS]: {[CR]: 'time' },},
]
const columnsFollow = [
  { title: "序列号", [DI]: "",[SS]:{[CR]:'index'} },
  { title: "代理商名字", [DI]: "name" },
  { title: "代理商手机号", [DI]: "phone", width: "70px" },
  { title: "客户名字", [DI]: "guest_name", width: "110px" },
  { title: "客户手机号", [DI]: "guest_phone" },
  { title: "客户级别", [DI]: "depth", [SS]: {[CR]: 'depth' }, },
  { title: "业务编号", [DI]: "trade_no" },
  { title: "类型", [DI]: "type" },
  { title: "佣金", [DI]: "fee", [SS]: {[CR]: 'money' }, },
  { title: "时间", [DI]: "create_time",[SS]: {[CR]: 'time' },},
  { title:"操作",[DI]:"",[SS]: { [CR]: 'action' },width:"80px"},
]
const detailColums = [
  { title: "序列号", [DI]: "",[SS]:{[CR]:'index'} },
  { title: "MT4账号", [DI]: "mt4Uid", },
  { title: "订单号", [DI]: "orderId", },
  { title: "交易对", [DI]: "symbol", },
  { title: "方向", [DI]: "actionType", },
  { title: "数量", [DI]: "amount", },
  { title: "开仓价", [DI]: "openPrice", },
  { title: "平仓价", [DI]: "closePrice", },
  { title: "开仓时间", [DI]: "openTime", [SS]: {[CR]: 'time' }, },
  { title: "平仓时间", [DI]: "closeTime", [SS]: {[CR]: 'time' }, },
  { title: "止损价", [DI]: "stopLoss", [SS]: {[CR]: 'money' }, },
  { title: "止盈价", [DI]: "takeProfit", [SS]: {[CR]: 'money' }, },
  { title: "手续费", [DI]: "serviceFee", [SS]: {[CR]: 'money' }, },
  { title: "库存费", [DI]: "rollver", [SS]: {[CR]: 'money' }, },
  { title: "亏盈", [DI]: "profit", },
  { title: "净值", [DI]: "actualProfit", [SS]: {[CR]: 'money' }, },
  { title: "结算周期", [DI]: "___", [SS]: {[CR]: 'period' },},
  // ： followCycleSt 至 followSettlementTradeNo
]
export default {
  name:'broker_profit',
  mixins: [brokerSearchInputs, dateRange],
  data() {
    return {
      detailColums,
      listDetailShow:false,
      followDetailLoading:false,
      followDetailList:[],
      listType: 'point',
      search: '',
      // columns:columnsOpen,
      loading: false,
      currentPage: 1,
      savedParams: {
        brokerageType: 'point'
      },
      partnerUid:0,
      childSearch:"",
    }
  },
  created(){
    if(this.queryPhone){
      this.search = this.queryPhone
      this.partnerUid = this.queryPartnerUid
    }
    this.searchList()
  },
  methods: {
    handleOk(){
      this.listDetailShow = false
    },
    handleCancel(){
      this.listDetailShow = false
    },
    viewDetail(record){
      this.listDetailShow = true
      this.followDetailLoading = true
      this.getFollowDetail(record.trade_no)
      .then((res) => {
        console.log('%c followDetail','color:red',res)
        this.followDetailList = res.list
        this.followDetailLoading = false
      })
      .finally(() => {
        this.followDetailLoading = false 
      })
      console.log('%c tradeNo','color:red',record)
      //
    },
    searchList() {
      let params = {
        search: this.search,
        childSearch: this.childSearch,
        brokerageType: this.listType,
        partnerUid: this.partnerUid,
        depth: this.depth,
        accountType: this.accountType,
        mt4AccountType: this.mt4Type,
        st: this.startDate,
        et: this.endDate,
      }
      this.savedParams = params
      this.currentPage = 1
      console.log('%c -----', 'color:red', )
      setTimeout(() => {
        this.getList()
      }, 20);
    },
    addFooterCount(){
      this.$nextTick(() => {
        if( this.list.list.length === 0 ){
          helper.removeTableFooter()
          return
        }
        let count = this.list.count
        let data = helper.createTableFootData(this.columns,{
          fee:count.total_fee / 100,
        })
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
      this.getProfit(params)
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
    rowkey2(item,index) {
      console.log('%c item','color:red',item)
      return Math.random()
    },
    ...mapActions('broker', ["getProfit","getFollowDetail"]),

  },
  computed: {
    columns() {
      if (this.savedParams.brokerageType === 'follow') {
        return columnsFollow
      } else if (this.savedParams.brokerageType === 'point') {
        return columnsPoint
      }
    },
    list() {
      return this.profitList
      // if (this.savedParams.listType === 'follow') {
      //   return this.openOrderList
      // } else if (this.savedParams.listType === 'point') {
      //   return this.historyOrderList
      // }
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
    ...mapState('broker', ["profitList"]),
  },
  components: {},
}
</script>

<style lang='scss' scoped>

</style>
