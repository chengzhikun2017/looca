<template>
  <div>
    <BrokerAsyncTip></BrokerAsyncTip>
    <div class="l-search-box">
      <div class="agent_overview-search">
        <PartnerSelect v-model="partnerInfo" @input2="onInput2"></PartnerSelect>
        <DepthSelect v-model="depth"></DepthSelect>
        <AgentLevelSelect v-model="agentLevel"></AgentLevelSelect>
        <AccountTypeSelect v-model="accountType"></AccountTypeSelect>
        <a-input style="width: 150px" v-model="search" placeholder="手机号/姓名" @keydown.enter="searchList" />
        <a-button @click="searchList" type="primary">查询</a-button>
      </div>
    </div>
    <a-modal v-model="showUpgradeAgent" title="请选择希望调整到的级别">
      <!-- onCancel="closeUpgrade" -->
      <!-- onOk="confirmUpgrade" -->
      <template slot="footer">
        <a-button @click="closeUpgrade">取消</a-button>
        <a-button type="primary" @click="confirmUpgrade">
          确定
        </a-button>
      </template>
      <!-- <p>Some contents...</p> -->
      <a-select style="width: 120px" v-model="targetLv">
        <a-select-option v-for="item in agentLevels" v-if="" :key="item.value" :value="item.value">
          {{item.label}}
        </a-select-option>
      </a-select>
    </a-modal>
    <div class="list broker-list ">
      <a-table :pagination="pagination" bordered :dataSource="userList.list" :rowKey="rowkey" :columns="columns" @change="onTableChange" :loading="loading">
        <template slot="action" slot-scope="text, record, index">
          <a-button size="small" type="primary" @click="onClickAction(record,'/broker_mt4Ac')">
            MT4账户
          </a-button>
          <a-button size="small" type="primary" @click="onClickAction(record,'/broker_trade')">
            MT4交易
          </a-button>
          <a-button size="small" type="primary" @click="onClickAction(record,'/broker_profit')">
            佣金报表
          </a-button>
        </template>
        <template slot="index" slot-scope="text, record, index">
          {{index + 1}}
        </template>
        <template slot="time" slot-scope="time">
          {{time | timeFull}}
        </template>
        <template slot="level" slot-scope="level, record, index">
          <span style="display: flex;justify-content: space-between;">
            <span>
              {{level | agentLevel}}
            </span>
          <a-button size=small type="primary" :disabled="record.level==2" @click="openUpgrade(record)">
            升级
          </a-button>
          </span>
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
  </div>
</template>
<script>
import helper from '../utils/helper.js'
import brokerSearchInputs from './../components/mixin/brokerSearchInputs.js'
// import PartnerSelect from '../components/input/partnerUid.vue'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
const CR = 'customRender'
const SS = 'scopedSlots'
const TT = 'title'
const DI = 'dataIndex'
const columns = [
  // {
  //   title: '关系',
  //   dataIndex: 'depth',
  //   // scopedSlots: { customRender: 'depth' },
  // }, 
  {
    title: "序列号",
    [DI]: "uid",
    [SS]: {
      [CR]: 'index'
    }
  },
  { title: "名字", [DI]: "name", width: "70px" },
  { title: "手机号", [DI]: "phone", width: "110px" },
  {
    title: "账户类型",
    [DI]: "user_account_type",
    [SS]: {
      [CR]: 'user_account_type'
    },
  },
  {
    title: "客户级别",
    [DI]: "depth",
    [SS]: {
      [CR]: 'depth'
    },
  },
  {
    title: "上级代理",
    [DI]: "parent_name",
  },
  {
    title: "代理等级",
    [DI]: "level",
    [SS]: {
      [CR]: 'level'
    },
    width: '120px'
  },
  // {title:"所属经纪人",[DI]:"level",width:'70px'},
  // {title:"充值金额",width:"80px",[DI]:"total_pay_fee",[SS]: { [CR]: 'money' },},
  {
    title: "账户余额",
    width: "80px",
    [DI]: "balance_fee",
    [SS]: {
      [CR]: 'money'
    },
  },
  {
    title: "当前佣金",
    width: "80px",
    [DI]: "brokerage_fee",
    [SS]: {
      [CR]: 'money'
    },
  },
  {
    title: "注册时间",
    [DI]: "register_time",
    width: "160px",
    [SS]: {
      [CR]: 'time'
    },
  },
  {
    title: "操作",
    [DI]: "",
    [SS]: {
      [CR]: 'action'
    },
    width: "250px"
  },
]
const Agent_Lv_Map = [0, 4, 3, 2, 1]
const Agent_Lv_Text = ['无级别', '三级', '二级', '一级', '股东']
export default {
  name: 'broker_user',
  mixins: [brokerSearchInputs],
  data() {
    return {
      search: '',
      columns,
      loading: false,
      // currentPage: 1,
      // savedParams: {},
      showUpgradeAgent: false,
      targetLv: null,
      upgradingUserInfo: null,
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.searchList()
      }, 20);
    })
  },
  methods: {
    onClickAction(record, path) {
      // helper.urlConcat(path,{
      //   ...savedParams.partnerInfo,
      //   phone:record.phone,
      // }) 
      this.goPage(helper.urlConcat(path, {
        ...this.partnerInfo,
        phone: record.phone,
        from_user:1,
      }))
    },
    submitUpgrade(targetUid, level) {
      this.upgradeAgent({
        targetUid,
        level,
      }).then(() => {
        this.closeUpgrade()
      })
    },
    onInput2(e) {
      console.log('%c input 2 ', 'color:red', e)
    },
    closeUpgrade() {
      this.showUpgradeAgent = false
    },
    openUpgrade(record) {
      this.upgradingUserInfo = record
      this.showUpgradeAgent = true
      let currentLvIndex = Agent_Lv_Map.indexOf(record.level)
      this.targetLv = Agent_Lv_Map[currentLvIndex + 1]
    },
    confirmUpgrade() {
      if (!this.targetLv) {
        return
      }
      let record = this.upgradingUserInfo
      let currentLvIndex = Agent_Lv_Map.indexOf(record.level)
      let targetLv = this.agentLevels
        .find(item => item.value == this.targetLv)

      this.$modal.confirm({
        content: `确定将${record.name}升从
        【${Agent_Lv_Text[currentLvIndex]}代理】升级至
        【${targetLv.label}代理】吗？`,
        onOk: () => {
          this.submitUpgrade(record.uid, targetLv.value)
        },
      })
    },
    goPage(path) {
      helper.goPage(path)
    },
    searchList() {
      // let params = {
      //   search: this.search,
      //   partnerUid: this.partnerUid,
      //   depth: this.depth,
      //   accountType: this.accountType,
      //   level: this.agentLevel || "",
      // }
      // this.currentPage = 1
      // this.savedParams = params

      // setTimeout(() => {
      this.beforeSearchList()
      this.getList()
      // }, 0);
    },
    addFooterCount() {
      this.$nextTick(() => {
        if (this.userList.list.length == 0) {
          helper.removeTableFooter()
          return
        }
        let count = this.userList.count
        let data = helper.createTableFootData(this.columns, {
          balance_fee: count.total_balance_fee / 100,
          brokerage_fee: count.total_brokerage_fee / 100,
          total_pay_fee: count.total_pay_fee / 100,
          // "total_brokerage_fee": 0, //总佣金，美金，分
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
      this.getUsers(params)
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
    ...mapActions('broker', ["getUsers", 'upgradeAgent']),
  },
  computed: {
    agentLevels() {
      if (!this.upgradingUserInfo) {
        return []
      }
      let current = this.upgradingUserInfo.level
      switch (current) {
        case 2:
        case 1:
          return [];
        case 0:
          return [
            { value: 4, label: '三级' },
            { value: 3, label: '二级' },
            { value: 2, label: '一级' },
          ];
        case 4:
          return [
            { value: 3, label: '二级' },
            { value: 2, label: '一级' },
          ];
        case 3:
          return [
            { value: 2, label: '一级' },
          ];
        default:
          return [];
      }
    },
    pagination() {
      return {
        pageSize: 10,
        // showSizeChanger: true,
        size: 'small',
        total: this.userList.total,
        current: this.currentPage,
      }
    },
    ...mapState('broker', ["partners", "userList"]),
    ...mapState('account', ["userId"]),
  },
  components: {
    // PartnerSelect,
  },
}

</script>
<style lang='scss' scoped>


</style>
