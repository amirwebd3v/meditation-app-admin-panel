<script setup>
import Base from "~/components/section/modals/Base.vue";

defineComponent({
  name: 'DeleteMeditation',

})




</script>

<template>

  <Base form-title="Delete Meditation" >

    <template v-slot:button="props">
      <v-btn
          class="text-primary"
          variant="text"
          icon="mdi mdi-delete-outline"
          v-bind="props"
          @click="$emit('deleteAction',true)"
          size="small">
      </v-btn>
    </template>

    <template #columns>
      <v-row justify="space-between">
        <v-col cols="12" class="pb-0">
          <div class="text-subtitle-1 text-medium-emphasis py-2">Category</div>
          <v-text-field variant="outlined" color="primary" density="comfortable"
                        placeholder="Enter category name"/>
        </v-col>
      </v-row>
    </template>

  </Base>

</template>
