<script setup lang="ts">
const currentOpenMenu = ref(false);


useListen('closeMenu', (value: Boolean) => {
  if (currentOpenMenu.value) {
    currentOpenMenu.value = value
  }
});


</script>

<template>

  <v-menu
      :close-on-content-click="false"
      location="start" v-model="currentOpenMenu"
  >
    <template v-slot:activator="{ props }">
      <v-icon
          class="text-primary mr-5"
          v-bind="props"
          size="large"
          icon="mdi mdi-dots-vertical"
      />
    </template>

    <v-card class="bg-light-brown-1 px-2 py-1 v-row" rounded>
      <slot name="items"/>
    </v-card>
  </v-menu>
</template>
