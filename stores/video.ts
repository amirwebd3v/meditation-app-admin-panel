import {defineStore} from 'pinia'
import api from '@/composables/api'
import type {Paginator, QueryParams} from "l5-client/src/types";
import type {Course} from "@/server/types";

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