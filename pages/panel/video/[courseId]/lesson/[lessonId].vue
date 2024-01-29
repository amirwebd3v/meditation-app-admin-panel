<script setup lang="ts">




import EditVideo from "~/components/section/modals/video/Edit.vue";



import {useVideoStore} from "~/stores/video"
import {prepareQueryParams} from '~/composables/api'
import type {FilterSearchItem} from "l5-client";

import AddVideo from "~/components/section/modals/video/Add.vue";


const loading = ref(true)
const searchText = ref('')
const headers = [
  {key: 'title', title: 'TITLE', align: 'start', sortable: true},
  {key: 'price', title: 'PRICE', sortable: false},
  {key: 'thumbnail', title: 'PICTURE', sortable: false, align: 'start'},
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
    {field: 'price', operator: 'like', value: searchText.value},
  ]
  const params = prepareQueryParams(options, search)
  await useVideoStore().paginate(params)
  loading.value = false
}

</script>

<template>

  <div class="mt-16">
    <v-container>
      <!--      First section-->
      <v-sheet class="d-flex mb-6 bg-transparent align-center">

        <v-sheet class="bg-transparent">
          <h2 class="text-white pr-10 me-auto">Course Name</h2>
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
        <v-sheet class="bg-transparent ml-auto">
          <AddVideo :is-btn-text="'isBtnText'"/>
        </v-sheet>
      </v-sheet>




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
          {{ item.set.toString().replace('FREE', 'PAID') }}
        </template>

        <template #item.actions="{item}" >

          <EditVideo class="me-2"/>
          <v-btn
              class="text-primary"
              variant="text"
              size="small"
              icon="mdi-delete-outline"
              @click=""
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