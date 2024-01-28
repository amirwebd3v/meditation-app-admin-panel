import {defineStore} from 'pinia'
import {api} from '~/composables/api'
import type {Course} from "~/server/types";
import type {Paginator, QueryParams} from "l5-client";

export const useVideoStore = defineStore('video', {
    state: () => ({
        videos: null as Paginator<Course> | null,
    }),
    actions: {
        async paginate(queryParam: QueryParams) {
            this.videos = await api.paginate<Course>('course-video', queryParam)
        },
    },
})