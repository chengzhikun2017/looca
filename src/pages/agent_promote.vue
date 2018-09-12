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
          <td>{{shareInfo.level | agentLevel}}</td>
          <td>${{incomeSummary.total | money}}</td>
          <td>{{guestSummary.total}}</td>
        </tr>
      </tbody>
    </table>
    <div class="agent_promote-content" :flex="'dir:top cross:' + 'start'">
      <div class="agent_promote-content-title">
        推广二维码
      </div>
      <div class="agent_promote-content-image">
        <img :src="shareInfo.qrcodeUrl">
      </div>
      <div class="agent_promote-content-link">
        <div>推广链接</div>
        <div>{{shareInfo.link}}</div>
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("share", ['shareInfo']),
    ...mapGetters('share', ['incomeSummary', 'guestSummary'])
  },
  methods: {
    ...mapActions("share", ['getShareInfo', 'getGuestCount', 'getIncomeCount']),
  },
  created() {
    this.getShareInfo()
    this.getGuestCount()
    this.getIncomeCount()
  },
}

</script>
<style lang="scss">
$prefix: "agent_promote";
@import '@/styles/utils/cardTable.scss';
@import '@/styles/utils/note.scss';
  .#{$prefix}-page {
    .#{$prefix}-content {
      margin:20px 0;
      padding:20px 0;
      .#{$prefix}-content-title {
        font-weight: 800;
        margin-bottom: 10px;
      }
      .#{$prefix}-content-image {
        max-width: 160px;
        height: 160px;
        background: blue;
        img {
          width: 100%;
        }
      }
      .#{$prefix}-content-link {
        margin-top: 10px;
        font-size: 13px;
      }
    }
  }
  @media (min-width: 575px) {
    .#{$prefix}-page {
    }
  }
  @import '@/styles/utils/cardTable.scss';
  @import '@/styles/utils/note.scss';
</style>

</style>
