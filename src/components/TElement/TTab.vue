<template>
  <el-tabs
    class="t-tabs"
    v-bind="{...$props, ...$attrs}"
    v-on="{...$listeners}"
  >
    <slot
      v-bind="{...$props, ...$attrs}"
      v-on="{...$listeners}"
    />
  </el-tabs>
</template>

<script>
export default {
  name: 'TTab'
}
</script>

<style lang="less" scoped>
@import '~@/styles/colors.less';
.t-tabs {
  /deep/ .el-tabs__item {
    font-size: 16px;
    &:hover {
      color: @focusColor;
    }
    &.is-active {
      color: @active;
    }
  }
  /deep/ .el-tabs__active-bar {
    background-color: @focusColor;
  }
  /deep/ .el-tabs__nav-wrap::after {
    height: 1px;
    background-color: @normalBorderColor;
  }
}
</style>
