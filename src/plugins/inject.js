import CacheControl from '@/utils/cache/CacheControl'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'
import api from '@/api'
import MessageBox from '@/components/TMessageBox'

export default {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {
    Vue.prototype.$cache = CacheControl
    Vue.prototype.$echarts = echarts
    Vue.prototype.$api = api
    Vue.prototype.$messageBox = MessageBox.confirm
    Vue.prototype.$alertBox = MessageBox.alert
  }
}
