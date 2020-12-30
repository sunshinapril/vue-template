<template>
  <div class="user-view-box">
    <el-dropdown size="small" trigger="hover" placement="bottom">
      <span class="el-dropdown-link user-name">
        <img class="avatar-img" :src="Avatar" alt="">
        {{ userInfo.userName }}
      </span>
      <el-dropdown-menu slot="dropdown">
        <span style="display:block;" @click="openResetPassword">
          <el-dropdown-item>
            修改密码
          </el-dropdown-item>
        </span>
        <span style="display:block;" @click="logout">
          <el-dropdown-item divided>
            退出登录
          </el-dropdown-item>
        </span>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import Avatar from '@/assets/images/avatar.png'
export default {
  name: 'UserView',
  data() {
    return {
      Avatar
    }
  },
  computed: {
    userInfo() {
      return this.$store?.state?.user?.user ?? {}
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/LogOut').then(res => {
        this.$router.push('/login')
      })
    },
    openResetPassword() {
      this.$resetPassword()
    }
  }
}
</script>

<style lang="less" scoped>
.user-view-box {
  color: #222222;
  font-size: 14px;
  line-height: 33px;
  .logout {
    color: #4A80F5;
    cursor: pointer;
    margin-left: 5px;
  }
  .user-name {
    line-height: 40px;
    cursor: pointer;
    .avatar-img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      display: inline-block;
    }
  }
}
</style>
