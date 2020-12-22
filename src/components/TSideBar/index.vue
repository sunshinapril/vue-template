<template>
  <el-menu
    ref="menu"
    mode="vertical"
    theme="dark"
    text-color="#ffffff"
    background-color="#292E33"
    :default-active="defaultActive"
    :router="true"
  >
    <i class="logo" />
    <sidebar-item v-for="route in routes" :key="route.path" :item="route" />
  </el-menu>
</template>

<script>
import SidebarItem from '@/components/TSideBar/SidebarItem'
export default {
  name: 'Index',
  components: {
    SidebarItem
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routers
    },
    defaultActive() {
      const route = this.$route
      if (route.meta && route.meta.active) {
        let active = route.meta.active
        if (typeof active === 'function') {
          active = active.apply(route)
        }
        return this.$router.resolve({ name: active }).route.path
      } else {
        return route.path
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  min-height: 100%;
}
.logo {
  margin: 37px 39px 14px 17px;
  height: 58px;
  width: auto;
  background: url("~@/assets/images/logo.png") center center no-repeat;
  background-size: contain;
  display: block;
}
</style>
