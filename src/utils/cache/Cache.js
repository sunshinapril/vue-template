const engine = require('store/src/store-engine')
const local = engine.createStore([require('store/storages/localStorage')])
const session = engine.createStore([require('store/storages/sessionStorage')])
const store = { local, session }
const KEYS = []

const PREFIX = '_TIGER_'

export default class Cache {
  constructor(name, type, options) {
    if (!name) {
      throw new Error('缓存名称不能为空')
    }
    if (KEYS.includes(name)) {
      throw new Error(`缓存名称重复:${name}`)
    }
    this.storeKey = this._getStoreKey(name)
    this.storeType = this._getStoreType(type)
    this.options = Object.assign({}, {
      refreshTime: 0 // 刷新缓存的时间
    }, options)
    KEYS.push(name)
  }

  get() {
    const rawData = this._getRawData()
    // 兼容以前的数据结构
    if (rawData !== null && rawData !== undefined) {
      return rawData._data || rawData
    }
    return null
  }

  set(value) {
    store[this.storeType].set(this.storeKey, {
      _data: value,
      _lastRefreshTime: this.options.refreshTime,
      _updateTime: new Date().getTime()
    })
  }

  remove() {
    store[this.storeType].remove(this.storeKey)
  }

  _getRawData() {
    return store[this.storeType].get(this.storeKey)
  }

  _getStoreKey(name) {
    return PREFIX + name
  }

  _getStoreType(type) {
    let storeType
    if (type && type.toUpperCase() === 'LOCALSTORAGE') {
      storeType = 'local'
    } else if (type && type.toUpperCase() === 'SESSIONSTORAGE') {
      storeType = 'session'
    } else {
      storeType = 'local' // 默认为localStorage
    }
    return storeType
  }
}
