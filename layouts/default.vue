<script setup lang="ts">
import Header from "~/components/header/Header.vue";


useHead({
 title: 'OmniWellScan'
})


</script>

<template>
  <v-app>
    <Header/>
    <v-main>
      <v-container fluid :class="`${useRoute().path === '/panel' ? 'fill-height d-flex flex-column align-center' : ''}`">
      <slot/>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
@import '@/assets/scss/style.scss';
</style>
