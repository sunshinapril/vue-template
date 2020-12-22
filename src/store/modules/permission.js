import { constantRouterMap } from '@/router/routers'
import { SET_ROUTERS } from '@/store/mutation-types'
const Layout = () => import('@/views/Layout.vue')
const Outlet = {
  render() {
    return <router-view />
  }
}

const state = {
  routers: constantRouterMap,
  addRouters: []
}
const mutations = {
  [SET_ROUTERS]: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRouterMap.concat(routers)
  }
}
const actions = {
  GenerateRoutes({ commit }, asyncRouter) {
    commit(SET_ROUTERS, asyncRouter)
  }
}
const getters = {}

export const filterAsyncRouter = (routers) => { // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(router => {
    if (router.component) {
      if (router.component === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else if (router.component === 'Outlet') {
        router.component = Outlet
      } else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })
}

export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
