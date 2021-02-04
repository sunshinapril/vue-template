
import request from '@/utils/request'

export default {
  login: function(data) {
    return request({
      url: '/login',
      method: 'post',
      data: data
    })
  },
  getUserInfo: function(data) {
    return request({
      url: '/tenant/user/manager/queryUserInfo',
      method: 'post',
      data
    })
  },
  loginOut: function(id) {
    return request({
      url: '/login/out',
      method: 'post',
      data: {
        userID: id
      }
    })
  },
  getCode: function() {
    return request({
      url: '/auth/sendImgVerifyCode',
      method: 'get',
      responseType: 'arraybuffer',
      useRowData: true
    })
  },
  getSendSMS: function(data) {
    return request({
      url: '/auth/sendSMS',
      method: 'post',
      data
    })
  }
}
