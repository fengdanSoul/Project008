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
// 公告促销
// 公告促销列表
export function shopMessageList(query) {
  return request({
    url: '/api/ShopMessage/shopMessageList',
    method: 'post',
    data: query
  })
}

// 添加公告促销
export function shopMessageAdd(query) {
  return request({
    url: '/api/ShopMessage/shopMessageAdd',
    method: 'post',
    data: query
  })
}
// 公告促销删除
export function shopMessageDelete(query) {
  return request({
    url: '/api/ShopMessage/shopMessageDelete',
    method: 'post',
    data: query
  })
}
// 公告促销编辑
export function shopMessageModify(query) {
  return request({
    url: '/api/ShopMessage/shopMessageModify',
    method: 'post',
    data: query
  })
}
