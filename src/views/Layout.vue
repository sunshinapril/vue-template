<template>
  <div class="g-main">
    <el-container style="height: 100%;">
      <el-aside class="aside-box">
        <Nav></Nav>
      </el-aside>
      <el-container class="g-container">
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Nav from "@/views/components/Nav";

export default {
  name: "Layout",
  components: {
    Nav
  }
}
</script>

<style lang="less" scoped>
.g-main {
  height: 100%;
  .aside-box {
    width: 220px;
    height: 100%;
    background: #EDF3FC;
  }
  .g-container {
    padding: 20px;
  }
}
</style>
