<template>
  <div class="wallet_bills-page">
    <a-modal
      title="流水详情"
      :visible="detailShow"
      okText="关闭"
      @Ok="closeDetail"
      @cancel='closeDetail'
    >
      <div class="detail-info">类型：{{walletTypes[detailInfo.type]}}</div>
      <div class="detail-info">金额($)：{{detailInfo.amount | money}}</div>
      <div class="detail-info">业务编号：{{detailInfo.bizNo}}</div>
      <div class="detail-info">创建时间：{{detailInfo.createTime | timeFull}}</div>
      <div class="detail-info" v-if="detailInfo.mt4Uid">mt4账号：{{detailInfo.mt4Uid}}</div>
      <div class="detail-info" v-if="detailInfo.orderId">订单号：{{detailInfo.orderId}}</div>
      <div class="detail-info" v-if="detailInfo.level">vip等级：{{detailInfo.level}}</div>
      <div class="detail-info" v-if="detailInfo.st">开始时间：{{detailInfo.st | timeFull}}</div>
      <div class="detail-info" v-if="detailInfo.et">结束时间：{{detailInfo.et | timeFull}}</div>
      <div class="detail-info" v-if="detailInfo.payWay">支付方式：{{detailInfo.payWay | payway}}</div>
      <div class="detail-info" v-if="detailInfo.serviceFee">手续费($)：{{detailInfo.serviceFee}}</div>
      <div class="detail-info" v-if="detailInfo.bankName">银行：{{detailInfo.bankName}}</div>
      <div class="detail-info" v-if="detailInfo.dollar2RMBRate">汇率：{{detailInfo.dollar2RMBRate}}</div>
      <div class="detail-info" v-if="detailInfo.bankCardNum">银行卡号：{{detailInfo.bankCardNum | bankCard}}</div>
    </a-modal>
    <div class="search-box pc">
      <div class="choose-box">
        <a-select  v-model="listType" style="width: 120px">
          <a-select-option :key="type.value" :value="type.value" v-for="type in listTypes">
            {{type.label}}
          </a-select-option>
        </a-select>
        <!-- <a-radio-group v-model="listType" style="margin:8px"> -->
          <!-- <a-radio-button value="recharge">充值记录</a-radio-button> -->
          <!-- <a-radio-button value="withdraw">提现记录</a-radio-button> -->
        <!-- </a-radio-group> -->
      </div>
      <a-range-picker :ranges="{ '今天': [moment(), moment()], '近一周': [moment().add(-6,'day'), moment()] }" :defaultValue="[moment().add(-6,'day'), moment()]" @change="onDateRangeChange" /> &nbsp;
      <a-button @click="getList" type="primary">查看</a-button>
    </div>
    <div class="search-box phone">
      <SearchToggle @ok="searchPhoneList">
        <l-search-item>
          <a-select  v-model="listType" style="width: 120px">
            <a-select-option :key="type.value" :value="type.value" v-for="type in listTypes">
              {{type.label}}
            </a-select-option>
          </a-select>
        </l-search-item>
        <l-search-item>
          <DateRange @dateRangeChange="onDateRangeChange" :defaultValue="[defaultStart,defaultEnd]" />
        </l-search-item>
      </SearchToggle>
    </div>
    <div list pc>
      <a-table :columns="columns" :rowKey="rowKey" :dataSource="list" :pagination="pagination" :loading="loading" @change="handleTableChange" v-if="isPC">
        <template slot="cardNum" slot-scope="cardNum">
          {{cardNum|bankCard}}
        </template>
        <template slot="type" slot-scope="type">
          {{walletTypes[type]}}
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
        <template slot="action" slot-scope="text,record,index">
          <a-button @click="viewDetail(record)" size="small" type="primary"> 
            查看详情
          </a-button>
        </template>
        <template slot="time" slot-scope="time">
          <!-- <span class="time"> -->
           {{time|timeFull}}
         <!-- </span> -->
        </template>
      </a-table>
    </div>
    <div class="phone" v-if="!isPC">
      <ListPhone :newList="list" ref="listPhone" :params="paramsPhone" :getFunc="getFunc" :total="total">
        <walletListCard :info="props.item" slot-scope="props"></walletListCard>
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
const walletListCard = () =>
  import ('../components/container/walletListCard.vue')
// const walletTypes = {
//   pay:'充值',
//   pay_cancel:'充值（撤销）',
//   withdraw:'提现',
//   withdraw_cancel:'提现（撤销）',
//   mt4_deposit:'入金',
//   mt4_deposit_cancel:'入金（撤销）',
//   mt4_withdraw:'出金',
//   mt4_withdraw_cancel:'出金（撤销）',
//   brokerage2balance:'佣金转余额',
//   mt4_account_vip:'VIP账号',
//   mt4_vip_return:'VIP手续费返还',
// }
import helper from '../utils/helper.js'
var walletTypes = helper.walletTypes
const columns = [
  {title: 'uid',dataIndex: 'uid',},
  {title: '类型',dataIndex: 'type',scopedSlots: { customRender: 'type' },},
  {title: 'mt4账号',dataIndex: 'mt4Uid', },
  {title: '金额($)',dataIndex: 'amount',scopedSlots: { customRender: 'money' },},
  {title: '业务编号',dataIndex: 'bizNo',},
  {title: '创建时间',dataIndex: 'createTime',scopedSlots: { customRender: 'time' },},
  {title: '操作',dataIndex: '_action',scopedSlots: { customRender: 'action' },},
]
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'wallet_bills',
  mixins: [dateRange],
  data() {
    return {
      detailShow:false,
      detailInfo:{},
      loading: false,
      listType: 'all',
      walletTypes,
      listTypes:[
        {label:'所有',value: 'all'},
        {label:'充值',value: 'pay'},
        {label:'充值（撤销）',value: 'pay_cancel'},
        {label:'提现',value: 'withdraw'},
        {label:'提现（撤销）',value: 'withdraw_cancel'},
        {label:'入金',value: 'mt4_deposit'},
        {label:'入金（撤销）',value: 'mt4_deposit_cancel'},
        {label:'出金',value: 'mt4_withdraw'},
        {label:'出金（撤销）',value: 'mt4_withdraw_cancel'},
        {label:'佣金转余额',value: 'brokerage2balance'},
        {label:'VIP账号',value: 'mt4_account_vip'},
        {label:'VIP手续费返还',value: 'mt4_vip_return'},
      ],
      pagination: {
        pageSize: 10,
        // showSizeChanger: true,
        current: 1,
        size: 'small',
        total: 0,
      },
    }
  },
  created() {
    if(this.initialType in walletTypes){
      this.listType = this.initialType
    }
    if(this.isPC) {
      this.getList()
    } else {}
  },
  methods: {
    viewDetail(record) {
      console.log('record',record)
      this.getBalanceDetail({
        type:record.type,
        bizNo:record.bizNo,
      })
      .then((res) => {
        this.detailInfo = {...record,...res}
        this.detailShow = true
      })
    },
    searchPhoneList() {
      this.$refs.listPhone.reLoad()
    },
    closeDetail(){
      this.detailShow = false
    },
    onDateRangeChange(date, dateString) {
      // console.log('%c date, dateString','color:red',date, dateString)
      this.startDate = dateString[0]
      this.endDate = dateString[1]
    },
    rowKey(record) {
      return record.bizNo
    },
    handleTableChange(pagination) {
      console.log('%c pagination','color:red',pagination)
      this.pagination = pagination
      this.getList()
    },
    getBalanceList(){
      this.loading = true
      this._getBalanceList(this.params).then(res => {
          this.pagination.total = res.total
        })
        .finally(() => {
          this.loading = false
        })
    },
    getPayList() {
      return
      this.loading = true
      this._getPayList(this.params).then(res => {
          this.pagination.total = res.total
        })
        .finally(() => {
          this.loading = false
        })
    },
    getWithdrawList() {
      return
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
      _getBalanceList:'getBalanceList',
      getBalanceDetail:'getBalanceDetail',
    }),
  },
  watch: {
    listType(value) {
      if (this.listType === "recharge") {
        Object.assign(this.pagination, {
          current: 1,
          total: this.payListTtl,
        })
      } else if (this.listType === "withdraw") {
        Object.assign(this.pagination, {
          current: 1,
          total: this.withdrawListTtl,
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
        type: this.listType==='all'?'':this.listType,
      }
    },
    params() {
      return {
        page: this.pagination.current,
        limit: this.pagination.pageSize,
        st: this.startDate,
        et: this.endDate,
        type: this.listType==='all'?'':this.listType,
      }
    },
    getList() {
      return this.getBalanceList
      // if (this.listType === "recharge") {
      //   return this.getPayList
      // } else if (this.listType === "withdraw") {
      //   return this.getWithdrawList
      // }
    },
    getFunc() {
      return this._getBalanceList
      // if (this.listType === "recharge") {
      //   return this._getPayList
      // } else if (this.listType === "withdraw") {
      //   return this._getWithdrawList
      // }
    },
    columns() {
      return columns
      // if (this.listType === "recharge") {
      //   return payColumns
      // } else if (this.listType === "withdraw") {
      //   return withdrawColums
      // }
    },
    list() {
      return this.balanceList && this.balanceList.list
      // if (this.listType === "recharge") {
      //   return this.payList
      // } else if (this.listType === "withdraw") {
      //   return this.withdrawList
      // }
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
      'payListTtlPage',
      'withdrawList',
      'withdrawListTtl',
      'withdrawListTtlPage',
      'balanceList',
    ]),
    ...mapState('app', ['isPC']),

  },
  components: {
    SearchToggle,
    ListPhone,
    walletListCard,
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
.detail-info{

}
</style>
