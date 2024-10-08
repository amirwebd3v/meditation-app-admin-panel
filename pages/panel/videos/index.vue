<script setup lang="ts">

import Categories from "~/components/configuration/Categories.vue";
import AddConfigurationItem from "~/components/configuration/AddConfigurationItem.vue";
import type {FilterSearchItem} from "l5-client";
import type {Category,ValidationRules} from "~/utils/types";
import {VDataTableServer} from "vuetify/components/VDataTable";
import {CourseType} from "~/utils/enums";


const {items, meta} = storeToRefs(useVideoStore())
const { $validationRules }: { $validationRules: ValidationRules } = useNuxtApp()
/***********************************************/
definePageMeta({
  middleware: 'sanctum:auth',
})

onBeforeMount(() => {
  useCategoryStore().fetch(CourseType.Video);
  load()
});

/***********************************************/
const loading = ref(false)
const searchText = ref('')
const router = useRouter();
const selectedCategories = ref(['*'])

const headers = [
  {key: 'title', title: 'TITLE', align: 'start', sortable: true, width:'125'},
  {key: 'category', title: 'TAGS', sortable: false, align: 'center'},
  {key: 'lessons_count', title: 'QUANTITY', sortable: true, align: 'center'},
  {key: 'thumbnail', title: 'PICTURE', sortable: false, align: 'center'},
  {key: 'price', title: 'PRICE($)', sortable: true, align: 'center'},
  {key: 'actions', title: '', sortable: false, align: 'end'},
] as VDataTableServer['headers']

/***********************************************/
const load = async (options = {}) => {
  if (loading.value) {
    return
  }
  loading.value = true
  let categoriesFilter = selectedCategories.value.filter(c => c !== '*').join(',')
  const search: FilterSearchItem[] = [
    ...searchText.value === '' ? [] : [
      {field: 'title', operator: 'ilike', value: searchText.value},
      {field: 'description', operator: 'ilike', value: searchText.value},
      {field: 'price', operator: 'like', value: searchText.value}
    ],
    ...categoriesFilter.length > 0 ? [
      {field: 'categories.slug', operator: 'in', value: categoriesFilter}
    ] : []
  ]
  const params = useApi().prepareQueryParams(options , search)
  params.relations = ['categories']
  await useVideoStore().paginate(params)
  loading.value = false
}

const categoriesTooltip = (categories) => {
  return categories && categories.length > 0
      ? categories.map(category => category.name).join(',')
      : '';
}


const categoriesSelectionSort = (categories) => {

  if (!selectedCategories.value.includes('*') && !selectedCategories.value.includes('')) {
    const firstPartOfSelectedCategories = selectedCategories.value.map(value => value.split('-')[0]);
    const toolTips = [categoriesTooltip(categories)][0].split(',')
    return toolTips.filter(tag => firstPartOfSelectedCategories.includes(tag))[0]
  } else if (!!categories && categories.length > 0
      && selectedCategories.value === ['*']
      || selectedCategories.value !== [""]
  ) {
    return categories[0]?.name
  } else {
    return ''
  }
}


const handleSelectedCategories = (categories) => {
  selectedCategories.value = categories
  load()
}

useListen('refreshVideosCourseTable',load)

const goToLesson = (courseId: string) => {
  if (courseId) {
    router.push({
      name: 'panel-videos-id-lessons',
      params: {id: courseId},
    })
  }
}


</script>

<template>

    <!--      First section-->
    <v-sheet class="d-flex mb-6 align-center">
      <v-sheet color="red">
        <h2 class="text-white pr-10 me-auto">Video Courses</h2>
      </v-sheet>
      <v-sheet class="mr-5 pt-5" width="475px">
        <v-text-field maxlength="31"
                      @keyup.enter="load"
                      v-model="searchText"
                      :rules="[$validationRules.maxLength]"
                      density="compact"
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

    <Categories :categories="useCategoryStore().videoCategories" :type="CourseType.Video"
                @update:selectedCategories="handleSelectedCategories"/>
    <AddConfigurationItem Item="All courses"/>


    <v-data-table-server
        class="mt-8 rounded-lg bg-light-brown-1"
        :items-length="+meta.total"
        :page="meta.current_page"
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
            <div style="width: 200px;" class="text-truncate" v-bind="props">{{ item.title }}</div>
          </template>
        </v-tooltip>
      </template>



      <template #item.category="{item}">
        <v-tooltip :text="categoriesTooltip(item.categories)"
                   max-width="270">
          <template v-slot:activator="{props}">
            <div class="text-truncate" style="max-width: 125px;" v-bind="props">
              {{ !!item.categories ? categoriesSelectionSort(item.categories) : '' }}
            </div>
          </template>
        </v-tooltip>
      </template>


      <template #item.lessons_count="{item}">
        <div class="text-center">{{ item.lessons_count }}</div>
      </template>


        <template #item.thumbnail="{ item }">

          <div class="v-row justify-center">
            <v-card v-if="!!item.thumbnail" class="my-1" elevation="0" rounded color="light">
              <v-img  :src="item.thumbnail.urls.original" lazy-src="/img/video-card.jpg" height="38" width="38" cover>
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

      <template #item.price="{item}">
        {{ item.price || 'Free' }}
      </template>

      <template #item.actions="{item}">
        <div style="width: 80px;" class="float-right mx-0 px-0 v-row align-center">
          <DataTableMenu>
            <template #items>
              <ModalsVideoLessonAdd :course-id="item.uuid" :course-title="item.title" :btn-out-table="false" :btn-in-table="true"/>
              <ModalsVideoCourseEdit
                  :id="item.uuid"
                  :title="item.title"
                  :description="item.description"
                  :categories="item.categories.map((c : Category) => c.id)"
                  :price="item.price"
                  :thumbnail="{url : item.thumbnail?.urls?.original , fileName : item.thumbnail?.file_name}"
                  :key="item.updated_at"
              />
              <ModalsVideoCourseDelete :id="item.uuid" :title="item.title"
                                                :lesson-count="item.lessons_count" :transaction-count="0"/>
            </template>
          </DataTableMenu>
          <v-icon
              class="text-primary"
              icon="mdi-chevron-right"
              size="x-large"
              @click="goToLesson(item.uuid)"
          />
        </div>
      </template>
    </v-data-table-server>

</template>


