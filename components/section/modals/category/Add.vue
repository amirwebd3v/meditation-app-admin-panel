<script setup>
import Modal from "~/components/section/modals/Modal.vue";

defineComponent({
  name: 'AddCategory',
})

const loading = ref()
const form = ref()


const saveCategory = async () => {
  loading.value = true
  // await useMeditationStore().delete(request)
  loading.value = false
}


const close = async () => {
  await form.value.reset()
  useEvent('closeDialog', false)
}

</script>

<template>
  <v-form ref="form">

    <Modal form-title="Add Category" >

    <template #dialogButton="props">
      <v-btn
          color="primary"
          :width="$vuetify.display.xs || $vuetify.display.smAndDown  ? '' : '215'"
          v-bind="props"
          text="Add Category"
          :size="$vuetify.display.smAndDown ? 'small' : 'default'"
          :icon="$vuetify.display.smAndDown"
          rounded="xl"
      >
        <template v-slot:default v-if="$vuetify.display.smAndDown">
          <v-icon icon="mdi-plus"/>
        </template>
        <template v-slot:prepend v-if="$vuetify.display.smAndUp">
          <v-icon class="pr-6" icon="mdi-plus"/>
        </template>
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

    <template #actionButtons>
      <v-btn
          :disabled="loading"
          :density="$vuetify.display.smAndDown ? 'comfortable' : 'default'"
          color="primary"
          :class="{
                'px-7': $vuetify.display.smAndDown,
                'px-12':$vuetify.display.mdAndUp,
                }"
          size="large"
          rounded="xl"
          variant="outlined"
          text="Cancel"
          @click="close"
      />
      <v-btn
          :disabled="loading"
          :loading="loading"
          :density="$vuetify.display.smAndDown ? 'comfortable' : 'default'"
          :class="{
                  'px-10': $vuetify.display.smAndDown,
                  'px-14': $vuetify.display.mdAndUp,
                  'text-white bg-primary': true,
                }"
          rounded="xl"
          size="large"
          variant="outlined"
          text="Save"
          @click="saveCategory"
      >
      </v-btn>
    </template>

  </Modal>
  </v-form>
</template>
