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
    <div class="list" v-if="!isPC">
      <SearchToggle @ok="searchPhoneList">
        <l-search-item>
          <a-select style="width: 120px" v-model="queryLv">
            <a-select-option v-for="item in lvs" :key="item.value" :value="item.value">
              {{item.label}}
            </a-select-option>
          </a-select>
          <a-select v-model="type" style="width: 120px">
            <a-select-option v-for="item in types" :key="item.value" :value="item.value">
              {{item.label}}
            </a-select-option>
          </a-select>
        </l-search-item>
        <l-search-item>
          <DateRange @dateRangeChange="onDateRangeChange" :defaultValue="[defaultStart,defaultEnd]" />
        </l-search-item>
      </SearchToggle>
      <ListPhone :newList="list" ref="listPhone" :params="paramsPhone" :getFunc="getIncomeList" :total="listTotal">
        <guestListItem :type="2"  slot-scope="props":info="props.item"/>
      </ListPhone>
    </div>
    <div class="list" v-if="isPC">
      <div class="agent_profit_overview-data-search-divider"></div>
      <div class="agent_profit_overview-search search-box">
        <a-select style="width: 120px" v-model="queryLv">
          <a-select-option v-for="item in lvs" :key="item.value" :value="item.value">
            {{item.label}}
          </a-select-option>
        </a-select>
        <a-select v-model="type" style="width: 120px">
          <a-select-option v-for="item in types" :key="item.value" :value="item.value">
            {{item.label}}
          </a-select-option>
        </a-select>
        <a-range-picker :ranges="{ '今天': [moment(), moment()], '近一周': [moment().add(-6,'day'), moment()] }" :defaultValue="[defaultStart,defaultEnd]" @change="onDateRangeChange" />
        <a-button type="primary" @click="searchList">查询</a-button>
      </div>
      <div class="agent_profit_overview-search-table-divider"></div>
      <a-table :rowKey="rowKey" @change="handleTableChange" :pagination="pagination" bordered :dataSource="list" :loading="loading" :columns="columns">
        <span slot="createTime" slot-scope="createTime">
        {{createTime | timeFull}}
      </span>
        <span slot="money" slot-scope="money">
        {{money | money}}
      </span>
      <span slot="relationDepth" slot-scope="depth">
        {{depth | guestDepth}}
      </span>
      <span slot="type" slot-scope="type">
        {{type | incomeType}}
      </span>
      </a-table>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import helper from '../utils/helper.js'
import dateRange from './../components/mixin/dateRange.js'
const DateRange = () => import ('../components/container/DateRange.vue')
const SearchToggle = () => import ('../components/container/SearchToggle.vue')
const ListPhone  = () =>  import ('../components/container/ListPhone.vue')
const guestListItem = () => import ('../components/container/guestListItem.vue')
const lvs = helper.agent_levels
export default {
  mixins: [dateRange],
  data() {
    return {
      lvs,
      currentPage: 1,
      loading: false,
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
        title: '名字',
        dataIndex: 'name',
      }, {
        title: '手机号',
        dataIndex: 'phone',
      }, {
        title: '关系',
        dataIndex: 'relationDepth',
        scopedSlots: { customRender: 'relationDepth' },

      }, {
        title: '金额',
        dataIndex: 'fee',
        scopedSlots: { customRender: 'money' },

      }, {
        title: '类型',
        dataIndex: 'type',
        scopedSlots: { customRender: 'type' },
      }, {
        title: '时间',
        dataIndex: 'createTime',
        scopedSlots: { customRender: 'createTime' },

      }],
      dataSource: []
    }
  },
  filters:{
    
  },
  created() {
    this.getCount()
    this.isPC && this.getList()
  },
  methods: {
    searchPhoneList(){
      this.$refs.listPhone.reLoad()
    },
    searchList() {
      this.resetParams()
      this.getList()
    },
    resetParams() {
      this.currentPage = 1
    },
    rowKey(record, index) {
      return index
    },
    
    getParams() {
      return {
        st: this.startDate,
        et: this.endDate,
        type: this.type || null,
        depth: this.queryLv || null,
        page: this.pagination.current,
        limit: this.pagination.pageSize,
        // st：起始时间，格式yyyy-mm-dd，
        // et：结束时间（包含），格式yyyy-mm-dd，前端可以默认筛选最近一周数据
        // type:null,//point ：点差， follow：跟单，不填写空字符串为全部
        // depth: 级别， 1、2、3 ，不填写或
      }
    },
    getCount() {
      this.getIncomeCount()
    },
    getList() {
      let params = this.getParams()
      this.loading = true
      this.getIncomeList(params)
        .finally(() => {
          this.loading = false
        })
    },
    handleTableChange(pagination) {
      this.currentPage = pagination.current
      this.$nextTick(() => {
        this.getList()
      })
    },
    ...mapActions('share', ['getIncomeList', 'getIncomeCount']),
  },
  components: {
    SearchToggle,
    DateRange,
    guestListItem,
    ListPhone,
  },
  computed: {
    paramsPhone() {
      return {
        st: this.startDate,
        et: this.endDate,
        type: this.type || null,
        depth: this.queryLv || null,
      }
    },
    listTotal() {
      return this.incomeList.total || 0
    },
    pagination() {
      return {
        pageSize: 10,
        showSizeChanger: false,
        size: 'small',
        total: this.incomeList.total || 0,
        current: this.currentPage,
      }
    },
    list() {
      return this.incomeList.list || []
    },
    ...mapState('app', ['isPC']),
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
