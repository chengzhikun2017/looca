<template>
  <div class="agent_profit_tip-page">
    <h3 class="agent_profit_tip-page-title" v-if="!hide">推广说明</h3>
    <div class="agent_profit_tip-content" v-if="degree === 3">
      <ol>
       <li class="agent_profit_tip-content-item">
          <div class="agent_profit_tip-content-title">手续费收益：外汇4美金、黄金白银10美金、原油1美金。</div>
          <div class="agent_profit_tip-content-note">例：三级代理 -> 客户，交易1手外汇、1手黄金和1手原油，三级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td rowspan="3">手续费收益</td>
                <td>外汇</td>
                <td>4美金</td>
              </tr>
              <tr>
                <td>黄金白银</td>
                <td>10美金</td>
              </tr>
              <tr>
                <td>原油</td>
                <td>1美金</td>
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
          <div class="agent_profit_tip-content-sub-title">①手续费收益：外汇8美金、黄金白银20美金、原油2美金。</div>
          <div class="agent_profit_tip-content-note">例：二级代理 -> 客户，交易1手外汇、1手黄金和1手原油，二级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td rowspan="3">手续费收益</td>
                <td>外汇</td>
                <td>8美金</td>
              </tr>
              <tr>
                <td>黄金白银</td>
                <td>20美金</td>
              </tr>
              <tr>
                <td>原油</td>
                <td>2美金</td>
              </tr>
            </table>
          </div>
          <div class="agent_profit_tip-content-sub-title">②享受三级多余收益：外汇4美金、黄金白银10美金、原油1美金。</div>
          <div class="agent_profit_tip-content-note">例：二级代理 -> 三级代理 -> 客户，交易1手外汇、1手黄金和1手原油，二级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td rowspan="3">手续费收益</td>
                <td>外汇</td>
                <td>( 8 - 4 ) = 4美金</td>
              </tr>
              <tr>
                <td>黄金白银</td>
                <td>( 20 - 10 ) = 10美金</td>
              </tr>
              <tr>
                <td>原油</td>
                <td>( 2 - 1 ) = 1美金</td>
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
          <div class="agent_profit_tip-content-sub-title">①手续费收益：外汇10美金、黄金白银25美金、原油2.5美金。</div>
          <div class="agent_profit_tip-content-note">例：一级代理 -> 客户，交易1手外汇、1手黄金和1手原油，一级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td rowspan="3">手续费收益</td>
                <td>外汇</td>
                <td>10美金</td>
              </tr>
              <tr>
                <td>黄金白银</td>
                <td>25美金</td>
              </tr>
              <tr>
                <td>原油</td>
                <td>2.5美金</td>
              </tr>
            </table>
          </div>
          <div class="agent_profit_tip-content-sub-title">②同级晋升奖励：外汇1美金、黄金白银2.5美金、原油0.25美金。</div>
          <div class="agent_profit_tip-content-note">例：一级代理 -> 一级代理 -> 客户，交易1手外汇、1手黄金和1手原油，原一级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td rowspan="3">同级晋升奖励</td>
                <td>外汇</td>
                <td>1美金</td>
              </tr>
              <tr>
                <td>黄金白银</td>
                <td>2.5美金</td>
              </tr>
              <tr>
                <td>原油</td>
                <td>0.25美金</td>
              </tr>
            </table>
          </div>
          <div class="agent_profit_tip-content-sub-title">③享受二级多余收益：外汇2美金、黄金白银5美金、原油0.5美金。</div>
          <div class="agent_profit_tip-content-note">例：一级代理 -> 二级代理 -> 客户，交易1手外汇、1手黄金和1手原油，一级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td rowspan="3">手续费收益</td>
                <td>外汇</td>
                <td>( 10 - 8 ) = 2美金</td>
              </tr>
              <tr>
                <td>黄金白银</td>
                <td>( 25 - 20 ) = 5美金</td>
              </tr>
              <tr>
                <td>原油</td>
                <td>( 2.5 - 2 ) = 0.5美金</td>
              </tr>
            </table>
          </div>
          <div class="agent_profit_tip-content-sub-title">④享受三级多余收益：外汇6美金、黄金白银15美金、原油1.5美金。</div>
          <div class="agent_profit_tip-content-note">例：一级代理 -> 三级代理 -> 客户，交易1手外汇、1手黄金和1手原油，一级代理获得收益如下：</div>
          <div class="table">
            <table>
              <tr>
                <td rowspan="3">手续费收益</td>
                <td>外汇</td>
                <td>( 10 - 4 ) = 6美金</td>
              </tr>
              <tr>
                <td>黄金白银</td>
                <td>( 25 - 10 ) = 15美金</td>
              </tr>
              <tr>
                <td>原油</td>
                <td>( 2.5 - 1 ) = 1.5美金</td>
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
        default: 0
      }
    },
    computed:{
      hide(){
        return this.degree>3 || this.degree <1
      },
    },
    data () {
      return {}
    }
  }
</script>
<style lang="scss">
  $prefix: "agent_profit_tip";
  .#{$prefix}-page {
    &-title {
      color: rgba(0, 0, 0, .65);
      font-size: 15px;
      line-height: 1.5;
      font-weight: 700;
      padding: 0;
      margin: 0;
    }
    .#{$prefix}-content {
      padding: 0 10px;
      font-size: 13px;
      &-item {
        margin-top: 6px;
      }
      &-title {
        color: rgba(10, 10, 10, .65);
        padding-bottom: 5px;
        font-size: 14px;
      }
      &-sub-title {
        font-size: 13px;
        color: rgba(20, 20, 20, .65);
        padding-bottom: 2px;
      }
      &-note {
        font-size: 13px;
        color: rgba(50, 50, 50, .65);
        padding-bottom: 2px;
      }
      .table {
        margin: 5px 0 15px;
        table {
          border: 1px solid #ccc;
          border-left: none;
          border-bottom: none;
          font-size: 12px;
          tr {
            border-bottom: 1px solid #ccc;
            td {
              padding: 8px 15px;
              border-left: 1px solid #ccc;
            }
          }
        }
      }
    }
  }
</style>

