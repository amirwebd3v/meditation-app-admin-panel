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


</script>

<template>

  <!--      First section-->
  <v-col cols="12" md="7" sm="8">
    <v-row justify="start" align="center" class="mb-10">
      <h2 class="text-white pr-10">{{ header }}</h2>
      <v-text-field
          v-model="search"
          density="comfortable"
          hide-details
          variant="outlined"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          single-line
      ></v-text-field>
    </v-row>
  </v-col>


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