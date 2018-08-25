// 商户
import request from '@/utils/request'

// 支付方式
export function payModify(query) {
  return request({
    url: '/api/Shop/payModify',
    method: 'post',
    data: query
  })
}

