import Vue from 'vue'
import NProgress from 'vue-nprogress'
import VueVirtualScroller from 'vue-virtual-scroller'
import Element from 'element-ui'
import Router from 'vue-router'
import App from './App.vue'
import CacheControl from '@/utils/cache/CacheControl.js'
import inject from '@/plugins/inject'
import store from '@/store'

// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/theme/index.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import 'normalize.css'
import 'animate.css'
import '@/styles/global.less'
import '@/styles/colors.less'
import '@/styles/reset.less'
import Components from '@/components/index'
import Filters from '@/filters/index'
import Directives from '@/directives/index'
import router from '@/router/routers'
import './router/index'
// 数据字典
import dict from './components/Dict'
Vue.config.productionTip = false
Vue.use(dict)
Vue.use(Element, { size: 'medium' })
Vue.use(VueVirtualScroller)
Vue.use(Components)
Vue.use(Filters)
Vue.use(Directives)
Vue.use(NProgress, {
  showSpinner: false,
  http: false
})
Vue.use(Router)
Vue.use(inject)
CacheControl.init()
const nprogress = new NProgress()

new Vue({
  nprogress,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
