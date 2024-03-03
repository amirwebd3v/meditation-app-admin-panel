<script setup>


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


const deleteCourse = async () => {
  loading.value = true
  // await useMeditationStore().delete(request)
  // dialog.value = false
  // loading.value = false
}

function close() {
  useEvent('closeModal', false)
}

</script>

<template>


  <LazyModalsMain>

    <template #dialogButton="props">
      <v-btn
          class="text-primary"
          variant="text"
          icon="mdi mdi-delete-outline"
          v-bind="props"
          size="small">
      </v-btn>
    </template>

    <template #header>
      <span class="pl-3">Delete Meditation Course</span>
      <v-icon class="pr-5 cursor-pointer" size="small" icon="mdi mdi-close" @click="close"/>
    </template>

    <template #columns>
      <v-row justify="space-between">
        <v-col cols="12" class="my-3">
          <div class="py-5">
            <v-icon color="red" size="xx-large" class="text-orange pb-2">mdi-alert-outline</v-icon>
            <span class="font-weight-regular font-16">
              <strong class="font-18 text-orange">
                WARNING:
              </strong>
              This action cannot be undone.
            </span>
          </div>
          <div class="pb-5">
             <span class="text-white font-14  text-justify">
            <strong class="font-16 text-orange">"{{ title }}"</strong>
            and its all of data will be permanently deleted.
          </span>
          </div>

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
                  'delete-btn-border bg-orange':true,
                }"
          rounded="xl"
          size="large"
          variant="outlined"
          text="Delete"
          @click="deleteCourse"
      >
      </v-btn>
    </template>

  </LazyModalsMain>

</template>
