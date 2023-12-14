<template>
  <v-container fluid>
    <v-card>
      <v-text-field v-model="search" hide-details placeholder="Search name..." class="ma-2" density="compact"></v-text-field>
      <v-data-table-server
          v-if="!!items"
          v-model:items-per-page="meta.per_page"
          show-current-page
          :headers="headers"
          :items-length="meta.total"
          :loading="loading"
          :items="items"
          :search="search"
          item-value="uuid"
          @update:options="load"
      />
    </v-card>
  </v-container>
</template>


<script>
import { onMounted, ref } from "vue";
import { useMeditationStore } from "~/stores/meditation.js";
import { mapState } from "pinia";

export default {
  name: "Testy",
  setup() {



    const loading = ref(true);


    onMounted(() => {
      useMeditationStore().fetch(1, 5, "id", "asc",'title');
    });

    const load = ({page, itemsPerPage, sortedBy}) => {
      loading.value = true;

      useMeditationStore().fetch(page, itemsPerPage, sortedBy)
          .then(() => {
            loading.value = false;
          });
    };

    return {fetch, load};

  },

  computed: {
    ...mapState(useMeditationStore, ["items", "meta"]),
  },






};
</script>