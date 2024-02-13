import {defineStore} from 'pinia'
import useApi from '~/composables/api'
import type {Lesson} from "~/server/types";
import type {PaginatorMeta, QueryParams} from "l5-client";

export const useLessonStore = defineStore('lesson', {
    state: () => ({
        items: [] as Lesson[],
        meta: {} as PaginatorMeta
    }),
    actions: {
        async paginate(courseId: string,queryParam: QueryParams) {
            const {data, meta} = await useApi().paginate<Lesson>(`/admin/v1/course/${courseId}/lesson`, queryParam)
            this.items = data
            this.meta = meta
        },
    },
})