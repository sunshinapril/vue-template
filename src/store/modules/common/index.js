import {
  SET_USER_INFO
} from '../../mutation-types'
const state = {
  // 用户信息
  userInfo: {}
}

const mutations = {
  [SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo || {}
  }
}

const getters = {}

const actions = {
  async getUserInfo({ commit }) {
    const userInfo = await this.$api.user.getUserInfo
    commit(SET_USER_INFO, userInfo)
  },
  // 退出登陆
  async logout({ state }) {
    // const userID = state.userInfo.id
    // return await this.$api.user.loginOut(userID)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
