import request from '@/utils/request'

function add(data) {
  return request({
    url: '/information/add',
    method: 'post',
    data
  })
}
function get(page) {
  return request({
    url: '/information/list',
    method: 'get',
    params: {
      page
    }
  })
}

function getDetail(id) {
  return request({
    url: '/information/detail',
    method: 'get',
    params: {
      id
    }
  })
}
function top(id, top) {
  return request({
    url: '/information/top',
    method: 'get',
    params: {
      id,
      top
    }
  })
}

function del(id) {
  return request({
    url: '/information/delete',
    method: 'get',
    params: {
      id
    }
  })
}

export default {
  add,
  get,
  getDetail,
  top,
  del
}
