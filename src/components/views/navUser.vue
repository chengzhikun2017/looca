<template>
  <div class="l-nav-user-box" flex="main:center cross:center">
    <div class="l-nav-user-message">
      <div class="l-nav-user-message-name">{{account.authInfo.name}}</div>
      <div class="l-nav-user-message-phone">{{account.phone}}</div>
    </div>
    <a-menu mode="horizontal" :subMenuCloseDelay='0.2' :subMenuOpenDelay="0.3">
      <a-sub-menu>
        <span class="title" slot="title"><a-icon type="setting"/></span>
        <!-- <a-menu-item-group title="Item 1"> -->
        <a-menu-item key="setting:2" @click.native="logout">Loo账户登出</a-menu-item>
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
  name: 'navUser',
  data() {
    return {
    }
  },
  methods: {
    ...mapActions('account',['logout'])
  },
  computed: {
    ...mapState(['account']),
  },
  components: {},
}

</script>
<style lang='scss' scoped>
.l-nav-user-box {
  .title {
    /*border: 1px solid red;*/
    color: #999;
    transition: .2s;
  }
  .ant-menu-root {
    /*border: 1px solid red;*/
  }
  .l-nav-user-message {
    line-height: 18px;
    &-name {
      text-align: right;
    }
  }
}

</style>
<style lang="scss">

.l-nav-user-box {

  .ant-menu-submenu-title {
    padding: 0 10px;
    /*border: 1px solid red;*/
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

</style>
