<script setup lang="ts">

definePageMeta({
  middleware: 'sanctum:auth',
})

import Categories from "~/components/section/configuration/Categories.vue";
import AddConfigurationItem from "~/components/section/configuration/AddConfigurationItem.vue";

import {useMeditationStore} from "~/stores/meditation"
import useApi from '~/composables/api'
import type {FilterSearchItem} from "l5-client";
import AddMeditation from "~/components/section/modals/meditation/Add.vue";
import EditMeditation from "~/components/section/modals/meditation/Edit.vue";

const loading = ref(true)
const searchText = ref('')
const headers = [
  {key: 'title', title: 'TITLE', align: 'start', sortable: true},
  {key: 'set', title: 'TYPE', align: 'start', sortable: false},
  {key: 'category', title: 'CATEGORY', sortable: false, align: 'start'},
  {key: 'description', title: 'DESCRIPTION', sortable: false},
  {key: 'lessons_count', title: 'QUANTITY', sortable: true, align: 'center'},
  {key: 'thumbnail', title: 'PICTURE', sortable: false, align: 'center'},
  {key: 'price', title: 'PRICE', sortable: true, align: 'start'},
  {key: 'actions', title: '', sortable: false, align: 'start'},
]

const {items, meta} = storeToRefs(useMeditationStore())

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
  const params = useApi().prepareQueryParams(options, search)
  params.relations = ['categories']
  await useMeditationStore().paginate(params)
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
      name: 'panel-meditations-id-lessons',
      params: {id: courseId},
    })
  } else {
    console.error(`No course found with title: ${courseTitle}`)
  }

}


</script>

<template>
  <div class="mt-10">
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
              prepend-inner-icon="mdi-magnify"
              single-line
          />
        </v-sheet>
      </v-sheet>


      <Categories :Filters="filters"/>
      <AddConfigurationItem :Item="'All Meditations'"/>


      <v-data-table-server
          class="mt-10 rounded-lg bg-light-brown-1"
          v-if="!!items.size"
          :items-length="+meta.total"
          :page="meta.current_page"
          :items="Array.from(items.values())"
          :headers="headers"
          @update:options="load"
          :loading="loading"
          :sort-by="[{key: 'created_at', order: 'desc'}]"

      >

        <template #item.title="{item}">
          <v-tooltip :text="item.title">
            <template v-slot:activator="{ props }">
              <div class="text-truncate" style="max-width: 125px;" v-bind="props">{{ item.title }}</div>
            </template>
          </v-tooltip>
        </template>

        <template #item.set="{ item }">
          <div style="max-width: 125px;">{{ item.set === 'MULTIPLE' ? 'Course' : 'Single' }}</div>
        </template>

        <template #item.category="{item}">
<!--          <v-menu-->
<!--              open-on-hover-->
<!--              :location="'left center'"-->
<!--          >-->
<!--            <template v-slot:activator="{ props }">-->
<!--              <div class="d-flex align-center cursor-pointer w-0" v-bind="props">-->
<!--                <v-icon size="small" class="pr-2" icon="mdi-chevron-down"/>-->
<!--                <p class="font-weight-thin">Show</p>-->
<!--              </div>-->
<!--            </template>-->
<!--            <v-list  style="max-width: 150px;" bg-color="light">-->
<!--              <v-list-item-->
<!--                  v-for="category in item.categories"-->
<!--                  :key="category.id"-->
<!--              >-->
<!--                <v-list-item-title class="text-white font-14">{{ category.name }}</v-list-item-title>-->
<!--              </v-list-item>-->
<!--            </v-list>-->
<!--          </v-menu>-->
<!--          ********************************************-->
<!--          <div class="text-truncate d-inline-block" v-for="category in item.categories" >-->
<!--            {{ category.name }}-->
<!--          </div>-->
          <!--          ********************************************-->
          <div class="text-truncate d-inline-block" style="max-width: 125px;" >
            {{ item.categories?.[0]?.['name'] || []}}
          </div>
        </template>

        <template #item.description="{item}">
          <v-tooltip :text="item.description" max-width="270">
            <template v-slot:activator="{ props }">
              <div class="text-truncate" style="max-width: 125px;" v-bind="props">{{ item.description }}</div>
            </template>
          </v-tooltip>
        </template>

        <template #item.lessons_count="{item}">
          <div style="max-width: 75px;">{{ item.lessons_count }}</div>
        </template>


        <template #item.thumbnail="{ item }" >
            <v-card v-if="!!item.thumbnail" class="my-2" elevation="0" rounded color="light">
              <v-img :src="item.thumbnail.urls.small" height="64" cover/>
            </v-card>
        </template>

        <template #item.price="{item}">
          {{ item.price || 'Free' }}
        </template>

        <template #item.actions="{item}">
          <div style="width: 75px;">
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

              <v-card class="bg-light-brown-1 px-2 py-1" rounded>
                <AddMeditation :btn-out-table="false" :btn-in-table="true"/>
                <EditMeditation
                    :form-title="'Edit Meditation Course'"
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
    background-color: #7B6345;
  }
  table > tbody > tr:not(:last-child) > td {
    border-bottom:  1px solid #7B6345;
  }
}

</style>