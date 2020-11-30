<style lang="less" scoped>
@import '~@/styles/colors.less';
@import '~@/styles/mixins.less';

.chart-container {
  height: 100%;
  width: 100%;
}
</style>
<template>
  <div class="chart-container" ref="chart">
  </div>
</template>
<script>
import theme from './theme'
export default {
  name: '',
  components: {},
  props: {
    options: {
      default () {
        return {}
      },
      required: true
    }
  },
  watch: {
    options: {
      deep: true,
      handler(n) {
        this.draw(n)
      }
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.draw(this.options);
  },
  methods: {
    draw(options={}) {
      this.$nextTick(() => {
        let chart = echarts.init(this.$refs.chart)
        chart.setOption({
         	...options,
          theme
        })
      })
    }
  }
}
</script>