<template>
  <div class="home-box">
    <div class="form-box">
      <t-input v-model="queryParams.name" style="width: 220px;" placeholder="请输入查询名称" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      queryParams: {
        name: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-box {
  display: flex;
  .form-box {
    width: 100%;
  }
}
</style>
