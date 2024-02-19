import {defineStore} from 'pinia'
import useApi from '~/composables/api'
import type {Course} from "~/utils/types";
import type {PaginatorMeta, QueryParams} from "l5-client";

export const useVideoStore = defineStore('video', {
    state: () => ({
        items: new Map<string, Course>(),
        meta: {} as PaginatorMeta
    }),

    actions: {
        async paginate(queryParam: QueryParams) {
            const map = new Map<string, Course>()
            const {data, meta} = await useApi().paginate<Course>('/admin/v1/course-video', queryParam)
            data.forEach(entity => map.set(entity.uuid, entity))
            this.items = map
            this.meta = meta
        },
        async get(id: string): Promise<Course> {
            return (await useApi().get(`/admin/v1/course/${id}`)).data
        },
    },
})