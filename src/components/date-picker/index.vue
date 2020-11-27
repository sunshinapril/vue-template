<template>
  <el-date-picker
    :ref="comId"
    v-model="dateValue"
    :unlink-panels="true"
    :clearable="clearable"
    type="datetimerange"
    align="center"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    format="yyyy-MM-dd"
    value-format="yyyy-MM-dd"
    :default-time="['00:00:00']"
    :popper-class="'date-picker-header'"
    :prefix-icon="'el-icon-date'"
    :picker-options="options"
    @change="onChange"
    @blur="onBlur"
    @focus="onFocus"
  />
</template>
<script>
import defaultPickerOptions from './pickerOptions'
import { uuid } from '@/utils/index'

export default {
  name: 'TDatePicker',
  props: {
    value: {
      type: Array,
      required: false,
      default: () => {
        const now = new Date()
        const start = new Date().getTime() - 3600 * 1000 * 24 * 7
        return [start, now]
      }
    },
    clearable: {
      type: Boolean,
      default: false
    },
    pickerOptions: {
      type: Object,
      default: () => {
      }
    },
    // 自定义扩展数据，触发event的时候会回传
    dataItem: {
      type: [Object, String, Number, Array, Boolean],
      default: null
    }
  },
  data() {
    return {
      comId: '', // 该组件唯一id
      dateValue: '',
      options: defaultPickerOptions
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.dateValue = val
      }
    },
    pickerOptions: {
      immediate: true,
      handler(val) {
        if (val) {
          this.setPickerOptions()
        }
      }
    }
  },
  created() {
    this.dateValue = this.value
    this.comId = uuid()
  },
  mounted() {
  },
  methods: {
    setPickerOptions() {
      this.options = Object.assign({}, this.options, this.pickerOptions)
    },
    onChange(value) {
      this.$emit('on-change', value, this.dataItem)
      if (value) {
        this.$emit('input', [new Date(value[0]), new Date(value[1])])
      } else {
        this.$emit('input', null)
      }
    },
    onBlur() {
      this.$emit('on-close', this.dataItem)
    },
    onFocus() {
      this.showPicker()
    },
    showPicker() {
      this.$nextTick(() => {
        // 获取原生element组件
        const datePicker = this.$refs[this.comId]
        datePicker.showPicker()
        const picker = datePicker.picker
        this.$nextTick(() => {
          const footer = picker.$el.querySelector(
            '.el-picker-panel__footer'
          )
          // 自定义底部按钮
          this._createFooterButtons(footer, datePicker)
        })
      })
    },
    _createFooterButtons(footer, datePicker) {
      const btns = footer.querySelectorAll('.qu_custom_btn')
      if (!btns || btns.length === 0) {
        const cancelBtn = document.createElement('button')
        cancelBtn.innerHTML = '取消'
        cancelBtn.setAttribute('type', 'button')
        cancelBtn.classList.add(
          'qu_custom_btn',
          'el-button',
          'el-button--default',
          'el-button--mini',
          'el-picker-panel__link-btn'
        )
        cancelBtn.onclick = () => {
          this.$emit('on-close', this.dataItem)
          datePicker.hidePicker()
        }
        footer.appendChild(cancelBtn)
      }
    }
  }
}
</script>
<style lang="less">
.date-picker-header {
  .el-date-range-picker__time-header {
    display: none;
  }
  .el-picker-panel__footer button {
    width: 80px;
    height: 32px;
    border-radius: 4px;
    &:first-child {
      // border:1px solid #DCDFE6;
      display: none;
    }
  }
}
</style>
