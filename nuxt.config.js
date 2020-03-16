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
    color: '#fff'
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    { src: "swiper/dist/css/swiper.css" }
  ],
  plugins: [{
      src: './plugins/fontawesome.js'
    },
    { src: "./plugins/vue-swiper.js", ssr: false },
    {
      src: './plugins/imageprogressive.js',
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
    // '@nuxtjs/auth',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
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
  ],
  axios: {
    baseURL: process.env.DEV_API
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
		name: 'Lelango',
		short_name: 'Lelango',
		lang: 'en',
		display: 'standalone',
		theme_color: "#00aeef",
		icons:[
			{
				"src": "/img/icon/android-icon-36x36.png",
				"sizes": "36x36",
				"type": "image/png",
				"density": "0.75"
			},
			{
				"src": "/img/icon/android-icon-48x48.png",
				"sizes": "48x48",
				"type": "image/png",
				"density": "1.0"
			},
			{
				"src": "/img/icon/android-icon-72x72.png",
				"sizes": "72x72",
				"type": "image/png",
				"density": "1.5"
			},
			{
				"src": "/img/icon/android-icon-96x96.png",
				"sizes": "96x96",
				"type": "image/png",
				"density": "2.0"
			},
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
