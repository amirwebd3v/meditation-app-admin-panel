<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Course List</v-card-title>
      <v-card-item>
        <v-text-field
            clearable
            @click:clear="transform.search"
            :readonly="loading"
            density="compact"
            variant="solo"
            label="Search courses"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            @keyup.enter="transform.search"
       />
      </v-card-item>
      <v-data-table-server
          :loading="loading"
          show-current-page
          loading-text="Loading items . . ."
          :items="[...items.values()]"
          :items-length="meta?.total || 0"
          :items-per-page-options="itemPerPageOptions"
          :page="tableParams.pagination.page"
          :items-per-page="tableParams.pagination.perPage"
          pag
          :sort-by="[{key: Object.keys(tableParams.sort)[0], order: Object.values(tableParams.sort)[0]}]"
          @update:page="transform.page"
          @update:itemsPerPage="transform.itemsPerPage"
          @update:sort-by="transform.sort"
      />
    </v-card>
  </v-container>
</template>


<script setup lang="ts">

import type {
  FilterPagination,
  FilterSearchItem,
  FilterSearchJoin,
  FilterSortItem,
} from "l5-client/src/types";

const {items, meta} = storeToRefs(useMeditationStore())

type TableParams = {
  pagination: FilterPagination;
  sort: FilterSortItem;
  search?: FilterSearchItem[] | string;
  searchJoin?: FilterSearchJoin;
  // relations?: string[];
  // filter?: string[];
}

const tableParams = reactive<TableParams>({
  pagination: {
    page: 1,
    perPage: 5,
  },
  sort: {
    created_at: 'desc'
  },
  searchJoin: 'or',
  search: []
})

const itemPerPageOptions: Array<{title: string, value: number}> = [
  {title: '5', value: 5},
  {title: '10', value: 10},
  {title: '20', value: 20},
  {title: '50', value: 50},
  {title: 'All', value: -1},
]
const loading = ref<boolean>(false)
const searchableFields: Array<Omit<FilterSearchItem, 'value'>> = [
  {field: 'title', operator: 'like'},
  {field: 'description', operator: 'like'},
  // {field: 'price', operator: 'in'},
  // {field: 'is_popular', operator: '='},
  {field: 'categories.slug', operator: 'in'},
  {field: 'categories.name', operator: 'like'},
]

watch(tableParams, async () => {
  await fetch()
})

const transform = {
  page: (page: number) => tableParams.pagination.page = page,
  itemsPerPage: (perPage: number) => tableParams.pagination.perPage = perPage,
  sort: (sorts: Array<{key: string, order: string}>) => tableParams.sort = Object.assign({}, ...(sorts.length ? sorts : [{key: 'created_at', order: 'desc'}]).map(s => {return {[s.key]: s.order} as FilterSortItem})),
  search: (e: KeyboardEvent) => tableParams.search = (e.target?.value ? searchableFields.map(sf => {return {...sf, value: e.target?.value || ''}}) : [])
}

onMounted(async () => {
  await fetch()
})

const fetch = async () => {
  loading.value = true
  items.value.clear()
  await useMeditationStore().paginate(tableParams)
  loading.value = false
}

</script>


<style scoped lang="scss">

</style>