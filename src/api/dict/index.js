import request from '@/utils/request'

export function getDictDetail(dictName) {
  const params = {
    dictName,
    page: 0,
    size: 9999
  }
  return request({
    url: 'api/dictDetail',
    method: 'get',
    params
  })
}
