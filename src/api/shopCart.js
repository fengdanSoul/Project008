import request from '@/utils/request'
// 商家购物商品列表
export function shopProductCarList() {
  return request({
    url: '/api/ShopProductCar/shopProductCarList',
    method: 'post',
    data: {}
  })
}
// 商家购物商品添加
export function shopProductCarAdd(params) {
  return request({
    url: '/api/ShopProductCar/shopProductCarAdd',
    method: 'post',
    data: params
  })
}
// 商家购物商品递加
export function shopProductCarSetInc(params) {
  return request({
    url: '/api/ShopProductCar/shopProductCarSetInc',
    method: 'post',
    data: params
  })
}
// 商家购物商品递减
export function shopProductCarSetDec(params) {
  return request({
    url: '/api/ShopProductCar/shopProductCarSetDec',
    method: 'post',
    data: params
  })
}
// 商家购物商品删除
export function shopProductCarDelete(params) {
  return request({
    url: '/api/ShopProductCar/shopProductCarDelete',
    method: 'post',
    data: params
  })
}
