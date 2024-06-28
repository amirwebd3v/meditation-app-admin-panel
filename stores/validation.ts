import {defineStore} from "pinia";
import type {Error} from "~/utils/types";

export const useValidationStore = defineStore('validation', {
    state: (): Error => ({
        status:  undefined,
        message: undefined,
        errors: {}
    }),
    getters: {
        //
    },
    actions: {
        setResponse(response: Response) {
            this.status = response.status
            this.message = response._data.message
            this.errors = response._data?.errors

            useEvent('errorMessage', this.message)
        },
        clearErrors() {
            this.errors = {}
        }
    }
})