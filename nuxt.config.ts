export default defineNuxtConfig({

    ssr: false,

    typescript: {
        shim: false
    },

    build: {
        transpile: ['vuetify']
    },

    modules: [
        'nuxt-sanctum-auth',
        '@pinia/nuxt',
    ],

    pinia: {
        storesDirs: ['./stores/**'],
    },

    routeRules: {
        '/account/**': {ssr: false},
        '/auth/**': {ssr: false}
    },

    nuxtSanctumAuth: {
        token: false, // set true to use jwt-token auth instead of cookie. default is false
        baseUrl: 'http://localhost:3000',
        endpoints: {
            csrf: '/sanctum/csrf-cookie',
            login: '/auth/login',
            logout: '/auth/logout',
            user: '/auth/me',
        },
        csrf: {
            headerKey: 'X-XSRF-TOKEN',
            cookieKey: 'XSRF-TOKEN',
            tokenCookieKey: 'nuxt-sanctum-auth-token'
        },
        redirects: {
            home: '/panel',
            login: '/auth/login',
            logout: '/auth/login'
        }
    },

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