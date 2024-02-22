<script setup>
import Base from "~/components/section/modals/Base.vue";

const emit = defineEmits([])
defineComponent({
  name: 'DeleteMeditation',
})

defineProps({
  title: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true,
  }
})

onMounted(() => {
  return emit("deleteBtn", true) ? true : console.log(emit("deleteBtn", true))
})

function showDeleteBtn(val) {
  if (showDeleteBtnEmit("deleteBtn", val)) {
    console.log('deleteBtn event emitted with value:', val)
  } else {
    console.log('kir shodi')
  }
}
</script>

<template>

  <Base form-title="Delete Meditation">

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
        <v-col cols="12" class="ma-3">
          <div class="text-white font-16 pb-5">"{{ title }}"</div>
          <span class="font-18 text-orange">Are you sure about removing this course from Meditations?</span>
        </v-col>
      </v-row>
    </template>

  </Base>

</template>
