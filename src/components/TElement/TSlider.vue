<template>
  <el-slider
    ref="slider"
    class="t-slider"
    v-bind="{...$props, ...$attrs}"
    v-on="{...$listeners}"
  />
</template>

<script>
export default {
  name: 'TSlider',
  mounted() {
    document.addEventListener('mouseup', this.onMouseUp, false)
  },
  destroyed() {
    document.removeEventListener('mouseup', this.onMouseUp, false)
  },
  methods: {
    // 解决弹框里面slider的tooltip不消失问题
    onMouseUp() {
      setTimeout(() => {
        if (this && this.$refs.slider) {
          this.$refs.slider.$refs.button1.hideTooltip()
        }
      }, 20)
    }
  }
}
</script>

<style scoped>

</style>
