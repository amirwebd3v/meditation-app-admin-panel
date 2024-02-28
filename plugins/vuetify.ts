import {createVuetify} from "vuetify";
import type {ThemeDefinition} from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as labsComponents from 'vuetify/labs/components'
import * as directives from "vuetify/directives";



const LightTheme: ThemeDefinition = {
    colors: {
        background: '#3F3432',
        transparent: 'rgba(63,52,50,0)',
        white: '#FFFFFF',
        blue: '#0164d3',
        info: '#ECFCF3',
        success: '#1B8960',
        warning: '#fec500',
        primary: '#96AE50',
        accent: '#7C6346',
        light: '#514442',
        dark: '#08232d',
        error: '#ff6a5b',
        muted: '#8d97ad',
        green: '#439691',
        'light-blue': '#5b6987',
        'light-blue-1': '#2d6adf',
        'light-brown-1': '#514442',
        'gray-100': '#e5e7ec',
        'gray-200': '#e4e4e4',
        'gray-300': '#c4c8ce',
        'gray-400': '#c6cbd6',
        'gray-500': '#8d97ad',
        'gray-600': '#3e4555',
        'orange': '#ff6a5b',
        'danger-dark': '#a23131',
        'success-dark': '#1dc8cc',
        'warning-dark': '#dcaf17',
        'primary-light': '#514442',
        'primary-dark': '#345bcb',
        'info-dark': '#2c73cb',
        'red-dark': '#d61f1f',
        'red-light': 'rgba(214,31,31,0.47)',
        'inverse-dark': '#232a37',
        'dark-blue': '#3252a2',
        // ==================================== //
        // Lighten Colors
        // ==================================== //
        'success-lighten-5': '#e1f3e5',
        'success-lighten-4': '#d6f7dd',
        'info-lighten-5': '#e5f4fb',
        'warning-lighten-5': '#fdf6e3',
        'error-lighten-5': '#fce2e5',
        'primary-lighten-5': '#e6edfd',
        'accent-lighten-5': '#f4e6fd',

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
            themes: {
                light: LightTheme,
            },
        },
    });
    nuxtApp.vueApp.use(vuetify);

});
