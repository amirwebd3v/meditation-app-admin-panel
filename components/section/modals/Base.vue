<script setup lang="ts">


const props = defineProps({
  formTitle: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  actionBtn: {
    type: Function,
    default: () => null
  },
  dialogStatus: {
    type: Boolean,
    default: false
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
      <slot name="button" v-bind="props" />
    </template>

    <v-card class="bg-light-brown-1 py-1" rounded="lg">
      <v-container>

        <v-card-title>
          {{ formTitle }}
        </v-card-title>


        <v-card-text>
          <slot name="columns"/>
        </v-card-text>

        <v-card-actions class="float-right pt-0 mr-1 mt-auto">
          <div class="d-sm-flex">
            <v-btn
                :density="$vuetify.display.smAndDown ? 'comfortable' : 'default'"
                color="primary"
                :class="{
              'px-7': $vuetify.display.smAndDown,
              'px-12':$vuetify.display.mdAndUp}"
                size="large"
                rounded="xl"
                variant="outlined"
                text="Cancel"
                @click="state.dialog = false"
            />
            <v-btn
                v-if="['save', 'update'].some(prefix => props.actionBtn?.name?.startsWith(prefix))"
                :disabled="loading"
                :loading="loading"
                :density="$vuetify.display.smAndDown ? 'comfortable' : 'default'"
                :class="{
                  'px-10' : $vuetify.display.smAndDown,
                  'px-14':$vuetify.display.mdAndUp,
                  'text-white bg-primary': true}"
                rounded="xl"
                size="large"
                variant="outlined"
                text="Save"
                @click="actionBtn"
            >
            </v-btn>
            <v-btn
                v-if="props.actionBtn?.name?.startsWith('delete')"
                :disabled="loading"
                :loading="loading"
                :density="$vuetify.display.smAndDown ? 'comfortable' : 'default'"
                :class="{
                  'px-10' : $vuetify.display.smAndDown,
                  'px-14':$vuetify.display.mdAndUp,
                  'text-white delete-btn-border bg-orange': true}"
                rounded="xl"
                size="large"
                variant="outlined"
                text="Delete"
                @click="actionBtn"
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