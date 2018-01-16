import request from '@/utils/request'

export function loginByPhone(phone, password) {
  const data = {
    phone,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: '/store/detail',
    method: 'get'
  })
}
