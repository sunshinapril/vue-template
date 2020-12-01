<style lang="less" scoped>
.login-box {
  height: 100%;
  padding: 0 250px;
  background: url("~@/assets/images/bg_login_pic@2x.png") center center no-repeat;
  background-size: cover;
  position: relative;
  .logo {
    width: 162px;
    height: 30px;
    position: absolute;
    top: 10%;
    left: 250px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .welcome-text {
    width: 30%;
    position: absolute;
    top: 50%;
    left: 250px;
    transform: translateY(-50%);
    .w-title {
      font-size: 60px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 84px;
    }
    .w-text {
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 45px;
    }
  }
}
</style>
<template>
  <div class="login-box">
    <div class="logo">
      <img :src="logo" alt="">
    </div>
    <div class="welcome-text">
      <p class="w-title">欢迎您 :</p>
      <p class="w-text">登录虎博舆情监控平台，先人一步，挖掘舆情价值</p>
    </div>
    <t-login />
    <t-footer />
  </div>
</template>

<script>
import logo from '~/logo@2x.png'
import TLogin from '@/components/TLogin'
import TFooter from '@/components/TFooter'
export default {
  name: 'Login',
  components: {
    TLogin,
    TFooter
  },
  data() {
    return {
      logo
    }
  }
}
</script>

