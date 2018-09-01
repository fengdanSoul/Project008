// admin
import request from '@/utils/request'

// 所有店铺商品列表
export function productSkuAllList(params) {
  return request({
    url: '/api/AdminProduct/productSkuAllList',
    method: 'post',
    data: params
  })
}

// 平台品牌列表
export function brandList(params) {
  return request({
    url: '/api/AdminBrand/brandList',
    method: 'post',
    data: params
  })
}
// 平台商品品牌添加
export function brandAdd(params) {
  return request({
    url: '/api/AdminBrand/brandAdd',
    method: 'post',
    data: params
  })
}

// 平台商品品牌编辑
export function brandModify(params) {
  return request({
    url: '/api/AdminBrand/brandModify',
    method: 'post',
    data: params
  })
}

// 平台商品品牌删除
export function brandDelete(params) {
  return request({
    url: '/api/AdminBrand/brandDelete',
    method: 'post',
    data: params
  })
}

// 平台商品分类列表
export function categoryList(params) {
  return request({
    url: '/api/AdminCategory/categoryList',
    method: 'post',
    data: params
  })
}

// 平台商品分类添加
export function categoryAdd(params) {
  return request({
    url: '/api/AdminCategory/categoryAdd',
    method: 'post',
    data: params
  })
}

// 平台商品分类编辑
export function categoryModify(params) {
  return request({
    url: '/api/AdminCategory/categoryModify',
    method: 'post',
    data: params
  })
}

// 平台商品分类删除
export function categoryDelete(params) {
  return request({
    url: '/api/AdminCategory/categoryDelete',
    method: 'post',
    data: params
  })
}

// 平台商品列表SPU
export function productSpuList(params) {
  return request({
    url: '/api/AdminProductSpu/productSpuList',
    method: 'post',
    data: params
  })
}

// 删除商品SPU
export function productSpuDelete(id) {
  return request({
    url: '/api/AdminProductSpu/productSpuDelete',
    method: 'post',
    data: { id: id }
  })
}

// 上、下架商品SPU
export function productSpuFlag(id, product_flag) {
  return request({
    url: '/api/AdminProductSpu/productSpuFlag',
    method: 'post',
    data: {
      id,
      product_flag
    }
  })
}

// 添加商品SPU
export function productSpuAdd(params) {
  return request({
    url: '/api/AdminProductSpu/productSpuAdd',
    method: 'post',
    data: params
  })
}
// 修改商品SPU
export function productSpuModify(params) {
  return request({
    url: '/api/AdminProductSpu/productSpuModify',
    method: 'post',
    data: params
  })
}
