<template>
  <div class="l-qudao-signup">
    <div class="signup-box" v-if="showSignup">
      <div class="signup-box-pannel">
        <img src="@/assets/spreadLinks.jpg" class="signup-box-pannel-img" alt="">
        <span class="close-btn pointer" @click="hide">
          <a-icon type="close"  />
        </span>
      </div>
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
  // padding:0 15px;
  // height: 300px;
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
    padding: 6px;
    width: 30px;
    height: 30px;
    font-size: 20px;
    position: absolute;
    right: 3px;
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
  .signup-box-pannel-img {
    width: 100%;
    height: auto;
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
