<style lang="less" scoped>
@import '~@/styles/colors.less';
/* 时间选择器样式控制 */
.custom-date-picker {
  border-color: @borderColor;
  background: @bgColor;
  /deep/ .el-range-input {
    background: @bgBlue;
    color: @fontColor;
    &::-webkit-input-placeholder {
      color: @placeholder !important;
    }
  }
}
/deep/ .el-range-editor.is-active, .el-range-editor.is-active:hover {
  border-color: @focusColor;
}
/deep/ .el-range-separator {
  width: 8%;
  color: @placeholder;
}
</style>
<template>
  <el-date-picker
    class="custom-date-picker"
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :picker-options="pickOptions"
    v-bind="{...$props, ...$attrs}"
    v-on="{...$listeners}"
  />
</template>
<script>
export default {
  name: 'TDatePicker',
  components: {},
  props: {
    pickOptions: {
      type: [Object, Array],
      default() {
        return {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }],
          disabledDate(v) {
            return new Date(v) > Date.now()
          }
        }
      }
    }
  },
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}
}
</script>
