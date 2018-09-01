// admin
import request from '@/utils/uploadRequest'

// 上传和商品相关的图片
export function uploadDisplayImage(file) {
  return request({
    url: '/api/UploadImage/uploadDisplayImage',
    method: 'post',
    data: file
  })
}

// 上传会员反馈相关的图片
export function uploadFeedbackImage(file) {
  return request({
    url: '/api/UploadImage/uploadFeedbackImage',
    method: 'post',
    data: file
  })
}
