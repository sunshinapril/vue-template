<template>
  <div class="t-main">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TBody',
  data() {
    return {
      aa: '你好'
    }
  }
}
</script>

<style lang="less" scoped>
.t-main {
  width: 100%;
  border: 1px solid #E9EEF8;
  border-radius: 8px;
  padding: 4px 20px;
  background: #ffffff;
}
</style>
