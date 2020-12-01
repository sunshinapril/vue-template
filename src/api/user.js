import request from '@/utils/request'

export default {
  login: function(data) {
    return request({
      url: '/login',
      method: 'post',
      data: data
    })
  },
  getUserInfo: function(params) {
    return request({
      url: '/user/info',
      method: 'post',
      params
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
