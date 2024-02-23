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
        card-title="All Meditations"
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
    >
      <template v-slot:title="{props}">
        <div class="d-flex justify-space-between px-2">
          <v-card-title v-text="props.cardTitle" />
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

const {items, meta} = storeToRefs(useMeditationStore())

</script>


<style scoped lang="scss">

</style>