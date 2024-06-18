<script setup lang="ts">
useHead({
  title: 'OmniWell'
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
