<template>
  <v-container fluid>
    <table-server
        :total="meta?.total || 0"
        :items="items"
        :page="table.page"
        :per-page="table.perPage"
        :fetch="useMeditationStore().paginate"
        default-sort-key="created_at"
        default-sort-order="desc"
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
const table = ref({
  page: 1,
  perPage: 5,
  searchableFields: [
    {field: 'title', operator: 'like'},
    {field: 'description', operator: 'like'},
    {field: 'categories.slug', operator: 'in'},
    {field: 'categories.name', operator: 'like'},
  ]
})

</script>


<style scoped lang="scss">

</style>