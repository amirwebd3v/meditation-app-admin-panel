import {defineStore} from 'pinia'
import useApi from '~/composables/api'
import type {Course, Lesson} from "~/utils/types";
import type {PaginatorMeta, QueryParams} from "l5-client";
import type {LessonStoreRequest, LessonUpdateRequest} from "~/utils/requests";
import {v} from "~/.output/public/_nuxt/entry.EgzYus8n";

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

        async show(courseId: Course['uuid']): Promise<Lesson> {
            const { data } = await useApi().get<Lesson>(
                `/admin/v1/course/${courseId}/lesson`);
            this.items = new Map(data.map((entity) => [entity.uuid, entity]));
            const lessonId = Array.from(this.items.keys()).toString()
            return await useApi().get(`/admin/v1/lesson/${lessonId}`)
        },

        async store(request: LessonStoreRequest): Promise<Lesson> {
            return await useApi().post(`/admin/v1/lesson`, {body: request})
        },

        async update(request: LessonUpdateRequest) {
            const {id, ...body} = request
            const data = await useApi().put(`/admin/v1/lesson/${id}`, {body})
            this.items.set(data.uuid, data)
        },

        async destroy(id:string) {
            await useApi().destroy(`/admin/v1/lesson/${id}`);
        },
    },
});