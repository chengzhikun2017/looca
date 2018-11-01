<template>
  <div class="l-qudao-signup">
    <div class="signup-box" v-if="showSignup">
      <h3 class="title">
        每手返佣8美金，最高返佣20美金，手续费可封顶（按月支付）
      </h3>
      <div class="form-box">
        <p class="label">您的贵姓</p>
        <a-input v-model="familyName" placeholder="请填写姓氏"></a-input>
        <p class="label">联系电话</p>
        <a-input v-model="phone" placeholder="请填写手机号"></a-input>
        <div class="btn-box">
          <a-button :loading='loading' type="primary" @click="submit" style="width:180px">提交</a-button>
        </div>
      </div>
      <div class="service-qr-box">
        <img src="" alt="" class="qr-pic">
        <h3 class="text">客服微信：Looco8</h3>
      </div>
      <span class="close-btn pointer" @click="hide">
        <a-icon type="close"  />
      </span>
    </div>
    <div class="thumbnail-box pointer" @click="show" v-if="!showSignup">
    </div>
  </div>
</template>
<script>
import jsonp from './../../libs/jsonp.js'
export default {
  name: 'qudaoSignup',
  data() {
    return {
      phone: '12345678900',
      familyName: 'huaf',
      showSignup: true,
      loading:false,
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
    // qudao() {
    //   return this.$route.query.qudao
    // },
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
  width: 800px;
  height: 360px;
  /*border: 1px solid red;*/
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 80px;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0, rgba(0, 0, 0, 0) 30%);

  .close-btn {
    color: #fff;
    padding: 5px;
    width: 30px;
    height: 30px;
    font-size: 20px;
    position: absolute;
    right: 0;
    top: 0;
    line-height: 1;
    opacity: 0.7;
  }
  .title {
    color: #fff;
    margin-top: 30px;
    font-size: 20px;
    /*background: #000;*/
  }
  .form-box {
    width: 320px;
    margin-left: 80px;
    .label {
      margin-top: 16px;
      text-align: left;
      color: #fff;
    }
    .btn-box {
      text-align: left;
      margin-top: 30px;
    }
  }
  .service-qr-box {
    position: absolute;
    top: 80px;
    right: 80px;
    background: #fff;
    width: 200px;
    height: 240px;
    .qr-pic {
      height: 160px;
    }
    .text {
      color: #666;
    }
  }
}

.thumbnail-box {
  position: fixed;
  top: 100px;
  right: 10%;
  width: 160px;
  height: 160px;
  background: #fff;
}

</style>
