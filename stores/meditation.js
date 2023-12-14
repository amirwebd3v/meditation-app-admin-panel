import { defineStore } from "pinia";
import {searchQuery, metaData} from "~/utils/pagination.js";


export const useMeditationStore = defineStore("meditation", {
    state: () => ({
        items: [],
        meta: metaData(),
    }),


    actions: {
        async fetch(page = 1, perPage = 15, orderBy = "created_at", sortType = "desc",conditions = []) {
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