<script setup lang="ts">



function close() {
  useEvent('closeModal', false)
}
</script>

<template>
  <ModalsMain>

    <template #dialogButton="props">
      <v-btn
          color="primary"
          :width="$vuetify.display.xs || $vuetify.display.smAndDown  ? '' : '215'"
          v-bind="props"
          text="Add Meditation"
          :size="$vuetify.display.smAndDown ? 'small' : 'default'"
          :icon="$vuetify.display.smAndDown"
          rounded="xl"
      >
        <template v-slot:default v-if="$vuetify.display.smAndDown">
          <v-icon icon="mdi-plus"/>
        </template>
        <template v-slot:prepend v-if="$vuetify.display.smAndUp">
          <v-icon class="pr-3" icon="mdi-plus"/>
        </template>
      </v-btn>
    </template>

    <template #header>
      <span class="pl-3">Add Meditation</span>
      <v-icon class="pr-5 cursor-pointer" size="small" icon="mdi mdi-close" @click="close"/>
    </template>


    <template #columns>
      <ModalsMeditationCourseAdd/>
    </template>
  </ModalsMain>
</template>

<style scoped lang="scss">

</style>