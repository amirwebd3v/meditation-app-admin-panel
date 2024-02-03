import {defineStore} from 'pinia'
import {api} from '~/composables/api'
import type {Course} from "~/server/types";
import type {PaginatorMeta, QueryParams} from "l5-client";

export const useMeditationStore = defineStore('video', {
    state: () => ({
        items: [] as Course[],
        meta: {} as PaginatorMeta
    }),
    actions: {
        async paginate(queryParam: QueryParams) {
            const {data, meta} = await api.paginate<Course>('course-meditation', queryParam)
            this.items = data
            this.meta = meta
        },
    },
})