<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-icon class="text-primary mr-5" v-bind="props" size="large" icon="mdi mdi-dots-vertical"/>
    </template>

    <v-card class="bg-light-brown-1 px-3 py-3 v-row" rounded>
      <slot name="default" />
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>