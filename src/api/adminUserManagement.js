// admin
import request from '@/utils/request'
// 店铺列表
export function shopList(params) {
  return request({
    url: '/api/AdminClasss/classsList',
    method: 'post',
    data: params
  })
}
// 店铺添加
export function addShop(params) {
  return request({
    url: '/api/AdminClasss/classsAdd',
    method: 'post',
    data: params
  })
}
// 店铺修改
export function updateShop(params) {
  return request({
    url: '/api/AdminClasss/classsModify',
    method: 'post',
    data: params
  })
}
// 店铺删除
export function deleteShop(params) {
  return request({
    url: '/api/AdminClasss/classsDelete',
    method: 'post',
    data: params
  })
}

// 店铺区域列表
export function shopDistrictList(params) {
  return request({
    url: '/api/AdminDistrict/districtList',
    method: 'post',
    data: params
  })
}
// 区域添加
export function addShopDistrict(params) {
  return request({
    url: '/api/AdminDistrict/districtAdd',
    method: 'post',
    data: params
  })
}
// 区域修改
export function updateShopDistrict(params) {
  return request({
    url: '/api/AdminDistrict/districtModify',
    method: 'post',
    data: params
  })
}
// 区域删除
export function deleteShopDistrict(params) {
  return request({
    url: '/api/AdminDistrict/districtDelete',
    method: 'post',
    data: params
  })
}

// adminMemberList
// 店铺会员列表
export function adminMemberList(params) {
  return request({
    url: '/api/AdminMember/adminMemberList',
    method: 'post',
    data: params
  })
}
// 店铺会员添加
export function memberAdd(params) {
  return request({
    url: '/api/Admin/MemberAdd',
    method: 'post',
    data: params
  })
}
// 店铺会员信息
export function adminMemberDetails(params) {
  return request({
    url: '/api/AdminMember/adminMemberDetails',
    method: 'post',
    data: params
  })
}
// 店铺会员管理
export function adminMemberFlag(params) {
  return request({
    url: '/api/AdminMember/adminMemberFlag',
    method: 'post',
    data: params
  })
}
// 店铺会员删除
export function adminMemberDelete(id) {
  return request({
    url: '/api/AdminMember/adminMemberDelete',
    method: 'post',
    data: { id: id }
  })
}
// 店铺会员编辑
export function adminMemberModify(params) {
  return request({
    url: '/api/AdminMember/adminMemberModify',
    method: 'post',
    data: params
  })
}

