import Router from 'vue-router'
// 防止当前位置导航重复点击，导致vue-router更新以后的报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
import menuRoutes from './routers'

const Layout = () => import('@/views/Layout.vue')

export default new Router({
  mode: 'hash',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/feature/Login.vue'),
      meta: {
        label: '登录',
        uncheck: true
      }
    },
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [...menuRoutes]
    },
    {
      path: '/404',
      component: () => import('@/views/feature/404.vue'),
      meta: {
        label: '404'
      }
    },
    {
      path: '/forbidden',
      component: () => import('@/views/feature/Forbidden.vue'),
      meta: {
        label: '没有权限'
      }
    },
    {
      path: '*',
      redirect: '/404',
      meta: {}
    }
  ]
})
