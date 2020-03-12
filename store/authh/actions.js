// import { getData, setData } from 'nuxt-storage/local-storage';
// import axios from 'axios'
import VuexPersistence from 'vuex-persist'

export default{

  login : ({commit}, data) => {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      switch (data.success) {
        case true:
          const userData = {
            token: data.token,
            user: data.user
          }
          const token = data.token
          // setData('data', userData)
          // axios.defaults.baseURL.common['Authorization'] = 'Bearer ' + token
          commit('auth_success', userData)
          resolve()
          break;
        case false:
          commit('auth_error')
          // localStorage.removeItem('data')
          reject(data.message)
          break;
        default:
          break;
      }
    })
  },

  logout : ({commit}) => {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('vuex')
      commit('logout')
      resolve()
    })
  }
}
