<script setup lang="ts">


import Header from "~/components/section/header/Header.vue";

const title = ref("Omni-Well");
useHead({
  meta: [{content: title}],
  titleTemplate: (titleChunk) => {
    return titleChunk
        ? `${titleChunk} Meditation `
        : "Omni-Well";
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
