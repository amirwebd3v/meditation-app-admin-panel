<template>
  <v-card color="transparent" variant="flat">

    <v-card-item v-if="searchableFields.length">
      <v-text-field
          @keyup.enter="transform.search"
          @click:clear="transform.search"
          :label="props.searchLabel"
          :readonly="loading"
          density="compact"
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
          clearable
          single-line
          hide-details
      />
    </v-card-item>

    <slot name="title" :props="props">
      <v-card-title v-if="props.cardTitle" v-text="props.cardTitle"/>
    </slot>

    <v-card-text>
      <v-data-table-server
          :loading="loading"
          show-current-page
          :loading-text="props.loadingText"
          :items="[...props.items.values()]"
          :items-length="props.total"
          :items-per-page-options="props.itemPerPageOptions"
          :page="params.pagination.page"
          :items-per-page="params.pagination.perPage"
          :sort-by="[{key: Object.keys(params.sort)[0], order: Object.values(params.sort)[0]}]"
          @update:page="transform.page"
          @update:itemsPerPage="transform.itemsPerPage"
          @update:sort-by="transform.sort"
      />
    </v-card-text>
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
  onFetch: {
    type: Function,
    required: true
  },
  cardTitle: {
    type: String,
    default: null
  },
  loadingText: {
    type: String,
    default: 'Loading items . . .'
  },
  searchLabel: {
    type: String,
    default: 'Search items'
  },
  searchJoin: {
    type: String,
    default: 'or'
  },
  searchableFields: {
    type: Array<Omit<FilterSearchItem, 'value'>>,
    default: []
  },
  clearItemsBeforeFetching: {
    type: Boolean,
    default: false
  },
  itemPerPageOptions: {
    type: Array<{ title: String, value: Number }>,
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
    page: 1,
    perPage: props.perPage,
  },
  // @ts-ignore
  sort: {
    [props.defaultSortKey]: props.defaultSortOrder
  },
  // @ts-ignore
  searchJoin: props.searchJoin,
  search: []
})

const load = async () => {
  loading.value = true
  if (props.clearItemsBeforeFetching) {
    props.items.clear()
  }
  await props.onFetch(params)
  loading.value = false
}

const transform = {
  page: (page: number) => params.pagination.page = page,
  itemsPerPage: (perPage: number) => params.pagination.perPage = perPage,
  sort: (sorts: Array<{ key: string, order: string }>) => params.sort = Object.assign({}, ...(sorts.length ? sorts : [{key: props.defaultSortKey, order: props.defaultSortOrder}]).map(s => {
    return {[s.key]: s.order} as FilterSortItem
  })),
  search: (e: KeyboardEvent) => params.search = (e.target?.value ? props.searchableFields.map(sf => {
    return {...sf, value: e.target?.value || ''}
  }) : [])
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