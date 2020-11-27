import { setPageTitle } from '../index'

export function routerBeforeEachFunc(to, from, next) {
  // 路由权限控制
  if (to.meta && to.meta.uncheck) {
    next()
    return false
  }
  // 外部链接
  if (to.meta && to.meta.outLink) {
    window.open(to.meta.outLink(), to.meta.target ? to.meta.target : '_self')
    return false
  }
  next()
}

// eslint-disable-next-line no-unused-vars
export function routerAfterEachFunc(to, from) {
  if (to.meta && (to.meta.label || to.meta.title)) {
    setPageTitle(to.meta.title || to.meta.label)
  }
}
