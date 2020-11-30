<template>
  <el-button
    type="text"
    :class="`${$attrs.type || 'primary'}-text`"
    v-bind="{...$props, ...$attrs}"
    v-on="{...$listeners}"
  >
    <slot />
  </el-button>
</template>

<script>
export default {
  name: 'TextButton'
}
</script>

<style lang="less" scoped>
@import '~@/styles/colors.less';
.danger-text {
  color: @dangerNormalColor;
  &:hover {
    color: @dangerHoverColor;
  }
  &:focus {
    color: @dangerFocusColor;
  }
}
.primary-text {
  color: @primaryNormalColor;
  &:hover {
    color: @primaryHoverColor;
  }
  &:focus {
    color: @primaryFocusColor;
  }
}
.success-text {
  color: @successNormalColor;
  &:hover {
    color: @successHoverColor;
  }
  &:focus {
    color: @successFocusColor;
  }
}
.info-text {
  color: @fontColor;
  &:hover {
    color: @fontColor;
  }
  &:focus {
    color: @fontColor;
  }
}
</style>
