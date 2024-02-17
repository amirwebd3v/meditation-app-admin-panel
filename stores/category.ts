import {defineStore} from 'pinia'
import useApi from '~/composables/api'
import type {Category} from "~/utils/types";
import {CourseType} from "~/utils/enums";


export const useCategoryStore = defineStore('category', {
    state: () => ({
        meditationCategories: [] as Category[],
        videoCategories: [] as Category[],
    }),
    actions: {
        async fetch() {
            let response = await useApi().paginate<Category>('/admin/v1/category', {
                sort: {created_at: 'desc'},
                pagination: {page: 1, perPage: -1},
                search: [{field: 'courses.type', value: CourseType.Meditation}]
            })
            this.meditationCategories = response.data

            response = await useApi().paginate<Category>('/admin/v1/category', {
                sort: {created_at: 'desc'},
                pagination: {page: 1, perPage: -1},
                search: [{field: 'courses.type', value: CourseType.Video}]
            })
            this.videoCategories = response.data
        },
    },

    getters: {
        allCategories(state): Category[] {
            return state.videoCategories.concat(state.meditationCategories)
                .reduce((prev: Category[], cur: Category) => [...prev.filter((obj: Category) => obj.id !== cur.id), cur], [])
                .sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
        }
    }
})