<template>
  <v-container>
    <table-server
        :perPage="10"
        :items="items"
        :headers="headers"
        :total="meta?.total || 0"
        :searchable-fields="searchableFields"
        :on-fetch="useMeditationStore().paginate"
        table-class="mt-10 rounded-lg bg-light-brown-1"
        card-title="All Meditations"
    >

      <template v-slot:search="{props}">
        <v-sheet class="d-flex mb-6 bg-transparent align-center" v-if="searchableFields.length">
          <v-sheet class="bg-transparent">
            <h2 class="text-white pr-10 me-auto">Meditations</h2>
          </v-sheet>
          <v-sheet class="bg-transparent mr-5" width="475px">
            <v-text-field
                @keyup.enter="props.search"
                @click:clear="props.search"
                :label="props.searchLabel"
                :readonly="props.loading"
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-magnify"
                clearable
                single-line
                hide-details
            />
          </v-sheet>
        </v-sheet>
      </template>

      <template v-slot:title="{props}">
        <div class="d-flex justify-space-between">
          <v-card-title v-text="props.cardTitle"/>
          <v-card-actions>
            <v-btn
                class="bg-primary"
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
          </v-card-actions>
        </div>
      </template>

      <template v-slot:item.title="{item}">
        <v-tooltip :text="item.title">
          <template v-slot:activator="{ props }">
            <div class="text-truncate" style="max-width: 125px;" v-bind="props">{{ item.title }}</div>
          </template>
        </v-tooltip>
      </template>

      <template v-slot:item.thumbnail="{ item }">
        <v-card v-if="!!item.thumbnail" class="my-2" elevation="0" rounded color="light">
          <v-img :src="item.thumbnail.urls.small" height="64" cover/>
        </v-card>
      </template>

      <template v-slot:item.is_popular="{ item }">
        <v-icon color="primary" v-if="item.is_popular">mdi-check</v-icon>
        <v-icon color="error" v-else>mdi-close</v-icon>
      </template>

    </table-server>
  </v-container>
</template>


<script setup lang="ts">

import type {FilterSearchItem} from "l5-client/src/types";

const {items, meta} = storeToRefs(useMeditationStore())

const searchableFields: Array<Omit<FilterSearchItem, 'value'>> = [
  {field: 'title', operator: 'like'},
  {field: 'description', operator: 'like'},
  {field: 'price', operator: 'like'},
  {field: 'is_popular', operator: 'like'},
  {field: 'categories.slug', operator: 'in'},
  {field: 'categories.name', operator: 'like'},
]

const headers = [
  {key: 'title', title: 'TITLE', align: 'start', sortable: true},
  {key: 'set', title: 'TYPE', align: 'center', sortable: false},
  {key: 'category', title: 'CATEGORY', align: 'start', sortable: false},
  {key: 'description', title: 'DESCRIPTION', align: 'start', sortable: false},
  {key: 'lessons_count', title: 'QUANTITY', align: 'center', sortable: true},
  {key: 'thumbnail', title: 'PICTURE', align: 'center', sortable: false},
  {key: 'is_popular', title: 'POPULAR', align: 'center', sortable: true},
  {key: 'price', title: 'PRICE', align: 'center', sortable: true},
  {key: 'actions', title: '', align: 'start', sortable: false},
]

</script>


<style scoped lang="scss">
div:deep(.v-table__wrapper) {
  thead {
    background-color: #7B6345;
  }

  table > tbody > tr:not(:last-child) > td {
    border-bottom: 1px solid #7B6345;
  }
}
</style>