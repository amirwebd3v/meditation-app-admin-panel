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

  <Base form-title="Add Meditation Course" :loading="loading" :action-btn="deleteCourse" :dialog-status="dialog">

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

          <span class="text-white font-16 pb-5">
            Are you sure about removing
            <strong class="font-18 text-orange">"{{ title }}"</strong>
            from Meditations?
          </span>
        </v-col>
      </v-row>
    </template>

  </Base>

</template>
