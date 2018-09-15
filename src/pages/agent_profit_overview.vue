<template>
  <div class="agent_profit_overview-page">
    <table class="agent_profit_overview-cardTable">
      <thead>
        <tr>
          <th>总收入</th>
          <th>点差收入</th>
          <th>跟单收入</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${{incomeSummary.total | money}}</td>
          <td>${{incomeSummary.point | money}}</td>
          <td>${{incomeSummary.follow | money}}</td>
        </tr>
      </tbody>
    </table>
    <div class="agent_profit_overview-data-search-divider"></div>
    <div class="agent_profit_overview-search">
      <a-select style="width: 120px" v-model="queryLv" @change="getList">
        <a-select-option v-for="item in lvs" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
      </a-select>
      <a-select v-model="type" style="width: 120px" @change="getList">
        <a-select-option v-for="item in types" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
      </a-select>
      <a-range-picker :ranges="{ '今天': [moment(), moment()], '近一周': [moment().add(-6,'day'), moment()] }" :defaultValue="[defaultStart,defaultEnd]" @change="onDateRangeChange" />
    </div>
    <div class="agent_profit_overview-search-table-divider"></div>
    <a-table bordered :dataSource="list" :columns="columns">
    </a-table>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import helper from '../utils/helper.js'
import dateRange from './../components/mixin/dateRange.js'
const lvs = helper.agent_levels
export default {
  mixins: [dateRange],
  data() {
    return {
      lvs,
      queryLv: 0,
      // selectDate:null,
      // type:null,//point ：点差， follow：跟单，不填写空字符串为全部
      types: [
        { value: 0, label: "全部" },
        { value: 'point', label: "点差" },
        { value: 'follow', label: "跟单" },
      ],
      type: 0,
      columns: [{
        title: 'id',
        dataIndex: 'id',
      }, {
        title: '名字',
        dataIndex: 'name',
      }, {
        title: '手机号',
        dataIndex: 'phone',
      }, {
        title: '关系',
        dataIndex: 'operation',
      }, {
        title: '金额',
        dataIndex: 'oper2ation',
      }, {
        title: '类型',
        dataIndex: 'operati2on',
      }, {
        title: '时间',
        dataIndex: 'ope2ration',
      }],
      dataSource: []
    }
  },
  created() {
    this.getIncomeCount()
    this.getList()
  },
  methods: {
    getList() {
      let params = {
        st: this.startDate,
        et: this.endDate,
        type: this.type || null,
        depth: this.queryLv || null,
        // st：起始时间，格式yyyy-mm-dd，
        // et：结束时间（包含），格式yyyy-mm-dd，前端可以默认筛选最近一周数据
        // type:null,//point ：点差， follow：跟单，不填写空字符串为全部
        // depth: 级别， 1、2、3 ，不填写或
      }
      this.getIncomeList(params)
    },
    ...mapActions('share', ['getIncomeList', 'getIncomeCount']),
  },
  computed: {
    list(){
      return this.incomeList.list
    },
    ...mapState('share', ['incomeList']),
    ...mapGetters('share', ['incomeSummary']),
  },
}

</script>
<style lang="scss">
$prefix: "agent_profit_overview";
@import '@/styles/utils/cardTable.scss';
@import '@/styles/utils/divider.scss';

</style>
