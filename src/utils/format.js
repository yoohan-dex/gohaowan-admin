import moment from 'moment'

const formatTime = time => moment(time * 1000).format('YYYY-MM-DD')
const formatCommonTime = time => new Date(time * 1000)
const formatTimeWithM = time => moment(time * 1000).format('YYYY-MM-DD HH:MM')
export default {
  formatTime,
  formatCommonTime,
  formatTimeWithM
}
