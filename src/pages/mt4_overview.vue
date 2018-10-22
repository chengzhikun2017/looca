<template>
  <div class="mt4-overview-page">
    <a-modal
      title="选择开户类型"
      :visible="showCreateModal"
      @ok="onCreateOK"
      :confirmLoading="confirmLoading"
      @cancel="onCreateCancel"
      okText="确认开户"
      cancelText="取消"
    >
      <div class="choose-type">
        <!-- <a-radio-group name="radioGroup" v-model="createType" >
          <a-radio value="live">实名账户</a-radio>
          <a-radio value="demo">虚拟账户</a-radio>
          <a-radio value="bind">绑定账户</a-radio>
        </a-radio-group> -->
        <a-radio-group name="radioGroup" v-model="createType" >
          <a-radio value="normal" :disabled="!canCreateNormal">
            普通账户
            <span v-if="!canCreateNormal">(最多创建{{MAX_NORMAL_NUM}}个普通账户)</span>
          </a-radio>
          <a-radio value="follow" :disabled="!canCreateFollow">
            跟单账户
            <span v-if="!canCreateFollow">(最多创建{{MAX_FOLLOW_NUM}}个跟单账户)</span>
          </a-radio>
        </a-radio-group>
      </div>
    </a-modal>
    <div class="btn-container phone fixed-btn">
      <a class="link-btn" href="javascript:void(0)" v-if="!isPC" @click="chooseCreate" >
        新增账户
      </a>
    </div>
    <div class="default-info" :class="isPC?'':'phone'">
      <div class="btn-container" :class="isPC?'':'phone'" v-if="listGot">
        <a-button size="small" v-if="isPC"  type="primary" @click="chooseCreate" :disabled="!canCreate">
          新增账户
        </a-button>
        <a-button size="small" v-if="isPC"  type="primary" @click="refresh" >
          刷新
        </a-button>

      </div>
      <span >
        剩余可入金金额：${{money.balance | money}}
      </span>
      <a class="link-btn refresh-btn" href="javascript:void(0)" v-if="!isPC" @click="refresh" >
        刷新
      </a>
      <a-button size="small" v-if="list.length>0 && false" type="primary" @click="goPage('/mt4_money_bill')">
        出入金记录
      </a-button>
    </div>
    <Mt4SyncFail  :success="!!!syncSuccess&&!loading" :reSyncFunc="refresh"> </Mt4SyncFail>
    <div>
      <a-list
        itemLayout="horizontal"
        :dataSource="list"
        :split="false"
        v-if="!isPC"
        :locale="{emptyText:listGot?'暂无数据':'加载中...'}"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <ListItemMobile :mt4="item"></ListItemMobile>
        </a-list-item>
      </a-list>
    </div>
    <div>
      <a-table :columns="columns"
          :rowKey="rowKey"
          :dataSource="list"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          v-if="isPC"
        >
        <!-- <template slot="balanceFee" slot-scope="balanceFee">
          {{balanceFee|money}}
        </template>
        <template slot="createTime" slot-scope="createTime">
          {{createTime|timeFull}}
        </template> -->
        <template slot="list" slot-scope="text, record, index">
          <ListItem :mt4="record"></ListItem>
        </template>
       <!--  <template slot="action" slot-scope="text, record, index">
          <a-button size="small" type="primary">立即入金</a-button>
          <a-button size="small" @click.native="onSelectCurrent(record,index)" v-if="currentMt4Uid!=record.mt4Uid" type="primary">
            登录
          </a-button>
          <a-button size="small" @click.native="onSelectCurrent(record,index)" v-if="currentMt4Uid==record.mt4Uid"  disabled >
            已登录
          </a-button> -->
          <!-- <span>{{text}}{{record}}</span> -->
        <!-- </template> -->
      </a-table>
    </div>
    <div class="empty" v-if="listGot&&list.length===0">
      <a-col :xs="24" :sm="12" :md="8">
        <div class="empty-card" @click="chooseCreate" flex="main:center cross:center">
          + 添加账户
        </div>
      </a-col>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import ListItem from "./../components/container/mt4AccountListItem.vue"
import ListItemMobile from "./../components/container/mt4AccountCard.vue"
import helper from '../utils/helper.js'
const Mt4SyncFail = ()=> import( '../components/container/mt4SyncFail.vue')
const singleColum = [
{
  title: '',
  dataIndex: 'mt4Uid',
  scopedSlots: { customRender: 'list' },
},
]
const MAX_NORMAL_NUM = 5
const MAX_FOLLOW_NUM = 10
var allIndex = []
// for(let key in allColumns){
//   allIndex.push(allColumns[key].dataIndex)
// }
export default {
  name:'mt4_overview',
  data() {
    return {
      MAX_NORMAL_NUM,
      MAX_FOLLOW_NUM,
      createType: '',
      showCreateModal: false,
      confirmLoading: false,
      columnsShow: allIndex,
      value: undefined,
      data: [{
        name:{
          first:'1',
          last:'str',
        },
        gender:'female',
        email:'912143546@qq.com',
        uid:1,
      }],
      pagination: {
        defaultPageSize:15,
        showSizeChanger:true,
        current:1,
      },
      // loading: false,
      // columns,
      // allColumns,
    }
  },
  created(){
    this.refresh()
    if(this.list.length>0){
      this.setDefaultCurrent()
    }
  },
  methods: {
    refresh() {
      this.getList()
      this.getWallet()
    },
    chooseCreate(){
      if(this.canCreateNormal){
        this.createType = 'normal'
      }else if(this.canCreateFollow){
        this.createType = 'follow'
      }else {
        this.$message.error('无法创建更多账户了')
        return
      }
      this.showCreateModal = true

    },
    goPage(path){
      helper.goPage(path)
    },
    // onSelectCurrent(mt4,index){
    //   this.setCurrent(mt4.mt4Uid)
    // },
    onCreateOK(e){
      if(!this.createType){
        this.$message.error('请选择开户类型')
        return
      }
      if(this.createType==="bind"){
        helper.goPage('/mt4_bind')
      }else{
        helper.goPage('/mt4_create/'+this.createType)
      }
      this.showCreateModal = false
    },
    onCreateCancel(){
      this.showCreateModal = false
    },
    rowKey(record){
      return record.mt4Uid
    },
    onChange(value){
      this.columnsShow = value
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination,filters,sorter);
      this.pagination = Object.assign({},pagination)
    },
    ...mapMutations('mt4AC',['setCurrent']),
    ...mapActions('mt4AC',['getList','setDefaultCurrent']),
    ...mapActions('wallet',[,'getWallet']),
  },
  watch:{
    listLength(value){
      if(value>0){
        this.setDefaultCurrent()
      }
    },
  },
  computed: {
    loading(){
      return !this.listGot 
    },
    columns(){
      return singleColum
      // let arr = this.columnsShow.map((item) => {
      //   return this.allColumns[item]
      // })
      // return arr.concat(staticColums)
    },
    listLength(){
      return this.list.length
    },
    canCreate(){
      return this.canCreateFollow || this.canCreateNormal
    },
    canCreateNormal(){
      return this.countNormal < this.MAX_NORMAL_NUM
    },
    canCreateFollow(){
      return this.countFollow < this.MAX_FOLLOW_NUM
    },
    ...mapState('mt4AC',['list','currentMt4Uid','listGot','syncSuccess','countNormal','countFollow']),
    ...mapState('app',['isPC']),
    ...mapState('wallet',['money']),
  },
  components: {
    Mt4SyncFail,
    ListItem,
    ListItemMobile,
  },
}
</script>

<style lang='scss' scoped>
.mt4-overview-page{
  .default-info{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 8px;
    padding-right: 12px;
    position: relative;
    .btn-container {
      position: absolute;
      left: 0;
      top: 0;
    }
    
    button{
      margin-left: 5px;
    }
  }
  .fixed-btn {
    position: fixed;
    right: 5px;
    left:auto;
    top: 10px;
    .link-btn{
      &:active,&:hover{
        text-decoration: none;
      }
    }
    /*z-index:2;*/
  }
  .default-info.phone{
    .refresh-btn{
      position: absolute;
      right: 0;
    }
    /*display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0;*/
  }
  .header{
    text-align: right;
    margin-bottom: 24px;
    position: relative;
    .colum-filter,.text{
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width:100%;
      padding-right: 200px;
      padding-left: 100px;

    }
    .text{
      text-align: left;
      line-height: 32px;
      padding-left: 0;
    }
    .label{
      position: absolute;;
      left: 0;
      top: 0;
      display: inline-block;
      height: 100%;
      line-height: 32px;
    }
  }
}
.empty-card {
  margin: 8px;
  height: 137px;
  border-radius: 3px;
  border: 1px dashed #ccc;
  &:hover {
    border: 1px dashed #1890ff;
    color: #1890ff;
    cursor: pointer;
  }
}
</style>
<style lang='scss'>
.mt4-overview-page{
  .ant-list-item{
    padding: 0;
  }
  .ant-table-thead{
    display: none;
  }
}
</style>
