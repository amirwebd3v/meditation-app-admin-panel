import { defineStore } from "pinia";
import pagination from "~/utils/pagination.js";
import {useState} from "#app";


export const useMeditationStore = defineStore("meditation", {
    state: () => ({
        items: null,
        meta: null,
        obj : [{ key: '', operator: '=', value: 'Total' }],
    }),


    actions: {
        async fetch(page, perPage = 15, orderBy = "created_at", sortedBy = "desc",conditions = []) {
            const { search, searchFields } = pagination(conditions);
            const { data, meta } = (await useFetch(
                `http://localhost:8000/admin/v1/course-meditation?page=${page}&perPage=${perPage}&orderBy=${orderBy}&sortedBy=${sortedBy}&searchFields=${searchFields}&search=${search}`
            )).data.value;
            this.items = data;
            this.meta = meta;
        },
    },
});