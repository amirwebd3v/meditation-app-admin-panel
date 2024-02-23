<template>
  <v-container fluid>
    <table-server
        :items="items"
        :total="meta?.total || 0"
        :fetch="useMeditationStore().paginate"
        :searchable-fields="[
          {field: 'title', operator: 'like'},
          {field: 'description', operator: 'like'},
          {field: 'categories.slug', operator: 'in'},
          {field: 'categories.name', operator: 'like'},
        ]"
    />
  </v-container>
</template>


<script setup lang="ts">

const {items, meta} = storeToRefs(useMeditationStore())

</script>


<style scoped lang="scss">

</style>