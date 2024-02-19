import {defineStore} from 'pinia'
import useApi from '~/composables/api'
import type {Preview} from "~/utils/types";

export const useMediaStore = defineStore('media', {
    state: () => ({
        files: [] as Preview[],
    }),
    actions: {
        // async upload(...files: []) {
        //     let body = new FormData()
        //     files.forEach((file) => body.append('file', file))
        //
        //     const {data} = useApi().post('/admin/v1/media', {body})
        //     this.files.push(...data)
        // }
    },
})