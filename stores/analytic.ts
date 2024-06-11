import {defineStore} from 'pinia';
import type {Analytic} from "~/utils/types";
import {CourseType} from "~/utils/enums";
import type {PaginatorMeta, QueryParams} from "l5-client";


export const useAnalyticStore = defineStore('analytic', {
    state: () => ({
        meditationAnalytics: new Map<string, Analytic>(),
        videoAnalytics: new Map<string, Analytic>(),
        meditationMeta: {} as PaginatorMeta,
        videoMeta: {} as PaginatorMeta
    }),
    actions: {
        async fetch(courseType: CourseType, queryParam: QueryParams) {
            try {
                const {
                    data,
                    meta
                } = await useApi().paginate<Analytic>(`/admin/v1/analytics/sell-count/${courseType}`, queryParam);

                let analyticsMap: Map<string, Analytic> = new Map();
                data.forEach((entity) => analyticsMap.set(entity._entity, entity));

                switch (courseType) {
                    case CourseType.Meditation:
                        this.meditationAnalytics = analyticsMap
                        this.meditationMeta = meta
                        break
                    case CourseType.Video:
                        this.videoAnalytics = analyticsMap
                        this.videoMeta = meta
                        break
                    default:
                        break
                }
            } catch (error) {
                console.error('Error fetching analytics:', error);
            }
        },

    },

})