import {defineStore} from 'pinia'
import useApi from '~/composables/api'
import type {Course} from "~/server/types";
import type {PaginatorMeta, QueryParams} from "l5-client";

export const useVideoStore = defineStore('video', {
    state: () => ({
        items: [] as Course[],
        meta: {} as PaginatorMeta
    }),
    actions: {
        async paginate(queryParam: QueryParams) {
            const {data, meta} = await useApi().paginate<Course>('/admin/v1/course-video', queryParam)
            this.items = data
            this.meta = meta
        },
        async get(id: string): Promise<Course> {
            return (await useApi().get<{ data: Course }>(`/admin/v1/course/${id}`)).data.data
        },
    },
})