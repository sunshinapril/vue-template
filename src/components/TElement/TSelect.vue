<style lang="less" scoped>
@import '~@/styles/colors.less';
.t-select {
  /deep/ .el-input__inner {
    line-height: 40px;
    background: @bgColor;
    border-color: @borderColor;
    color: @fontColor;
    border-radius: 8px;
    font-size: 14px;
    padding: 8px 23px 8px 12px;
  }
  /deep/ .el-input.is-focus .el-input__inner {
    border-color: @focusColor;
  }
  /deep/ .el-select__tags {
    .el-tag {
      .el-select__tags-text {
        max-width: 250px;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-block;
        //white-space: nowrap;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .el-tag__close.el-icon-close {
        top: -7px;
        right: -5px;
      }
    }
  }
}
</style>
<template>
  <el-select
    class="t-select"
    v-bind="{...$props, ...$attrs}"
    style="min-width: 152px;"
    v-on="{...$listeners}"
  >
    <slot
      v-bind="{...$props, ...$attrs}"
      v-on="{...$listeners}"
    />
  </el-select>
</template>
<script>
export default {
  name: 'TSelect'
}
</script>
