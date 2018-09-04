<template>
  <div class="agent_promote-page">
    <table class="agent_promote-cardTable">
      <thead>
        <tr>
          <th>等级</th>
          <th>总收入</th>
          <th>总客户</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>小喽喽</td>
          <td>$33.44</td>
          <td>39</td>
        </tr>
      </tbody>
    </table>
    <div class="agent_promote-content">
      <div class="agent_promote-content-title">
        推广二维码
      </div>
      <div class="agent_promote-content-image">
        二维码图片
      </div>
      <div class="agent_promote-content-link">
        <div>推广链接</div>
        <div>http://www.xx.com?ss=dd</div>
      </div>
    </div>
    <div class="agent_promote-note">
      <div class="agent_promote-note-title">
        推广返利说明
      </div>
      <div class="agent_promote-note-item">
        代理等级：小喽喽、组长、经理
      </div>
      <div class="agent_promote-note-item">
        返利金额：各交易品种佣金表
      </div>
      <div class="agent_promote-note-item">
        结算时间：点差佣金次日结算，跟单手续费佣金月初结算
      </div>
      <div class="agent_promote-note-item">
        客户关系：一级为直接客户、二级为您一级客户推广的客户，依次类推
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    created(){
      // this.$showPageLoading()  
    },
  }
</script>
<style lang="scss">
  $prefix: "agent_promote";
  @import '@/styles/utils/cardTable.scss';
  @import '@/styles/utils/note.scss';
</style>

