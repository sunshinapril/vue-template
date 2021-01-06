<template>
  <div class="editor">
    <editor
      v-model="value"
      api-key="h9enzfpdn4ywn7egqoq5rq634922e8kg5jrz39j3l2tsf8i3"
      :init="init"
    />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'App',
  components: {
    'editor': Editor
  },
  data() {
    return {
      init: {
        // 组件
        plugins:
          ' lists image colorpicker textcolor wordcount contextmenu autoresize',
        // 工具栏
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent  | undo redo | link unlink image  | removeformat ',
        branding: false,
        min_height: 600,
        language: 'zh_CN',
        fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px 50px 56px 60px 64px'
      },
      value: ''
    }
  }
}
</script>
<style lang="less" scoped>

</style>
