<template>
  <div class="wallet_history-page">
    <a-range-picker
      :ranges="{ '今天': [moment(), moment()], '本月': [moment(), moment().endOf('month')] }"
      :defaultValue="[moment().add(-1,'week'), moment()]"
      @change="onDateRangeChange" 
    />
    <a-button @click="getWithdrawList" type="primary">search</a-button>
    <div>
      <a-table :columns="columns" :rowKey="rowKey" :dataSource="list" :pagination="pagination" :loading="loading" @change="handleTableChange" v-if="isPC">
        <template slot="openTime" slot-scope="openTime">
          <span class="time">
           {{openTime|timeFull}}
         </span>
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
const columns = [
  {
    title: 'ID',
    dataIndex: 'mt4Uid',
  }, {
    title: '充值类型',
    dataIndex: 'mt4Uid11',
  },
  {
    title: "金额",
    dataIndex: "orderId",
    // sorter: true,
    // scopedSlots: { customRender: 'action' },
  }, {
    title: "业务流水号",
    dataIndex: "amount",
    // width: '60px',
  }, {
    title: "状态",
    dataIndex: "openPrice",
    width: "90px",
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'wallet_history',
  data() {
    return {
      loading: false,
      columns: columns,
      pagination: {
        pageSize: 10,
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
  methods: {
    onDateRangeChange(date, dateString){
      console.log('%c date, dateString','color:red',date, dateString)
      this.startDate = dateString[0]
      this.endDate = dateString[1]
    },
    rowKey(record) {
      return record.orderId
    },
    handleTableChange(pagination) {
      console.log('%c pagination', 'color:red', pagination)
      this.pagination = pagination
      this.getList()
    },
    getTimePeriod(){
      
    },
    getWithdrawList() {
      this._getWithdrawList({
        page: this.pagination.current,
        limit: this.pagination.pageSize,
        st:this.startDate,
        et:this.endDate,
      })
    },
    ...mapActions('wallet', {
      _getWithdrawList:'getWithdrawList',
      _getPayList:'getPayList',
    }),
  },
  computed: {
    ...mapState('wallet', [
      'payList',
      'payListTtl',
      'payListTilPage',
      'withdrawList',
      'withdrawListTtl',
      'withdrawListTilPage',
      ]),
    ...mapState('app', ['isPC']),
    list(){
      return this.payList
    },
  },
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
