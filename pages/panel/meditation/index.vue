<script setup lang="ts">


import Categories from "~/components/section/configuration/Categories.vue";
import AddConfigurationItem from "~/components/section/configuration/AddConfigurationItem.vue";

import {useVideoStore} from "~/stores/video"
import {prepareQueryParams} from '~/composables/api'
import type {FilterSearchItem} from "l5-client";
import AddVideo from "~/components/section/modals/video/Add.vue";
import EditVideo from "~/components/section/modals/video/Edit.vue";
import AddMeditation from "~/components/section/modals/meditation/Add.vue";
import EditMeditation from "~/components/section/modals/meditation/Edit.vue";

const loading = ref(true)
const searchText = ref('')
const headers = [
  {key: 'title', title: 'TITLE', align: 'start', sortable: true},
  {key: 'set', title: 'TYPE', align: 'center', sortable: true},
  {key: 'category', title: 'CATEGORY', sortable: false},
  {key: 'description',title: 'DESCRIPTION', sortable: false },
  {key: 'lessons_count', title: 'QUANTITY', sortable: true, align: 'center'},
  {key: 'thumbnail', title: 'PICTURE', sortable: false, align: 'start'},
  {key: 'price', title: 'PRICE', sortable: true,align: 'start'},
  {key: 'actions', title: '', sortable: false,align: 'start'},
]

const {items, meta} = storeToRefs(useVideoStore())

onMounted(async () => {
  await load()
})

const load = async (options = {}) => {
  loading.value = true
  const search: FilterSearchItem[] = searchText.value === '' ? [] : [
    {field: 'title', operator: 'like', value: searchText.value},
    {field: 'description', operator: 'like', value: searchText.value},
    {field: 'price', operator: 'like', value: searchText.value},
  ]
  const params = prepareQueryParams(options, search)
  await useVideoStore().paginate(params)
  loading.value = false
}


const filters = [
  'All',
  'Sleep',
  'Relationship',
  'Nutrition',
  'Drawers',
  'Shopping',
  'Art',
  'Tech',
  'Creative Writing',
]

const menu = ref(false)

const router = useRouter();
const currentRouteName = router.currentRoute.value.name;
console.log(currentRouteName)
</script>

<template>
  <div class="mt-16">
    <v-container>
      <!--      First section-->
      <v-sheet class="d-flex mb-6 bg-transparent align-center">

        <v-sheet class="bg-transparent">
          <h2 class="text-white pr-10 me-auto">Meditations</h2>
        </v-sheet>
        <v-sheet class="bg-transparent mr-5" width="475px">
          <v-text-field
              @keyup.enter="load"
              v-model="searchText"
              clearable
              density="comfortable"
              hide-details
              variant="outlined"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              single-line
          ></v-text-field>
        </v-sheet>
      </v-sheet>


      <Categories :Filters="filters"  />
      <AddConfigurationItem :Item="'All Meditations'" />



      <v-data-table-server
          class="mt-10 rounded-lg bg-light-brown-1"
          v-if="!!items"
          :items-length="meta.total"
          :page="meta.current_page"
          :items="items"
          :headers="headers"
          @update:options="load"
          :loading="loading"
      >

        <template #item.thumbnail="{ item }">
          <v-card v-if="!!item.thumbnail" class="my-2" elevation="2" rounded>
            <v-img :src="item.thumbnail.urls.small" height="64" cover=""/>
          </v-card>
        </template>

        <template #item.set="{ item }">
          {{ item.set.toString().replace('MULTIPLE', 'COURSE') }}
        </template>

        <template #item.actions="{item}" >

          <v-menu
              :v-model="menu"
              :close-on-content-click="false"
              location="start"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                  class="text-primary me-6"
                  variant="text"
                  v-bind="props"
                  icon="mdi mdi-dots-vertical"
                  size="small"
                  density="compact"

              />
            </template>

            <v-card class="bg-light-brown-1" rounded>
              <AddMeditation :btn-out-table="false" :btn-in-table="true"/>
              <EditMeditation />
              <v-btn
                  class="text-primary"
                  variant="text"
                  icon="mdi mdi-delete-outline"
                  size="small"
              />
            </v-card>
          </v-menu>
          <v-btn
              class="text-primary"
              variant="text"
              size="small"
              icon="mdi-chevron-right"
              @click=""
              density="compact"
          />


        </template>

      </v-data-table-server>



    </v-container>
  </div>
</template>

<style lang="scss" scoped>
div:deep(.v-table__wrapper) {
  thead {
    background-color: #7C6346;
  }
}
</style>