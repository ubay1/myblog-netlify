const path = require("path");
import webpack from 'webpack'

export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/logo.ico'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css'
      }
    ],
  },
  loading: {
    color: '#f6e05e',
    height: '3px'
  },
  router: {
    linkActiveClass: "active-link",
    linkExactActiveClass: "exact-active-link"
  },
  generate: {
    fallback: true
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    { src: "swiper/dist/css/swiper.css" }
  ],
  plugins: [{
      src: './plugins/fontawesome.js'
    },
    {
      src: './plugins/axios.js'
    },
    { src: "./plugins/vue-swiper.js", ssr: false },
    {
      src: './plugins/imageprogressive.js',
      ssr: false
    },
    {
      src: './plugins/vue-sweetalert.js',
      ssr: false
    },
    {
      src: './plugins/vue-modal.js',
      ssr: false
    },
    {
      src: './plugins/vue-await.js',
      ssr: false
    },
    {
      src: './plugins/v-lazy.js',
      ssr: false
    },
    {
      src: './plugins/mixins/user.js'
    },
    {
      src: './plugins/vue-carousel.js',
      ssr: false
    },
    {
      src: './plugins/vue-infinite.js',
      ssr: false
    },
    {
      src: './plugins/vue-lodash.js',
    },
    {
      src: './plugins/mixins/validation.js'
    },
    {
      src: './plugins/vuexpersist.js',
      ssr: false
    }

  ],
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'vue-sweetalert2/nuxt',
    'nuxt-fontawesome',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        //import whole set
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
        //import 2 icons from set
        // please note this is PRO set in this example,
        // you must have it in your node_modules to actually import
        {
          set: '@fortawesome/pro-regular-svg-icons',
          icons: ['faAdjust', 'faArchive']
        }
      ]
    }],
    '@nuxtjs/toast',
    'vue-wait/nuxt',
    ['@nuxtjs/firebase',
    {
      config: {
        apiKey: "AIzaSyD5jkeIkI5zMiCsvvqojsCmbBmpJ7L2UTE",
        authDomain: "lelango-5e5de.firebaseapp.com",
        databaseURL: "https://lelango-5e5de.firebaseio.com",
        projectId: "lelango-5e5de",
        storageBucket: "lelango-5e5de.appspot.com",
        messagingSenderId: "665502983297",
        appId: "1:665502983297:web:b48761b4791969cd2bd980",
        measurementId: "G-DFKXG10089",
        fcmPublicVapidKey:'BF6c94Hz3yRs-0h3Qxw33wG68q2wZAaCq5tFPEblNChQNAg9ZJlqCxflmtNqLADwB9vwrjsndYI3QKCmwiEPNnY'
      },
      services: {
        messaging: {
          createServiceWorker: true
        }// Just as example. Can be any other service.
      }
    }]
  ],
  axios: {
    // baseURL: process.env.DEV_API,
    // proxyHeaders: false,
    credentials: false
  },
  proxy: {
    '/api/': { target: 'https://dev.lenna.ai/lelango-backend/public', pathRewrite: {'^/api/': ''} }
  },
  auth: {},
  build: {
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     // global modules
    //     // '$': 'jquery',
    //     '_': 'lodash'
    //   })
    // ],
    extend(config, ctx) {
      // config.module.rules.push({
      //   test: /\.md$/,
      //   include: path.resolve(__dirname, "content"),
      //   loader: "frontmatter-markdown-loader",
      //   options: {
      //     mode: [Mode.VUE_COMPONENT, Mode.META]
      //   }
      // });
    },

  },
  manifest: {
    name: 'Lelango Lite',
    gcm_sender_id : '665502983297',
		short_name: 'Lelango Lite',
		lang: 'en',
		display: 'standalone',
		theme_color: "#00aeef",
		icons:[
			{
				"src": "/img/icon/android-icon-144x144.png",
				"sizes": "144x144",
				"type": "image/png",
				"density": "3.0"
			},
			{
				"src": "/img/icon/android-icon-192x192.png",
				"sizes": "192x192",
				"type": "image/png",
				"density": "4.0"
			}
		]
	},
}
