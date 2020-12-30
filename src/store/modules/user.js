import {
  SET_LOAD_MENUS,
  SET_ROLES,
  SET_USER
} from '@/store/mutation-types'
import userRequest from '@/api/user'
import { removeToken, setToken } from '@/utils/auth'
const state = {
  // 用户信息
  user: {},
  roles: [],
  // 第一次加载菜单时用到
  loadMenus: false
}

const mutations = {
  [SET_USER](state, user) {
    state.user = user || {}
  },
  [SET_ROLES]: (state, roles) => {
    state.roles = roles
  },
  [SET_LOAD_MENUS]: (state, loadMenus) => {
    state.loadMenus = loadMenus
  }
}

const getters = {}

const actions = {
  // 登录
  async Login({ commit }, params) {
    try {
      const res = await userRequest.login(params)
      const data = res.data.data
      setToken(data.token)
      setUserInfo(data, commit)
      // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
      commit(SET_LOAD_MENUS, true)
      return data
    } catch (e) {
      return Promise.reject(e)
    }
  },
  // 获取用户信息
  GetInfo({ commit }, params) {
    userRequest.getUserInfo(params).then(res => {
      const data = res.data.data
      setUserInfo(data, commit)
    })
  },
  // 登出
  LogOut({ commit }, userId) {
    return new Promise((resolve, reject) => {
      logOut(commit)
      resolve()
      // userRequest.loginOut(userId).then(res => {
      //   logOut(commit)
      //   resolve()
      // }).catch(error => {
      //   logOut(commit)
      //   reject(error)
      // })
    })
  },
  updateLoadMenus({ commit }) {
    return new Promise((resolve, reject) => {
      commit(SET_LOAD_MENUS, false)
    })
  }
}
export const logOut = (commit) => {
  commit(SET_ROLES, [])
  removeToken()
}
export const setUserInfo = (res, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (res?.roleCodes?.length === 0) {
    commit(SET_ROLES, ['*'])
  } else {
    commit(SET_ROLES, res.roleCodes || ['*'])
  }
  commit(SET_USER, res)
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
