<template>
  <div class="agent_overview-page">
    <table class="agent_overview-cardTable">
      <thead>
        <tr>
          <th>总客户</th>
          <th>一级客户</th>
          <th>二级客户</th>
          <th>三级客户</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{guestSummary.total}}</td>
          <td>{{guestSummary.lv1}}</td>
          <td>{{guestSummary.lv2}}</td>
          <td>{{guestSummary.lv3}}</td>
        </tr>
      </tbody>
    </table>
    <div class="agent_overview-data-search-divider"></div>
    <div class="agent_overview-search">
      <a-select style="width: 120px" v-model="queryLv" @change="getList">
        <a-select-option v-for="item in lvs" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
      </a-select>
    </div>
    <div class="agent_overview-search-table-divider"></div>
    <div class="list pc">
      <a-table :pagination=false bordered :dataSource="list" :rowKey="rowkey" :columns="columns">
        <template slot="createTime" slot-scope="createTime">
          {{createTime | timeFull}}
        </template>
      </a-table>
    </div>
    <div class="list phone">
      <a-list :dataSource="list"  >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <rebateListItem :info="item"></rebateListItem>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>
<script>
import rebateListItem from '../components/container/rebateListItem.vue'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import helper from '../utils/helper.js' 
const agent_levels = helper.agent_levels
export default {
  data() {
    return {
      lvs: agent_levels,
      queryLv: 0,
      columns: [
        // {
        //   title: 'id',
        //   dataIndex: 'id',
        // }, 
        {
          title: '名字',
          dataIndex: 'name',
        }, {
          title: '手机号',
          dataIndex: 'phone',
        }, {
          title: '关系',
          dataIndex: 'depth',
        }, {
          title: '时间',
          dataIndex: 'createTime',
          scopedSlots: { customRender: 'createTime' },
        }
      ],
    }
  },
  created() {
    this.getGuestCount()
    this.getGuestList()
  },
  computed: {
    list() {
      return this.guestList.list
    },
    ...mapGetters('share', ['guestSummary']),
    ...mapState('app',['isPC']),
    ...mapState('share', ['guestList']),
  },
  methods: {
    rowkey(item,index){
      return index
    },
    getList() {
      this.getGuestList({
        depth: this.queryLv || null,
      })
    },
    ...mapActions('share', ['getGuestCount', 'getGuestList']),
  },
  components: {
    rebateListItem, 
  },
}

</script>
<style lang="scss">
$prefix: "agent_overview";
@import '@/styles/utils/cardTable.scss';
@import '@/styles/utils/divider.scss';

</style>
