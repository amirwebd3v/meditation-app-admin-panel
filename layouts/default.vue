<script setup lang="ts">
import Header from "~/components/section/header/Header.vue";

useHead({
  meta: [
      {content: 'OmniWell'},
  ],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} Meditation ` : "OmniWell";
  },
});

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
