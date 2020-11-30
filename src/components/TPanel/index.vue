<style lang="less" scoped>
@import '~@/styles/colors.less';
@import '~@/styles/mixins.less';
.t-panel-container {
  border: 1px solid #E9EEF8;  
  // margin-top: 20px;
  background: white;
  border-radius: 8px;
  .header {
    padding: 12px 20px;
    display: flex;
    align-items: center;
    color: #0D2B5E;
    font-size: 14px;
    border-bottom: 1px solid #E9EEF8;
    white-space: nowrap;
    .title {
      font-weight: bold;
      font-size: 16px;
      color: #0D2B5E;
    }
  }
  .body {
    padding: 20px;
    > * {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
<template>
  <div class="t-panel-container">
    <header class="header">
      <span class="title">{{title}}</span>
      <slot name="header"/>
    </header>
    <div class="body">
      <slot name="body"/>
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    props: {
      title: {
        default: ''
      }
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>