<template>
  <div class="mt4_recharge-page">
    <a-modal
      title="确认信息"
      style="top: 20px;"
      :visible="confirmVisible"
      @ok="() => next()"
      @cancel="() => {this.confirmVisible=false}"
      okText="确认入金"
      cancelText="取消"
    >
      <p>MT4账号：<span class="mt4_recharge-confirm-account">754658423</span></p>
      <p>入金金额：$<span class="mt4_recharge-confirm-money">324</span></p>
    </a-modal>
    <div class="mt4_recharge-title">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div v-if="current === 0" class="mt4_recharge-content" flex="dir:top main:center cross:center">
      <div class="mt4_recharge-table">
        <a-form @submit="handleSubmit">
          <a-form-item :wrapperCol="{ span: 18 }" label='钱包余额' :labelCol="{ span: 6 }" >
            <span>$1021.33</span>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 18 }" label='MT4账号' :labelCol="{ span: 6 }">
            <div class="mt4_recharge-input">
              <a-input placeholder="默认根据账户显示" type="password" ref="inputPassword">
              </a-input>
            </div>
          </a-form-item>
           <a-form-item :wrapperCol="{ span: 18 }" label='入金金额' :labelCol="{ span: 6 }" :help="'最少1000美金'">
            <div class="mt4_recharge-input">
              <a-input placeholder="请输入金额" type="password" ref="inputPassword">
              </a-input>
            </div>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 24}">
            <div class="bttn-box">
              <a-button type='primary' htmlType='submit'>
                提交
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div v-if="current === 1" class="mt4_recharge-content">
      <div class="mt4_recharge-content-success" flex="dir:top main:center cross:center">
        <a-icon class="mt4_recharge-icon-success" type="check-circle" />
        <div class="mt4_recharge-content-title">入金成功</div>
        <div class="mt4_recharge-table" >
          <a-form @submit="handleSubmit">
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_recharge-table-item" label='MT4账号' :labelCol="{ span: 6 }" >
              <span>611738961</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_recharge-table-item" label='入金金额' :labelCol="{ span: 6 }" >
              <span>$1023.22</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_recharge-table-item" label='MT4订单号' :labelCol="{ span: 6 }" >
              <span>41799017</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_recharge-table-item" label='业务编号' :labelCol="{ span: 6 }" >
              <span>20180819203640110004</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_recharge-table-item" label='提交时间' :labelCol="{ span: 6 }" >
              <span>2018-08-20 12:24:33</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 24}">
              <div class="bttn-box mt4_recharge-table-btn">
                <a-button type='primary' htmlType='submit'>
                  查看出入金流水
                </a-button>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div v-if="false" class="mt4_recharge-content-error" flex="dir:top main:center cross:center">
        <a-icon class="mt4_recharge-icon-error" type="close-circle" />
        <div class="mt4_recharge-content-title">入金失败</div>
        <p>账户同步失败，请重试</p>
        <a-button type='primary'>
          返回
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 0,
      steps: [{
        title: '填写入金信息',
      }, {
        title: '完成',
      }],
      confirmVisible: false
    }
  },
  methods: {
    next() {
      this.current++
      this.confirmVisible = false
    },
    prev() {
      this.current--
    },
    handleSubmit() {
      this.confirmVisible = true
    },
    handleChange() {
    }
  }
}
</script>

<style lang="scss" scoped>
  $prefix: "mt4_recharge";
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
  .#{$prefix}-confirm-account, .#{$prefix}-confirm-money {
    font-size: 16px;
    font-weight: 500;
  }
  .#{$prefix}-confirm-money {
    color: #f5222d;
  }
</style>
