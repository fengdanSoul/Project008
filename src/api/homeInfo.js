// 首页
import request from '@/utils/request'

export function todayRemind() {
  return request({
    url: '/api/Shop/getShopMessage',
    method: 'post',
    data: {
    }
  })
}
// 订单状态信息
export function shopOrder() {
  return request({
    url: '/api/Shop/getShopOrder',
    method: 'post',
    data: {
    }
  })
}
// 平台提示信息
export function platformeminding(id) {
  return request({
    url: '/api/AdminMessage/messageDetails',
    method: 'post',
    data: {
      id
    }
  })
}
