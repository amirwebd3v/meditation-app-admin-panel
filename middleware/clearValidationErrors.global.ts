import {useValidationStore} from "~/stores/validation";

export default defineNuxtRouteMiddleware((to, from) => {
    useValidationStore().clearErrors()
})