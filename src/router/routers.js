import Router from 'vue-router'
// 防止当前位置导航重复点击，导致vue-router更新以后的报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
import HomeIc from '~/icon/tab_01_icon@2x.png'
import HomeIcActive from '~/icon/tab_01.1_icon@2x.png'

const Layout = () => import('@/views/Layout.vue')

export const constantRouterMap = [
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views/feature/Login.vue'),
    meta: {
      label: '登录',
      uncheck: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/feature/redirect')
      }
    ]
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [{
      path: '/home',
      component: () => import('@/views/Home'),
      name: 'Home',
      meta: {
        title: '首页',
        icon: HomeIc,
        activeIcon: HomeIcActive
      }
    }]
  },
  {
    path: '/404',
    hidden: true,
    component: () => import('@/views/feature/404.vue'),
    meta: {
      label: '404'
    }
  },
  {
    path: '/forbidden',
    hidden: true,
    component: () => import('@/views/feature/Forbidden.vue'),
    meta: {
      label: '没有权限'
    }
  }
]

export default new Router({
  mode: 'hash',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
