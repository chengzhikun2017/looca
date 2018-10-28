<template>
  <div class="agent_profit_tip-page">
    <div class="agent_profit_tip-content" v-if="degree === 1">
      <ol>
        <li>
          <div class="title">手续费收益：外汇6美金、黄金白银12美金、原油1.2美金。</div>
          <div class="note">例：三级代理 -> 客户，交易1手外汇和1手黄金，三级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td colspan="3">手续费收益</td>
                <td>外汇</td>
                <td>6美金</td>
              </tr>
              <tr>
                <td>黄金白银</td>
                <td>12美金</td>
              </tr>
              <tr>
                <td>原油</td>
                <td>1.2美金</td>
              </tr>
            </table>
          </div>
        </li>
        <li>
          跟单盈利：下级跟单账户若盈利，直系上级返跟单盈利的5%佣金，亏损无佣金（限直系上级）。
        </li>
        <li>返佣时间：手续费次日凌晨1点开始结算，跟单盈利下月初1号结算。请在我的钱包“可提现佣金”查看。</li>
        <li>客户升级代理，需要联系客服手动操作，QQ：83166672、电话：4000577009。</li>
      </ol>
    </div>
    <div class="agent_profit_tip-content" v-if="degree === 2">
      <ol>
        <li>
          <div class="title">手续费收益：外汇6美金、黄金白银12美金、原油1.2美金。</div>
          <div class="sub-title">①手续费收益：外汇12美金、黄金白银24美金、原油2.4美金。</div>
          <div class="note">例：二级代理 -> 客户，交易1手外汇和1手黄金，二级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td colspan="3">手续费收益</td>
                <td>外汇</td>
                <td>12美金</td>
              </tr>
              <tr>
                <td>黄金白银</td>
                <td>24美金</td>
              </tr>
              <tr>
                <td>原油</td>
                <td>2.4美金</td>
              </tr>
            </table>
          </div>
          <div class="sub-title">②享受三级多余收益：外汇6美金、黄金白银12美金、原油1.2美金。</div>
          <div class="note">例：二级代理 -> 三级代理 -> 客户，交易1手外汇和1手黄金，二级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td colspan="3">手续费收益</td>
                <td>外汇</td>
                <td>( 12 - 6 ) = 6美金</td>
              </tr>
              <tr>
                <td>黄金白银</td>
                <td>( 24 - 12 ) = 12美金</td>
              </tr>
              <tr>
                <td>原油</td>
                <td>( 2.4 - 1.2 ) = 1.2美金</td>
              </tr>
            </table>
          </div>
        </li>
        <li>
          跟单盈利：下级跟单账户若盈利，直系上级返跟单盈利的5%佣金，亏损无佣金（限直系上级）。
        </li>
        <li>返佣时间：手续费次日凌晨1点开始结算，跟单盈利下月初1号结算。请在我的钱包“可提现佣金”查看。</li>
        <li>客户升级代理，需要联系客服手动操作，QQ：83166672、电话：4000577009。</li>
      </ol>
    </div>
  </div>
</template>
<script>
  export default {
    porps: {
      degree: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {}
    }
  }
</script>
<style lang="scss">
  $prefix: "agent_profit_tip";
  .#{$prefix}-page {
    .#{$prefix}-content {

    }
  }
</style>

