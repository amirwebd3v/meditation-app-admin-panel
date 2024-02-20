import {defineStore} from 'pinia'
import useApi from '~/composables/api'
import type {Preview} from "~/utils/types";

export const useMediaStore = defineStore('media', {
    state: () => ({
        files: new Map<string, Preview>(),
    }),
    actions: {
        async upload(files: File[]) {
            let body = new FormData()
            files.forEach((file) => body.append('files[]', file))
            const {data} = await useApi().post('/admin/v1/media', {body: body})
            data.forEach((preview: Preview) => this.files.set(preview.file_id, preview))
        }
    },
})