<script setup lang="ts">

import AddVideo from "~/components/section/modals/video/Add.vue";
import AddMeditation from "~/components/section/modals/meditation/Add.vue";
import {integer} from "vscode-languageserver-types";

defineProps({
  header: {
    type: String,
    required: true
  },
  search: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    required: true,
  },
  tableHeaders: {
    type: Array,
    required: true,
  },
  page:{
    type: Number,
    default: '1',
  },
  pageCount:{
    type: Number ,
    default: '0',
  },
  perPage:{
    type: Number ,
    default: '30',
  } ,
  sortBy:{
    type: String,
    default: 'created_at',
  },
  sortDesc:{
    type: Boolean,
    default: true,
  },
  loading:{
    type: Boolean,
    default: true,
  },
  searchText:{
    type: String,
    default: '',
  },
  menu: {
    type: Boolean,
    default: false,
  },
  dispatch: {
    type: Object,
    default: {},
  },
});

/*******************************************/
const search = ref('')
const isBtnText = ref('')

/*******************************************/

const router = useRouter();
const currentRouteName = router.currentRoute.value.name;

const isCoursePage = computed(() => {

  if (currentRouteName === 'panel-video-id') {
    isBtnText.value = "Add course"
  } else if (currentRouteName === 'panel-meditation-id') {
    isBtnText.value = "Add Meditation"
  }
  return currentRouteName === 'panel-video-id' || currentRouteName === 'panel-meditation-id';
})

const isVideoPage = computed(() => {
  return currentRouteName === 'panel-video-id' || currentRouteName === 'panel-video';
})
const isMeditationPage = computed(() => {
  return currentRouteName === 'panel-meditation-id' || currentRouteName === 'panel-meditation';
})
/*******************************************/







</script>

<template>

  <!--      First section-->
  <v-sheet class="d-flex mb-6 bg-transparent align-center">

    <v-sheet class="bg-transparent">
      <h2 class="text-white pr-10 me-auto">{{ header }}</h2>
    </v-sheet>
    <v-sheet class="bg-transparent mr-5" width="475px">
      <v-text-field
          @click:clear="clearSearch"
          :readonly="loading"
          v-model="search"
          @keydown.enter="searchItems"
          clearable=""
          density="comfortable"
          hide-details
          variant="outlined"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          single-line
      ></v-text-field>
    </v-sheet>
    <v-sheet class="bg-transparent ml-auto" v-if="isCoursePage">
      <AddVideo :is-btn-text="isBtnText" v-if="isVideoPage"/>
      <AddMeditation :is-btn-text="isBtnText" v-if="isMeditationPage"/>
    </v-sheet>

  </v-sheet>


  <slot name="outsideTable"/>

  <!--      Fifth section-->
  <v-data-table class="mt-10 rounded-lg bg-light-brown-1"
                :search="search"
                :items="items"
                :headers="tableHeaders"
                :page.sync="page"
                :loading="loading"
                @update:items-per-page="perPage = arguments[0]"
                :items-per-page="perPage"
                :footer-props="footerProps"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                loading-text="Data is coming..."
                no-data-text="Nothing to show in here!"
                 must-sort
  >

    <template v-for="(slot, name) in $slots" v-slot:[name]="item">
      <slot :name="name" v-bind="item"></slot>
    </template>

    <template v-slot:no-data>
      <v-col cols="12">
        <span v-text="'Nothing to show in here!'"/>
      </v-col>
      <v-btn outlined fab x-small icon color="primary" class="my-5" @click="fetchItems">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </template>
  </v-data-table>


</template>

<style lang="scss" scoped>
div:deep(.v-table__wrapper) {
  thead {
    background-color: #7C6346;
  }
}
</style>