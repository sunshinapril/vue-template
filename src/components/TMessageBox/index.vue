<template>
  <el-dialog
    v-el-drag-dialog
    :close-on-click-modal="false"
    :show-close="showClose"
    :visible.sync="visible"
    :width="width || '392px'"
    @close="handleAction('cancel')"
  >
    <template slot="title">
      <span v-if="title">{{ title }}</span>
    </template>
    <div class="content" v-html="message" />
    <div slot="footer" class="dialog-footer">
      <template v-if="type === 'confirm'">
        <TButton type="info" @click="handleAction('cancel')">{{ cancelButtonText }}</TButton>
        <TButton @click="handleAction('confirm')">{{ confirmButtonText }}</TButton>
      </template>
      <template v-if="type === 'alert'">
        <TButton @click="handleAction('confirm')">{{ confirmButtonText }}</TButton>
      </template>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'MessageBox',
  data() {
    return {
      visible: false,
      title: '',
      width: '',
      message: '',
      cancelButtonText: '',
      confirmButtonText: '',
      closeOnHashChange: true,
      // 异步处理模式，所有操作都需要手动关闭弹框
      async: false,
      callback: null,
      type: '',
      showClose: true
    }
  },
  mounted() {
    if (this.closeOnHashChange) {
      window.addEventListener('hashchange', this.close)
    }
  },
  beforeDestroy() {
    if (this.closeOnHashChange) {
      window.removeEventListener('hashchange', this.close)
    }
  },
  methods: {
    close() {
      if (!this.visible) return
      this.visible = false
    },
    doClose() {
      if (!this.async) {
        this.close()
      }
      this.callback(this.action, this)
    },
    handleAction(action) {
      this.action = action
      this.doClose()
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
  padding: 20px;
  padding-bottom: 0;
}
/deep/ .el-dialog__footer {
  text-align: center;
  padding: 24px 20px 40px;
}
.content {
  text-align: center;
  color: #0D2B5E;
  font-size: 16px;
  margin: 16px 0
}
</style>
