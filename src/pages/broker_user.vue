<template>
  <div>
    <div class="l-search-box">
      <div class="agent_overview-search">
        <PartnerSelect v-model="partnerUid"></PartnerSelect>
        <DepthSelect v-model="depth"></DepthSelect>
        <AccountTypeSelect v-model="accountType"></AccountTypeSelect>
        <a-input style="width: 150px" v-model="search" placeholder="手机号/姓名"  @keydown.enter="searchList"/>
        <a-button @click="searchList" type="primary">查询</a-button>
      </div>
    </div>
    <div class="list broker-list pc">
      <a-table :pagination="pagination" bordered :dataSource="userList.list" :rowKey="rowkey" :columns="columns" @change="onTableChange" :loading="loading"> 
        <template slot="action" slot-scope="text, record, index">
          <a-button size="small" type="primary" @click="goPage(`/broker_mt4Ac?phone=${record.phone}&partnerUid=${savedParams.partnerUid}`)">
            MT4账户
          </a-button> 
          <a-button size="small" type="primary" @click="goPage(`/broker_trade?phone=${record.phone}&partnerUid=${savedParams.partnerUid}`)">
            MT4交易
          </a-button>
          <a-button size="small" type="primary" @click="goPage(`/broker_profit?phone=${record.phone}&partnerUid=${savedParams.partnerUid}`)">
            佣金报表
          </a-button>    
        </template>
        <template slot="index" slot-scope="text, record, index">
          {{index + 1}}
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
import helper from '../utils/helper.js'
import brokerSearchInputs from './../components/mixin/brokerSearchInputs.js'
// import PartnerSelect from '../components/input/partnerUid.vue'
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
  {title:"序列号",[DI]:"uid",[SS]:{[CR]:'index'}},
  {title:"名字",[DI]:"name",width:"70px"},
  {title:"手机号",[DI]:"phone",width:"110px"},
  {title:"客户类型",[DI]:"user_account_type",[SS]: { [CR]: 'user_account_type' },},
  {title:"客户关系",[DI]:"depth",[SS]: { [CR]: 'depth' },},
  {title:"代理等级",[DI]:"level",[SS]: { [CR]: 'level' },width:'70px'},
  {title:"充值金额",width:"80px",[DI]:"total_pay_fee",[SS]: { [CR]: 'money' },},
  {title:"账户余额",width:"80px",[DI]:"balance_fee",[SS]: { [CR]: 'money' },},
  {title:"当前佣金",width:"80px",[DI]:"brokerage_fee",[SS]: { [CR]: 'money' },},
  {title:"注册时间",[DI]:"register_time",width:"160px",[SS]: { [CR]: 'time' },},
  {title:"操作",[DI]:"",[SS]: { [CR]: 'action' },width:"250px"},
]
export default {
  name:'broker_user',
  mixins:[brokerSearchInputs],
  data() {
    return {
      partnerUid:this.$store.state.account.userId,
      search:'',
      columns,
      depth:0,
      loading:false,
      accountType:"",
      currentPage:1,
      savedParams:{},
      // search: 客户名字或者手机号
      // page: 页码， 默认1开始
      // limit: 每页个数，默认10
    }
  },
  created(){
    // if(this.queryPhone){
    //   this.search = this.queryPhone
    //   this.partnerUid = this.queryPartnerUid
    // }
    console.log('%c ','color:red',)
    this.searchList()
  },
  methods: {
    goPage(path){
      helper.goPage(path)
    },
    searchList(){
      let params = {
        search:this.search,
        partnerUid:this.partnerUid,
        depth:this.depth,
        accountType:this.accountType,
      }
      console.log('%c params','color:red',params)
      this.currentPage = 1
      this.savedParams = params
      this.getList()
    },
    getList(){
      let params = {
        ...this.savedParams,
        page:this.pagination.current,
        limit:this.pagination.pageSize,
      }
      this.loading = true
      this.getUsers(params)
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
    ...mapActions('broker',["getUsers"]),
  },
  computed: {
    partnerOpts(){
      let arr = this.partners.map((item) => {
        return {
          label:item.name,
          value:item.partnerUid,
        } 
      })
      arr.unshift({label:"我的客户",value:this.userId})
      return arr
    },
    pagination() {
      return {
        pageSize: 2,
        // showSizeChanger: true,
        size: 'small',
        total: this.userList.total,
        current: this.currentPage,
      }
    },
    ...mapState('broker',["partners","userList"]),
    ...mapState('account',["userId"]),
  },
  components: {
    // PartnerSelect,
  },
}
</script>

<style lang='scss' scoped>

</style>
