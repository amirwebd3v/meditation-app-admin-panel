export default defineNuxtConfig({

  ssr: false,

  typescript: {
    shim: false
  },

  build: {
    transpile: ['vuetify']
  },

  modules: [

  ],


  nitro: {
    prerender: {
      routes: []
    }
  },

  vite: {
    define: {
      'process.env.DEBUG': false
    },
  },


})