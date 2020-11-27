import request from "@/utils/request";

export default {
    login: function (data) {
        return request({
            path: '/login',
            type: 'post',
            data: data
        })
    },
    getUserInfo: function (params) {
        return request({
            path: '/user/info',
            type: 'post',
            params
        })
    },
    loginOut: function (id) {
        return request({
            path: '/login/out',
            type: 'post',
            data: {
                userID: id
            }
        })
    }
}
