import {defineStore} from 'pinia'
import useApi from '~/composables/api'
import type {Course, Lesson} from "~/utils/types";
import type {PaginatorMeta, QueryParams} from "l5-client";

export const useLessonStore = defineStore('lesson', {
    state: () => ({
        items: new Map<string, Lesson>(),
        meta: {} as PaginatorMeta
    }),
    actions: {
        async paginate(courseId: Course['uuid'], queryParam: QueryParams) {
            try {
                const { data, meta } = await useApi().paginate<Lesson>(
                    `/admin/v1/course/${courseId}/lesson`,
                    queryParam
                );
                this.items = new Map(data.map((entity) => [entity.uuid, entity]));
                this.meta = meta;
            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        },
    },
});