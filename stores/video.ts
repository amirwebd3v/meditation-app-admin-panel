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
            this.items.clear()
            const {data, meta} = await useApi().paginate<Course>('/admin/v1/course-video', queryParam)
            data.forEach(entity => this.items.set(entity.uuid, entity))
            this.meta = meta
        },
        async get(id: string): Promise<Course> {
            return (await useApi().get<{ data: Course }>(`/admin/v1/course/${id}`)).data.data
        },
    },
})