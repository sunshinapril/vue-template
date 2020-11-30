<template>
  <div class="login-wrapper">
    <div class="l-title">
      <img :src="tigerLogo" alt="">
    </div>
    <div class="l-tab">
      <t-tab v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane v-for="tab in tabMap" :key="tab.name" :label="tab.name" :name="tab.value"></el-tab-pane>
      </t-tab>
    </div>
    <div class="l-main">
      <el-form
        ref="loginForm"
        class="login-form"
        v-show="activeTab === tabMap[0].value"
        :rules="loginRules"
        :model="loginForm">
        <el-form-item prop="userName">
          <t-input v-model.trim="loginForm.userName" placeholder="请输入用户名" @keyup.enter.native="onSubmit"></t-input>
        </el-form-item>
        <el-form-item prop="password">
          <t-input type="password" v-model.trim="loginForm.password" placeholder="请输入密码" @keyup.enter.native="onSubmit"></t-input>
          <text-button class="p-forget" @click="showForget = true">忘记密码</text-button>
        </el-form-item>
        <el-form-item prop="imgVerifyCode" class="t-form-item">
          <t-input style="width: 212px;" v-model.trim="loginForm.imgVerifyCode" placeholder="验证码" @keyup.enter.native="onSubmit"></t-input>
          <div class="verify-img" @click="getCode">
            <img :src="imgVerify" alt="">
          </div>
        </el-form-item>
      </el-form>
      <!--<el-form
        v-show="activeTab === tabMap[1].value"
        ref="phoneForm"
        class="login-form"
        :rules="phoneRules"
        :model="phoneForm">
        <el-form-item prop="phone">
          <t-input v-model.trim="phoneForm.phone" placeholder="请输入手机号" @input="onChangePhone"></t-input>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <t-input v-model.trim="phoneForm.verifyCode" placeholder="验证码"></t-input>
          <text-button v-if="showCode" :disabled="disabledSendSMS" class="p-forget" @click="getSendSMS">获取验证码</text-button>
          <text-button v-else class="p-forget">{{getCodeText}}</text-button>
        </el-form-item>
      </el-form>-->
    </div>
    <div class="l-footer">
      <t-button class="l-login-button" @click="onSubmit">登录</t-button>
      <div class="f-no-account">没有账号？</div>
      <div class="f-text">您可联系商务专员开通账户，联系电话:134567889</div>
    </div>
    <t-dialog :show.sync="showForget" title="提示" :disabled='true'>
      <div style="text-align: center;color: #0D2B5E;font-size: 16px;">您可联系客服进行密码重置
        <br>
        联系电话:13645678554
      </div>
    </t-dialog>
  </div>
</template>

<script>
import tigerLogo from '@/assets/tiger-logo@2x.png'
import validate from "./validate";
import {SET_USER_INFO} from "@/store/mutation-types";
import {USER_TOKEN} from "@/config/storeKeys";

export default {
  name: "TLogin",
  data() {
    return {
      tigerLogo,
      showForget: false,
      activeTab: '0',
      tabMap: {
        0: {
          name: '密码登录',
          value: '0'
        },
        // 1: {
        //   name: '短信登陆',
        //   value: '1'
        // }
      },
      loginForm: {
        imgVerifyCode: '',
        password: '',
        userName: '',
        loginWay: "unpivc",
        tenantId: 100001
      },
      loginRules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: ['blur', 'change']},
          // {validator: this.userNameValid, trigger: ['blur', 'change']},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: ['blur', 'change']},
          // {validator: this.passwordValid, trigger: ['blur', 'change']},
        ],
        imgVerifyCode: [
          {required: true, message: '请输入验证码', trigger: ['blur', 'change']},
          {min: 5, max: 5, message: '验证码长度5位', trigger: ['blur', 'change']},
        ]
      },
      phoneForm: {
        phone: '',
        verifyCode: ''
      },
      phoneRules: {
        phone: [{validator: this.phoneValid, trigger: ['blur', 'change']}],
        verifyCode: [{validator: this.verifyCodeValid, trigger: ['blur', 'change']}]
      },
      getCodeText: '',
      showCode: true,
      disabledSendSMS: true,
      loading: false,
      imgVerify: ''
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    userNameValid(rule, value, callback) {
      if (validate.ValidUserName(value)) {
        callback(new Error('只能输入中文/英文/数字/空格/下划线'))
      }
      callback()
    },
    passwordValid(rule, value, callback) {
      if (!validate.ValidLengthInterval(value)) {
        callback(new Error('密码长度6-20位'))
      }
      if (!validate.ValidPassword(value)) {
        callback(new Error('必须至少包含数字、小写字母、大写字母、其它字符中的三种'))
      }
      callback()
    },
    verifyCodeValid(rule, value, callback) {
      if (!value) {
        callback(new Error('验证码不能为空'))
      } else if (value.length !== 6 || validate.ValidNumber(value)) {
        callback(new Error('验证码为6位数字'))
      }
      callback()
    },
    phoneValid(rule, value, callback) {
      if (!value) {
        callback(new Error('手机号不能为空'))
      } else if (value.length !== 11) {
        callback(new Error('手机号长度11位'))
      } else if (validate.ValidNumber(value)) {
        callback(new Error('手机号为11位数字'))
      }
      callback()
    },
    handleClick(tab, event) {
      this.$refs.loginForm && this.$refs.loginForm.resetFields()
      this.$refs.phoneForm && this.$refs.phoneForm.resetFields()
    },
    getCode() {
      // 把请求结果转buffer
      axios.get('/auth/sendImgVerifyCode', {responseType: 'arraybuffer'}).then(res => {
        if (res.status !== 200) {
          throw new Error(res.statusText)
        }
        // 二进制转base64
        this.imgVerify = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      }).catch(e => {
        this.$notify({title: '请求失败', type: 'error'})
      })
    },
    getSendSMS() {
      this.countDown()
      axios.get('/getCode').then(res => {
        if (res.status !== 200) {
          throw new Error(res.statusText)
        }
        if (res.data.code !== '200') {
          throw new Error(res.data.message)
        }
      }).catch(e => {
        this.$notify({title: e || '请求失败', type: 'error'})
      })
    },
    onChangePhone(val) {
      this.$refs.phoneForm.validateField('phone', (error) => {
        if (!error) {
          this.disabledSendSMS = false
        } else {
          this.disabledSendSMS = true
        }
      })
    },
    countDown() {
      this.showCode = false
      let total = 60;
      this.getCodeText = `${total}s后再次发送`
      const timer = setInterval(() => {
        total -= 1
        this.getCodeText = `${total}s后再次发送`
        if (total <= 0) {
          clearInterval(timer)
          this.showCode = true
        }
      }, 1000)
    },
    onSubmit() {
      this.$nextTick(() => {
        if (this.activeTab === this.tabMap[0].value) {
          this.$refs.loginForm.validate(valid => {
            console.log(valid);
            if (valid) {
              if (!this.loading) {
                this.loading = true
                axios.post('/login', this.loginForm).then(res => {
                  this.loading = false
                  if (res.status !== 200) {
                    throw new Error(res.statusText)
                  }
                  if (res.data.code !== '200') {
                    throw new Error(res.data.message)
                  }
                  const data = res.data.data
                  localStorage.setItem(USER_TOKEN, data.data.token)
                  this.$store.commit(`user/${SET_USER_INFO}`, data.data)
                  this.$router.push('/')
                }).catch(e => {
                  this.loading = false
                  this.$notify({title: e || '登陆失败', type: 'error'})
                  this.getCode()
                })
              }
            }
          })
        } else {
          this.$refs.phoneForm.validate(valid => {
            if (valid) {
              if (!this.loading) {
                this.loading = true
                axios.post('/login', this.phoneForm).then(res => {
                  console.log(res);
                  this.loading = false
                }).catch(e => {
                  this.loading = false
                })
              }
            }
          })
        }

      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrapper {
  width: 400px;
  border-radius: 8px;
  background: #ffffff;
  position: absolute;
  top: 15%;
  right: 9%;
  z-index: 9999;
  .l-title {
    height: 72px;
    padding: 0 30px;
    background: linear-gradient(90deg, #41484E 0%, #1F2226 100%);
    border-radius: 8px 8px 0px 0px;
    display: flex;
    align-items: center;
    img {
      width: 134px;
      height: 28px;
      display: block;
    }
  }
  .l-tab {
    height: 66px;
    line-height: 66px;
    /deep/ .el-tabs__nav-scroll {
      padding: 0 30px;
    }
    /deep/ .el-tabs__active-bar {
      height: 4px;
      width: 32px!important;
      left: 50%;
      transform: translate(-50%)!important;
    }


  }
  .l-main {
    padding: 20px 40px;
    .login-form {
      /deep/ .el-form-item {
        margin-bottom: 16px;
        position: relative;
        .el-form-item__content {
          line-height: 48px;
          .el-input__inner {
            height: 48px;
            line-height: 48px;
            border-radius: 4px;
          }
        }
        &.t-form-item {
          .el-form-item__content {
            display: flex;
            width: 100%;
          }
        }
      }
      .p-forget {
        position: absolute;
        top: 50%;
        right: 18px;
        transform: translateY(-50%);
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 20px;
        cursor: pointer;
        &.is-disabled {
          cursor: not-allowed;
          opacity: .8;
        }
      }
      .verify-img {
        width: 140px;
        height: 48px;
        background: #838383;
        margin-left: 8px;

        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 4px;
        }
      }
    }
  }
  .l-footer {
    padding: 0 40px 30px;
    // background: red;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #B8C1D0;
    line-height: 20px;
    .l-login-button {
      width: 100%;
      height: 48px;
    }
    .f-no-account {
      padding: 24px 0 5px;
    }
    .f-text {
      color: #0D2B5E;
    }
  }
}
</style>
