import drag from '@/directives/el-drag-dialog'
export default {
  install(Vue, options) {
    Vue.directive('el-drag-dialog', drag)
  }
}
