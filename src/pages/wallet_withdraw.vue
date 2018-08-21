<template>
  <div class="wallet_withdraw-page">
    <div class="wallet_withdraw-title">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div v-if="current === 0" class="wallet_withdraw-content" flex="dir:top main:center cross:center">
      <a-alert class="wallet_withdraw-alert" message="人民币汇率:6.8321" type="info" showIcon closable />
      <div class="wallet_withdraw-table">
        <a-form @submit="handleSubmit">
          <a-form-item :wrapperCol="{ span: 18 }" label='钱包余额' :labelCol="{ span: 6 }" >
            <span>$3333（人民币金额 ¥8888）</span>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 18 }" label='提现金额' :labelCol="{ span: 6 }" :help="'人民币金额 ¥1000'">
            <div class="wallet_withdraw-input">
              <a-input placeholder="请输入金额" type="password" ref="inputPassword">
              </a-input>
            </div>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 18 }" label='银行卡：' :labelCol="{ span: 6 }" >
            <div class="wallet_withdraw-input">
              <a-select defaultValue="lucy">
                <a-select-option value="jack">中国银行(7634)</a-select-option>
                <a-select-option value="lucy">中国工商银行(4364)</a-select-option>
                <a-select-option value="Yiminghe">中国农业银行(3544)</a-select-option>
              </a-select>
            </div>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 24}">
            <div class="bttn-box">
              <a-button type='primary' htmlType='submit'>
                下一步
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div v-if="current === 1" class="wallet_withdraw-content" flex="dir:top main:center cross:center">
      <a-alert class="wallet_withdraw-alert" message="人民币汇率:6.8321" type="info" showIcon closable />
      <div class="wallet_withdraw-table">
        <a-form @submit="handleSubmit">
          <a-form-item :wrapperCol="{ span: 18 }" label='提现金额' :labelCol="{ span: 6 }" >
            ¥<span>3333</span> （人民币金额 ¥8888）
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 18 }" label='银行卡：' :labelCol="{ span: 6 }" >
            <div class="wallet_withdraw-card">
              <Card :info="card" :type="2"></Card>
            </div>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 24}">
            <div class="bttn-box">
              <a-button type='primary' htmlType='submit'>
                提交
              </a-button>
              <a-button type='primary' @click="prev">
                上一步
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div v-if="current === 2" class="wallet_withdraw-content">
      <div v-if="false" class="wallet_withdraw-content-success" flex="dir:top main:center cross:center">
        <a-icon class="wallet_withdraw-icon-success" type="check-circle" />
        <div class="wallet_withdraw-content-title">操作成功</div>
        <p>预计1-2个工作日到账</p>
        <div class="wallet_withdraw-table" >
          <a-form @submit="handleSubmit">
            <a-form-item :wrapperCol="{ span: 18 }" class="wallet_withdraw-table-item" label='提现账户：' :labelCol="{ span: 6 }" >
              <span>中国银行(8769)</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="wallet_withdraw-table-item" label='提现金额' :labelCol="{ span: 6 }" >
              <span class="wallet_withdraw-money">$3333</span><div class="wallet_withdraw-money-note">（人民币：¥8888，汇率：6.1817）</div>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 24}">
              <div class="bttn-box wallet_withdraw-table-btn">
                <a-button type='primary' htmlType='submit'>
                  再提一笔
                </a-button>
                <a-button type='primary' htmlType='submit'>
                  查看账单
                </a-button>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div class="wallet_withdraw-content-error" flex="dir:top main:center cross:center">
        <a-icon class="wallet_withdraw-icon-error" type="close-circle" />
        <div class="wallet_withdraw-content-title">操作失败</div>
        <p>系统异常，请稍后再试</p>
        <a-button type='primary'>
          重新提交
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
var Card = () =>
import ('./../components/container/cardDC.vue')
export default {
  data() {
    return {
      current: 0,
      steps: [{
        title: '填写提现信息',
        content: 'First-content',
      }, {
        title: '确认提现信息',
        content: 'Second-content',
      }, {
        title: '完成',
        content: 'Last-content',
      }],
      card: {
        bankName: '中国银行',
        bankBranch: '福建路支行',
        cardNum: '6372837382738273',
        name: '龙翔桥'
      }
    }
  },
  methods: {
    next() {
      this.current++
    },
    prev() {
      this.current--
    },
    handleSubmit() {
      this.current++
    }
  },
  components: {
    Card
  }
}
</script>
<style lang="scss" scoped>
  $prefix: "wallet_withdraw";
  @import '@/styles/steps/index.scss';
  .#{$prefix}-page {
    .#{$prefix}-content {
      .#{$prefix}-alert {
        width: 100%;
        max-width: 460px;
      }
      .#{$prefix}-table {
        margin-bottom: 20px;
        width: 100%;
        max-width: 460px;
        .#{$prefix}-money {
          font-size: 24px;
          font-weight: 500;
          color: #f5222d;
        }
        .#{$prefix}-table-item {
          background: #fafafa;
          padding: 10px;
          margin-bottom: 0 !important;
        }
        .#{$prefix}-table-btn {
          margin-top: 20px;
        }
      }
    }
  }

  @media (min-width: 575px) {
    .#{$prefix}-page {
      .#{$prefix}-table-item {
        padding: 10px;
      }
      .#{$prefix}-input {
        padding-right: 38px;
      }
      .#{$prefix}-table-btn {
        padding-left: 30px;
        margin-top: 20px;
      }
      .#{$prefix}-card {
        padding-right: 38px;
      }
      .#{$prefix}-money-note {
        display: inline-block;
      }
    }
  }
</style>
