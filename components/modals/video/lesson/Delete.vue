<script setup lang="ts">

const props = defineProps({
  courseTitle: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  transactionCount: {
    type: Number,
    required: true
  },
  id: {
    type: String,
    required: true,
  }
})

const loading = ref(false)


const deleteLesson = async () => {
  loading.value = true
  try {
    await useLessonStore().destroy(<string>props.id)
    useEvent('successMessage', 'Video is successfully Deleted.')
    useEvent('refreshVideosLessonsTable')
    useEvent('closeModal', false)
  }  finally {
    loading.value = false
  }
}

function close() {
  useEvent('closeModal', false)
  useValidationStore().clearErrors()
}

</script>

<template>


  <ModalsMain>

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
      <span class="pl-3">Delete Video</span>
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
            <strong class="font-16 text-orange">{{ props.title }}</strong>
            has <strong class="font-16 text-orange">{{ props.transactionCount }}</strong> transaction(s)
               inside it. Be patient that all of its data will be permanently deleted.
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
          @click="deleteLesson"
      >
      </v-btn>
    </template>

  </ModalsMain>

</template>
