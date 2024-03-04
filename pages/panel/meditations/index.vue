<script setup lang="ts">

import Categories from "~/components/configuration/Categories.vue";
import AddConfigurationItem from "~/components/configuration/AddConfigurationItem.vue";
import {useMeditationStore} from "~/stores/meditation"
import useApi from '~/composables/api'
import type {FilterSearchItem} from "l5-client";
import type {Category} from "~/utils/types";

/***********************************************/
definePageMeta({
  middleware: 'sanctum:auth',
})


onMounted(async () => {
  await load()
})

/***********************************************/
const menu = ref(false)
const loading = ref(true)
const searchText = ref('')
const router = useRouter();
const {items, meta} = storeToRefs(useMeditationStore())

const headers = [
  {key: 'title', title: 'TITLE', align: 'start', sortable: true},
  {key: 'set', title: 'TYPE', align: 'start', sortable: false},
  {key: 'category', title: 'CATEGORY', sortable: false, align: 'start'},
  {key: 'description', title: 'DESCRIPTION', sortable: false},
  {key: 'lessons_count', title: 'QUANTITY', sortable: true, align: 'center'},
  {key: 'thumbnail', title: 'PICTURE', sortable: false, align: 'start'},
  {key: 'price', title: 'PRICE($)', sortable: true, align: 'start'},
  {key: 'actions', title: '', sortable: false, align: 'end'},
]

/***********************************************/
const load = async (options = {}) => {
  loading.value = true
  const search: FilterSearchItem[] = searchText.value === '' ? [] : [
    {field: 'title', operator: 'like', value: searchText.value},
    {field: 'description', operator: 'like', value: searchText.value},
    {field: 'price', operator: 'like', value: searchText.value},
  ]
  const params = useApi().prepareQueryParams(options, search)
  params.relations = ['categories']
  await useMeditationStore().paginate(params)
  loading.value = false
}


const goToLesson = (courseId: string) => {
  if (courseId) {
    router.push({
      name: 'panel-meditations-id-lessons',
      params: {id: courseId},
    })
  } else {
    console.error('No course found with title')
  }
}


</script>

<template>
  <div class="mt-6">
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
              density="compact"
              hide-details
              variant="outlined"
              label="Search"
              single-line
          >
            <template #prepend-inner>
              <v-icon icon="mdi-magnify" style="opacity: 1!important;"/>
            </template>
          </v-text-field>
        </v-sheet>
      </v-sheet>

      <Categories :categories="useCategoryStore().meditationCategories"/>
      <AddConfigurationItem Item="All Meditations"/>


      <v-data-table-server
          class="mt-8 rounded-lg bg-light-brown-1"
          v-if="!!items.size"
          :items-length="+meta.total"
          :page="meta.current_page"
          :items="[...items.values()]"
          @update:options="load"
          :loading="loading"
          :headers="headers"
          sort-desc-icon="mdi-arrow-up-thin"
          sort-asc-icon="mdi-arrow-down-thin"
          sor
      >
        <template #item.title="{item}">
          <v-tooltip :text="item.title">
            <template v-slot:activator="{ props }">
              <div class="text-truncate" style="max-width: 125px;" v-bind="props">{{ item.title }}</div>
            </template>
          </v-tooltip>
        </template>



        <template #item.category="{item}">
          <v-tooltip :text="item?.categories.map(category => category.name).join(', ')" max-width="270">
            <template v-slot:activator="{props}">
              <div class="text-truncate" style="max-width: 125px;" v-bind="props">
                {{item?.categories[0]?.name}}
              </div>
            </template>
          </v-tooltip>
        </template>


        <template #item.set="{ item }">
          <div style="max-width: 125px;">{{ item.set === 'MULTIPLE' ? 'Course' : 'Single' }}</div>
        </template>

        <template #item.description="{item}">
          <v-tooltip :text="item.description" max-width="270">
            <template v-slot:activator="{ props }">
              <div class="text-truncate" style="max-width: 125px;" v-bind="props">{{ item.description }}</div>
            </template>
          </v-tooltip>
        </template>

        <template #item.lessons_count="{item}">
          <div style="max-width: 90px;">{{ item.lessons_count }}</div>
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
            <v-menu
                :model-value="menu"
                :close-on-content-click="false"
                location="start"
            >
              <template v-slot:activator="{ props }">
                <v-icon
                    class="text-primary mr-5"
                    v-bind="props"
                    size="large"
                    icon="mdi mdi-dots-vertical"
                />
              </template>

              <v-card class="bg-light-brown-1 px-2 py-1 v-row" rounded>
                <LazyModalsMeditationLessonAdd :course-id="item.uuid" :btn-out-table="false" :btn-in-table="true"/>
                <LazyModalsMeditationCourseEdit
                    :id="item.uuid"
                    :title="item.title"
                    :description="item.description"
                    :categories="item.categories.map((c : Category) => c.id)"
                    :price="item.price"
                    :is-popular="item.is_popular"
                />
                <LazyModalsMeditationCourseDelete :id="item.uuid" :title="item.title"/>
              </v-card>
            </v-menu>
            <v-icon
                class="text-primary"
                icon="mdi-chevron-right"
                size="x-large"
                @click="goToLesson(item.uuid)"
            />
          </div>
        </template>
      </v-data-table-server>
    </v-container>
  </div>
</template>


