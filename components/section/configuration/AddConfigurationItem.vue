<script setup lang="ts">
defineProps<{
  Item: string
  BtnText: string
}>()
</script>

<template>
  <!--      Fourth section-->
  <v-row justify="space-between" align="center" class="mt-4 px-3">
    <span class="text-white font-weight-medium font-18 ">{{ Item }}</span>
    <v-btn
        color="primary"
        class="px-6"
        :text="BtnText"
        :size="$vuetify.display.smAndDown ? 'small' : 'default'"
        rounded="xl"
        :icon="$vuetify.display.smAndDown"
    >
      <template v-slot:default v-if="$vuetify.display.smAndDown">
        <v-icon class="mdi mdi-plus"/>
      </template>
      <template v-slot:prepend v-if="$vuetify.display.smAndUp">
        <v-icon class="mdi mdi-plus"/>
      </template>
    </v-btn>
  </v-row>
</template>

<style scoped lang="scss">

</style>