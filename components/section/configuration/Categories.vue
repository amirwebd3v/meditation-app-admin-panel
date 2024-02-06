<script setup lang="ts">


import AddCategory from "~/components/section/modals/category/Add.vue";

defineProps<{
  Filters: Array<string>
}>()

</script>

<template>
  <!--      Second section-->
  <v-row justify="space-between" align="center" class="mt-2 px-3">
    <span class="text-white font-weight-medium font-18">Categories</span>
    <AddCategory />
  </v-row>

  <!--      Third section-->
  <v-row justify="start" align="center">
    <v-col cols="auto">
      <v-sheet class="bg-transparent">
        <v-chip-group
            multiple
            selected-class="text-white bg-primary border-none"
            variant="flat"
            mandatory="force"
        >
          <v-chip
              size="large"
              class="px-4 font-weight-light text-white"
              style="border-color: #96AE50 !important;"
              variant="outlined"
              v-for="filter in Filters"
              :key="filter"
              :text="filter"
          >
            <template v-slot:append>
              <v-icon class="mdi mdi-close pl-4 cursor-pointer" size="x-small" @click=""></v-icon>
            </template>
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">

</style>