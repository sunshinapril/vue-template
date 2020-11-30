<style lang="less" scoped>
@import '~@/styles/colors.less';
.t-input {
  /* 设置input 和 textarea 的边框, 聚焦效果, 字体大小, 颜色等 */
  /deep/ .el-input__inner,
  /deep/ .el-textarea__inner {
    height: 40px;
    line-height: 40px;
    border-color: @borderColor;
    &:focus {
      border-color: @focusColor;
    }
    background: @bgColor;
    font-size: 14px;
    color: @fontColor;
    border-radius: 8px;
  }
  /deep/ .el-textarea__inner {
    line-height: 20px;
  }
  /deep/ .el-input__icon {
    line-height: 36px;
  }
}
</style>
<template>
  <el-input class="t-input" v-bind="{...$props, ...$attrs}" v-on="{...$listeners}" />
</template>
<script>
export default {
  name: 'TInput'
}
</script>
