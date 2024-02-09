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

    runtimeConfig: {
        public: {},
    },

    appConfig: {
        api: {
            baseUrl: process.env.API_BASE_URL,
            headers: {
                Accept: "application/json"
            }
        },
    },

    pinia: {
        storesDirs: ['./stores/**'],
    },

    routeRules: {
        '/account/**': {ssr: false},
        '/auth/**': {ssr: false}
    },

    sanctum: {
        baseUrl: process.env.API_BASE_URL, // Laravel API
        origin: process.env.APP_URL, // Nuxt app (required for CSRF cookie), by default uses `useRequestURL().origin`
        userStateKey: 'sanctum.user.identity', // user state key for Vue `useState` composable
        redirectIfAuthenticated: false, // Redirect to onLogin if already authenticated
        endpoints: {
            csrf: '/sanctum/csrf-cookie', // CSRF cookie endpoint
            login: '/admin/auth/login', // Endpoint that accepts user credentials
            logout: '/admin/auth/logout', // Endpoint to destroy the current session
            user: '/admin/auth/me', // Endpoint that return current user information
        },
        csrf: {
            cookie: 'XSRF-TOKEN', // CSRF cookie name
            header: 'X-XSRF-TOKEN', // CSRF header name
        },
        client: {
            retry: false, // ofetch retry option (number | false)
        },
        redirect: {
            keepRequestedRoute: true, // Keep requested route in the URL for later redirect
            onLogin: '/panel', // Redirect to this page after successful login
            onLogout: '/auth/login', // Redirect to this page after successful logout
            onAuthOnly: '/auth/login', // Redirect to this page if user is not authenticated
            onGuestOnly: '/panel', // Redirect to this page if user is authenticated
        },
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