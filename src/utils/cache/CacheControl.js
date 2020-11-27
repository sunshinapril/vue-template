import Cache from './Cache'
import moment from 'moment'

const StoreTypes = {
  SessionStorage: 'sessionStorage',
  LocalStorage: 'localStorage'
}
// 缓存统一管理
export default class CacheControl {
    // 缓存的字段写在这里
    // refreshTime：刷新缓存时间
    static caches = {
      // demo
      TIGER_LOCAL_TOKEN: new Cache('TIGER_LOCAL_TOKEN', StoreTypes.LocalStorage, {
        refreshTime: moment('2020-11-09').valueOf()
      })
    }

    static get(key) {
      return key.get()
    }

    static set(key, value) {
      key.set(value)
    }

    static remove(key) {
      key.remove()
    }

    static clearExpires() {
      console.log('正在清理过期缓存..')
      for (const key in this.caches) {
        const cache = this.caches[key]
        const rawData = cache._getRawData()
        // 判断null和undefined是因为以前缓存的数据不是新改的数据结构，存在bool值的情况
        if (rawData !== null && rawData !== undefined) {
          const nextRefreshTime = cache.options.refreshTime || 0
          const lastRefreshTime = rawData._lastRefreshTime || 0
          if (nextRefreshTime > lastRefreshTime) {
            console.log(`remove ${key}`)
            cache.remove()
          }
        }
      }
      console.log('清理完毕！')
    }

    static init() {
      this.clearExpires()
    }
}
