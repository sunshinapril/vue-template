<template>
  <div class="header-box">
    <t-bread-crumb />
    <user-view />
  </div>
</template>

<script>
import TBreadCrumb from '@/components/TBreadCrumb/index'
import UserView from '@/views/components/UserView'
export default {
  name: 'Header',
  components: {
    TBreadCrumb,
    UserView
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  padding: 15px 0;
  justify-content: space-between;
}
</style>
