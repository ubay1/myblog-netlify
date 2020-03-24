
export default function ({$axios, store, redirect}) {

  $axios.onRequest(config => {
    config.timeout = 20000
    console.log('Membuat request ke ' + config.url) // displays in console
  })

  $axios.onResponse(response => {
    console.log(response.status, 'Axios response')
    const newtoken = response.headers.authorization
    if (newtoken) {
      $axios.setToken(newtoken)
      console.log('New Token Generated')
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    console.log(code, 'Axios onError') // displays in console
    if (code === 408) {
      console.log(`A time happend on url onError`) // I have never seen
    }
    if (code === 400) {
      redirect('/400')
    }
    if (code === 401) {
      // store.dispatch('authh/logout')
      redirect('/login')
    }
  })

  $axios.onRequestError(error => {
    const code = parseInt(error.response && error.response.status)
    console.log(code, 'Axios onRequestError') // displays in console
    if (code === 408) {
      console.log(`A time happend on url onRequestError`) // I have never seen
    }
    if (code === 400) {
      redirect('/400')
    }
    if (code === 401) {
      redirect('/login')
    }
    if (code === 428) {
      redirect('/registration/resend')
    }
  })

  $axios.onResponseError(error => {
    const code = parseInt(error.response && error.response.status)
    console.log(code, 'Axios onResponseError') // displays in console
    if (code === 408) {
      console.log(`A time happend on url onResponseError`) // I have never seen
    }
    if (code === 400) {
      // redirect('/400')
      console.log('error 400')
    }
    if (code === 401) {
      // redirect('/login')
      console.log('error 401')
    }
    if (code === 428) {
      // redirect('/registration/resend')
      console.log('error 428')
    }
  })
}
