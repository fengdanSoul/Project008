// admin
import request from '@/utils/request'

// 上传和商品相关的图片
export function uploadDisplayImage(file) {
  return request({
    url: '/api/UploadImage/uploadDisplayImage',
    method: 'post',
    data: {
      img: file
    }
  })
}
