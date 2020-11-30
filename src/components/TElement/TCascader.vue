<template>
  <el-cascader
    class="t-cascader"
    v-bind="{...$props, ...$attrs}"
    v-on="{...$listeners}"
  >
    <slot
      v-bind="{...$props, ...$attrs}"
      v-on="{...$listeners}"
    />
  </el-cascader>
</template>

<script>
export default {
  name: 'TCascader'
}
</script>

<style lang="less" scoped>
.t-cascader {
  /deep/ .el-input__inner {
    line-height: 36px;
    background: #F6FAFD;
    border-radius: 8px;
    border: 1px solid #E9EEF8;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #95A4BD;
    padding: 8px 23px 8px 12px;
  }
}
</style>
