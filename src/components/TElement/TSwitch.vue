<template>
  <el-switch
    class="t-switch"
    v-bind="{...$props, ...$attrs}"
    v-on="{...$listeners}"
  />
</template>

<script>
export default {
  name: 'TSwitch'
}
</script>

<style lang="less" scoped>
@import '~@/styles/colors.less';
.t-switch {
  /deep/ .el-switch__core {
    width: 34px !important;
    height: 17px;
    border-color: @borderColor;
    background: @borderColor;
    &::after {
      width: 13px;
      height: 13px;
    }
  }
  &.is-checked /deep/ .el-switch__core {
    background: @focusColor;
    border-color: @focusColor;
    &::after {
      margin-left: -15px;
    }
  }
}
</style>
