<template>
  <el-dialog :visible.sync="visible" :width="width || '392px'" :close-on-click-modal="false" @close="close">
    <template slot="title">
      <span v-if="title" ref="myForm">{{ title }}</span>
    </template>
    <slot
      name="form"
    />
    <slot />
    <div slot="footer" class="dialog-footer">
      <slot name="footer" :onSave="onSave" :onCancel="onCancel">
        <t-button type="info" @click="onCancel">取 消</t-button>
        <t-button @click="onSave">确 定</t-button>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
import { isArray, isObject } from 'lodash'
/*
* 暂时通过this.$slots.form[0].componentInstance来获取form
* 此处仅对form进行重置，赋值为空操作
* */
export default {
  name: 'TDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      originalForm: null
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(val) {
        this.visible = val
        this.$nextTick(() => {
          if (this.$slots.form[0].componentInstance && this.$slots.form[0].componentInstance.model) {
            this.originalForm = JSON.stringify(this.$slots.form[0].componentInstance.model || {})
          }
        })
      }
    },
    visible(val) {
      this.$emit('update:show', val)
    }
  },
  methods: {
    onCancel() {
      this.close()
    },
    resetForm() {
      try {
        if (this.$slots.form && this.$slots.form[0].componentInstance.model) {
          const form = this.$slots.form[0].componentInstance.model || {}
          Object.keys(form).forEach(item => {
            if (isArray(form[item])) {
              form[item] = []
            } else if (isObject(form[item])) {
              form[item] = {}
            } else {
              form[item] = ''
            }
          })
          this.$slots.form[0].componentInstance.model = form
          this.$nextTick(() => {
            this.$slots.form[0].componentInstance.clearValidate()
          })
        }
        // eslint-disable-next-line no-empty
      } catch (e) {}
      this.visible = false
    },
    onSave() {
      console.log(this.$slots.form[0].componentInstance, '---')
      if (this.$slots.form) {
        this.$slots.form[0].componentInstance.validate((valid) => {
          if (valid) {
            if (this.originalForm === JSON.stringify(this.$slots.form[0].componentInstance.model)) {
              this.close()
              this.$notify({
                title: '未修改',
                type: 'warning'
              })
            } else {
              this.$emit('on-submit', valid)
            }
          } else {
            return false
          }
        })
      } else {
        this.$emit('on-submit')
      }
    },
    close() {
      this.$emit('on-close')
      this.resetForm()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__header {
  text-align: center;
  border-bottom: 1px solid #E9EEF8;
  padding: 20px;
  font-size: 18px;
  color: #0D2B5E;
}
/deep/ .el-dialog__body {
  padding: 20px 20px 0;
  .el-form-item {
    margin-bottom: 16px;
  }
  .el-form--label-top .el-form-item__label {
    height: 17px;
    color: #0D2B5E;
    line-height: 17px;
    font-size: 12px;
    margin-bottom: 5px;
    padding: 0;
  }
}
/deep/ .el-dialog__footer {
  text-align: center;
  padding: 24px 20px 40px;
}
</style>
