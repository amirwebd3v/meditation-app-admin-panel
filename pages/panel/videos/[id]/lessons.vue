<script setup lang="ts">
import useApi from '~/composables/api'
import type {FilterSearchItem} from "l5-client";
import type {Course} from "~/utils/types";
import {VDataTableServer} from "vuetify/components/VDataTable";

const {items, meta} = storeToRefs(useLessonStore())

/***********************************************/
definePageMeta({
  middleware: 'sanctum:auth',
})

onBeforeMount(async () => {
  await load()
})



/***********************************************/
const loading = ref(false)
const searchText = ref('')
const course: Course = (await useVideoStore().get(useRoute().params.id.toString()))

const headers = [
  {key: 'title', title: 'TITLE', align: 'start', sortable: true, width:'350'},
  {key: 'is_lock', title: 'FREE/PAID', sortable: true, align: 'start',width:'200'},
  {key: 'description', title: 'DESCRIPTION', sortable: true},
  {key: 'thumbnail', title: 'PICTURE', sortable: false, align: 'center'},
  {key: 'actions', title: '', sortable: false, align: 'end'},
] as VDataTableServer['headers']


/***********************************************/
const load = async (options = {}) => {
  if (loading.value) {
    return
  }
  loading.value = true
  const search: FilterSearchItem[] = searchText.value === '' ? [] : [
    {field: 'title', operator: 'ilike', value: searchText.value},
  ]
  const params = useApi().prepareQueryParams(options, search)
  await useLessonStore().paginate(course.uuid, params)
  loading.value = false
}


useListen('refreshVideosLessonsTable',load)
</script>


<template>
  <div class="mt-5">
    <v-container>
      <!--     Start First section-->
      <v-sheet class=" mb-7">
        <div class="d-flex align-center cursor-pointer w-0" @click="useRouter().back()">
          <v-icon size="x-large" class="pr-2" icon="mdi-chevron-left"/>
          <p class="font-weight-thin">Back</p>
        </div>
      </v-sheet>

      <v-sheet class="d-flex mb-6  align-center">

        <v-sheet >
          <h2 class="text-white pr-10 me-auto">{{ course.title }} video</h2>
        </v-sheet>
        <v-sheet class="mr-5 pt-5" width="475px">
          <v-text-field maxlength="30"
                        @keyup.enter="load"
                        v-model="searchText"
                        :rules="[v => (v && v.length <= 30) || 'Maximum 30 characters']"
                        density="compact"
                        variant="outlined"
                        label="Search"
                        prepend-inner-icon="mdi-magnify"
                        single-line
          ></v-text-field>
        </v-sheet>
        <v-sheet class="ml-auto">
          <LazyModalsVideoLessonAdd :course-title="course.title" :course-id="course.uuid"/>
        </v-sheet>
      </v-sheet>
      <!--     End First section-->

      <!--    Start Second section-->

      <v-data-table-server
          class="rounded-lg bg-light-brown-1"
          :items-length="+meta.total"
          :page="+meta.current_page"
          :items="[...items.values()]"
          @update:options="load"
          :loading="loading"
          :headers="headers"
          sort-desc-icon="mdi-arrow-up-thin"
          sort-asc-icon="mdi-arrow-down-thin"
          show-current-page
      >
        <template #item.title="{item}">
          <v-tooltip :text="item.title">
            <template v-slot:activator="{ props }">
              <div class="text-truncate" style="max-width: 250px;" v-bind="props">{{ item.title }}</div>
            </template>
          </v-tooltip>
        </template>


        <template #item.description="{item}">
          <v-tooltip :text="item.description" max-width="210">
            <template v-slot:activator="{ props }">
              <div class="text-truncate" style="max-width: 250px;" v-bind="props">{{ item.description }}</div>
            </template>
          </v-tooltip>
        </template>

        <template #item.thumbnail="{ item }">

          <div class="v-row justify-center">
            <v-card v-if="!!item.thumbnail" class="my-1" elevation="0" rounded color="light">
              <v-img  :src="item.thumbnail.urls?.small" lazy-src="/img/meditation-card.jpg" height="38" width="38" cover>
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular
                        color="grey-lighten-4"
                        indeterminate
                        size="x-small"
                    ></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </v-card>
          </div>
        </template>

        <template #item.is_lock="{ item }">
          {{ item.is_lock ? 'Paid' : 'Free' }}
        </template>

        <template #item.actions="{item}">

          <div style="width: 80px;" class="float-right mx-0 px-0 v-row align-center">
            <LazyModalsVideoLessonEdit
                :id="item.uuid"
                :title="item.title"
                :source="item.source"
                :is-lock="item.is_lock"
                :description="item.description"
                :is-popular="item.is_popular"
                :key="item.uuid"
            />

            <LazyModalsVideoLessonDelete :id="item.uuid" :title="item.title" :transaction-count="0"/>
          </div>

        </template>
      </v-data-table-server>
      <!--    End Second section-->
    </v-container>
  </div>
</template>


