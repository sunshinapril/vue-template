<template>
<div>
  <el-menu
      ref="menu"
      mode="vertical"
      :default-active="activeIndex"
      :router="true"
  >
    <template v-for="(item, index) in menu">
      <el-menu-item
          :key="index"
          :index="item.path"
          v-if="!item.children"
      >
        {{item.meta.title}}
      </el-menu-item>

      <el-submenu :key="index" :index="item.path" popper-append-to-body v-else>
        <template slot="title">
          <span>{{item.meta.title}}</span>
        </template>
        <template v-for="child in item.children">
          <el-menu-item :index="item.path + '/' + child.path" :key="child.path">
            {{child.meta.title}}
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</div>
</template>

<script>
import menuRoutes from "@/router/routers";
export default {
  name: "Nav",
  data() {
    return {
      activeIndex: '0',
      menu: []
    }
  },
  created() {
    console.log(menuRoutes, 33333);
    this.menu = menuRoutes
  }
}
</script>

<style scoped>

</style>
