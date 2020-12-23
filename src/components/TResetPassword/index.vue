<template>
  <div v-if="visible" class="dialog-box">
    <div class="reset-wrapper">
      <div class="l-title">
        <img :src="tigerLogo" alt="">
        <i class="close" @click="close" />
      </div>
      <div v-if="!isResetSuccess" class="l-main">
        <div class="sub-title">重设密码</div>
        <el-form
          ref="resetForm"
          class="reset-form"
          :rules="resetRules"
          :model="resetForm"
        >
          <el-form-item prop="originalPassword">
            <t-input v-model.trim="resetForm.originalPassword" type="password" placeholder="请输入旧密码"
                     @keyup.enter.native="onSubmit"
            />
          </el-form-item>
          <el-form-item prop="newPassword">
            <t-input v-model.trim="resetForm.newPassword" type="password" placeholder="请输入新密码"
                     @keyup.enter.native="onSubmit" @change="onChangeNewPassword"
            />
          </el-form-item>
          <el-form-item prop="newPasswordAgain">
            <t-input v-model.trim="resetForm.newPasswordAgain" type="password" placeholder="确认新密码"
                     @keyup.enter.native="onSubmit"
            />
          </el-form-item>
        </el-form>
      </div>
      <div v-else class="l-main">
        <div class="tips-body">
          <img :src="successUrl" alt="">
          <span class="tips">密码修改成功，请重新登录</span>
        </div>
      </div>
      <div class="l-footer">
        <t-button class="l-login-button" @click="onSubmit">确定</t-button>
      </div>
    </div>
  </div>
</template>

<script>
import tigerLogo from '@/assets/images/tiger-logo@2x.png'
import successUrl from '@/assets/images/done_pic@2x.png'

export default {
  name: 'Index',
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      tigerLogo,
      successUrl,
      resetForm: {
        originalPassword: '',
        newPassword: '',
        newPasswordAgain: ''
      },
      resetRules: {
        originalPassword: [
          { required: true, message: '请输入旧密码', trigger: ['blur', 'change'] }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: ['blur', 'change'] }
        ],
        newPasswordAgain: [
          { required: true, message: '请输入确认密码', trigger: ['blur', 'change'] },
          { validator: this.passwordValid, trigger: ['blur'] }
        ]
      },
      visible: false,
      loading: false,
      isResetSuccess: false
    }
  },
  watch: {
    show(newV, oldV) {
      this.visible = newV
      if (newV) {
        this.$nextTick(() => {
          this.$refs.resetForm.resetFields()
        })
      }
    },
    visible(newV, oldV) {
      this.$emit('update:show', newV)
    }
  },
  methods: {
    passwordValid(rule, value, callback) {
      if (this.resetForm.newPassword !== this.resetForm.newPasswordAgain) {
        callback(new Error('新密码和确认密码不一致'))
      }
      callback()
    },
    close() {
      this.visible = false
    },
    onChangeNewPassword() {
      this.$refs.resetForm.validateField('newPasswordAgain')
    },
    onSubmit() {
      if (this.isResetSuccess) {
        this.visible = false
        this.isResetSuccess = false
        this.$store.dispatch('user/logout')
        return false
      }
      this.$refs.resetForm.validate(valid => {
        if (valid) {
          if (!this.loading) {
            this.loading = true
            // axios.post('/auth/modifyPassword', this.resetForm).then(res => {
            //   this.loading = false
            //   if (res.status !== 200) {
            //     throw new Error(res.statusText)
            //   }
            //   if (res.data.code !== '200') {
            //     throw new Error(res.data.message)
            //   }
            //   this.$refs.resetForm.resetFields()
            //   this.isResetSuccess = true
            // }).catch(e => {
            //   this.loading = false
            //   this.$notify({ title: e || '修改密码失败', type: 'error' })
            // })
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
  background: rgba(0, 0, 0, .5);
}
.reset-wrapper {
  width: 440px;
  border-radius: 16px;
  background: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
  .l-title {
    height: 72px;
    padding: 0 30px;
    background: linear-gradient(90deg, #41484E 0%, #1F2226 100%);
    border-radius: 8px 8px 0px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 134px;
      height: 28px;
      display: block;
    }
    .close {
      width: 14px;
      height: 14px;
      cursor: pointer;
      display: inline-flex;
      justify-content: center;
      align-self: center;
      position: relative;

      &:before, &:after {
        content: '';
        background-color: #cccccc;
        width: 1px;
        height: 100%;
        position: absolute;
      }

      &:before {
        transform: rotate(45deg);
      }

      &:after {
        transform: rotate(-45deg);
      }
    }
  }
  .l-main {
    padding: 20px 40px;
    .sub-title {
      font-size: 20px;
      font-weight: 500;
      color: #0D2B5E;
      line-height: 20px;
      padding: 26px 0 29px;
    }
    .reset-form {
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
    }
    .tips-body {
      margin: 0 auto;
      text-align: center;
      img {
        width: 109px;
        height: 86px;
        display: block;
        margin: 85px auto 22px;
      }
      .tips {
        font-size: 16px;
        font-weight: 400;
        color: #0D2B5E;
        line-height: 16px;
      }
    }
  }
  .l-footer {
    padding: 33px 40px 100px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #B8C1D0;
    line-height: 20px;
    .l-login-button {
      width: 100%;
      height: 48px;
    }
  }
}
</style>
