import {defineStore} from 'pinia'
import useApi from '~/composables/api'
import type {Course} from "~/server/types";
import type {PaginatorMeta, QueryParams} from "l5-client";

export const useMeditationStore = defineStore('meditation', {
    state: () => ({
        items: [] as Course[],
        meta: {} as PaginatorMeta
    }),
    actions: {
        async paginate(queryParam: QueryParams) {
            const {data, meta} = await useApi().client.paginate<Course>('v1/course-meditation', queryParam)
            this.items = data
            this.meta = meta
        },
    },
})