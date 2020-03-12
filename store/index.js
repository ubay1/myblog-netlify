import { getData, setData } from 'nuxt-storage/local-storage';

export const stores = {
	state: {
		accessToken: null,
    status: '',
    userData: getData("data") || '',
	},
	getters: {
		isLoggedIn: state => !!state.userData,
		authStatus: state => state.status,
		userData: state => state.userData,
	},
	mutations: {
		auth_request : (state) => {
			state.status = 'loading'
		},
		auth_success(state, userData) {
			state.status = 'success'
			state.userData = userData
		},
		auth_error : (state) => {
			state.status = 'error'
		},
		logout : (state) => {
			state.status = ''
			state.userData = ''
		}
	},
	actions: {
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
            localStorage.setItem('data', JSON.stringify(userData))
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            commit('auth_success', userData)
            resolve()
            break;
          case false:
            commit('auth_error')
            localStorage.removeItem('data')
            reject(data.message)
            break;
          default:
            break;
        }
      })
    },
    logout : ({commit}) => {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('data')
        delete axios.defaults.headers.common['Authorization']
        commit('logout')
        resolve()
      })
    }
	}
}
