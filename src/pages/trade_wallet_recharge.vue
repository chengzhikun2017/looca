<template>
  <div class="trade_wallet_recharge-page">
    <div class="trade_wallet_recharge-title">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div v-if="current === 0" class="trade_wallet_recharge-content" flex="dir:top main:center cross:center">
      <div class="trade_wallet_recharge-table">
        <a-form @submit="handleSubmit">
          <a-form-item :wrapperCol="{ span: 18 }" label='充值货币' :labelCol="{ span: 6 }" >
            <span>美金</span>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 18 }" label='充值金额' :labelCol="{ span: 6 }" :help="'最低存款金额：$1000'">
            <div class="trade_wallet_recharge-input">
              <a-input placeholder="请输入金额" type="password" ref="inputPassword">
              </a-input>
            </div>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 18 }" label='支付金额' :labelCol="{ span: 6 }" help="实时汇率：1美金兑换6.1718人民币">
            <div>根据实时汇率自动计算</div>
            <div></div>
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
    <div v-if="current === 1" class="trade_wallet_recharge-content" flex="dir:top main:center cross:center">
      <div class="trade_wallet_recharge-content-pay" flex="dir:top main:center cross:center">
        <div class="trade_wallet_recharge-content-pay-way">请使用支付宝APP</div>
        <div class="trade_wallet_recharge-content-pay-note">扫一扫付款（元）</div>
        <div class="trade_wallet_recharge-content-pay-money">1888.23</div>
        <div class="trade_wallet_recharge-content-pay-qrcode">
          <img src="" alt="支付宝收款二维码">
        </div>
      </div>
      <div class="trade_wallet_recharge-content-upload-dragger pc">
        <a-upload-dragger name="file" :multiple="true" action="//jsonplaceholder.typicode.com/posts/" @change="handleChange">
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">将文件拖到此处, 或点击上传</p>
          <p class="ant-upload-hint">上传账单详情截图</p>
        </a-upload-dragger>
      </div>
      <div class="trade_wallet_recharge-content-upload phone">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action="//jsonplaceholder.typicode.com/posts/"
          :beforeUpload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="" />
          <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </div>
      <a-button type="primary" @click="next">下一步</a-button>
      <div class="trade_wallet_recharge-content-note">
        <h3 class="trade_wallet_recharge-content-note-title">重要提示</h3>
        <!-- 这里的提示信息是需要动态替换的 -->
        <p class="trade_wallet_recharge-content-note-item">1. 支付宝实名校验：陶雨xxx，若错误请勿继续转账</p>
        <p class="trade_wallet_recharge-content-note-item">2. 转账备注填写：17702103430（LoocoGlobal账号）</p>
        <p class="trade_wallet_recharge-content-note-item">3. 转账完成后，前往我的>账单，截图该笔账单详情</p>
      </div>
    </div>
    <div v-if="current === 2" class="trade_wallet_recharge-content">
      <div class="trade_wallet_recharge-content-success" flex="dir:top main:center cross:center">
        <a-icon class="trade_wallet_recharge-icon-success" type="check-circle" />
        <div class="trade_wallet_recharge-content-title">操作成功</div>
        <p>请等待系统处理</p>
        <div class="trade_wallet_recharge-table" >
          <div class="bttn-box trade_wallet_recharge-table-btn">
            <a-button type='primary' htmlType='submit'>
              继续充值
            </a-button>
            <a-button type='primary' htmlType='submit'>
              查看账单
            </a-button>
          </div>
        </div>
        <div class="trade_wallet_recharge-content-note">
          <h3 class="trade_wallet_recharge-content-note-title">如有问题，请联系客服</h3>
          <p class="trade_wallet_recharge-content-note-item">电话：111</p>
          <p class="trade_wallet_recharge-content-note-item">QQ：11111</p>
        </div>
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
        title: '充值金额',
      }, {
        title: '扫码支付',
      }, {
        title: '完成',
      }],
      beforeUpload: () => {},
      loading: null,
      imageUrl: null
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
    },
    handleChange() {
    }
  }
}
</script>

<style lang="scss" scoped>
  $prefix: "trade_wallet_recharge";
  .#{$prefix}-page {
    .#{$prefix}-title {
      font-size: 18px;
      padding-bottom: 10px;
    }
    .#{$prefix}-content {
      margin-top: 16px;
      margin-bottom: 40px;
      .#{$prefix}-icon-success {
        margin-top: 20px;
        margin-bottom: 24px;
        font-size: 72px;
        line-height: 72px;
        color: #52c41a;
      }
      .#{$prefix}-content-title {
        font-size: 24px;
        color: rgba(0,0,0,.85);
        font-weight: 500;
        line-height: 32px;
        margin-bottom: 16px;
      }
      .#{$prefix}-table {
        width: 100%;
        max-width: 460px;
        // .#{$prefix}-money {
        //   font-size: 24px;
        //   font-weight: 500;
        //   color: #f5222d;
        // }
        .#{$prefix}-table-btn {
          margin-top: 20px;
          button {
            margin-bottom: 10px;
          }
        }
      }
      .#{$prefix}-content-pay {
        .#{$prefix}-content-pay-way {
          font-weight: 500;
          font-size: 14px;
          color: rgba(0,0,0,.85)
        }
        .#{$prefix}-content-pay-note {
          font-size: 16px;
          padding-top: 10px;
          color: rgba(0,0,0,.65)
        }
        .#{$prefix}-content-pay-money {
          font-size: 18px;
          line-height: 36px;
          color: #f5222d;
          font-weight: 600;
        }
        .#{$prefix}-content-pay-qrcode {
          margin-bottom: 10px;
          width: 100%;
          max-width: 160px;
          height: 160px;
          background: #fafafa;
          .#{$prefix}-content-pay-qrcode-image {
            width: 100%;
          }
        }
      }
      .#{$prefix}-content-upload {
        margin: 10px;
      }
      .#{$prefix}-content-upload-dragger {
        margin-bottom: 10px;
        .ant-upload-drag-icon {
          margin-bottom: 15px !important;
          .anticon{
            font-size: 36px !important;
          }
        }
        .ant-upload-text {
          font-size: 14px !important;
          padding: 0 10px;
        }
        .ant-upload-hint {
          font-size: 12px !important;
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
      .#{$prefix}-title {
        padding:0 40px 10px;
      }
      .#{$prefix}-input {
        padding-right: 38px;
      }
      .#{$prefix}-table-btn {
        padding-left: 30px;
      }
      .#{$prefix}-content {
        .#{$prefix}-content-note {
          padding:15px 36px;
          margin: 20px;
          .#{$prefix}-content-note-title {
            font-size: 16px;
            margin: 0 0 8px;
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
</style>
