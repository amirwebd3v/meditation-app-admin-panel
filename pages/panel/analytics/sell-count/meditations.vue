<script setup lang="ts">


import type {FilterSearchItem} from "l5-client";
import type {ValidationRules} from "~/utils/types";
import {VDataTableServer} from "vuetify/components/VDataTable";
import {CourseType} from "~/utils/enums";
import AddConfigurationItem from "~/components/configuration/AddConfigurationItem.vue";
import {useAnalyticStore} from "~/stores/analytic";


const {meditationAnalytics, meditationMeta, meditationTotalSum} = storeToRefs(useAnalyticStore())
const {$validationRules}: { $validationRules: ValidationRules } = useNuxtApp()
/***********************************************/
definePageMeta({
  middleware: 'sanctum:auth',
})

onBeforeMount(() => {
  load()
});

/***********************************************/
const loading = ref(false)
const searchText = ref('')
const router = useRouter();


const headers = [
  {key: 'title', title: 'TITLE', align: 'start', sortable: false, width: '125'},
  {key: 'set', title: 'TYPE', sortable: false, align: 'center'},
  {key: 'category', title: 'TAGS', sortable: false, align: 'center'},
  {key: 'meditations_count', title: 'MEDITATION QUANTITY', sortable: false, align: 'center'},
  {key: 'count', title: 'DOWNLOADS QUANTITY', sortable: true, align: 'center'},
  {key: 'price', title: 'PRICE($)', sortable: false, align: 'center'},
  {key: 'total', title: 'TOTAL($)', sortable: true, align: 'center'},
] as VDataTableServer['headers']

/***********************************************/
const load = async (options = {}) => {
  if (loading.value) {
    return
  }
  loading.value = true
  // const search: FilterSearchItem[] = [
  //   ...searchText.value === '' ? [] : [
  //     {field: 'title', operator: 'ilike', value: searchText.value},
  //     {field: 'price', operator: 'like', value: searchText.value}
  //   ],
  // ]
  const params = useApi().prepareQueryParams(options)
  params.relations = ['categories']
  await useAnalyticStore().fetch(CourseType.Meditation, params)
  loading.value = false
}

const categoriesTooltip = (categories) => {
  return categories && categories.length > 0
      ? categories.map(category => category.name).join(',')
      : '';
}


useListen('refreshAnalyticsCourseTable', load)

</script>

<template>

  <!--      First section-->
  <v-sheet class="d-flex mb-6 align-center">
    <v-sheet color="red">
      <h2 class="text-white pr-10 me-auto">Analytics section</h2>
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


  <AddConfigurationItem Item="All meditations"/>


  <v-data-table-server
      class="mt-8 rounded-lg bg-light-brown-1"
      :items-length="+meditationMeta.total"
      :page="meditationMeta.current_page"
      :items="[...meditationAnalytics.values()]"
      @update:options="load"
      :loading="loading"
      :headers="headers"
      sort-desc-icon="mdi-arrow-up-thin"
      sort-asc-icon="mdi-arrow-down-thin"
      show-current-page
  >
    <template #item.title="{item}">
      <v-tooltip :text="item.course.title">
        <template v-slot:activator="{ props }">
          <div style="width: 200px;" class="text-truncate" v-bind="props">{{ item.course.title }}</div>
        </template>
      </v-tooltip>
    </template>

    <template #item.set="{ item }">
      {{ item.course.set === 'MULTIPLE' ? 'Course' : 'Single' }}
    </template>


    <template #item.category="{item}">
      <v-tooltip :text="categoriesTooltip(item.course.categories)"
                 max-width="270">
        <template v-slot:activator="{props}">
          <div class="text-truncate" style="max-width: 125px;" v-bind="props">
            {{ item?.course?.categories[0]?.name }}
          </div>
        </template>
      </v-tooltip>
    </template>


    <template #item.meditations_count="{item}">
      <div class="text-center">{{ item.course.lessons_count }}</div>
    </template>


    <template #item.count="{item}">
      <div class="text-center">{{ item.count }}</div>
    </template>


    <template #item.price="{item}">
      <div class="text-center">{{ item.course.price || 'Free' }}</div>
    </template>

    <template #item.total="{item}">
      <div class="text-center">{{ item.total }}</div>
    </template>
  </v-data-table-server>

  <div class="float-right mt-8 mr-4">
    <v-row>
      <span class="text-white mr-4 mt-2">TOTAL ($):</span>
      <v-text-field variant="outlined"
                    color="primary"
                    readonly
                    density="compact">{{ meditationTotalSum }}
      </v-text-field>
    </v-row>
  </div>

</template>


