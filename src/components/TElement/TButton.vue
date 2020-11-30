<template>
  <el-button
    class="border-radius"
    :class="`${$attrs.type || 'primary'}-text`"
    v-bind="{...$props, ...$attrs}"
    v-on="{...$listeners}"
  >
    <slot />
  </el-button>
</template>

<script>
export default {
  name: 'TButton'
}
</script>

<style lang="less" scoped>
@import '~@/styles/colors.less';
.border-radius {
  border-radius: 6px;
  padding: 12px 26px;
}
.danger-text {
  background: @dangerNormalColor;
  border-color: @dangerNormalColor;
  color: #fff;
  &:hover {
    background: @dangerHoverColor;
    border-color: @dangerHoverColor;
  }
  &:focus {
    background: @dangerFocusColor;
    border-color: @dangerFocusColor;
  }
}
.primary-text {
  background: @primaryNormalColor;
  border-color: @primaryNormalColor;
  color: #fff;
  &:hover {
    background: @primaryHoverColor;
    border-color: @primaryHoverColor;
    color: #fff;
  }
  &:focus {
    background: @primaryFocusColor;
    border-color: @primaryFocusColor;
    color: #fff;
  }
}
.success-text {
  background: @successNormalColor;
  border-color: @successNormalColor;
  color: #fff;
  &:hover {
    background: @successHoverColor;
    border-color: @successHoverColor;
    color: #fff;
  }
  &:focus {
    background: @successFocusColor;
    border-color: @successFocusColor;
    color: #fff;
  }
}
.info-text {
  color: @fontColor;
  background: @infoNormalColor;
  border-color: @infoNormalColor;
  &:hover {
    background: @infoHoverColor;
    border-color: @infoHoverColor;
  }
  &:focus {
    background: @infoFocusColor;
    border-color: @infoFocusColor;
  }
}
.plain-text {
  color: @primaryNormalColor;
  background: @normalBgColor;
  border-color: @normalBorderColor;
  &:hover {
    background: @hoverBgColor;
    border-color: @hoverBorderColor;
    color: @primaryHoverColor;
  }
  &:focus {
    background: @focusBgColor;
    border-color: @focusBorderColor;
    color: @primaryFocusColor;
  }
}
</style>
