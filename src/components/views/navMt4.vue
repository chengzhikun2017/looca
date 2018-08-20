<template>
  <div class="l-nav-mt4" v-if="listGot">
    <a-menu mode="horizontal" :subMenuCloseDelay='0.2' :subMenuOpenDelay="0.3">
      <a-sub-menu>
        <span class="title" slot="title">
          <a-icon type="laptop"/>
          <span class="mt4-ac">{{currentMt4Uid||'1324232'}}</span>
        </span>
        <!-- <a-menu-item-group title="Item 1"> -->
        <a-menu-item :key="mt4.mt4Uid" @click.native="onClickItem(mt4)" v-for="mt4 in list">
          {{mt4.mt4Uid}}{{ mt4.mt4Uid===currentMt4Uid?' 已登录':''}}
        </a-menu-item>
        <!-- <a-menu-item key="setting:2" @click.native="logout">Loo账户登出</a-menu-item> -->
        <!-- </a-menu-item-group> -->
        <!-- <a-menu-item-group title="Item 2"> -->
        <!-- <a-menu-item key="setting:3">Option 3</a-menu-item>
          <a-menu-item key="setting:4">Option 4</a-menu-item> -->
        <!-- </a-menu-item-group> -->
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
export default {
  name:'navMt4',
  data() {
    return {
      
    }
  },
  methods: {
    onClickItem(mt4){
      this.setCurrent(mt4.mt4Uid)
    },
    ...mapMutations('mt4AC',['setCurrent'])
  },
  computed: {
    ...mapState('mt4AC',['currentMt4Uid','list','listGot'])
  },
  components: {},
}
</script>

<style lang='scss' scoped>
.l-nav-mt4 {
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

.l-nav-mt4 {
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
