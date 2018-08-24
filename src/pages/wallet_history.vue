<template>
  <div class="wallet_history-page">
    <div class="choose-box">
      <a-radio-group v-model="listType" style="margin:8px">
        <a-radio-button value="recharge">充值记录</a-radio-button>
        <a-radio-button value="withdraw">提现记录</a-radio-button>
      </a-radio-group>
    </div>
    <div class="search-box">
      <a-range-picker
        :ranges="{ '今天': [moment(), moment()], '近一周': [moment().add(-6,'day'), moment()] }"
        :defaultValue="[moment().add(-6,'day'), moment()]"
        @change="onDateRangeChange" 
      />
      <a-button @click="getWithdrawList" type="primary">search</a-button>
    </div>
    <div>
      <a-table :columns="columns" :rowKey="rowKey" :dataSource="list" :pagination="pagination" :loading="loading" @change="handleTableChange" v-if="isPC">
        <template slot="cardNum" slot-scope="cardNum">
           {{cardNum|bankCard}}
        </template>
        <template slot="money" slot-scope="money">
           {{money|money}}
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
const payColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
  }, {
    title: '充值类型',
    dataIndex: 'payWay',
  },
  {
    title: "金额",
    dataIndex: "dollar",
    // sorter: true,
    // scopedSlots: { customRender: 'action' },
  }, {
    title: "业务流水号",
    dataIndex: "tradeNo",
    // width: '60px',
  }, {
    title: "状态",
    dataIndex: "status",
    // "status": 1, //状态：1付款完成等待审核，  2 完成充值 ， 3 付款无效
    // width: "90px",
  }, {
    title: "创建时间",
    dataIndex: "createTime",
    width: "150px",
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
  // },
];
const withdrawColums = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: "金额",
    dataIndex: "dollar",
    // sorter: true,
    scopedSlots: { customRender: 'money' },
  },  {
    title: '银行卡',
    dataIndex: 'bankCardNum',
    scopedSlots: { customRender: 'cardNum' },
  },{
    title: "业务流水号",
    dataIndex: "tradeNo",
    width: '200px',
  }, {
    title: "状态",
    dataIndex: "status",
    scopedSlots: { customRender: 'withdrawStatus' },
    // "status": 1, //状态：1等待转账， 2 转账完成 ， 3 撤销申请

    // width: "90px",
  }, {
    title: "创建时间",
    dataIndex: "createTime",
    width: "150px",
    scopedSlots: { customRender: 'createTime' },
  },
]
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'wallet_history',
  data() {
    return {
      loading: false,
      listType:'recharge',
      pagination: {
        pageSize: 2,
        showSizeChanger: true,
        current: 1,
        size: 'small',
        total: 0,
      },
      startDate:'',
      endDate:'',
    }
  },
  created(){
    this.getWithdrawList()
  },
  filters:{
    withdrawStatus(v){
      switch(v){
        case 1:return "等待转账";
        case 2:return "转账完成";
        case 3:return "撤销申请";
      }
    },
    payStatus(v){
      switch(v){
        case 1:return "等待审核";
        case 2:return "完成充值";
        case 3:return "付款无效";
      }
    },
  },
  methods: {
    onDateRangeChange(date, dateString){
      // console.log('%c date, dateString','color:red',date, dateString)
      this.startDate = dateString[0]
      this.endDate = dateString[1]
    },
    rowKey(record) {
      return record.orderId
    },
    handleTableChange(pagination) {
      this.pagination = pagination
      this.getList()
    },
    getTimePeriod(){
      
    },
    getWithdrawList() {
      this._getWithdrawList(this.params).then(res=>{
        this.pagination.total = res.total
      })
    },
    ...mapActions('wallet', {
      _getWithdrawList:'getWithdrawList',
      _getPayList:'getPayList',
    }),
  },
  computed: {
    params(){
      return {
        page: this.pagination.current,
        limit: this.pagination.pageSize,
        st:this.startDate,
        et:this.endDate,
      }
    },
    getList(){
      return this.getWithdrawList
    },
    columns(){
      return withdrawColums
    },
    list(){
      return this.withdrawList
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
  components: {},
}

</script>
<style lang='scss' scoped>
.search-box{
  padding:8px 8px;
  display: flex;
  
}

</style>
