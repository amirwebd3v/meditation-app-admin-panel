<template>

  <!--      First section-->
  <v-sheet class="d-flex mb-6 bg-transparent align-center">

    <v-sheet class="bg-transparent">
      <h2 class="text-white pr-10 me-auto">{{ header }}</h2>
    </v-sheet>
    <v-sheet class="bg-transparent mr-5" width="475px">
      <v-text-field
          v-model="search"
          density="comfortable"
          hide-details
          variant="outlined"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          single-line
      />
    </v-sheet>
    <v-sheet class="bg-transparent ml-auto" v-if="isCoursePage">
      <AddVideo :is-btn-text="isBtnText" v-if="isVideoPage"/>
      <AddMeditation :is-btn-text="isBtnText" v-if="isMeditationPage"/>
    </v-sheet>

  </v-sheet>


  <slot name="outsideTable"/>

  <!--      Fifth section-->
  <v-data-table :search="search"
                :items="items"
                class="mt-10 rounded-lg bg-light-brown-1"
                :headers="tableHeaders">

    <template v-for="(slot, name) in $slots" v-slot:[name]="item">
      <slot :name="name" v-bind="item"></slot>
    </template>

  </v-data-table>
</template>

<script setup lang="ts">

import AddVideo from "~/components/section/modals/video/Add.vue";
import AddMeditation from "~/components/section/modals/meditation/Add.vue";

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
  menu: {
    type: Boolean,
    default: false,
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
</script>

<style lang="scss" scoped>
div:deep(.v-table__wrapper) {
  thead {
    background-color: #7C6346;
  }
}
</style>