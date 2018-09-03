import request from '@/utils/request'

export default {
  shopProductCarList: function() { // 商家购物车商品列表
    return request({
      url: '/api/ShopProductCar/shopProductCarList',
      method: 'post',
      data: {}
    })
  },
  shopProductCarAdd: function(params) { // 商家购物车商品添加
    return request({
      url: '/api/ShopProductCar/shopProductCarAdd',
      method: 'post',
      data: params
    })
  },
  shopProductCarSetInc: function(params) { // 商家购物车商品递加
    return request({
      url: '/api/ShopProductCar/shopProductCarSetInc',
      method: 'post',
      data: params
    })
  },
  shopProductCarSetDec: function(params) { // 商家购物车商品递减
    return request({
      url: '/api/ShopProductCar/shopProductCarSetDec',
      method: 'post',
      data: params
    })
  },
  shopProductCarDelete: function(params) { // 商家购物车商品删除
    return request({
      url: '/api/ShopProductCar/shopProductCarDelete',
      method: 'post',
      data: params
    })
  }
}

