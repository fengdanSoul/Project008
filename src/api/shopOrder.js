import request from '@/utils/request'
// 店铺订单列表
export function shopOrderList(params) {
  return request({
    url: '/api/ShopOrder/shopOrderList',
    method: 'post',
    data: params
  })
}
// 店铺订单列表
export function shopAppOrderList(params) {
  return request({
    url: '/api/ShopOrder/shopAppOrderList',
    method: 'post',
    data: params
  })
}
// 店铺订单发货
export function shopOrderDelivery(params) {
  return request({
    url: '/api/ShopOrder/shopOrderDelivery',
    method: 'post',
    data: params
  })
}
// 店铺订单处理
export function shopOrderFlag(params) {
  return request({
    url: '/api/ShopOrder/shopOrderFlag',
    method: 'post',
    data: params
  })
}
// 店铺订单详情
export function shopOrderDetails(params) {
  return request({
    url: '/api/ShopOrder/shopOrderDetails',
    method: 'post',
    data: params
  })
}
// 店铺订单会员列表
export function shopMemberList(params) {
  return request({
    url: '/api/ShopMember/shopMemberList',
    method: 'post',
    data: params
  })
}
// 店铺订单会员详情
export function shopMemberDetails(params) {
  return request({
    url: '/api/ShopMember/shopMemberDetails',
    method: 'post',
    data: params
  })
}
// 店铺订单会员加单
export function shopOrderAdd(params) {
  return request({
    url: '/api/ShopOrder/shopOrderAdd',
    method: 'post',
    data: params
  })
}
// 店铺订单取消
export function shopOrderCancel(params) {
  return request({
    url: '/api/ShopOrder/shopOrderCancel',
    method: 'post',
    data: params
  })
}
// 店铺订单支付
export function shopOrderPay(params) {
  return request({
    url: '/api/ShopOrder/shopOrderPay',
    method: 'post',
    data: params
  })
}

// 店铺开通支付方式
export function shopPayType(params) {
  return request({
    url: '/api/ShopOrder/shopPayType',
    method: 'post',
    data: params
  })
}

// 店铺支付账号信息
export function shopPayNumber(params) {
  return request({
    url: '/api/ShopOrder/shopPayNumber',
    method: 'post',
    data: params
  })
}
