<script setup lang="ts">

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
    <v-main>
      <slot/>
    </v-main>
  </v-app>
</template>

<style lang="scss">
@import '@/assets/scss/style.scss';
</style>
