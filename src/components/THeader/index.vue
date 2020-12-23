<template>
  <div class="t-header">
    <div class="sub-header">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'THeader'
}
</script>

<style lang="less" scoped>
.t-header {
  width: 100%;
  border: 1px solid #E9EEF8;
  border-radius: 8px;
  padding: 4px 20px;
  background: #ffffff;
  .sub-header {
    padding: 8px 0;
    line-height: 54px;
    min-height: 54px;
  }
}
</style>
