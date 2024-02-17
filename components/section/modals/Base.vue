<script setup lang="ts">
defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
  formTitle: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  }
});
/*********************************************/


</script>

<template>

  <v-dialog
      :v-model="dialog"
      max-width="500px"
  >

    <template v-slot:activator="{ props }">
      <slot name="button" v-bind="props"/>
    </template>

    <v-card class="bg-light-brown-1 px-2 py-1" rounded="lg">
      <v-container>

        <v-card-title>
          {{ formTitle }}
        </v-card-title>


        <v-card-text>
            <slot name="columns"/>
        </v-card-text>

        <v-card-actions class="float-right pt-0 mr-2">
          <div class="d-sm-flex">
            <v-btn
                color="primary"
                class="px-12"
                size="large"
                rounded="xl"
                variant="outlined"
                text="Cancel"
            />

            <slot name="actions"/>

          </div>
        </v-card-actions>
      </v-container>
    </v-card>

  </v-dialog>

</template>


<style scoped lang="scss">
div:deep(.v-file-input) {
  height: 150px;
}
</style>