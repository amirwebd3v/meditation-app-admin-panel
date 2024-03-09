import {defineStore} from 'pinia'
import useApi from '~/composables/api'
import type {Course} from "~/utils/types";
import type {PaginatorMeta, QueryParams} from "l5-client";
import type {CourseStoreRequest, CourseUpdateRequest} from "~/utils/requests";


export const useVideoStore = defineStore('video', {
    state: () => ({
        items: new Map<string, Course>(),
        meta: {} as PaginatorMeta
    }),

    actions: {
        async get(id: string): Promise<Course> {
            return (await useApi().get(`/admin/v1/course/${id}`)).data
        },
        async paginate(queryParam: QueryParams) {
            const map = new Map<string, Course>()
            const {data, meta} = await useApi().paginate<Course>('/admin/v1/course-video', queryParam)
            data.forEach(entity => map.set(entity.uuid, entity))
            this.items = map
            this.meta = meta
        },
        async store(request: CourseStoreRequest): Promise<Course> {
            return await useApi().post('/admin/v1/course', {body: request})
        },
        async update(request: CourseUpdateRequest) {
            const {id, ...body} = request
            const data = await useApi().put(`/admin/v1/course/${id}`, {body})
            this.items.set(data.uuid, data)
        },
        async destroy(id:string) {
            await useApi().destroy(`/admin/v1/course/${id}`);
        },
    },
})