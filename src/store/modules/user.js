import { loginByPhone, logout, getUserInfo } from '../../api/login'
import api from '../../api/activity'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'

// const userMap = {
//   admin: {
//     role: ['admin'],
//     token: 'admin',
//     introduction: '我是超级管理员',

//     name: 'Super Admin'
//   },
//   editor: {
//     role: ['editor'],
//     token: 'editor',
//     introduction: '我是编辑',
//     avatar:
//       'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'Normal Editor'
//   }
// }
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: '',
    roles: Cookies.get('role'),
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    async LoginByPhone({ commit }, userInfo) {
      const res = await loginByPhone(userInfo.phone, userInfo.password)
      return new Promise((resolve, reject) => {
        if (res.code === 0) {
          setToken(true)
          const role = Cookies.get('role')
          commit('SET_ROLES', role)
          resolve()
        } else {
          reject()
        }
      })
      // return new Promise((resolve, reject) => {
      //   loginByUsername(username, userInfo.password)
      //     .then(response => {
      //       const data = response.data
      //       commit('SET_TOKEN', data.token)
      //       setToken(response.data.token)
      //       resolve()
      //     })
      //     .catch(error => {
      //       reject(error)
      //     })
      // })
    },

    // 获取用户信息
    async GetUserInfo({ commit, state }) {
      const role = Cookies.get('role')
      let res
      console.log('role', role)
      if (role === 'store') {
        res = await getUserInfo()
        console.log('res', res)
      } else if (role === 'admin') {
        res = await api.getActivityList()
      } else {
        res.code === -1
      }
      return new Promise((resolve, reject) => {
        // commit('SET_NAME', data.name)
        // commit('SET_AVATAR', data.avatar)
        // commit('SET_INTRODUCTION', data.introduction)
        if (res.code !== 0) {
          reject()
        } else {
          commit('SET_ROLES', role)
          console.log('rolehere', role)
          setToken(true)
        }
        resolve({ role })
        console.log('resolve!!!!')
        // getUserInfo(state.token)
        //   .then(response => {
        //     if (!response.data) {
        //       // 由于mockjs 不支持自定义状态码只能这样hack
        //       reject('error')
        //     }
        //     const data = response.data
        //     commit('SET_ROLES', data.role)
        //     commit('SET_NAME', data.name)
        //     commit('SET_AVATAR', data.avatar)
        //     commit('SET_INTRODUCTION', data.introduction)
        //     resolve(response)
        //   })
        //   .catch(error => {
        //     reject(error)
        //   })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }

    // 动态修改权限
    // ChangeRole({ commit }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role)
    //     setToken(role)
    //     getUserInfo(role).then(response => {
    //       const data = response.data
    //       commit('SET_ROLES', data.role)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       resolve()
    //     })
    //   })
    // }
  }
}

export default user
