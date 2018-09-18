<template>
  <!-- v-if="listGot&&this.list.length>0" -->
  <span class="l-mt4-select">
    MT4账号：
    <a-select  v-model="selectedId" style="width: 120px" @change="handleChange">
      <a-select-option :key="mt4.mt4Uid" :value="mt4.mt4Uid" v-for="mt4 in list">
        {{mt4.mt4Uid}}
      </a-select-option>
    </a-select>
  </span>
</template>

<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
export default {
  name:'mt4Select',
  data() {
    return {
      selectedId:null,
    }
  },
  props:{
    type:{
      type:Number,
      default:1,//
    },
    showSelect:{
      type:Boolean,
      default:false,
    },
  },
  created(){
    this.selectedId=this.currentMt4Uid
  },
  methods: {
    handleChange(id){
      // console.log('%c changed','color:red',e)
      this.setCurrent(id)
    },
    // onClickItem(mt4){
    //   this.setCurrent(mt4.mt4Uid)
    // },
    ...mapMutations('mt4AC',['setCurrent'])
  },
  computed: {
    ...mapState('mt4AC',['currentMt4Uid','list','listGot'])
  },
  components: {},
}
</script>

<style lang='scss' scoped>
.l-mt4-select{
  display: inline-block;
  .title {
    color: #999;
    transition: .2s;
  }
  .ant-menu-root {
  }

}
.mt4-ac{
  padding-left: 5px;
}
</style>
<style lang="scss">
.l-mt4-select{
  .ant-menu-submenu-title {
    padding: 0 10px;
    &:hover{
      .title{
        color:#1990ff;
      }
    }
  }
  .ant-menu-submenu-title>.title {
    .anticon {
      margin: 0;
    }
  }
  .ant-menu {
    border: 0;
  
  }
  .ant-menu-horizontal {
    line-height: 32px;
  }
  .ant-menu-horizontal>.ant-menu-submenu {
    border: 0;
  }
}
.l-nav-mt4-account-item{
  width: 160px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ant-menu-submenu ul.ant-menu-vertical.ant-menu-sub {
  min-width: 10px;
  .ant-menu-item-selected{
    background:#fff;
    color:rgba(0,0,0,0.65);
    &:hover{
      color:#1890ff;
      background:#e6f7ff;
    }
  }
  .ant-menu-item{
    &:hover{
      color:#1890ff;
      background:#e6f7ff;
    }
  }
}
.ant-menu-vertical{
  max-height: 300px;
  overflow: auto;
}
</style>

