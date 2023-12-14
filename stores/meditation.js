import { defineStore } from "pinia";
import {searchQuery, metaData} from "~/utils/pagination.js";


export const useMeditationStore = defineStore("meditation", {
    state: () => ({
        items: [],
        meta: metaData(),
    }),


    actions: {
        async fetch(page = null, perPage = null, orderBy = null, sortType = null, conditions = null) {
            page = page || 1
            perPage = perPage || 15
            orderBy = orderBy || "created_at"
            sortType = sortType || "desc"
            conditions = conditions || []
            const { search, searchFields } = searchQuery(conditions);
            this.items = []
            const { data, meta } = (await useFetch(
                `http://localhost:8000/admin/v1/course-meditation?page=${page}&perPage=${perPage}&orderBy=${orderBy}&sortType=${sortType}&searchFields=${searchFields}&search=${search}`
            )).data.value;
            this.items = data;
            this.meta = metaData(meta);
        },
    },
});