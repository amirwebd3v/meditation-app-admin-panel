<script setup lang="ts">
definePageMeta({
  middleware: 'sanctum:auth',
})

import Categories from "~/components/section/configuration/Categories.vue";
import AddConfigurationItem from "~/components/section/configuration/AddConfigurationItem.vue";

import {useVideoStore} from "~/stores/video"
import useApi from '~/composables/api'
import type {FilterSearchItem} from "l5-client";
import AddVideo from "~/components/section/modals/video/Add.vue";
import EditVideo from "~/components/section/modals/video/Edit.vue";

const loading = ref(true)
const searchText = ref('')
const headers = [
  {key: 'title', title: 'TITLE', align: 'start', sortable: true},
  {key: 'category', title: 'CATEGORY', sortable: false , align: 'start'},
  {key: 'lessons_count', title: 'QUANTITY', sortable: true, align: 'center'},
  {key: 'thumbnail', title: 'PICTURE', sortable: false, align: 'center'},
  {key: 'price', title: 'PRICE', sortable: true,align: 'end'},
  {key: 'actions', title: '', sortable: false,align: 'end'},
]

const {items, meta} = storeToRefs(useVideoStore())



const load = async (options = {}) => {
  loading.value = true
  const search: FilterSearchItem[] = searchText.value === '' ? [] : [
    {field: 'title', operator: 'like', value: searchText.value},
    {field: 'description', operator: 'like', value: searchText.value},
    {field: 'price', operator: 'like', value: searchText.value},
  ]
  const params = useApi().prepareQueryParams(options, search)
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
const goToLesson = (courseTitle: string, courseId: string) => {
  if (courseId) {
    router.push({
      name: 'panel-videos-id-lessons',
      params: {id: courseId},
    })
  } else {
    console.error(`No course found with title: ${courseTitle}`)
  }

}

</script>

<template>
  <div class="mt-16">
    <v-container>
      <!--      First section-->
      <v-sheet class="d-flex mb-6 bg-transparent align-center">

        <v-sheet class="bg-transparent">
          <h2 class="text-white pr-10 me-auto">Videos</h2>
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
      <AddConfigurationItem :Item="'All Courses'" />



              <v-data-table-server
                  class="mt-10 rounded-lg bg-light-brown-1"
                  v-if="!!items"
                  :items-length="meta.total"
                  :page="meta.current_page"
                  :items="items"
                  :headers="headers"
                  @update:options="load"
                  :loading="loading"
                  :items-per-page="10"
              >

                <template #item.title="{item}">
                  <v-tooltip :text="item.title">
                    <template v-slot:activator="{ props }">
                      <div class="text-truncate" style="max-width: 125px;" v-bind="props">{{ item.title }}</div>
                    </template>
                  </v-tooltip>
                </template>

                <template #item.category="{item}">
                  <div class="text-truncate" style="max-width: 125px;">{{ item.category }}</div>
                </template>


                <template #item.lessons_count="{item}">
                  <div class="pr-5">{{ item.lessons_count }}</div>
                </template>

                <template #item.thumbnail="{ item }">
                    <v-card v-if="!!item.thumbnail" class="my-2 mx-md-4" elevation="0" rounded color="light">
                      <v-img :src="item.thumbnail.urls.small" class="px-4" height="64" cover/>
                    </v-card>
                </template>

                <template #item.price="{item}">
                  {{ item.price || 'Free' }}
                </template>

                <template #item.actions="{item}">
                  <div class="float-right" style="width: 75px;">
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
                        <AddVideo :btn-out-table="false" :btn-in-table="true"/>
                        <EditVideo
                            :form-title="'Edit Meditation Course'"
                            :id="item.uuid"
                            :title="item.title"
                            link
                            :description="item.description"
                            :price="item.price"
                            :type="item.set === 'MULTIPLE' ? 'Course' : 'Single'"
                            :category
                        />
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
                        @click="goToLesson(item.title,item.uuid)"
                        density="compact"
                    />
                  </div>
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