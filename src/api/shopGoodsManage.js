// admin
import request from '@/utils/request'

// 店铺商品列表(spu)
export function shopProductList(params) {
  return request({
    url: '/api/ShopProduct/shopProductList',
    method: 'post',
    data: params
  })
}
// 店铺所有商品列表
export function shopProductSkuAllList(params) {
  return request({
    url: '/api/ShopProductSku/shopProductSkuAllList',
    method: 'post',
    data: params
  })
}

// 店铺所有商品列表
export function shopProductAdd(params) {
  return request({
    url: '/api/ShopProduct/shopProductAdd',
    method: 'post',
    data: params
  })
}
// 店铺商品详情规格列表(基于平台spu)
export function shopProductSpuSkuList(params) {
  return request({
    url: '/api/ShopProductSku/shopProductSpuSkuList',
    method: 'post',
    data: params
  })
}

// 店铺商品sku商品详情
export function shopProductSkuDetails(params) {
  return request({
    url: '/api/ShopProductSku/shopProductSkuDetails',
    method: 'post',
    data: params
  })
}

// 店铺商品sku商品删除
export function shopProductSkuDelete(params) {
  return request({
    url: '/api/ShopProductSku/shopProductSkuDelete',
    method: 'post',
    data: params
  })
}

// 店铺商品sku商品管理
export function shopProductSkuFlag(params) {
  return request({
    url: '/api/ShopProductSku/shopProductSkuFlag',
    method: 'post',
    data: params
  })
}

// 店铺商品sku商品编辑
export function shopProductSkuModify(params) {
  return request({
    url: '/api/ShopProductSku/shopProductSkuModify',
    method: 'post',
    data: params
  })
}
// 基本信息
export function shopPrdouctSkuAddIndex(params) {
  return request({
    url: '/api//ShopProductSku/shopPrdouctSkuAddIndex',
    method: 'post',
    data: params
  })
}
// 店铺商品sku商品add
export function shopProductSkuAdd(params) {
  return request({
    url: '/api//ShopProductSku/shopProductSkuAdd',
    method: 'post',
    data: params
  })
}
// 店铺商品分类添加
export function shopCategoryAdd(params) {
  return request({
    url: '/api/ShopCategory/shopCategoryAdd',
    method: 'post',
    data: params
  })
}

// 店铺商品分类列表
export function shopCategoryList(params) {
  return request({
    url: '/api/ShopCategory/shopCategoryList',
    method: 'post',
    data: params
  })
}
// 店铺商品分类修改
export function shopCategoryModify(params) {
  return request({
    url: '/api/ShopCategory/shopCategoryModify',
    method: 'post',
    data: params
  })
}

// 店铺商品分类删除
export function shopCategoryDelete(params) {
  return request({
    url: '/api/ShopCategory/shopCategoryDelete',
    method: 'post',
    data: params
  })
}
