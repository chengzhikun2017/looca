<template>
  <div class="agent_profit_tip-page">
    <div class="agent_profit_tip-content" v-if="degree === 3">
      <ol>
       <li class="agent_profit_tip-content-item">
          <div class="agent_profit_tip-content-title">手续费收益：外汇6美金、黄金白银12美金、原油1.2美金。</div>
          <div class="note">例：三级代理 -> 客户，交易1手外汇和1手黄金，三级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td rowspan="3">手续费收益</td>
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
       <li class="agent_profit_tip-content-title">
          跟单盈利：下级跟单账户若盈利，直系上级返跟单盈利的5%佣金，亏损无佣金（限直系上级）。
        </li>
       <li class="agent_profit_tip-content-title">返佣时间：手续费次日凌晨1点开始结算，跟单盈利下月初1号结算。请在我的钱包“可提现佣金”查看。</li>
       <li class="agent_profit_tip-content-title">客户升级代理，需要联系客服手动操作，QQ：83166672、电话：4000577009。</li>
      </ol>
    </div>
    <div class="agent_profit_tip-content" v-if="degree === 2">
      <ol>
        <li class="agent_profit_tip-content-item">
          <div class="agent_profit_tip-content-title">手续费收益：</div>
          <div class="agent_profit_tip-content-sub-title">①手续费收益：外汇12美金、黄金白银24美金、原油2.4美金。</div>
          <div class="note">例：二级代理 -> 客户，交易1手外汇和1手黄金，二级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td rowspan="3">手续费收益</td>
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
          <div class="agent_profit_tip-content-sub-title">②享受三级多余收益：外汇6美金、黄金白银12美金、原油1.2美金。</div>
          <div class="note">例：二级代理 -> 三级代理 -> 客户，交易1手外汇和1手黄金，二级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td rowspan="3">手续费收益</td>
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
       <li class="agent_profit_tip-content-title">
          跟单盈利：下级跟单账户若盈利，直系上级返跟单盈利的5%佣金，亏损无佣金（限直系上级）。
        </li>
       <li class="agent_profit_tip-content-title">返佣时间：手续费次日凌晨1点开始结算，跟单盈利下月初1号结算。请在我的钱包“可提现佣金”查看。</li>
       <li class="agent_profit_tip-content-title">客户升级代理，需要联系客服手动操作，QQ：83166672、电话：4000577009。</li>
      </ol>
    </div>
    <div class="agent_profit_tip-content" v-if="degree === 1">
      <ol>
       <li class="agent_profit_tip-content-item">
          <div class="agent_profit_tip-content-title">手续费收益：</div>
          <div class="agent_profit_tip-content-sub-title">①手续费收益：外汇15美金、黄金白银30美金、原油3美金。</div>
          <div class="note">例：一级代理 -> 客户，交易1手外汇和1手黄金，一级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td rowspan="3">手续费收益</td>
                <td>外汇</td>
                <td>15美金</td>
              </tr>
              <tr>
                <td>黄金白银</td>
                <td>30美金</td>
              </tr>
              <tr>
                <td>原油</td>
                <td>3美金</td>
              </tr>
            </table>
          </div>
          <div class="agent_profit_tip-content-sub-title">②同级晋升奖励：外汇1.5美金、黄金白银3美金、原油0.3美金。</div>
          <div class="note">例：一级代理 -> 一级代理 -> 客户，交易1手外汇和1手黄金，原一级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td rowspan="3">同级晋升奖励</td>
                <td>外汇</td>
                <td>1.5美金</td>
              </tr>
              <tr>
                <td>黄金白银</td>
                <td>3美金</td>
              </tr>
              <tr>
                <td>原油</td>
                <td>0.3美金</td>
              </tr>
            </table>
          </div>
          <div class="agent_profit_tip-content-sub-title">③享受二级多余收益：外汇3美金、黄金白银6美金、原油0.6美金。</div>
          <div class="note">例：一级代理 -> 二级代理 -> 客户，交易1手外汇和1手黄金，一级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td rowspan="3">手续费收益</td>
                <td>外汇</td>
                <td>( 15 - 12 ) = 3美金</td>
              </tr>
              <tr>
                <td>黄金白银</td>
                <td>( 30 - 24 ) = 6美金</td>
              </tr>
              <tr>
                <td>原油</td>
                <td>( 3 - 2.4 ) = 0.6美金</td>
              </tr>
            </table>
          </div>
          <div class="agent_profit_tip-content-sub-title">④享受三级多余收益：外汇9美金、黄金白银18美金、原油1.8美金。</div>
          <div class="note">例：一级代理 -> 三级代理 -> 客户，交易1手外汇和1手黄金，一级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td rowspan="3">手续费收益</td>
                <td>外汇</td>
                <td>( 15 - 6 ) = 9美金</td>
              </tr>
              <tr>
                <td>黄金白银</td>
                <td>( 30 - 12 ) = 18美金</td>
              </tr>
              <tr>
                <td>原油</td>
                <td>( 3 - 1.2 ) = 1.8美金</td>
              </tr>
            </table>
          </div>
        </li>
        <li class="agent_profit_tip-content-title">
          跟单盈利：下级跟单账户若盈利，直系上级返跟单盈利的5%佣金，亏损无佣金（限直系上级）。
        </li>
       <li class="agent_profit_tip-content-title">返佣时间：手续费次日凌晨1点开始结算，跟单盈利下月初1号结算。请在我的钱包“可提现佣金”查看。</li>
       <li class="agent_profit_tip-content-title">客户升级代理，需要联系客服手动操作，QQ：83166672、电话：4000577009。</li>
      </ol>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
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
    padding: 0 10px;
    .#{$prefix}-content {
      font-size: 13px;
      &-item {
        margin-top: 15px;
      }
      &-title {
        color: #000000a6;
        padding-bottom: 5px;
        font-weight: 800;
        font-size: 14px;
      }
      &-sub-title {
        padding-bottom: 2px;
      }
      .table {
        margin: 5px 0 15px;
        table {
          border: 1px solid #ccc;
          border-left: none;
          border-bottom: none;
          tr {
            border-bottom: 1px solid #ccc;
            td {
              padding: 5px 10px;
              border-left: 1px solid #ccc;
            }
          }
        }
      }
    }
  }
</style>

