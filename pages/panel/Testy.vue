<template>
  <v-container fluid>
    <v-card>
      <v-text-field @keyup.enter="load({page: 1, itemsPerPage: 15})" v-model="searchText"
                    hide-details placeholder="Search name..." class="ma-2" density="compact" />
      <v-data-table-server
          v-if="!!items"
          :page="meta.page"
          :items-per-page="meta.per_page"
          :items-length="meta.total"
          show-current-page
          :loading="loading"
          :headers="headers"
          :items="items"
          @update:options="load"
      >

        <template #item.thumbnail="{ item }">
          <v-card class="my-2" elevation="2" rounded>
            <v-img :src="item.thumbnail.urls.small" height="64" cover="" />
          </v-card>
        </template>

      </v-data-table-server>
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
    const headers = [
      {key: 'title', title: 'Title', align: 'start', sortable: true},
      {key: 'set', title: 'Type', sortable: false},
      {key: 'category', title: 'Category', sortable: false},
      {key: 'description', title: 'Description', sortable: true},
      {key: 'lessons_count', title: 'Quantity', sortable: true, align: 'center'},
      {key: 'thumbnail', title: 'Picture', sortable: false, align: 'center'},
      {key: 'price', title: 'Price', sortable: true},
      {key: 'actions', title: '', sortable: false},
    ];

    const load = (options) => {
      loading.value = true;

      const conditions = [
        {key: 'title', operator: 'like', value: searchText.value}
      ]

      useMeditationStore().fetch(options.page, options.itemsPerPage, !!options.sortBy?.length ? options.sortBy[0].key : null, !!options.sortBy?.length ? options.sortBy[0].order : null, conditions)
          .finally(() => {
            loading.value = false;
          });
    };

    return {headers, loading, searchText, fetch, load};

  },

  computed: {
    ...mapState(useMeditationStore, ["items", "meta"]),
  },
};
</script>