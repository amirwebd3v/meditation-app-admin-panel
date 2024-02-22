<script setup>
import Base from "~/components/section/modals/Base.vue";


defineComponent({
  name: 'DeleteMeditation',
})

defineProps({
  title: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
  }
})

const loading = ref()
const dialog = ref()

const deleteCourse = async () => {
  loading.value = true
  // await useMeditationStore().delete(request)
  // dialog.value = false
  // loading.value = false
}


</script>

<template>

  <Base form-title="Delete Meditation" :loading="loading" :action-btn="deleteCourse" :dialog-status="dialog">

    <template v-slot:button="props">
      <v-btn
          class="text-primary"
          variant="text"
          icon="mdi mdi-delete-outline"
          v-bind="props"
          size="small">
      </v-btn>
    </template>

    <template #columns>
      <v-row justify="space-between">
        <v-col cols="12" class="my-3">
          <div class="py-5">
            <v-icon color="red" size="xx-large" class="text-orange pb-2">mdi-alert-outline</v-icon>
            <span class="font-weight-regular font-16"><strong class="font-18 text-orange">WARNING: </strong>This action cannot be undone.</span>
          </div>
          <div class="pb-5">
             <span class="text-white font-14 text-justify">
            <strong class="font-16 text-orange">"{{ title }}"</strong>
            and its all of data will be permanently deleted.
          </span>
          </div>

        </v-col>
      </v-row>
    </template>

  </Base>

</template>
