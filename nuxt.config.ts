export default defineNuxtConfig({

    ssr: false,

    typescript: {
        shim: false
    },

    build: {
        transpile: ['vuetify']
    },

    modules: [
        'nuxt-auth-sanctum',
        '@pinia/nuxt',
    ],

    pinia: {
        storesDirs: ['./stores/**'],
    },

    routeRules: {
        '/account/**': {ssr: false},
        '/auth/**': {ssr: false}
    },



    sanctum: {
        redirectIfAuthenticated: false,
        userStateKey: 'sanctum.user.identity',
        origin: 'http://localhost:3000',
        baseUrl: 'https://omni-api.hidevs.ir',
        endpoints: {
            csrf: '/sanctum/csrf-cookie',
            login: '/auth/login',
            logout: '/auth/logout',
            user: '/auth/me',
        },
        csrf: {
            header: 'X-XSRF-TOKEN',
            cookie: 'XSRF-TOKEN',
        },
        redirect: {
            keepRequestedRoute: false,
            onGuestOnly: '/panel',
            onAuthOnly: '/auth/login',
            onLogin: '/auth/login',
            onLogout: '/auth/login'
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