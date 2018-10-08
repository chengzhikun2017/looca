<template>
  <div>
    <div class="l-search-box">
      <div class="agent_overview-search">
        <a-select style="width: 120px" v-model="partnerUid">
          <a-select-option v-for="item in depthes" :key="item.value" :value="item.value">
            <!-- {{item.label}}关系 -->
            partnerUid
          </a-select-option>
        </a-select>
        <a-select style="width: 120px" v-model="depth">
          <a-select-option v-for="item in depthes" :key="item.value" :value="item.value">
            {{item.label}}关系
          </a-select-option>
        </a-select>
        <a-select style="width: 140px" v-model="mt4Type">
          <a-select-option v-for="item in mt4Types" :key="item.value" :value="item.value">
            {{item.label}}MT4账户
          </a-select-option>
        </a-select>
        <a-select style="width: 120px" v-model="accountType">
          <a-select-option v-for="item in accountTypes" :key="item.value" :value="item.value">
            {{item.label}}账户
          </a-select-option>
        </a-select>
        
        <a-input style="width: 150px" v-model="search" placeholder="手机号/姓名"  @keydown.enter="searchList"/>
        <a-button @click="searchList" type="primary">查询</a-button>
      </div>
    </div>
    <div class="list pc">
      <a-table :pagination="pagination" bordered :dataSource="mt4List.list" :rowKey="rowkey" :columns="columns" @change="onTableChange" :loading="loading"> 
        <template slot="action" slot-scope="createTsime">
          <a-button size="small" type="primary" @click="">MT4账户</a-button> 
          <a-button size="small" type="primary" @click="">MT4交易</a-button>
          <a-button size="small" type="primary" @click="">佣金报表</a-button>    
        </template>
        <template slot="time" slot-scope="time">
          {{time | timeFull}}
        </template>
        <template slot="level" slot-scope="level">
          {{level | agentLevel}}
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
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
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
  {title:"序列号",[DI]:"uid"},
  {title:"MT4账号",[DI]:"mt4_uid"},
  {title:"名字",[DI]:"name",width:"70px"},
  {title:"手机号",[DI]:"phone",width:"110px"},
  {title:"客户类型",[DI]:"user_account_type",[SS]: { [CR]: 'user_account_type' },},
  {title:"客户关系",[DI]:"depth",[SS]: { [CR]: 'depth' },},
  // {title:"代理等级",[DI]:"level",[SS]: { [CR]: 'level' },width:'70px'},
  // {title:"充值金额",width:"80px",[DI]:"total_pay_fee",[SS]: { [CR]: 'money' },},
  {title:"账户余额",width:"80px",[DI]:"balance_fee",[SS]: { [CR]: 'money' },},
  {title:"账号类型",width:"80px",[DI]:"mt4_account_type",[SS]: { [CR]: 'mt4_account_type' },},
  {title:"持仓数量",[DI]:"open_order_num",},
  {title:"持仓亏盈",[DI]:"open_order_profit",[SS]: { [CR]: 'money' },},
  {title:"杠杆",[DI]:"leverage",},
  {title:"创建时间",[DI]:"create_time",[SS]: { [CR]: 'time' },},
]
export default {
  name:'broker_mt4Ac',
  data() {
    return {
      partnerUid:null,
      search:'',
      columns,
      depth:0,
      loading:false,
      depthes:[
      {label:"所有",value:0},
      {label:"一级",value:1},
      {label:"二级",value:2},
      {label:"三级",value:3},
      ],
      mt4Type:"",
      mt4Types:[
      {label:"全部",value:""},
      {label:"跟单",value:"follow"},
      {label:"普通",value:"normal"},
      ],
      accountType:"",
      accountTypes:[
      {label:"全部",value:""},
      {label:"普通",value:"normal"},
      {label:"保本",value:"protect"},
      ],
      currentPage:1,
      savedParams:{},
    }
  },
  methods: {
    searchList(){
      let params = {
        search:this.search,
        partnerUid:this.partnerUid,
        depth:this.depth,
        accountType:this.accountType,
        mt4AccountType:this.mt4Type,
      }
      this.savedParams = params
      this.getList()
    },
    getList(){
      let params = {
        ...this.savedParams,
        page:this.pagination.current,
        limit:this.pagination.pageSize,

      }
      params.partnerUid = this.searchUid
      this.loading = true
      this.getMt4AC(params)
      .then(() => {
        this.loading = false 
      })
      .finally(() => {
        this.loading = false        
      })

    },
    onTableChange(pagination){
      this.currentPage = pagination.current
      this.getList()
      console.log('%c pagination','color:red',pagination)
    },
    rowkey(item,index){
      return index
    },
    ...mapActions('broker',["getPartner","getMt4AC"]),
  },
  computed: {
    searchUid(){
      return this.$route.query.uid
    },
    pagination() {
      return {
        pageSize: 2,
        // showSizeChanger: true,
        size: 'small',
        total: this.mt4List.total,
        current: this.currentPage,
      }
    },
    ...mapState('broker',["partners","mt4List"]),
  },
  components: {},
}
</script>

<style lang='scss' scoped>

</style>
