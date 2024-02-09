import {defineStore} from 'pinia';
import type {User} from "~/server/types";
const { login } = useSanctumAuth();


export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: [] as User[],
        isAuthenticated: false,
    }),
    actions: {
        async login({email, password}: User) {
            try {
                const {data} = await login({email, password})
                    this.user =  data
                }

                this.isAuthenticated = true;



                return response;
            } catch (error) {
                throw new Error(`Login failed: ${error}`);
            }
        },
    })