<template>
  <v-container>
    <table-server
        :perPage="10"
        :items="items"
        :total="meta?.total || 0"
        :on-fetch="useMeditationStore().paginate"
        defaultSortKey="created_at"
        defaultSortOrder="desc"
        searchJoin="or"
        card-title="All Meditations"
        loadingText="Loading items . . ."
        searchLabel="Search items"
        clear-items-before-fetching
        :searchable-fields="searchableFields"
        :itemPerPageOptions="[
          {title: '5', value: 5},
          {title: '10', value: 10},
          {title: '20', value: 20},
          {title: '50', value: 50},
          {title: 'All', value: -1},
        ]"
    >

      <template v-slot:search="{props}">
        <v-sheet class="d-flex mb-6 mx-6 bg-transparent align-center" v-if="searchableFields.length">
          <v-sheet class="bg-transparent">
            <h2 class="text-white pr-10 me-auto">Meditations</h2>
          </v-sheet>
          <v-sheet class="bg-transparent mr-5" width="475px">
            <v-text-field
                class=""
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
        <div class="d-flex justify-space-between px-2">
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

    </table-server>
  </v-container>
</template>


<script setup lang="ts">

import type {FilterSearchItem} from "l5-client/src/types";

const {items, meta} = storeToRefs(useMeditationStore())

const searchableFields: Array<Omit<FilterSearchItem, 'value'>> = [
  {field: 'title', operator: 'like'},
  {field: 'description', operator: 'like'},
  {field: 'categories.slug', operator: 'in'},
  {field: 'categories.name', operator: 'like'},
]

</script>


<style scoped lang="scss">

</style>