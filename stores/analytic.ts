import { defineStore } from 'pinia';
import type { Analytic } from "~/utils/types";
import { CourseType } from "~/utils/enums";
import type { PaginatorMeta, QueryParams } from "l5-client";

export const useAnalyticStore = defineStore('analytic', {
    state: () => ({
        meditationAnalytics: new Map<string, Analytic>(),
        videosAnalytics: new Map<string, Analytic>(),
        meditationMeta: {} as PaginatorMeta,
        videosMeta: {} as PaginatorMeta,
        meditationTotalSum: 0,
        videosTotalSum: 0,
    }),
    actions: {
        async fetch(courseType: CourseType,queryParam: QueryParams) {

            try {
                const {
                    data,
                    meta
                } = await useApi().paginate<Analytic>(`/admin/v1/analytics/sell-count/course-${courseType.toLowerCase()}`,queryParam);
                const analyticsMap: Map<string, Analytic> = new Map(data.map(entity => [entity.course.uuid, entity]));
                switch (courseType) {
                    case CourseType.Meditation:
                        this.meditationAnalytics = new Map(analyticsMap);
                        this.meditationMeta = meta;
                        this.meditationTotalSum = parseFloat(data.reduce((sum, entity) =>
                            sum + entity.total, 0).toFixed(2));
                        break;
                    case CourseType.Video:
                        this.videosAnalytics = new Map(analyticsMap);
                        this.videosMeta = meta;
                        this.videosTotalSum = parseFloat(data.reduce((sum, entity) =>
                            sum + entity.total, 0).toFixed(2));
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error('Error fetching analytics:', error);
            }
        },
    },
})