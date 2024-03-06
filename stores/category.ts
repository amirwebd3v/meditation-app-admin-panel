import {defineStore} from 'pinia'
import useApi from '~/composables/api'
import type {Category} from "~/utils/types";
import {CourseType} from "~/utils/enums";
import type {CategoryStoreRequest} from "~/utils/requests";


export const useCategoryStore = defineStore('category', {
    state: () => ({
        meditationCategories: new Map<number, Category>(),
        videoCategories: new Map<number, Category>(),
    }),
    actions: {
        async fetch() {
            let response = await useApi().paginate<Category>('/admin/v1/category', {
                sort: {created_at: 'desc'},
                pagination: {page: 1, perPage: -1},
                search: [{field: 'courses.type', value: CourseType.Meditation}]
            })
            response.data.forEach(c => this.meditationCategories.set(c.id, c))

            response = await useApi().paginate<Category>('/admin/v1/category', {
                sort: {created_at: 'desc'},
                pagination: {page: 1, perPage: -1},
                search: [{field: 'courses.type', value: CourseType.Video}]
            })
            response.data.forEach(c => this.videoCategories.set(c.id, c))
        },

        async store(request: CategoryStoreRequest): Promise<Category> {
            return await useApi().post('/admin/v1/category', {body: request})
        },
    },

    getters: {
        allCategories(state): Map<number, Category> {
            const allCategories = new Map<number, Category>();
            state.meditationCategories.forEach((value, key) => allCategories.set(key, value));
            state.videoCategories.forEach((value, key) => allCategories.set(key, value));
            return allCategories;
        },
    },
})