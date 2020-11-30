<template>
  <div class="g-main">
    <el-container style="height: 100%;">
      <el-aside class="aside-box">
        <sidebar />
      </el-aside>
      <el-container class="g-container">
        <t-header />
        <div class="g-router-view">
          <router-view />
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Sidebar from '@/components/TSideBar/index'
import THeader from '@/views/components/THeader'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    THeader
  }
}
</script>

<style lang="less" scoped>
.g-main {
  height: 100%;
  .aside-box {
    width: 220px !important;
    height: 100%;
    background: #EDF3FC;
  }
  .g-container {
    padding: 0 20px;
    flex-direction: column;
    .g-router-view {
      height: 100%;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 24px;
      background: #f7fafd;
    }
  }
}
</style>
