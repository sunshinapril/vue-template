<template>
  <el-tag
    class="t-tag"
    :effect="`${$attrs.effect || 'plain'}`"
    :class="`${$attrs.type}-text`"
    v-bind="{...$props, ...$attrs}"
    v-on="{...$listeners}"
  >
    <slot />
  </el-tag>
</template>

<script>
export default {
  name: 'TTag'
}
</script>

<style lang="less" scoped>
.t-tag {
  height: 25px;
  line-height: 16px;
  padding: 4px 8px;
  background: #8093B1;
  border-color: #8093B1;
  color: #ffffff;
  &.primary-text {
    border-color: #4A80F5;
    color: #4A80F5;
    background: #ffffff;
  }
  &.danger-text {
    border-color: #CE4747;
    color: #CE4747;
    background: #ffffff;
  }
  &.success-text {
    border-color: #5FA161;
    color: #5FA161;
    background: #ffffff;
  }
  &.normal-text {
    border-color: #727CCF;
    color: #727CCF;
    background: #ffffff;
  }
  &.orange-text {
    border-color: orange;
    color: orange;
    background: #ffffff;
  }
  /deep/ .el-tag__close {
    color: #ffffff;
    &:hover {
      background: #E9EEF8;
      color: #8093B1;
    }
  }
}

</style>
