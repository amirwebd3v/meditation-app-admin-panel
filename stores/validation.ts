import {defineStore} from "pinia";

export const useValidationStore = defineStore('validation', {
    state: () => ({
        errors: []
    }),
    getters: {
        doubleCount: (state) => state.errors,
    },
    actions: {
        setErrors(errors: []) {
            this.errors = errors
        },
        clearErrors() {
            this.errors = []
        }
    }
})