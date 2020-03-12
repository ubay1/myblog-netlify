export default{
  auth_request : (state) => {
    state.status = 'loading'
  },
  auth_success: (state, userData) => {
    state.status = 'success'
    state.userData = userData,
    state.accessToken = true
  },
  auth_error : (state) => {
    state.status = 'error'
  },
  logout : (state) => {
    state.accessToken = false
    state.status = ''
    state.userData = ''
  },
  cek_auth: (state) => {
    state.accessToken
  }
}
