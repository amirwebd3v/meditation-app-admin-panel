<script setup>
import Base from "~/components/section/modals/Base.vue";

defineComponent({
  name: 'AddCategory',
})

const loading = ref()
const dialog = ref()


const saveCategory = async () => {
  loading.value = true
  // await useMeditationStore().delete(request)
  // dialog.value = false
  // loading.value = false
}

</script>

<template>

  <Base form-title="Add Category" :loading="loading" :action-btn="saveCategory" :dialog-status="dialog">

    <template v-slot:button="props">
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
          <v-icon  icon="mdi-plus"/>
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

  </Base>

</template>
