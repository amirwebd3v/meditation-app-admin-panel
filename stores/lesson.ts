import {defineStore} from 'pinia'
import useApi from '~/composables/api'
import type {Lesson} from "~/utils/types";
import type {PaginatorMeta, QueryParams} from "l5-client";

export const useLessonStore = defineStore('lesson', {
    state: () => ({
        items: new Map<string, Lesson>(),
        meta: {} as PaginatorMeta
    }),
    actions: {
        async paginate(courseId: string,queryParam: QueryParams) {
            // this.items.clear()
            const {data, meta} = await useApi().paginate<Lesson>(`/admin/v1/course/${courseId}/lesson`, queryParam)
            data.forEach(entity => this.items.set(entity.uuid, entity))
            this.meta = meta
        },
    },
})
