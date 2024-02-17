<script setup lang="ts">
const props = defineProps({
  formTitle: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  saveBtn: {
    required: true ,
  },
  dialogStatus: {
    type: Boolean,
    required: true
  }
});
/*********************************************/
const state = reactive({
  dialog: false
})

watchEffect(() => {
  state.dialog = props.dialogStatus
})



</script>

<template>

  <v-dialog
      v-model="state.dialog"
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
                @click="state.dialog = false"
            />
            <v-btn
                :disabled="loading"
                :loading="loading"
                class="text-white  px-14 bg-primary"
                rounded="xl"
                size="large"
                variant="outlined"
                text="Save"
                @click="saveBtn"
            >
            </v-btn>
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