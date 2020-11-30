<template>
  <div class="table-header">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'THeader'
}
</script>

<style lang="less" scoped>
.table-header {
  padding: 13px 20px;
  border-bottom: 1px solid #E9EEF8;
}
</style>
