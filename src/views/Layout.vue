<template>
  <div class="g-main">
    <el-container style="height: 100%;">
      <!-- 侧边栏 -->
      <div class="sidebar" :class="{isCollapse: isCollapse}">
        <sidebar :class="{'side-bar-box': !isCollapse}" :collapse="!isCollapse" />
        <div class="expand-collapse" @click="isCollapse = !isCollapse">
          <i :class="isCollapse ? 'el-icon-caret-left' : 'el-icon-caret-right'" />
        </div>
      </div>
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
  },
  data() {
    return {
      isCollapse: true
    }
  }
}
</script>

<style lang="less" scoped>
.g-main {
  height: 100%;
  background: #EDF3FC;
  .sidebar {
    width: 73px;
    height: 100%;
    overflow: visible;
    padding-bottom: 20px;
    background: #F7FAFD;
    position: relative;
    box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.13);
    &.isCollapse {
      padding: 0 25px;
      width: 200px;
    }
    .expand-collapse {
      width: 12px;
      height: 66px;
      line-height: 66px;
      text-align: center;
      position: absolute;
      top: 50%;
      right: -12px;
      transform: translateY(-50%);
      z-index: 999;
      background: #d6def8;
      cursor: pointer;
      > i {
        margin-left: -3px;
        color: #95A4BD;
      }
    }
  }
  .g-container {
    //padding: 0 20px;
    margin-left: 20px;
    padding-right: 20px;
    flex-direction: column;
    .g-router-view {
      height: 100%;
      padding: 20px;
      border-radius: 18px;
      background: #f7fafd;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
</style>
