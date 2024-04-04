export default defineNuxtRouteMiddleware((to, from) => {
    useValidationStore().clearErrors()
})