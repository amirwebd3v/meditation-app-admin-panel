<template>
  <v-container fluid>
    <v-card>
      <v-data-table-server
          v-if="!!items"
          v-model:items-per-page="meta.per_page"
          :headers="headers"
          :items-length="0"
          :items="items"
          search=""
          item-value="name"
          @update:options="load"
      />
    </v-card>
  </v-container>
</template>

<script>
import {useMeditationStore} from "~/stores/meditation.js";
import {mapState} from "pinia";

export default {
  name: 'Testy',

  setup() {
    const { fetch  } = useMeditationStore()

    onMounted(() => {
      fetch(2, 5, 'id', 'asc')
    })

    return { fetch }
  },

  computed: {
    ...mapState(useMeditationStore, ['items', 'meta'])
  },

  methods: {
    load({ page, itemsPerPage, sortBy }) {
      useMeditationStore().fetch(page, itemsPerPage, sortBy)
    }
  },
}
</script>