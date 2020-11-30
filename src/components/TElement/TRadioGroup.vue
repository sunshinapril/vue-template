<template>
  <el-radio-group
    class="t-radio"
    v-bind="{...$props, ...$attrs}"
    v-on="{...$listeners}"
  >
    <slot
      v-bind="{...$props, ...$attrs}"
      v-on="{...$listeners}"
    />
  </el-radio-group>
</template>

<script>
export default {
  name: 'TRadioGroup'
}
</script>

<style lang="less" scoped>
.t-radio {
  border: 1px solid #E9EEF8;
  border-radius: 8px;
  height: 38px;
  line-height: 32px;
  padding: 2px;
  /deep/ .el-radio-button__inner {
    padding: 9px 26px;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4A80F5;
    &:hover {
      background: #E9EEF8;
    }

  }
  /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background: #4A80F5;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    color: #ffffff;
  }
}
</style>
