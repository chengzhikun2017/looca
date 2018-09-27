<template>
  <div class="mt4_money_bill-page">
    <!-- <div class="mt4_money_bill-search-table-divider"></div> -->
    <div class="phone" v-if="!isPC">
      <SearchToggle @ok="searchPhoneList">
        <l-search-item>
          <a-radio-group v-model="listType" style="margin:8px">
            <a-radio-button value="withdraw">出金</a-radio-button>
            <a-radio-button value="deposit">入金</a-radio-button>
            <a-radio-button value="withdraw_follow_settlement">出金（跟单结算）</a-radio-button>
          </a-radio-group>
        </l-search-item>
        <l-search-item>
          <DateRange @dateRangeChange="onDateRangeChange" :defaultValue="[defaultStart,defaultEnd]" />
        </l-search-item>
        <l-search-item>
          <Mt4Select></Mt4Select>
        </l-search-item>
      </SearchToggle>
      <ListPhone :newList="list" ref="listPhone" :params="paramsPhone" :getFunc="_getList" :total="ttlQty">
        <mt4MoneyBillListItem slot-scope="props" :info="props.item" :data="props.item"/>
      </ListPhone>
    </div>
    <div class="pc">
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
      <a-table :columns="columns" :rowKey="rowKey" :dataSource="list" :pagination="pagination" :loading="loading" @change="handleTableChange" v-if="isPC">
        <template slot="cardNum" slot-scope="cardNum">
          {{cardNum|bankCard}}
        </template>
        <template slot="money" slot-scope="money">
          {{money|money}}
        </template>
        <template slot="status" slot-scope="status">
          {{status|moneyBillStatus}}
        </template>
        <template slot="type" slot-scope="type">
          {{type|moneyBillType}}
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
const Mt4Select = () =>
  import ('../components/views/mt4Select.vue')
const DateRange = () =>
  import ('../components/container/DateRange.vue')
const SearchToggle = () =>
  import ('../components/container/SearchToggle.vue')
const ListPhone = () =>
  import ('../components/container/ListPhone.vue')
const mt4MoneyBillListItem = () =>
  import ('../components/container/mt4MoneyBillListItem.vue')

const columns = [{
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
  }, {
    title: "时间",
    dataIndex: "createTime",
    scopedSlots: { customRender: 'createTime' },
    // width: '60px',
  },

]
import dateRange from './../components/mixin/dateRange.js'

import helper from '../utils/helper.js'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'mt4_money_bill',
  mixins: [dateRange],
  data() {
    return {
      loading: false,
      listType: 'withdraw',
      pagination: {
        pageSize: 2,
        // showSizeChanger: true,
        current: 1,
        size: 'small',
        total: 0,
      },
      columns,
    }
  },
  created() {
    if(this.initialType === 'recharge'){
      this.listType = 'deposit'
    }
    this.isPC && this.getList()

  },
  methods: {
    searchPhoneList(){
      this.$refs.listPhone.reLoad()
    },
    goPage(path) {
      helper.goPage(path)
    },
    rowKey(record) {
      return record.orderId
    },
    handleTableChange(pagination) {
      this.pagination = pagination
      this.getList()
    },
    getList() {
      this._getList(this.params)
    },
    ...mapActions('mt4Balance', {
      _getList: 'getList',
    })
  },
  computed: {
    initialType(){
      return this.$route.query.initialType
    },
    paramsPhone() {
      return {
        mt4Uid: this.currentMt4Uid,
        type: this.listType,
        st: this.startDate,
        et: this.endDate,
      }
    },
    params() {
      return {
        ...this.paramsPhone,
        page: this.pagination.current,
        limit: this.pagination.pageSize,
      }
    },
    ...mapState('mt4AC', ['currentMt4Uid']),
    ...mapState('mt4Balance', ['list', 'ttlQty', 'ttlPage']),
    ...mapState('app', ['isPC']),
  },
  components: {
    Mt4Select,
    DateRange,
    SearchToggle,
    mt4MoneyBillListItem,
    ListPhone,
  },
}

</script>
<style lang='scss' scoped>
$prefix: "mt4_money_bill";
@import '@/styles/utils/divider.scss'

</style>
