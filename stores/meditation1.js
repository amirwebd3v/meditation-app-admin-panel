// import { defineStore } from 'pinia'
// import pagination from '~/utils/pagination.js'
//
// export const useMeditationStore = defineStore('meditation', {
//     state: () => ({
//         items: null,
//         meta: null
//     }),
//
//     actions: {
//         async fetch(page, limit = 15, orderBy = 'created_at', sortedBy = 'desc', conditions = []) {
//             const {search, searchFields} =  pagination.searchQuery(conditions)
//             const {data, meta} = (await useFetch(`http://localhost:8000/admin/v1/course-meditation?page=${page}&limit=${limit}&orderBy=${orderBy}&sortedBy=${sortedBy}&searchFields=${searchFields}&search=${search}`)).data.value
//             this.items = data
//             this.meta = meta
//         },
//     }
// })
