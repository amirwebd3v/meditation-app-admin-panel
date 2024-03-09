<script setup lang="ts">
import type {Category} from "~/utils/types";

defineProps({
  categories: {
    type: Map<number, Category>,
    required: true,
    default: []
  },
  type: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:selectedCategories'])

const selectedCategories = ref([])

const handleCategorySelection = (selected) => {
  selectedCategories.value = selected
  const selectedChips = selectedCategories.value.length === 0 ? [] : selectedCategories.value
  emit('update:selectedCategories', selectedChips)
}

</script>

<template>
  <!--      Second section-->
  <v-row justify="space-between" align="center" class="px-3">
    <span class="text-white font-weight-medium font-18">Categories</span>
    <LazyModalsCategoryAdd :category-type="type" />
  </v-row>

  <!--      Third section-->
  <v-row justify="start" align="center" class="mt-4 mb-1">
    <v-col cols="auto">
        <v-chip-group
            v-if="!!categories.size"
            multiple
            selected-class="text-white bg-primary border-none"
            variant="flat"
            mandatory="force"
            :show-arrows="false"
            @update:model-value="handleCategorySelection"
        >

          <v-chip size="large" :ripple="false" class="px-4 font-weight-light text-white" text="All"
                  style="border-color: #96AE50 !important;" variant="outlined" >
            <template v-slot:append>
              <v-icon class="mdi mdi-close pl-5 cursor-pointer" size="x-small" @click=""></v-icon>
            </template>
          </v-chip>
          <v-chip
              :ripple="false"
              size="large"
              class="pr-4 font-weight-light text-white"
              style="border-color: #96AE50 !important;"
              variant="outlined"
              v-for="category in [...categories.values()]"
              :key="category.slug"
              :text="category.name"
          >
            <template v-slot:append>
              <LazyModalsCategoryDelete :slug="category.slug" :name="category.name" :category-type="type"/>
            </template>
          </v-chip>
        </v-chip-group>
    </v-col>
  </v-row>
</template>
