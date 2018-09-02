import request from '@/utils/uploadRequest'

// 商户图片上传
export function uploadShopImage(file) {
  const form = new FormData()
  form.append('file', file)
  return request({
    url: '/api/UploadImage/uploadShopImage',
    method: 'post',
    data: form
  })
}
// 商品陈列图片上传
export function uploadDisplayImage(file) {
  const form = new FormData()
  form.append('file', file)
  return request({
    url: '/api/UploadImage/uploadDisplayImage',
    method: 'post',
    data: form
  })
}

// 上传会员反馈相关的图片
export function uploadFeedbackImage(file) {
  const form = new FormData()
  form.append('file', file)
  return request({
    url: '/api/UploadImage/uploadFeedbackImage',
    method: 'post',
    data: form
  })
}
// 上传商品相关的图片
export function uploadProductImage(file) {
  const form = new FormData()
  form.append('file', file)
  return request({
    url: '/api/UploadImage/uploadProductImage',
    method: 'post',
    data: form
  })
}
// Banner图片上传
export function uploadBannerImage(file) {
  const form = new FormData()
  form.append('file', file)
  return request({
    url: '/api/UploadImage/uploadBannerImage',
    method: 'post',
    data: form
  })
}
