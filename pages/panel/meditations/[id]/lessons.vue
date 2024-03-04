<script setup lang="ts">
import {useLessonStore} from "~/stores/lesson"
import useApi from '~/composables/api'
import type {FilterSearchItem} from "l5-client";
import type {Category, Course} from "~/utils/types";

/***********************************************/
definePageMeta({
  middleware: 'sanctum:auth',
})

onMounted(async () => {
  await load()
})

/***********************************************/
const loading = ref(true)
const searchText = ref('')
const {items, meta} = storeToRefs(useLessonStore())
const course : Course = (await useMeditationStore().get(useRoute().params.id.toString()))

const headers = ref([
  {key: 'title', title: 'TITLE', align: 'start', sortable: true},
  {key: 'category', title: 'CATEGORY', sortable: false, align: 'start'},
  {key: 'price', title: 'PRICE($)', sortable: true, align: 'start'},
  {key: 'description', title: 'DESCRIPTION', sortable: false},
  {key: 'thumbnail', title: 'PICTURE', sortable: false, align: 'start'},
  {key: 'actions', title: '', sortable: false, align: 'end'},
])

/***********************************************/
const load = async (options = {}) => {
  loading.value = true
  const search: FilterSearchItem[] = searchText.value === '' ? [] : [
    {field: 'title', operator: 'ilike', value: searchText.value},
    {field: 'price', operator: 'like', value: searchText.value},
  ]
  const params = useApi().prepareQueryParams(options, search)
  params.relations = ['categories']
  await useLessonStore().paginate(course.uuid, params)
  loading.value = false
}

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

        <v-sheet class="">
          <h2 class="text-white pr-10 me-auto">{{ course.title }} Meditation</h2>
        </v-sheet>
        <v-sheet class=" mr-5" width="475px">
          <v-text-field
              @keyup.enter="load"
              v-model="searchText"
              clearable
              density="compact"
              hide-details
              variant="outlined"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              single-line
          ></v-text-field>
        </v-sheet>
        <v-sheet class=" ml-auto">
          <LazyModalsMeditationLessonAdd/>
        </v-sheet>
      </v-sheet>
      <!--     End First section-->

      <!--    Start Second section-->

      <v-data-table-server
          class="mt-10 rounded-lg bg-light-brown-1"
          v-if="!!items.size"
          :items-length="+meta.total"
          :page="meta.current_page"
          :items="[...items.values()]"
          @update:options="load"
          :loading="loading"
          :headers="headers"
          sort-desc-icon="mdi-swap-vertical"
          sort-asc-icon="mdi-swap-vertical"
      >
        <template #item.title="{item}">
          <v-tooltip :text="item.title">
            <template v-slot:activator="{ props }">
              <div class="text-truncate" style="max-width: 125px;" v-bind="props">{{ item.title }}</div>
            </template>
          </v-tooltip>
        </template>

        <template #item.category="{item}">
          <v-tooltip :text="item?.categories.map((category : Category) => category.name).join(', ')" max-width="270">
            <template v-slot:activator="{props}">
              <div class="text-truncate" style="max-width: 125px;" v-bind="props">
                {{item?.categories[0]?.name}}
              </div>
            </template>
          </v-tooltip>
        </template>


        <template #item.description="{item}">
          <v-tooltip :text="item.description" max-width="210">
            <template v-slot:activator="{ props }">
              <div class="text-truncate" style="max-width: 125px;" v-bind="props">{{ item.description }}</div>
            </template>
          </v-tooltip>
        </template>

        <template #item.thumbnail="{ item }">
          <v-card v-if="!!item.thumbnail" class="my-1 pl-2" elevation="0" rounded color="light">
            <v-img :src="item.thumbnail.urls.small" height="38" width="38" cover/>
          </v-card>
        </template>


        <template #item.price="{item}">
          {{ item.price || 'Free' }}
        </template>


        <template #item.actions="{item}">

          <div style="width: 80px;" class="float-right mx-0 px-0 v-row align-center">

            <LazyModalsMeditationLessonEdit
                :id="item.uuid"
                :title="item.title"
                :description="item.description"
                :categories="item.categories.map((c : Category) => c.id)"
                :price="item.price"
                :is-popular="item.is_popular"
            />
            <LazyModalsMeditationLessonDelete :id="item.uuid" :title="item.title"/>          </div>

        </template>
      </v-data-table-server>
      <!--    End Second section-->
    </v-container>
  </div>
</template>


