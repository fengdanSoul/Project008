// 首页
import request from '@/utils/request'

export function updatePassword(params) {
  return request({
    url: '/api/AdminLogin/setPassword',
    method: 'post',
    data: params
  })
}
