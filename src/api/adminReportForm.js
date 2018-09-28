import request from '@/utils/request'

export default {
  displayList: function(params) { // 商品陈列列表member_id/displayer_id/start_time/end_time/like_name
    return request({
      url: '/api/AdminDisplay/displayList',
      method: 'post',
      data: params
    })
  },
  displayAdd: function(params) { // 商品陈列添加
    return request({
      url: '/api/AdminDisplay/displayAdd',
      method: 'post',
      data: params
    })
  },
  getMemberList: function(params) { // 商品陈列门店列表
    return request({
      url: '/api/AdminDisplay/getMemberList',
      method: 'post',
      data: params
    })
  },
  getDisplayerList: function(params) { // 商品陈列业务员列表
    return request({
      url: '/api/AdminDisplay/getDisplayerList',
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
      url: '/api/AdminBanner/bannerList',
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
      url: '/api/AdminBanner/bannerDelete',
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
  bootAdd: function(params) { // app
    return request({
      url: '/api/AdminBoot/bootAdd',
      method: 'post',
      data: params
    })
  }
}
