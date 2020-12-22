import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import createLogger from 'vuex/dist/logger'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
// const debug = false

const storeKey = '_TIGER_STORE__'

const plugins = [
  createPersistedState({
    storage: window.sessionStorage,
    key: storeKey,
    reducer(vuexState) {
      return {
        // user: vuexState.user
      }
    }
  })
]
/* eslint-disable no-unused-expressions */
debug ? plugins.push(createLogger()) : null

export default new Vuex.Store({
  modules: {
    user,
    permission
  },
  getters,
  plugins,
  strict: debug
})
