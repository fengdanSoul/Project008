import request from '@/utils/request'

export function todayRemind(uuid, token) {
  return request({
    url: '/api/Shop/getShopMessage',
    method: 'post',
    data: {
      uuid,
      token
    }
  })
}
