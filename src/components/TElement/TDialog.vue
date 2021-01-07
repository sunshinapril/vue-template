<template>
  <el-dialog :visible.sync="visible" :width="width || '392px'" :close-on-click-modal="false" @close="close">
    <template slot="title">
      <span v-if="title">{{ title }}</span>
    </template>
    <el-form v-if="tForm" ref="form" :model="tForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
      <slot
        name="form"
        v-bind="{...$props, ...$attrs}"
        v-on="{...$listeners}"
      />
    </el-form>
    <slot />
    <div slot="footer" class="dialog-footer">
      <t-button type="info" @click="onCancel">取 消</t-button>
      <t-button @click="onSave">确 定</t-button>
    </div>
  </el-dialog>
</template>

<script>
import { isArray, isObject } from 'lodash'

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
    form: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    },
    labelPosition: {
      type: String,
      default: 'left'
    },
    labelWidth: {
      type: String,
      default: '60px'
    }
  },
  data() {
    return {
      visible: false,
      originalForm: null
    }
  },
  computed: {
    tForm: {
      get() {
        return this.form
      },
      set(val) {
        this.$emit('update:form', val)
      }
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(val) {
        this.visible = val
        if (this.form) {
          this.originalForm = JSON.stringify(this.form)
          this.tForm = this.form
        }
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
        if (this.form) {
          const form = JSON.parse(this.originalForm)
          Object.keys(form).forEach(item => {
            if (isArray(form[item])) {
              form[item] = []
            } else if (isObject(form[item])) {
              form[item] = {}
            } else {
              form[item] = ''
            }
          })
          this.tForm = form
          this.$nextTick(() => {
            this.$refs.form.clearValidate()
          })
        }
        // eslint-disable-next-line no-empty
      } catch (e) {}
      this.visible = false
    },
    onSave() {
      if (this.form) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.originalForm === JSON.stringify(this.form)) {
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
