<script setup lang="ts">


const AddCategory = defineAsyncComponent(() => import("~/components/section/modals/category/Add.vue"));
import type {Category} from "~/utils/types";

defineProps({
  categories: {
    type: Map<number, Category>,
    default: []
  },
})

</script>

<template>
  <!--      Second section-->
  <v-row justify="space-between" align="center" class="mt-2 px-3">
    <span class="text-white font-weight-medium font-18">Categories</span>
    <AddCategory/>
  </v-row>

  <!--      Third section-->
  <v-row justify="start" align="center">
    <v-col cols="auto">
      <v-sheet class="bg-transparent">
        <v-chip-group
            v-if="!!categories.size"
            multiple
            selected-class="text-white bg-primary border-none"
            variant="flat"
            mandatory="force"
        >
          <v-chip size="large" class="px-4 font-weight-light text-white bg-primary" text="All"
                  style="border-color: #96AE50 !important;" variant="outlined">
            <template v-slot:append>
              <v-icon class="mdi mdi-close pl-4 cursor-pointer" size="x-small" @click=""></v-icon>
            </template>
          </v-chip>
          <v-chip
              size="large"
              class="px-4 font-weight-light text-white"
              style="border-color: #96AE50 !important;"
              variant="outlined"
              v-for="category in [...categories.values()]"
              :key="category.slug"
              :text="category.name"
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