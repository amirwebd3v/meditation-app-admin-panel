<script setup lang="ts">
const dialog = ref(false);


useListen('closeModal', (value: Boolean) => {
  if (dialog.value) {
    dialog.value = value
  }
});


</script>

<template>

  <v-dialog
      v-model="dialog"
      max-width="600"
  >

    <template v-slot:activator="{ props }">
      <slot name="dialogButton" v-bind="props"/>
    </template>

    <v-card class="bg-light-brown-1 py-1" rounded="lg">
      <v-container>

        <v-card-title class="v-row justify-space-between align-center mt-auto">
          <slot name="header"/>
        </v-card-title>



        <v-card-text>
            <slot name="columns" />
          </v-card-text>

          <v-card-actions class="float-right pt-0 mr-1 mt-auto">
            <div class="d-sm-flex">
              <slot name="actionButtons"/>
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