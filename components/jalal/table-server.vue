<template>

    <slot name="search" :props="{...props, loading, search: transform.search}">
      <v-text-field maxlength="30"
          v-if="searchableFields.length"
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
    </slot>

    <slot name="title" :props="props">
      <v-card-title v-if="props.cardTitle" v-text="props.cardTitle"/>
    </slot>

    <v-data-table-server
        :class="props.tableClass"
        :loading="loading"
        show-current-page
        :loading-text="props.loadingText"
        :headers="props.headers"
        :items="[...props.items.values()]"
        :items-length="props.total"
        :items-per-page-options="props.itemPerPageOptions"
        :page="queryParams.pagination.page"
        :items-per-page="queryParams.pagination.perPage"
        :sort-by="[{key: Object.keys(queryParams.sort)[0], order: Object.values(queryParams.sort)[0]}]"
        @update:page="transform.page"
        @update:itemsPerPage="transform.itemsPerPage"
        @update:sort-by="transform.sort"
    >

      <template v-for="(slot, name) in $slots" v-slot:[name]="item">
        <slot :name="name" v-bind="item" />
      </template>

    </v-data-table-server>
</template>


<script setup lang="ts">
import type {FilterSearchItem, FilterSortItem, QueryParams} from "l5-client/src/types";

const loading = ref<boolean>(false)

const props = defineProps({
  items: {
    type: Map,
    required: true
  },
  headers: {
    type: Array<{
      key?: string
      value?: string;
      title?: string;
      fixed?: boolean | undefined;
      align?: "center" | "end" | "start" | undefined;
      width?: string | number | undefined;
      minWidth?: string | undefined;
      maxWidth?: string | undefined;
      sortable?: boolean | undefined;
    }>,
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
  tableClass: {
    type: String,
    default: null
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
      {title: '10', value: 10},
      {title: '25', value: 25},
      {title: '50', value: 50},
      {title: '100', value: 100},
      {title: 'All', value: -1},
    ]
  }
})

const queryParams = reactive<QueryParams>({
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

const load = () => {
  loading.value = true
  if (props.clearItemsBeforeFetching) {
    props.items.clear()
  }
  props.onFetch(queryParams).finally(() => {
    loading.value = false
  })
}

const transform = {
  page: (page: number) => queryParams.pagination.page = page,
  itemsPerPage: (perPage: number) => queryParams.pagination.perPage = perPage,
  sort: (sorts: Array<{ key: string, order: string }>) => queryParams.sort = Object.assign({}, ...(sorts.length ? sorts : [{key: props.defaultSortKey, order: props.defaultSortOrder}]).map(s => {
    return {[s.key]: s.order} as FilterSortItem
  })),
  search: (e: KeyboardEvent) => queryParams.search = (e.target?.value ? props.searchableFields.map(sf => {
    return {...sf, value: e.target?.value || ''}
  }) : [])
}

onMounted(async () => {
  await load()
})

watch(queryParams, async () => {
  await load()
})

</script>


<style scoped lang="scss">

</style>