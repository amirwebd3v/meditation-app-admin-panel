import {defineStore} from 'pinia'
import {api} from '~/composables/api'
import type {Course} from "~/server/types";
import type {PaginatorMeta, QueryParams} from "l5-client";

export const useVideoStore = defineStore('video', {
    state: () => ({
        items: [] as Course[],
        meta: {} as PaginatorMeta
    }),
    actions: {
        async paginate(queryParam: QueryParams) {
            const {data, meta} = await api.paginate<Course>('course-video', queryParam)
            this.items = data
            this.meta = meta
        },
    },
})