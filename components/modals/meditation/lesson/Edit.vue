<script setup lang="ts">

import type { LessonUpdateRequest} from "~/utils/requests";


/********************************************/
const loading = ref()
const route = useRoute()
const {errors} = storeToRefs(useValidationStore());

/********************************************/
const props = defineProps({
  courseTitle: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String || null,
    required: true
  },
  // source: {
  //   type: String,
  //   required: true
  // },
  // duration: {
  //   type: String,
  //   required: true
  // },
  isPopular: {
    type: Boolean,
    required: true
  },
  isLock: {
    type: Boolean,
    required: true
  },
})

/********************************************/
const initialState = {
  id: props.id,
  title: props.title,
  description: props.description,
  is_popular: props.isPopular,
  is_lock: props.isLock
}
const request = reactive<LessonUpdateRequest>({...initialState})
const { hasChanges, resetHasChanges } = useInputHasChanges(request)
const {pictureMedia,trackMedia,upload,preview} = useUpload(request)
/**********************************************/
const updateLesson = async () => {
  loading.value = true
  try {
    await useLessonStore().update(request)
    useEvent('refreshMeditationsLessonsTable')
    useEvent('successMessage', `${request.title} is successfully Updated.`)
    useEvent('closeModal', false)
    resetHasChanges(initialState,pictureMedia,trackMedia)
  } finally {
    loading.value = false
  }
}


function close() {
  useEvent('closeModal', false)
  resetHasChanges(initialState,pictureMedia,trackMedia)
  useValidationStore().clearErrors()
}
</script>

<template>

  <LazyModalsMain @on-click-outside="close">

    <template #dialogButton="props">
      <v-btn class="text-primary" variant="text" icon="mdi mdi-pencil-outline" v-bind="props" size="small"/>
    </template>

    <template #header>
      <span class="pl-3">Edit meditation for {{ props.courseTitle }}</span>
      <v-icon class="pr-5 cursor-pointer" size="small" icon="mdi mdi-close" @click="close"/>
    </template>

    <template #columns>
      <v-row justify="space-between">
        <v-col cols="12" class="pb-0">
          <div class="text-white pb-2">Title</div>
          <v-text-field maxlength="30" variant="outlined" color="primary" density="comfortable" v-model="request.title"
                        :error-messages="errors['title']" :disabled="loading"
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-white pb-2">Description</div>
          <v-textarea :disabled="loading"
                      variant="outlined"
                      density="compact"
                      color="primary"
                      v-model="request.description">
          </v-textarea>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-white pb-2">Upload a track</div>
          <v-file-input class="file-input-label upload-input" label="Select a track to Upload"
                        v-model="trackMedia"
                        @change="upload(MediaType.TRACK)"
                        single-line :disabled="loading"
                        accept="audio/mpeg"
                        clearable
                        @click:clear="delete request['source'] && trackMedia ? null : []"
                        variant="outlined" prepend-icon="" color="primary" :error-message="errors['source']">
            <template v-slot:selection="{ fileNames }">
              <template v-for="fileName in fileNames" :key="fileName">
                <v-card width="80" height="80" class="bg-primary-light">
                  <v-card-text style="padding: 0;" class="text-truncate text-white">
                    <div class="pl-4 py-1 align-center">
                      <v-icon icon="mdi-play-circle" size="xxx-large" color="primary"/>
                    </div>
                    <v-divider  color="white" class="border-white border-opacity-25"/>
                    <span class="px-1 font-weight-thin" style="font-size: 9px;">{{ fileName }}</span>
                  </v-card-text>
                </v-card>
              </template>
            </template>
          </v-file-input>
        </v-col>
        <v-col cols="6" class="pt-1">
          <div class="text-white mb-md-5">Free/Paid</div>
          <v-radio-group class="mt-5" inline v-model="request.is_lock" :disabled="loading"
                         :error-messages="errors['is_lock']">
            <v-radio
                density="compact"
                :value="false"
                label="Free"
                color="primary"
                class="pr-md-8"
            />
            <v-radio
                density="compact"
                :value="true"
                label="Paid"
                color="primary"
            />
          </v-radio-group>
        </v-col>
        <v-col cols="6" class="pt-0">
          <div class="text-white mb-md-5">Popular</div>
          <v-radio-group class="mt-5" inline v-model="request.is_popular" :disabled="loading"
                         :error-messages="errors['is_popular']">
            <v-radio density="compact" :value="false" label="No" color="primary" class="pr-md-8"/>
            <v-radio density="compact" :value="true" label="Yes" color="primary"/>
          </v-radio-group>
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
          :disabled="loading || !hasChanges"
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
          @click="updateLesson"
      >
      </v-btn>
    </template>

  </LazyModalsMain>


</template>

<style scoped lang="scss"></style>