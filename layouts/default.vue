<script setup lang="ts">
import Header from "~/components/section/header/Header.vue";
import {useCategoryStore} from "~/stores/category";

useHead({
  meta: [
      {content: 'OmniWell'},
  ],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} Meditation ` : "OmniWell";
  },
});

onMounted(async () => {
  await useCategoryStore().fetch()
})

</script>

<template>
  <v-app>
    <Header/>
    <v-main>

      <slot/>

    </v-main>
  </v-app>
</template>

<style lang="scss">
@import '@/assets/scss/style.scss';
</style>
