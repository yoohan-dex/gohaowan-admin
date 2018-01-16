import request from '../utils/request'

const get = page =>
  request({
    url: '/user/list',
    method: 'get',
    params: {
      page
    }
  })

const getComment = (page, s, e) =>
  request({
    url: '/comment/list',
    method: 'get',
    params: {
      page,
      start_time: s,
      end_time: e
    }
  })
const block = (id, show) =>
  request({
    url: '/comment/show',
    method: 'get',
    params: {
      id,
      show
    }
  })
export default {
  get,
  getComment,
  block
}
