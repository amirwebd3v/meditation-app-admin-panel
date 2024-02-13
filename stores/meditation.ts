import {defineStore} from 'pinia'
import useApi from '~/composables/api'
import type {Course} from "~/server/types";
import type {PaginatorMeta, QueryParams} from "l5-client";
import type {FetchRequest} from "ofetch";




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
        async store(course: Course) {
            // const request: FetchRequest = {
            //     url: 'v1/course',
            //     method: 'POST',
            //     body: <any>course,
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // };
            const client = useSanctumClient()

            const { data } = await client('/admin/v1/course',{
                method : 'POST',
                body : course
            });
            this.items.push(data);
        },
        async get(id: string): Promise<Course> {
            return (await useApi().client.get<{ data: Course }>(`v1/course/${id}`)).data.data
        },
        // async update(courseId: string,updatedCourse: Course) {
        //     const {data} = await useApi().client.put<Course>(`v1/course/${courseId}`,updatedCourse)
        //     const index = this.items.findIndex(item => item.uuid === courseId)
        //     if (index !== -1) {
        //         this.items[index] = data
        //     }
        // },
    },
})