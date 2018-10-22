// 商户
import request from '@/utils/request'
// 店铺信息
export function shopDetails(query) {
  return request({
    url: '/api/Shop/shopDetails',
    method: 'post',
    data: query
  })
}
// 店铺信息修改
export function shopModify(query) {
  return request({
    url: '/api/Shop/shopModify',
    method: 'post',
    data: query
  })
}
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
// 配送信息列表
export function shopDeliveryList(query) {
  return request({
    url: '/api/ShopDelivery/shopDeliveryList',
    method: 'post',
    data: query
  })
}
// 配送信息促销
export function shopDeliveryAdd(query) {
  return request({
    url: '/api/ShopDelivery/shopDeliveryAdd',
    method: 'post',
    data: query
  })
}
// 配送信息删除
export function shopDeliveryDelete(query) {
  return request({
    url: '/api/ShopDelivery/shopDeliveryDelete',
    method: 'post',
    data: query
  })
}
// 配送信息编辑
export function shopDeliveryModify(query) {
  return request({
    url: '/api/ShopDelivery/shopDeliveryModify',
    method: 'post',
    data: query
  })
}

// 会员反馈列表
export function feedbackList(query) {
  return request({
    url: '/api/ShopFeedback/feedbackList',
    method: 'post',
    data: query
  })
}
// 会员反馈处理
export function feedbackFlag(query) {
  return request({
    url: '/api/ShopFeedback/feedbackFlag',
    method: 'post',
    data: query
  })
}
// 会员反馈删除
export function feedbackDelete(query) {
  return request({
    url: '/api/ShopFeedback/feedbackDelete',
    method: 'post',
    data: query
  })
}

//
// // 会员反馈列表
// export function feedbackList(query) {
//   return request({
//     url: '/api/AdminFeedback/feedbackList',
//     method: 'post',
//     data: query
//   })
// }
// // 会员反馈处理
// export function feedbackFlag(query) {
//   return request({
//     url: '/api/AdminFeedback/feedbackFlag',
//     method: 'post',
//     data: query
//   })
// }
// // 会员反馈删除
// export function feedbackDelete(query) {
//   return request({
//     url: '/api/AdminFeedback/feedbackDelete',
//     method: 'post',
//     data: query
//   })
// }
