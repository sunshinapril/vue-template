import axios from 'axios'
import q from 'q'
import { Message } from 'element-ui'
import CacheControl from '@/utils/cache/CacheControl'

function request(config) {
  const _config = {
    baseURL: process.env.VUE_APP_API_HOST,
    headers: {
      token: CacheControl.get(CacheControl.caches.TIGER_LOCAL_TOKEN),
      'Content-Type': 'application/json'
    },
    ...config
  }
  return q
    .resolve(
      axios(_config)
        .then((res) => {
          if (res.status === 200) return res.data
          throw new Error(`服务端错误，状态码: ${res.status}`)
        })
        .then((res) => {
          if (!res || typeof res === 'string') {
            throw new Error('服务端错误')
          }
          if (_config.useRowData) {
            return res
          }
          switch (res.code) {
            case '200':
              return res
            case '103': // 登录态失效
              CacheControl.remove(CacheControl.caches.TIGER_LOCAL_TOKEN)
              break
          }

          throw new Error(res.message || '请求错误')
        })
    )
    .catch((e) => {
      Message.error(e.message)
      return q.reject(e)
    })
}

export default request
