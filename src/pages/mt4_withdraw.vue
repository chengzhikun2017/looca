<template>
  <div class="mt4_withdraw-page">
    <a-modal
      title="确认信息"
      style="top: 20px;"
      :visible="confirmVisible"
      @ok="() => next()"
      @cancel="() => {this.confirmVisible=false}"
      okText="确认出金"
      cancelText="取消"
    >
      <p>MT4账号：<span class="mt4_withdraw-confirm-account">754658423</span></p>
    </a-modal>
    <div class="mt4_withdraw-title">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div v-if="current === 0" class="mt4_withdraw-content" flex="dir:top main:center cross:center">
      <a-alert class="mt4_withdraw-alert" message="重要说明" type="info" showIcon>
        <div slot="description">
          <div>1. 务必取消跟单</div>
          <div>2. 平仓所有仓位</div>
        </div>
      </a-alert>
      <div class="mt4_withdraw-table">
        <a-form @submit="handleSubmit">
          <a-form-item :wrapperCol="{ span: 18 }" label='MT4账号' :labelCol="{ span: 6 }">
            <div class="mt4_withdraw-input">
              <a-input placeholder="默认根据账户显示" type="password" ref="inputPassword">
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
      <div class="mt4_withdraw-content-note">
        <p class="mt4_withdraw-content-note-title">如有问题，请联系客服</p>
        <p class="mt4_withdraw-content-note-item">QQ：1231</p>
        <p class="mt4_withdraw-content-note-item">电话：34223</p>
      </div>
    </div>
    <div v-if="current === 1" class="mt4_withdraw-content">
      <div class="mt4_withdraw-content-success" flex="dir:top main:center cross:center">
        <a-icon class="mt4_withdraw-icon-success" type="check-circle" />
        <div class="mt4_withdraw-content-title">出金成功</div>
        <div class="mt4_withdraw-table" >
          <a-form @submit="handleSubmit">
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_withdraw-table-item" label='MT4账号' :labelCol="{ span: 6 }" >
              <span>611738961</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_withdraw-table-item" label='出金金额' :labelCol="{ span: 6 }" >
              <span>$1023.22</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_withdraw-table-item" label='手续费' :labelCol="{ span: 6 }" >
              <span>正在计算</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_withdraw-table-item" label='MT4订单号' :labelCol="{ span: 6 }" >
              <span>41799017</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_withdraw-table-item" label='业务编号' :labelCol="{ span: 6 }" >
              <span>20180819203640110004</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_withdraw-table-item" label='提交时间' :labelCol="{ span: 6 }" >
              <span>2018-08-20 12:24:33</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 18 }" class="mt4_withdraw-table-item" label='状态' :labelCol="{ span: 6 }" >
              <span>正在处理</span>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 24}">
              <div class="bttn-box mt4_withdraw-table-btn">
                <a-button type='primary' htmlType='submit'>
                  查看出入金流水
                </a-button>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div v-if="false" class="mt4_withdraw-content-error" flex="dir:top main:center cross:center">
        <a-icon class="mt4_withdraw-icon-error" type="close-circle" />
        <div class="mt4_withdraw-content-title">出金失败</div>
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
        title: '填写出金信息',
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
  $prefix: "mt4_withdraw";
  .#{$prefix}-page {
    .#{$prefix}-title {
      font-size: 18px;
      padding-bottom: 10px;
    }
    .#{$prefix}-content {
      margin-top: 16px;
      margin-bottom: 40px;
      .#{$prefix}-alert {
        width: 100%;
        max-width: 460px;
      }
      .#{$prefix}-icon-success, .#{$prefix}-icon-error {
        font-size: 60px;
        margin-bottom: 10px;
        line-height: 48px;
        color: #52c41a;
      }
      .#{$prefix}-icon-error {
        color: #f5222d;
      }
      .#{$prefix}-content-title {
        font-size: 18px;
        color: rgba(0,0,0,.85);
        font-weight: 500;
        line-height: 32px;
        margin-bottom: 16px;
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
      }
      .#{$prefix}-content-note {
        margin: 15px;
        padding:10px 0;
        width: 100%;
        border-top: 1px solid #ccc;
        .#{$prefix}-content-note-title {
          color: rgba(0,0,0,.45);
          font-size: 14px;
        }
        .#{$prefix}-content-note-item {
          color: rgba(0,0,0,.45);
          font-size: 12px;
          line-height: 1.5;
          margin-bottom: 5px;
        }
      }
    }
  }

  @media (min-width: 575px) {
    .#{$prefix}-page {
      padding: 20px;
      .#{$prefix}-content {
        .#{$prefix}-icon-success, .#{$prefix}-icon-error {
          margin-top: 20px;
          margin-bottom: 24px;
          font-size: 72px;
          line-height: 72px;
        }
        .#{$prefix}-content-title {
          font-size: 24px;
        }
      }
      .#{$prefix}-title {
        padding:0 40px 10px;
      }
      .#{$prefix}-table {
        margin-top: 20px;
      }
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
      .#{$prefix}-content {
        .#{$prefix}-content-note {
          padding:15px 36px;
          margin: 20px;
          .#{$prefix}-content-note-title {
            font-size: 16px !important;
            margin: 2px 0;
            line-height: 32px;
          }
          .#{$prefix}-content-note-item {
            font-size: 14px;
            margin: 3px;
          }
        }
      }
    }
  }
  .mt4_withdraw-confirm-account, .mt4_withdraw-confirm-money {
    font-size: 16px;
    font-weight: 500;
  }
  .mt4_withdraw-confirm-money {
    color: #f5222d;
  }
</style>
