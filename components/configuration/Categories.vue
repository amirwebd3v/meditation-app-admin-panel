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

const selectedCategories = ref<string[]>(['*'])

const handleCategorySelection = (selected: string[]) => {
  if (selected[0] === '*' && selected.length > 1) {
    selectedCategories.value = selected.filter(category => category !== '*');
  } else if (selected[selected.length - 1] === '*' && selected.length > 1) {
    selectedCategories.value = ['*'];
  } else {
    selectedCategories.value = selected.filter(category => category !== '*');
  }

  const selectedChips = selectedCategories.value;
  emit('update:selectedCategories', selectedChips);
};
</script>
<template>
  <!--      Second section-->
  <v-row justify="space-between" align="center" class="px-3">
    <span class="text-white font-weight-medium font-18">Tags</span>
    <LazyModalsCategoryAdd :category-type="type"/>
  </v-row>

  <!--      Third section-->
  <v-row justify="start" align="center" class="mt-4 mb-1">
    <v-col cols="auto">
      <v-chip-group
          v-if="!!categories.size"
          multiple
          selected-class="text-white bg-primary border-none"
          variant="flat"
          mandatory
          :show-arrows="false"
          :model-value="selectedCategories"
          @update:model-value="handleCategorySelection"
      >
        <v-chip
            size="large"
            :ripple="false"
            class="px-4 font-weight-light text-white"
            text="All"
            variant="outlined"
            value="*"
        />

        <v-chip
            :ripple="false"
            size="large"
            class="pr-4 font-weight-light text-white"
            variant="outlined"
            v-for="category in [...categories.values()]"
            :key="category.slug"
            :text="category.name"
            :value="category.slug"
        >
        <template v-slot:append>
          <LazyModalsCategoryDelete :slug="category.slug" :name="category.name" :category-type="type"/>
        </template>
        </v-chip>
      </v-chip-group>
    </v-col>
  </v-row>
</template>