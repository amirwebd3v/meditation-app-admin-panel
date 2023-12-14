import { defineStore } from 'pinia'
import pagination from '~/utils/pagination1.js'

export const useVideoStore = defineStore('video', {
    state: () => ({
        items: null,
        meta: null
    }),

    actions: {
        async fetch(page, limit = 15, orderBy = 'created_at', sortedBy = 'desc', conditions = null) {
            const {search, searchFields} =  pagination.searchQuery(conditions)
            const {data, meta} = (await useFetch(`http://localhost:8000/admin/v1/course-video?page=${page}&limit=${limit}&orderBy=${orderBy}&sortedBy=${sortedBy}&searchFields=${searchFields}&search=${search}`)).data.value
            this.items = data
            this.meta = meta
        },
    }
})