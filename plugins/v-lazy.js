import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

// Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  preLoad: 40,
  error: 'img/404.png',
  loading: 'img/loading.gif',
  attempt: 20,
})
