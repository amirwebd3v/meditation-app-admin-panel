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
            const {data, meta} = await useApi().paginate<Course>('/admin/v1/course-meditation', queryParam)
            this.items = data
            this.meta = meta
        },
        async store(course: Course) {
            const {data} = await useApi().post('/admin/v1/course', {body: course})
            this.items.push(data)
        },
        async get(id: string): Promise<Course> {
            return (await useApi().get(`/admin/v1/course/${id}`)).data
        },
        // async update(courseId: string,updatedCourse: Course) {
        //     const {data} = await useApi().put<Course>(`/admin/v1/course/${courseId}`,updatedCourse)
        //     const index = this.items.findIndex(item => item.uuid === courseId)
        //     if (index !== -1) {
        //         this.items[index] = data
        //     }
        // },
    },
})