import request from '@/utils/request'

export default {
  getMemberList: function(params) { // 商品陈列门店列表
    return request({
      url: '/api/AdminDisplay/getMemberList',
      method: 'post',
      data: params
    })
  },
  messageList: function(params) { // 信息列表
    return request({
      url: '/api/AdminMessage/messageList',
      method: 'post',
      data: params
    })
  },
  messageAdd: function(params) { // 添加title、content、sort
    return request({
      url: '/api/AdminMessage/messageAdd',
      method: 'post',
      data: params
    })
  },
  messageModify: function(params) { // 修改id
    return request({
      url: '/api/AdminMessage/messageModify',
      method: 'post',
      data: params
    })
  },
  messageDelete: function(params) { // 删除
    return request({
      url: '/api/AdminMessage/messageDelete',
      method: 'post',
      data: params
    })
  },
  bannerList: function(params) { // banner列表
    return request({
      url: '/api/AdminMessage/bannerList',
      method: 'post',
      data: params
    })
  },
  bannerAdd: function(params) { // banner添加 sort/banner_src
    return request({
      url: '/api/AdminBanner/bannerAdd',
      method: 'post',
      data: params
    })
  },
  bannerDelete: function(params) { // banner删除
    return request({
      url: '/api/AdminMessage/bannerDelete',
      method: 'post',
      data: params
    })
  },
  bootList: function(params) { // app 启动图列表
    return request({
      url: '/api/AdminBoot/bootList',
      method: 'post',
      data: params
    })
  },
  bootAdd: function(params) { // app 启动图列表
    return request({
      url: '/api/AdminBoot/bootAdd',
      method: 'post',
      data: params
    })
  }
}
