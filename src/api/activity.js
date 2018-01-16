import request from '../utils/request'

const addActivity = form => {
  const data = { ...form }
  return request({
    url: '/activity/add',
    method: 'post',
    data
  })
}

const getActivityList = page => {
  return request({
    url: '/activity/list',
    method: 'get',
    params: {
      page
    }
  })
}

const getDetail = id => {
  return request({
    url: '/activity/detail',
    method: 'get',
    params: { id }
  })
}
const editDetail = data => {
  return request({
    url: '/activity/edit',
    method: 'post',
    data
  })
}
const block = data => {
  return request({
    url: '/activity/show',
    method: 'post',
    data
  })
}

const verify = id =>
  request({
    url: '/activity/verify',
    method: 'get',
    params: {
      id
    }
  })

const cancel = id =>
  request({
    url: '/activity/cancel-join',
    method: 'get',
    params: {
      id
    }
  })

const simple = id =>
  request({
    url: '/activity/activity-outline',
    method: 'get',
    params: {
      id
    }
  })
const getJoin = (id, page) =>
  request({
    url: '/activity/join-list',
    method: 'get',
    params: {
      id,
      page
    }
  })
export default {
  addActivity,
  getActivityList,
  getDetail,
  editDetail,
  block,
  verify,
  cancel,
  simple,
  getJoin
}
