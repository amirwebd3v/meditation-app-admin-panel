import {defineStore} from 'pinia'
import useApi from '~/composables/api'
import type {Category} from "~/utils/types";
import type {PaginatorMeta, QueryParams} from "l5-client";



export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [] as Category[],
        categoriesMeta: {} as PaginatorMeta
    }),
    actions: {
        async index(queryParam: QueryParams) {
            const {data,meta} = await useApi().paginate('/admin/v1/category', queryParam)
            this.categories = data
            this.categoriesMeta = meta
        },


    },
})