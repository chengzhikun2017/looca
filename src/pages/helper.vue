<template>
  <div class="helper-page">
    <div class="helper-page-note">
      <div class="helper-page-note-title">
        普通账户交易规则
      </div>
      <div class="helper-page-note-item">
        1.普通账户最多可以创建5个；
      </div>
      <div class="helper-page-note-item">
        2.手续费：外汇1手20美金，黄金白银1手50美金，原油1手5美金；
      </div>
      <div class="helper-page-note-item">
        3.交易密码自己交易时使用，只读密码，只能查看，不能交易；
      </div>
      <div class="helper-page-note-item">
        4.普通账户持仓最长不超过1个月，否则平台将强制平仓；
      </div>
      <div class="helper-page-note-item">
        5.如需帮助，请联系客服QQ83166672、电话4000577009。
      </div>
    </div>
    <div class="helper-page-note">
      <div class="helper-page-note-title">
        跟单账户交易规则
      </div>
      <div class="helper-page-note-item">
        1.跟单账户最多可以创建10个；
      </div>
      <div class="helper-page-note-item">
        2.手续费：外汇1手20美金，黄金白银1手50美金，原油1手5美金；
      </div>
      <div class="helper-page-note-item">
        3.平台获取跟单盈利的25%佣金，直系上级获取跟单盈利的5%佣金，亏损不收取佣金；
      </div>
      <div class="helper-page-note-item">
        4.周期为一个月，每月1号结算上月跟单佣金，若客户月内提现，跟单佣金即时结算；
      </div>
      <div class="helper-page-note-item">
        5.跟单账户需在月末最后一天24点前全部平仓，待结算后中午12点重新开仓；
      </div>
      <div class="helper-page-note-item">
        6.跟单账号自己不可交易，若盈利，平台照常收取跟单佣金，若因自己操作失误造成亏损，平台概不负责；
      </div>
      <div class="helper-page-note-item">
        7.如需帮助，请联系客服QQ83166672、电话4000577009。
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'helper',
  data() {
    return {

    }
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang="scss">
$prefix: "helper";
@import '@/styles/utils/cardTable.scss';
@import '@/styles/utils/note.scss';
.#{$prefix}-page {
  &-note {
    &-title {
      color: rgba(#000000, 0.6);
      font-weight: 700;
      font-size: 15px;
      line-height: 1.5;
      padding: 20px 0 5px;
    }
    &-item {
      color: rgba(10, 10, 10, .65);
      padding-bottom: 5px;
      font-size: 14px;
    }
  }
}

@media (min-width: 575px) {
  .#{$prefix}-page {}
}

@import '@/styles/utils/cardTable.scss';
@import '@/styles/utils/note.scss';
</style>
