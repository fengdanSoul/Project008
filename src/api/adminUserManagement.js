// admin
import request from '@/utils/request'

export function shopList(params) {
  return request({
    url: '/api/AdminClasss/classsList',
    method: 'post',
    data: params
  })
}
