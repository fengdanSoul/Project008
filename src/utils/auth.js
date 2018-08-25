import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UUID = 'Admin-UUID'
const Role = 'Admin-Role'
const ShopId = 'Admin-ShopId'
// token
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// UUID
export function getUUID() {
  return Cookies.get(UUID)
}

export function setUUID(uuid) {
  return Cookies.set(UUID, uuid)
}

export function removeUUID() {
  return Cookies.remove(UUID)
}
// 角色
export function getRole() {
  return Cookies.get(Role)
}

export function setRole(role) {
  return Cookies.set(Role, role)
}

export function removeRole() {
  return Cookies.remove(Role)
}
// 角色
export function getShopId() {
  return Cookies.get(ShopId)
}

export function setShopId(shop_id) {
  return Cookies.set(ShopId, shop_id)
}

export function removeShopId() {
  return Cookies.remove(ShopId)
}
