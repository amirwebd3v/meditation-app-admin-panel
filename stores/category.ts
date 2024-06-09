import {defineStore} from 'pinia';
import type {Category} from "~/utils/types";
import {CourseType} from "~/utils/enums";
import type {CategoryStoreRequest} from "~/utils/requests";


export const useCategoryStore = defineStore('category', {
    state: () => ({
        meditationCategories: new Map<number, Category>(),
        videoCategories: new Map<number, Category>(),
    }),
    actions: {
        async fetch(categoryType: CourseType) {
            try {
                const response = await useApi().paginate<Category>('/admin/v1/category', {
                    sort: {created_at: 'desc'},
                    pagination: {page: 1, perPage: -1},
                    search: [{field: 'type', operator: '=', value: categoryType}],
                });

                let categoriesMap: Map<number, Category> = new Map();
                response.data.forEach((category) => categoriesMap.set(category.id, category));

                switch (categoryType) {
                    case CourseType.Meditation:
                        this.meditationCategories = categoriesMap
                        break
                    case CourseType.Video:
                        this.videoCategories = categoriesMap
                        break
                    default:
                        break
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },

        async store(request: CategoryStoreRequest): Promise<Category> {
            return await useApi().post('/admin/v1/category', {body: request})
        },

        async destroy(slug: string) {
            await useApi().destroy(`/admin/v1/category/${slug}`);
        },
    },

})