import request from '../utils/request'

const setUT = data =>
  request({
    url: 'user-tag/add',
    method: 'post',
    data
  })
const setAT = data =>
  request({
    url: '/activity-tag/add',
    method: 'post',
    data
  })
const getAT = () =>
  request({
    url: '/activity-tag/all',
    method: 'get'
  })

const getUT = () =>
  request({
    url: '/user-tag/all',
    method: 'get'
  })
const getATS = () =>
  request({
    url: '/activity/activity-tags',
    method: 'get'
  })
export default {
  UT: {
    get: getUT,
    set: setUT
  },
  AT: {
    get: getAT,
    set: setAT
  },
  store: {
    AT: {
      get: getATS
    }
  },
  admin: {
    AT: {
      get: getAT,
      set: setAT
    }
  }
}
