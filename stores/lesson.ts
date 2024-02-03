import {defineStore} from 'pinia'
import {api} from '~/composables/api'
import type {Lesson} from "~/server/types";
import type {PaginatorMeta, QueryParams} from "l5-client";

export const useLessonStore = defineStore('lesson', {
    state: () => ({
        items: [] as Lesson[],
        meta: {} as PaginatorMeta
    }),
    actions: {
        async paginate(courseId: String,queryParam: QueryParams) {
            const {data, meta} = await api.paginate<Lesson>(`course/${courseId}/lesson`, queryParam)
            this.items = data
            this.meta = meta
        },
    },
})