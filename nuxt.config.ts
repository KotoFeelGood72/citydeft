// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/_mixins.scss" as *;
            @use "~/assets/scss/_variables.scss" as *;
            `,
          api: "modern",
        },
      },
    },
  },

  modules: ["@nuxt/image", "@pinia/nuxt"],
  image: {
    quality: 70,
    dir: "assets/img",
  },
});

// export default {
//   // Global page headers: https://go.nuxtjs.dev/config-head
//   head: {
//     title: 'city-deft',
//     htmlAttrs: {
//       lang: 'ru'
//     },
//     meta: [
//       { charset: 'utf-8' },
//       { name: 'viewport', content: 'width=device-width, initial-scale=1' },
//       { hid: 'description', name: 'description', content: '' },
//       { name: 'format-detection', content: 'telephone=no' },
//       { name: 'yandex-verification', content: '787bf9ec3295557e' }

//     ],
//     link: [
//       { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
//     ]
//   },
//   // Global CSS: https://go.nuxtjs.dev/config-css
//   css: [
//     '@/assets/css/style.scss'
//   ],
//   styleResources: {
//     scss: [
//       '~/assets/css/style.scss',
//     ],
//   },

//   axios: {
//     baseURL: "https://api.citydeft.com/",
//     proxy: true
//   },
//   server: {
//     host: '127.0.0.1', // Прослушивает все сетевые интерфейсы
//     port: 3000 // Или любой другой порт, который вы предпочитаете
//   },

//   proxy: {
//     '/api/': {
//       target: "https://api.citydeft.com/",
//       pathRewrite: {'^/api/': ''}
//     }
//   },

//   // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
//   plugins: [
//     { src: '@/plugins/vue-js-paginate.js', ssr: false },
//     { src: '@/plugins/fancybox.js', ssr: false },
//     { src: '@/plugins/persistedState.js', ssr: false },
//   ],

//   // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
//   buildModules: [
//   ],

//   // Modules: https://go.nuxtjs.dev/config-modules
//   modules: [
//     '@nuxtjs/style-resources',
//     '@nuxtjs/axios',
//     '@nuxt/image',
//     '@nuxtjs/gtm',
//     'vue-social-sharing/nuxt',
//     ["vue-toastification/nuxt", {
//       timeout: 2000,
//       draggable: false
//     }]
//   ],

//   gtm: {
//     enabled: true, /* see below */
//     debug: false,

//     id: 'G-84P4TJXCGR',
//     layer: 'dataLayer',
//     variables: {},

//     pageTracking: false,
//     pageViewEventName: 'nuxtRoute',

//     autoInit: true,
//     respectDoNotTrack: true,

//     scriptId: 'gtm-script',
//     scriptDefer: false,
//     scriptURL: 'https://www.googletagmanager.com/gtm.js',
//     crossOrigin: false,

//     noscript: true,
//     noscriptId: 'gtm-noscript',
//     noscriptURL: 'https://www.googletagmanager.com/ns.html'
//   },

//   image: {
//     quality: 70,
//     dir: 'assets/img'
//   },

//   router: {
//     middleware: ['close-menu']
//   }
// }
