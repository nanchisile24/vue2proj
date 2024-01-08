<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="container">
      <div class="title">
          <h3>手机号登录</h3>
          <p>未注册的手机号登录后将自动注册</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" type="text" placeholder="以1开头的11位手机号码">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" type="text" placeholder="请输入图形验证码">
          <img v-show="picUrl" :src="picUrl" @click="getPicCode" alt="" style="margin-left: 2px;">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" type="text" placeholder="请输入短信验证码">
          <button @click="getCode" style="margin-left: 10px;">{{ totalSecond === second ? '获取验证码' : second + '秒后重新获取' }}</button>
        </div>
      </div>
      <div class="login-btn" @click="login">
        登录
      </div>
  </div>
  </div>
</template>

<script>
import { GetPicCode, getMsgCode, codeLogin } from '@/api/login'
// import { Toast } from 'vant'

export default {
  name: 'LoginPage',
  async created () {
    this.getPicCode()
    //  打印当前路由
    // console.log(this.$route.path)
  },
  data () {
    return {
      mobile: '',
      picCode: '',
      picKey: '',
      picUrl: '',
      totalSecond: 5,
      second: 5,
      timer: null,
      msgCode: ''
    }
  },
  methods: {
    async getPicCode () {
      const { data: { base64, key } } = await GetPicCode()
      this.picUrl = base64
      this.picKey = key
    },
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入11位手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    async getCode () {
      if (!this.validFn()) {
        return
      }
      const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
      if (this.totalSecond === this.second && !this.timer) {
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = 5
          }
        }, 1000)
        this.$toast.success('验证码为246810')
        console.log(res)
      }
    },
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}/.test(this.msgCode)) {
        this.$toast('请输入正确的短信验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      console.log(res)
      this.$toast.success('登录成功')
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  }
}
</script>

<style lang="less" scoped>
  .van-nav-bar {
    background-color: #F98771;
  }
  ::v-deep .van-hairline--bottom::after{
    border:none
  }
  ::v-deep .van-ellipsis {
      color: #ffffff;
      font-size: 20px;
    }
  .container{
    padding: 49px 29px;
    .title {
      margin-bottom: 20px;
      h3 {
        font-size: 26px;
        font-weight: normal;
      }
      p {
        line-height: 40px;
        font-size: 14px;
        color: #b8b8b8;
      }

    }
    .form-item{
      border-bottom: 1px solid #f3f1f2;
      padding: 8px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      transform: 0.5s;
      .inp:focus{
        box-shadow: 0px 0px 5px black;
        content:''
      }
      .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
      padding-left: 1px;
      transition:0.3s
    }
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
    .login-btn {
    width: 60%;
    height: 42px;
    margin:39px auto 0;
    background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    }
    .login-btn:hover {
      background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
      width:80%
    }
  img {
      width: 94px;
      height: 31px;
    }
  }
</style>
