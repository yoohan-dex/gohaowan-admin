import request from '../utils/request'

function addActivity(form) {
  const data = { ...form }
  // data.join_form = JSON.stringify(form.join_form)
  return request({
    url: '/activity/add',
    method: 'post',
    data
  })
}

function getActivityList(page) {
  return request({
    url: '/activity/list',
    method: 'get',
    params: {
      page
    }
  })
}
function getDetail(id) {
  return request({
    url: '/activity/detail',
    method: 'get',
    params: { id }
  })
}
function editDetail(data) {
  return request({
    url: '/activity/edit',
    method: 'post',
    data
  })
}
function block(data) {
  return request({
    url: '/activity/show',
    method: 'get',
    params: data
  })
}
export default {
  addActivity,
  getActivityList,
  getDetail,
  editDetail,
  block
}
