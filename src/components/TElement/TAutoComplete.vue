<style lang="less" scoped>
@import '~@/styles/colors.less';
.t-autocomplete {
  /deep/ .el-input__inner {
    height: 36px;
    line-height: 36px;
    border-color: @borderColor;
    background: @bgColor;
    font-size: 14px;
    font-weight: 400;
    color: @fontColor;
    &:focus {
      border-color: @focusColor;
    }
  }
  /deep/ .el-input__icon {
    line-height: 36px;
  }
}
</style>
<template>
  <el-autocomplete
    class="t-autocomplete"
    v-bind="{...$props, ...$attrs}"
    v-on="{...$listeners}"
  />
</template>

<script>
export default {
  name: 'TAutoComplete'
}
</script>
