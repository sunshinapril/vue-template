<template>
  <div class="user-view-box">
    <span class="user-name">{{ userInfo.userName }}</span>
    <span class="logout" @click="logout">退出</span>
  </div>
</template>
<script>
export default {
  name: 'UserView',
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
}
</style>
