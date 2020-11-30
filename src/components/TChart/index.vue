<style lang="less" scoped>
@import '~@/styles/colors.less';

.chart-container {
  height: 100%;
  width: 100%;
}
</style>
<template>
  <div ref="chart" class="chart-container" />
</template>
<script>
import theme from './theme'

export default {
  name: 'TChart',
  components: {},
  props: {
    options: {
      default() {
        return {}
      },
      required: true
    }
  },
  data() {
    return {}
  },
  watch: {
    options: {
      deep: true,
      handler(n) {
        this.draw(n)
      }
    }
  },
  mounted() {
    this.draw(this.options)
  },
  methods: {
    draw(options = {}) {
      this.$nextTick(() => {
        const chart = this.$echarts.init(this.$refs.chart)
        chart.setOption({
          ...options,
          theme
        })
      })
    }
  }
}
</script>
