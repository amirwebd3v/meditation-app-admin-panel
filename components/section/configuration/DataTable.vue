<script setup lang="ts">


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

const search = ref('')

const showBtn = ref(true);
const router = useRouter();
const isCoursePage = () => {
  const currentRouteName = router.currentRoute.value.name;
  if (currentRouteName === 'panel-configurations-video' || currentRouteName === 'panel-configurations-meditation')
    return true;
};
watchEffect(() => {
  showBtn.value = !isCoursePage()
})


console.log(isCoursePage,router.currentRoute.value.name)
</script>

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
      ></v-text-field>
    </v-sheet>
    <v-sheet class="bg-transparent ml-auto" v-if="isCoursePage" >
      <v-btn
          color="primary"
          text="Add category"
          :size="$vuetify.display.smAndDown ? 'small' : 'default'"
          :icon="$vuetify.display.smAndDown"
          rounded="xl"
      >
        <template v-slot:default v-if="$vuetify.display.smAndDown">
          <v-icon class="mdi mdi-plus"/>
        </template>
        <template v-slot:prepend v-if="$vuetify.display.smAndUp">
          <v-icon class="mdi mdi-plus"/>
        </template>
      </v-btn>
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

<style lang="scss" scoped>
div:deep(.v-table__wrapper) {
  thead {
    background-color: #7C6346;
  }
}
</style>