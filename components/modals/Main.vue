<script setup lang="ts">
const dialog = ref(false);


useListen('closeModal', (value: Boolean) => {
  if (dialog.value) {
    dialog.value = value
  }
});



const emit = defineEmits(['OnClickOutside'])
watch(dialog, (newValue) => {
  if (!newValue) {
    emit('OnClickOutside');
  }
});

</script>

<template>

  <v-dialog
      v-model="dialog"
      max-width="600"
  >
    <template v-slot:activator="{ props }" v-if="$slots.dialogButton">
      <slot name="dialogButton" v-bind="props"/>
    </template>

    <v-card class="bg-light-brown-1 py-1" rounded="lg">
      <v-container>

        <v-card-title class="v-row justify-space-between align-center my-auto" v-if="$slots.header">
          <slot name="header"/>
        </v-card-title>



        <v-card-text v-if="$slots.columns">
            <slot name="columns" />
          </v-card-text>

          <v-card-actions class="float-right mr-1" v-if="$slots.actionButtons">
            <div class="d-sm-flex">
              <slot name="actionButtons"/>
            </div>
          </v-card-actions>


      </v-container>
    </v-card>

  </v-dialog>

</template>
