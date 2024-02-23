<template>
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
        :items-length="total"
        :items-per-page-options="props.itemPerPageOptions"
        :page="props.page"
        :items-per-page="props.perPage"
        :sort-by="[{key: Object.keys(params.sort)[0], order: Object.values(params.sort)[0]}]"
        @update:page="transform.page"
        @update:itemsPerPage="transform.itemsPerPage"
        @update:sort-by="transform.sort"
    />
  </v-card>
</template>


<script setup lang="ts">
import type {FilterSearchItem, FilterSortItem, FilterPagination, FilterSearchJoin} from "l5-client/src/types";

type Params = {
  pagination: FilterPagination;
  sort: FilterSortItem;
  search?: FilterSearchItem[] | string;
  searchJoin?: FilterSearchJoin;
  // relations?: string[];
  // filter?: string[];
}

const loading = ref<boolean>(false)

const props = defineProps({
  items: {
    type: Map,
    required: true
  },
  total: {
    type: Number,
    default: 0
  },
  page: {
    type: Number,
    default: 1
  },
  perPage: {
    type: Number,
    default: 5
  },
  defaultSortKey: {
    type: String,
    default: 'created_at'
  },
  defaultSortOrder: {
    type: String,
    default: 'desc'
  },
  fetch: {
    type: Function,
    required: true
  },
  searchableFields: {
    type: Array<Omit<FilterSearchItem, 'value'>>,
    default: []
  },
  itemPerPageOptions: {
    type: Array<{title: String, value: Number}>,
    default: [
      {title: '5', value: 5},
      {title: '10', value: 10},
      {title: '20', value: 20},
      {title: '50', value: 50},
      {title: 'All', value: -1},
    ]
  }
})

const params = reactive<Params>({
  pagination: {
    page: props.page,
    perPage: props.perPage,
  },
  // @ts-ignore
  sort: {
    [props.defaultSortKey]: props.defaultSortOrder
  },
  searchJoin: 'or',
  search: []
})

const load = async () => {
  loading.value = true
  props.items.clear()
  await props.fetch(params)
  loading.value = false
}

const transform = {
  page: (page: number) => params.pagination.page = page,
  itemsPerPage: (perPage: number) => params.pagination.perPage = perPage,
  sort: (sorts: Array<{key: string, order: string}>) => params.sort = Object.assign({}, ...(sorts.length ? sorts : [{key: 'created_at', order: 'desc'}]).map(s => {return {[s.key]: s.order} as FilterSortItem})),
  search: (e: KeyboardEvent) => params.search = (e.target?.value ? props.searchableFields.map(sf => {return {...sf, value: e.target?.value || ''}}) : [])
}

onMounted(async () => {
  await load()
})

watch(params, async () => {
  await load()
})

</script>


<style scoped lang="scss">

</style>