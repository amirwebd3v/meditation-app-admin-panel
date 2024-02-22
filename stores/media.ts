import {defineStore} from 'pinia'
import useApi from '~/composables/api'
import type {Preview} from "~/utils/types";

export const useMediaStore = defineStore('media', {
    actions: {
        async upload(file: File): Promise<Preview> {
            let body = new FormData()
            body.append('files[]', file)
            const {data} = await useApi().post('/admin/v1/media', {body: body})
            return data[0]
        },
        async uploads(files: File[]): Promise<Array<Preview>> {
            let body = new FormData()
            files.forEach((file) => body.append('files[]', file))
            const {data} = await useApi().post('/admin/v1/media', {body: body})
            return data
        },

    },
})