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
      <v-container fluid>
      <slot/>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
@import '@/assets/scss/style.scss';
</style>
