<script setup lang="ts">
useHead({
  title: 'OmniWellScan'
})


</script>

<template>
  <v-app>
    <v-main>
      <slot/>
    </v-main>
  </v-app>
</template>

<style lang="scss">
@import '@/assets/scss/style.scss';
</style>
