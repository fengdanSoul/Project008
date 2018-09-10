import request from '@/utils/request'

export default {
  adminAppOrderAllList: function(params) { // 所有常规订单管理
    return request({
      url: '/api/AdminOrder/adminAppOrderAllList',
      method: 'post',
      data: params
    })
  },
  adminShopOrderAllList: function(params) { // 所有非常规订单管理
    return request({
      url: '/api/AdminOrder/adminShopOrderAllList',
      method: 'post',
      data: params
    })
  },
  adminAppOrderDetail: function(params) { // 常规订单详情
    return request({
      url: '/api/AdminOrder/adminAppOrderDetail',
      method: 'post',
      data: params
    })
  },
  adminShopOrderDetail: function(params) { // 非常规订单详情
    return request({
      url: '/api/AdminOrder/adminShopOrderDetail',
      method: 'post',
      data: params
    })
  }
}

