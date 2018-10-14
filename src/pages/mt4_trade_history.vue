<template>
  <div class="mt4_trade_history-page">
    <SearchToggle v-if="!isPC" @ok="searchPhoneList">
      <l-search-item>
        <a-radio-group v-model="listType">
          <a-radio-button value="trade">交易记录</a-radio-button>
          <a-radio-button value="open">持仓订单</a-radio-button>
        </a-radio-group>
      </l-search-item>
      <l-search-item>
        <DateRange @dateRangeChange="onDateRangeChange" :defaultValue="[defaultStart,defaultEnd]" />
      </l-search-item>
      <l-search-item>
        <Mt4Select></Mt4Select>
      </l-search-item>
    </SearchToggle>
    <div class="search-box pc">
      <a-radio-group v-model="listType" style="margin:8px">
        <a-radio-button value="trade">交易记录</a-radio-button>
        <a-radio-button value="open">持仓订单</a-radio-button>
      </a-radio-group>
      <Mt4Select></Mt4Select>
      &nbsp;
      <a-range-picker :ranges="{ '今天': [moment(), moment()], '近一周': [moment().add(-6,'day'), moment()] }" :defaultValue="[defaultStart,defaultEnd]" @change="onDateRangeChange" /> &nbsp;
      <a-button @click="searchList" type="primary">查询</a-button>
    </div>
    <Mt4SyncFail :success="showSyncFail" :reSyncFunc="getList" > </Mt4SyncFail>
    <a-alert type="success" v-if="showingList.syncSuccess && showingPhoneListType==='trade' && summaryGot">
      <div class="summary" slot="description" flex>
        <!-- <label for="">总览：</label> -->
        <div flex-box="5">
          <div>
            全部笔数：{{summary.total}}
          </div>
          <div>
            盈利笔数：{{summary.win}}
          </div>
        </div>
        <div flex-box="1">
          <div>
            实际盈利：${{summary.profit }}
          </div>
          <div>
            亏损笔数：{{summary.loss}}
          </div>
        </div>
      </div>
    </a-alert>
    <div class="list-box pc" v-if="syncSuccess">
      <a-table :columns="columns" :rowKey="rowKey" :dataSource="list" :pagination="pagination" :loading="loading" @change="handleTableChange" v-if="isPC">
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
    <!-- data -->
    <!-- nomore -->
    <!-- slot item -->
    <!-- loadmore -->
    <div class="list-box phone" v-if="!isPC">
      <ListPhone :newList="list" ref="listPhone" :params="paramsPhone" :getFunc="_getList" :total="_list.ttlQty" @loadStart="listPhoneLoading=true" @loadStop="listPhoneLoading=false">
        <!-- <mt4TradeItem slot-scope="props" :info="props.item" ></mt4TradeItem> -->
        <template slot-scope="props">
          <mt4TradeListItem  :info="props.item" v-if="showingPhoneListType=='trade'"></mt4TradeListItem>
          <openOrderListItem  :info="props.item" v-if="showingPhoneListType=='open'"></openOrderListItem>
        </template>
      </ListPhone>
    </div>
  </div>
</template>
<script>
const Mt4SyncFail = () =>
  import ('../components/container/mt4SyncFail.vue')
const Mt4Select = () =>
  import ('../components/views/mt4Select.vue')
const DateRange = () =>
  import ('../components/container/DateRange.vue')
// const mt4TradeItem = () =>
  // import ('../components/container/mt4TradeItem.vue')
const openOrderListItem  = () =>
  import ('../components/container/openOrderListItem.vue')
const mt4TradeListItem  = () =>
  import ('../components/container/mt4TradeListItem.vue')
const SearchToggle = () =>
  import ('../components/container/SearchToggle.vue')
const ListPhone = () =>
  import ('../components/container/ListPhone.vue')
const columns = [{
  title: 'MT4 ID',
  dataIndex: 'mt4Uid',
}, {
  title: "orderId",
  dataIndex: "orderId",
  sorter: true,
}, {
  title: "品种",
  dataIndex: "symbol",
}, {
  title: "方向",
  dataIndex: "actionType",
}, {
  title: "数量",
  dataIndex: "amount",
  width: '60px',
}, {
  title: "开仓价",
  dataIndex: "openPrice",
  width: "90px",
}, {
  title: "开仓时间",
  dataIndex: "openTime",
  width: "150px",
  scopedSlots: { customRender: 'openTime' },
}, {
  title: "平仓价",
  dataIndex: "closePrice",
  width: "90px",
}, {
  title: "平仓时间",
  dataIndex: "closeTime",
  width: "150px",
  scopedSlots: { customRender: 'closeTime' },
}, {
  title: "止损价",
  dataIndex: "stopLoss",
}, {
  title: "止盈价",
  dataIndex: "takeProfit",
}, {
  title: "隔夜利息",
  dataIndex: "rollver",
}, {
  title: "获利",
  dataIndex: "profit",
  // width:'60px',
}, ];
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import dateRange from './../components/mixin/dateRange.js'

export default {
  name: 'mt4_trade_history',
  mixins: [dateRange],
  data() {
    return {
      listData: [],
      listType: 'trade',
      showingPhoneListType:'',
      loading: false,
      columns,
      currentPage: 1,
      listPhoneLoading:false,
      // showSyncFail:false,
    }
  },
  created() {
    this.showingPhoneListType = this.listType
    this.isPC && this.getList()
  },
  methods: {
    searchList() {
      this.resetParams()
      this.getList()
    },
    resetParams() {
      this.currentPage = 1
    },
    onDateRangeChange(date, dateString) {
      this.startDate = dateString[0]
      this.endDate = dateString[1]
    },
    rowKey(record) {
      return record.orderId
    },
    handleTableChange(pagination) {
      this.currentPage = pagination.current
      console.log('%c pagination', 'color:red', pagination)
      this.$nextTick(() => {
        if (this.listType === "trade") {
          this.getList()
        }
      })
    },
    searchPhoneList() {
      this.showingPhoneListType = this.listType
      this.$refs.listPhone.reLoad()
    },
    getList() {
      this.loading = true
      this._getList({
          page: this.pagination.current,
          limit: this.pagination.pageSize,
          st: this.startDate,
          et: this.endDate,
        })
        .finally(() => {
          this.loading = false
        })
    },
    ...mapActions('trade', {
      tradeListGet: "getTradeHistory",
      openListGet: "getOpenHistory",
      getTradeCount: 'getTradeCount',
    }),
  },
  computed: {
    showSyncFail(){
      return this.showingList.syncSuccess==0&&!this.listLoading
    },
    listLoading(){
      return this.loading || this.listPhoneLoading
    },
    paramsPhone() {
      return {
        st: this.startDate,
        et: this.endDate,
      }
    },
    pagination() {
      return {
        pageSize: 10,
        // showSizeChanger: true,
        size: 'small',
        total: this._list.ttlQty,
        current: this.currentPage,
      }
    },
    _getList() {
      return this[`${this.listType}ListGet`]
    },
    _list() {
      return this[`${this.listType}List`] || {}
    },
    showingList() {
      return this[`${this.showingPhoneListType}List`] || {}
    },
    list() {
      return this._list.list
    },
    syncSuccess() {
      return this._list.syncSuccess
    },
    ...mapState('trade', ['summary', 'tradeList', 'openList','summaryGot']),
    ...mapState('app', ['isPC']),
    ...mapState('mt4AC', ['currentMt4Uid']),
  },
  watch: {
    listType(value) {
      this.$nextTick(() => {
        if(this.isPC){
          this.getList()
        }
      })
    },
    ttlQty(v) {
      this.pagination.total = v
    },
    currentMt4Uid(v) {
      // this.getList()
    },
  },
  components: {
    Mt4Select,
    Mt4SyncFail,
    DateRange,
    mt4TradeListItem,
    SearchToggle,
    // mt4TradeItem,
    openOrderListItem,
    ListPhone,
  },
}

</script>
<style lang='scss' scoped>
.search-box.phone {
  border: 1px solid red;
}

.list-box {
  margin-top: 10px;
}

.summary {
  margin-bottom: 0;
  span {
    margin-right: 15px;
  }
}

.time {
  font-size: 12px;
}

.search-box {
  display: flex;
  /*justify-content: center;*/
  flex-wrap: wrap;
  align-items: center;
}

.list-box.phone {
  .footer {
    text-align: center;
  }
}

</style>
<style lang='scss'>
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}

.mt4_trade_history-page {
  .ant-table-tbody {
    font-size: 12px;
  }
  .ant-table-tbody {
    /*color:red;*/
  }
}

</style>
