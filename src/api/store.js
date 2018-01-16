import request from '../utils/request'

const add = form =>
  request({
    url: 'store/add',
    method: 'post',
    data: form
  })

const get = page =>
  request({
    url: 'store/list',
    method: 'get',
    page
  })
const del = id =>
  request({
    url: 'store/delete',
    method: 'get',
    params: {
      id
    }
  })
const getDetail = id =>
  request({
    url: 'store/detail',
    method: 'get',
    params: {
      id
    }
  })

export default {
  add,
  get,
  del,
  getDetail
}
