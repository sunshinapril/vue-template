// import request from '@/utils/request'
// export function buildMenus() {
//   return request({
//     url: 'api/menus/build',
//     method: 'get'
//   })
// }
import tagManage from '@/router/tagManage'
import testManage from '@/router/testManage'

export function buildMenus() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: [tagManage, testManage]
      })
    }, 1000)
  })
}
