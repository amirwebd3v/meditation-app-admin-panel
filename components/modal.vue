<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" :color="activeButton.color" :text="activeButton.text" :variant="activeButton.variant" />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="props.title" class="bg-light-brown-1" rounded="lg">
        <template v-slot:append>
          <v-btn size="x-small" rounded="xl" color="transparent" variant="flat" icon="mdi-close" @click="isActive.value = false" />
        </template>
        <slot name="content" />
        <v-divider class="mt-4" />
        <v-card-actions class="ma-1 mx-2">
          <slot name="action" :props="{ props: isActive }" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>


<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    default: 'Card title'
  },
  activeButton: {
    type: Object,
    default: {
      color: 'surface-variant',
      text: 'Open Dialog',
      variant: 'flat'
    }
  }
})

</script>


<style scoped lang="scss">

</style>