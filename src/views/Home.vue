<template>
  <div class="home-box">
    <div class="form-box">
      <t-slider v-model="value" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      value: 0.6
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
