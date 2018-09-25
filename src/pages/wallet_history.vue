<template>
  <div class="wallet_history-page">
    <div class="search-box pc">
      <div class="choose-box">
        <a-radio-group v-model="listType" style="margin:8px">
          <a-radio-button value="recharge">充值记录</a-radio-button>
          <a-radio-button value="withdraw">提现记录</a-radio-button>
        </a-radio-group>
      </div>
      <a-range-picker :ranges="{ '今天': [moment(), moment()], '近一周': [moment().add(-6,'day'), moment()] }" :defaultValue="[moment().add(-6,'day'), moment()]" @change="onDateRangeChange" /> &nbsp;
      <a-button @click="getList" type="primary">查看</a-button>
    </div>
    <div class="search-box phone">
      <SearchToggle @ok="searchPhoneList">
        <l-search-item>
          <a-radio-group v-model="listType" style="margin:8px">
            <a-radio-button value="recharge">充值记录</a-radio-button>
            <a-radio-button value="withdraw">提现记录</a-radio-button>
          </a-radio-group>
        </l-search-item>
        <l-search-item>
          <DateRange @dateRangeChange="onDateRangeChange" :defaultValue="[defaultStart,defaultEnd]" />
        </l-search-item>
      </SearchToggle>
    </div>
    <div pc>
      <a-table :columns="columns" :rowKey="rowKey" :dataSource="list" :pagination="pagination" :loading="loading" @change="handleTableChange" v-if="isPC">
        <template slot="cardNum" slot-scope="cardNum">
          {{cardNum|bankCard}}
        </template>
        <template slot="money" slot-scope="money">
          {{money|money}}
        </template>
        <template slot="payway" slot-scope="payway">
          {{payway|payway}}
        </template>
        <template slot="withdrawStatus" slot-scope="withdrawStatus">
          {{withdrawStatus|withdrawStatus}}
        </template>
        <template slot="payStatus" slot-scope="payStatus">
          {{payStatus|payStatus}}
        </template>
        <template slot="createTime" slot-scope="createTime">
          <span class="time">
           {{createTime|timeFull}}
         </span>
        </template>
      </a-table>
    </div>
    <div class="phone">
      <ListPhone :newList="list" ref="listPhone" :params="paramsPhone" :getFunc="getFunc" :total="total">
        <walletListItem :info="props.item" slot-scope="props"></walletListItem>
      </ListPhone>
    </div>
  </div>
</template>
<script>
import dateRange from './../components/mixin/dateRange.js'
const DateRange = () =>
  import ('../components/container/DateRange.vue')
const SearchToggle = () =>
  import ('../components/container/SearchToggle.vue')
const ListPhone = () =>
  import ('../components/container/ListPhone.vue')
const walletListItem = () =>
  import ('../components/container/walletListItem.vue')
const payColumns = [{
    title: 'ID',
    dataIndex: 'id',
  }, {
    title: '充值类型',
    dataIndex: 'payWay',
    scopedSlots: { customRender: 'payway' },
    // alipay_personal为支付宝转账，brokerage为佣金提现
  },
  {
    title: "金额($)",
    dataIndex: "dollar",
    scopedSlots: { customRender: 'money' },
  },{
    title: "人民币",
    dataIndex: "rmb",
    scopedSlots: { customRender: 'money' },
  }, {
    title: "业务流水号",
    dataIndex: "tradeNo",
  }, {
    title: "状态",
    dataIndex: "status",
    scopedSlots: { customRender: 'payStatus' },
    //1付款完成等待审核， 2完成充值 ， 3付款无效
  }, {
    title: "创建时间",
    dataIndex: "createTime",
    width: "160px",
    scopedSlots: { customRender: 'createTime' },
  },
  // {
  //   title: '名字',
  //   dataIndex: 'fullName',
  //   // filters: [
  //   //   { text: 'Male', value: 'male' },
  //   //   { text: 'Female', value: 'female' },
  //   // ],
  //   width: '20%',
  //   sorter: true,
  // },
];
const withdrawColums = [{
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: "金额($)",
    dataIndex: "dollar",
    scopedSlots: { customRender: 'money' },
  }, {
    title: "人民币",
    dataIndex: "rmb",
    scopedSlots: { customRender: 'money' },
  },{
    title: '银行卡',
    dataIndex: 'bankCardNum',
    scopedSlots: { customRender: 'cardNum' },
  }, {
    title: "业务流水号",
    dataIndex: "tradeNo",
    width: '200px',
  }, {
    title: "状态",
    dataIndex: "status",
    scopedSlots: { customRender: 'withdrawStatus' },
    // "status": 1, //状态：1等待转账， 2 转账完成 ， 3 撤销申请

  }, {
    title: "创建时间",
    dataIndex: "createTime",
    width: "160px",
    scopedSlots: { customRender: 'createTime' },
  },
]
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'wallet_history',
  mixins: [dateRange],
  data() {
    return {
      loading: false,
      listType: 'recharge',
      pagination: {
        pageSize: 10,
        // showSizeChanger: true,
        current: 1,
        size: 'small',
        total: 0,
      },
      loading: false,
      startDate: '',
      endDate: '',
    }
  },
  created() {
    if(this.initialType === 'withdraw'){
      this.listType = 'withdraw'
    }
    if (this.isPC) {
      this.getWithdrawList()
    } else {}
  },
  methods: {
    searchPhoneList() {
      this.$refs.listPhone.reLoad()
    },
    onDateRangeChange(date, dateString) {
      // console.log('%c date, dateString','color:red',date, dateString)
      this.startDate = dateString[0]
      this.endDate = dateString[1]
    },
    rowKey(record) {
      return record.id
    },
    handleTableChange(pagination) {
      this.pagination = pagination
      this.getList()
    },
    getPayList() {
      this.loading = true
      this._getPayList(this.params).then(res => {
          this.pagination.total = res.total
        })
        .finally(() => {
          this.loading = false
        })
    },
    getWithdrawList() {
      this.loading = true
      this._getWithdrawList(this.params).then(res => {
          this.pagination.total = res.total
        })
        .finally(() => {
          this.loading = false
        })
    },
    ...mapActions('wallet', {
      _getWithdrawList: 'getWithdrawList',
      _getPayList: 'getPayList',
    }),
  },
  watch: {
    listType(value) {
      if (this.listType === "recharge") {
        Object.assign(this.pagination, {
          current: 1,
          total: this.payListTilPage,
        })
      } else if (this.listType === "withdraw") {
        Object.assign(this.pagination, {
          current: 1,
          total: this.withdrawListTilPage,
        })
      }
    },
  },
  computed: {
    initialType(){
      return this.$route.query.initialType
    },
    paramsPhone() {
      return {
        st: this.startDate,
        et: this.endDate,
      }
    },
    params() {
      return {
        page: this.pagination.current,
        limit: this.pagination.pageSize,
        st: this.startDate,
        et: this.endDate,
      }
    },
    getList() {
      if (this.listType === "recharge") {
        return this.getPayList
      } else if (this.listType === "withdraw") {
        return this.getWithdrawList
      }
    },
    getFunc() {
      if (this.listType === "recharge") {
        return this._getPayList
      } else if (this.listType === "withdraw") {
        return this._getWithdrawList
      }
    },
    columns() {
      if (this.listType === "recharge") {
        return payColumns
      } else if (this.listType === "withdraw") {
        return withdrawColums
      }
    },
    list() {
      if (this.listType === "recharge") {
        return this.payList
      } else if (this.listType === "withdraw") {
        return this.withdrawList
      }
    },
    total() {
      if (this.listType === "recharge") {
        return this.payListTtl
      } else if (this.listType === "withdraw") {
        return this.withdrawListTtl
      }
    },
    ...mapState('wallet', [
      'payList',
      'payListTtl',
      'payListTilPage',
      'withdrawList',
      'withdrawListTtl',
      'withdrawListTilPage',
    ]),
    ...mapState('app', ['isPC']),

  },
  components: {
    SearchToggle,
    ListPhone,
    walletListItem,
    DateRange,
  },
}

</script>
<style lang='scss' scoped>
.search-box {
  padding: 8px 8px;
  display: flex;
  align-items: center;
}

</style>
