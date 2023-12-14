<template>
  <v-container fluid>
    <v-card>
      <v-text-field @keyup.enter="load({page: 1, itemsPerPage: 15})" v-model="searchText" hide-details placeholder="Search name..." class="ma-2" density="compact"></v-text-field>
      <v-data-table-server
          v-if="!!items"
          :page="meta.page"
          :items-per-page="meta.per_page"
          :items-length="meta.total"
          show-current-page
          :loading="loading"
          :items="items"
          @update:options="load"
      />
    </v-card>
  </v-container>
</template>


<script>
import { useMeditationStore } from "~/stores/meditation.js";
import { mapState } from "pinia";

export default {
  name: "Testy",
  setup() {

    const loading = ref(true);
    const searchText = ref('');

    const load = (options) => {
      loading.value = true;

      const conditions = [
        {key: 'title', operator: 'like', value: searchText.value}
      ]

      useMeditationStore().fetch(options.page, options.itemsPerPage, options.sortedBy, 'desc', conditions)
          .finally(() => {
            loading.value = false;
          });
    };

    return {loading, searchText, fetch, load};

  },

  computed: {
    ...mapState(useMeditationStore, ["items", "meta"]),
  },
};
</script>