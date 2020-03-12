const path = require("path");

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
        href: '/favicon.ico'
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
  ],
  plugins: [{
      src: './plugins/fontawesome.js'
    },
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

  }
}
