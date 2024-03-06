import {createVuetify} from "vuetify";
import type {ThemeDefinition} from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as labsComponents from 'vuetify/labs/components'
import * as directives from "vuetify/directives";
import {VTextField} from "vuetify/components/VTextField";



const DarkTheme: ThemeDefinition = {
    colors: {
        background: '#3F3432',
        white: '#FFFFFF',
        info: '#ECFCF3',
        warning: '#fec500',
        primary: '#96AE50',
        accent: '#7C6346',
        light: '#514442',
        error: '#ff6a5b',
        green: '#439691',
        'light-brown-1': '#514442',
        'orange': '#ff6a5b',
        'danger-dark': '#a23131',
        'success-dark': '#1dc8cc',
        'warning-dark': '#dcaf17',
        'primary-light': '#514442',
    },
};


export default defineNuxtPlugin((nuxtApp) => {
    // Doing something with nuxtApp

    const vuetify = createVuetify({
        ssr: true,
        components:{
            ...components,
            ...labsComponents
        },
        directives,
        theme: {
            defaultTheme: 'dark',
            themes: {
                dark: DarkTheme,
            },
        },
        defaults: {
            VTextField: {
                rules: [
                    (v: string) => (v && v.length >= 3) || 'Minimum 3 characters',
                    (v: string) => (v && v.length <= 30) || 'Maximum 30 characters',
                ]
            }
        }
    })
    nuxtApp.vueApp.use(vuetify);

});
