<template>
  <v-container fluid>
    <table-server
        :perPage="10"
        :items="items"
        :total="meta?.total || 0"
        :on-fetch="useMeditationStore().paginate"
        defaultSortKey="created_at"
        defaultSortOrder="desc"
        searchJoin="or"
        card-title="Course list"
        loadingText="Loading items . . ."
        searchLabel="Search items"
        clear-items-before-fetching
        :searchable-fields="[
          {field: 'title', operator: 'like'},
          {field: 'description', operator: 'like'},
          {field: 'categories.slug', operator: 'in'},
          {field: 'categories.name', operator: 'like'},
        ]"
        :itemPerPageOptions="[
          {title: '5', value: 5},
          {title: '10', value: 10},
          {title: '20', value: 20},
          {title: '50', value: 50},
          {title: 'All', value: -1},
        ]"
    />
  </v-container>
</template>


<script setup lang="ts">

const {items, meta} = storeToRefs(useMeditationStore())

</script>


<style scoped lang="scss">

</style>