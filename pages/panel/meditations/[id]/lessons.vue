<script setup lang="ts">
definePageMeta({
  middleware: 'sanctum:auth',
})

import {useLessonStore} from "~/stores/lesson"
import useApi from '~/composables/api'
import type {FilterSearchItem} from "l5-client";

import AddMeditation from "~/components/section/modals/meditation/Add.vue";
import EditMeditation from "~/components/section/modals/meditation/Edit.vue";


const loading = ref(true)
const searchText = ref('')
const {items, meta} = storeToRefs(useLessonStore())

const course = (await useMeditationStore().get(<string>useRoute().params.id))
console.log(course)

const load = async (options = {}) => {
  loading.value = true
  const search: FilterSearchItem[] = searchText.value === '' ? [] : [
    {field: 'title', operator: 'like', value: searchText.value},
    {field: 'price', operator: 'like', value: searchText.value},
  ]
  const params = useApi().prepareQueryParams(options, search)
  await useLessonStore().paginate(<string>useRoute().params.id, params)

  loading.value = false
}


const headers = ref([
  {title: 'Title', align: 'start', key: 'title'},
  {title: 'CATEGORY', key: 'category'},
  {title: 'PRICE', key: 'price'},
  {title: 'DESCRIPTION', key: 'description'},
  {title: 'PICTURE', key: 'thumbnail', align: 'center'},
  {title: '', key: 'actions', sortable: false, align: 'end'},
])

</script>


<template>


  <div class="mt-5">
    <v-container>
      <!--     Start First section-->
      <v-sheet class="bg-transparent mb-7">
        <div class="d-flex align-center cursor-pointer w-0" @click="useRouter().back()">
          <v-icon size="x-large" class="pr-2" icon="mdi-chevron-left"/>
          <p class="font-weight-thin">Back</p>
        </div>
      </v-sheet>

      <v-sheet class="d-flex mb-6 bg-transparent align-center">

        <v-sheet class="bg-transparent">
          <h2 class="text-white pr-10 me-auto">{{ course.title }}</h2>
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
          <AddMeditation/>
        </v-sheet>
      </v-sheet>
      <!--     End First section-->

      <!--    Start Second section-->

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

        <template #item.description="{item}">
          <v-tooltip :text="item.description" max-width="210">
            <template v-slot:activator="{ props }">
              <div class="text-truncate" style="max-width: 125px;" v-bind="props">{{ item.description }}</div>
            </template>
          </v-tooltip>
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
          <div class="float-right" style="width: 100px;">
            <EditMeditation
                :form-title="'Edit Meditation Lesson'"
                :id="item.uuid"
                :title="item.title"
                :description="item.description"
                :price="item.price"
                :type="item.set === 'MULTIPLE' ? 'Course' : 'Single'"
                :category
            />
            <v-btn
                class="text-primary"
                variant="text"
                size="small"
                icon="mdi-delete-outline"
                @click=""
            />
          </div>
        </template>

      </v-data-table-server>
      <!--    End Second section-->

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