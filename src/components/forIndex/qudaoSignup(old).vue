<template>
  <div class="l-qudao-signup">
    <div class="signup-box" v-if="showSignup">
      <div class="signup-box-pannel" flex>
        <div class="signup-box-pannel-left" flex-box="1" flex="main:center">
          <div class="form-box">
            <h3 class="title">
              立即与<span class="title-emphasize">乐恺环球</span>合作
            </h3>
            <p class="label">您的姓名</p>
            <a-input v-model="familyName" placeholder="请填写姓名" class="form-box-input"></a-input>
            <p class="label">联系电话</p>
            <a-input v-model="phone" placeholder="请填写手机号" maxlength="11" class="form-box-input"></a-input>
            <div class="btn-box">
              <a-button :loading='loading' :disabled="submitFlag"  class="form-box-input" type="primary" @click="submit">提交</a-button>
            </div>
          </div>
        </div>
        <div class="signup-box-pannel-right" flex-box="1">
          <div class="title">加入我们</div>
          <div class="service-qr-box">
            <img src="@/assets/qrcode_assit.jpg" alt="" class="qr-pic">
            <h3 class="text">客服微信：Looco8</h3>
          </div>
        </div>
      </div>
      <h3 class="signup-box-note">
        每手返佣<span class="signup-box-note-emphasize">8美金</span>，最高返佣<span class="signup-box-note-emphasize">20美金</span>，手续费可封顶（按月支付）
      </h3>
      <span class="close-btn pointer" @click="hide">
        <a-icon type="close"  />
      </span>
    </div>
    <div class="thumbnail-box pointer" @click="show" v-if="!showSignup">
      <img src="@/assets/qrcode_assit.jpg" alt="" class="qr-pic">
      <h3 class="text">客服微信</h3>
    </div>
  </div>
</template>
<script>
import jsonp from './../../libs/jsonp.js'
export default {
  name: 'qudaoSignup',
  data() {
    return {
      phone: '',
      familyName: '',
      showSignup: true,
      loading: false,
      submitFlag: false
    }
  },
  methods: {
    hide() {
      this.showSignup = false
    },
    show() {
      this.showSignup = true
    },
    submit() {
      if(this.loading){
        return
      }
      if (this.familyName.length === 0) {
        this.$message.error('请填写姓氏')
        return
      }
      if (!/\d{11}/.test(this.phone)) {
        this.$message.error('请输入正确的手机号')
        return
      }
      this.sendRequest()
    },
    urlConcat(url, obj) {
      var str = '',
        queryArr = []
      for (var key in obj) {
        // str = str + key + '=' + obj[key] + '&'
        queryArr.push(key + '=' + obj[key])
      }
      str = queryArr.join('&')
      str = url + '?' + str
      return str
    },
    sendRequest() {
      // this.submitFlag = true
      this.loading = true
      let url = 'https://crm.looco8.com/api/qudao/user/new'
      let params = {
        qudao: this.qudao,
        name: this.familyName,
        phone: this.phone,
      }
      url = this.urlConcat(url, params)
      jsonp(url, (err, res) => {
        setTimeout(()=> {
          this.loading = false
        }, 200);
        if (res.error === 0) {
          this.$message.info('提交成功')
        } else {
          this.$message.error(res.message)

        }
      })
    },
    onSubmitSucc() {
      this.familyName = ''
      this.phone = ''
    },
  },
  computed: {
    qudao() {
      return this.$route.query.qudao
    }
  },
  components: {},
}

</script>
<style lang='scss' scoped>
.pointer {
  &:hover {
    cursor: pointer;
  }
}

.signup-box {
  box-sizing: border-box;
  width: 480px;
  padding:0 15px;
  height: 300px;
  /*border: 1px solid red;*/
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto -150px;
  bottom: 50%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.8);
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0, rgba(0, 0, 0, 0) 30%);
  &-note {
    font-size: 14px;
    color: white;
    text-align: left;
    padding-top: 10px;
    padding-left: 30px;
    &-emphasize {
      color: #cd2122;
      font-weight: 800;
      font-size: 16px;
      letter-spacing: 1px;
      display: inline-block;
      padding: 0 2px;
    }
  }
  .close-btn {
    color: #fff;
    padding: 8px;
    width: 30px;
    height: 30px;
    font-size: 20px;
    position: absolute;
    right: 5px;
    top: 0;
    line-height: 1;
    opacity: 0.7;
  }
  .title {
    color: #fff;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 700;
    /*background: #000;*/
    &-emphasize {
      color: #cd2122;
    }
  }
  .form-box {
    text-align: left;
    &-input {
      width: 180px;
    }
    .label {
      text-align: left;
      color: #fff;
      margin: 10px 0 5px;
    }
    .btn-box {
      text-align: left;
      margin-top: 25px;
    }
  }
  .signup-box-pannel-right {
    text-align: center;
    .title {
      margin-bottom: 15px;
    }
  }
  .service-qr-box {
    background: #fff;
    width: 160px;
    height: 180px;
    margin: 0 auto;
    .qr-pic {
      margin-top: 10px;
      margin-bottom: 0px;
      height: 140px;
    }
    .text {
      color: #666;
      font-size: 14px;
    }
  }
}

.thumbnail-box {
  position: fixed;
  top: 180px;
  right: 10%;
  width: 120px;
  height: 145px;
  z-index: 2;
  background: #fff;
  .text {
    font-size: 14px;
    margin-top: 2px;
    line-height: 1;
    color: #333;
  }
  img {
    width: 120px;
  }
}

</style>
