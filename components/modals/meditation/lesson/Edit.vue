<script setup lang="ts">

import type {LessonUpdateRequest} from "~/utils/requests";
import type {ValidationRules} from "~/utils/types";

/********************************************/
const loading = ref()
const route = useRoute()
const {errors} = storeToRefs(useValidationStore())
const {$validationRules}: { $validationRules: ValidationRules } = useNuxtApp()
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
  source: {
    type: Object,
    required: true,
    default: {
      url: '',
      fileName: ''
    }
  },
  // duration: {
  //   type: String,
  //   required: true
  // },
  isPopular: {
    type: Boolean,
    required: true,
    default: false
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
  is_lock: props.isLock,
  is_popular: props.isPopular,
  source: null,
  duration: null
}
const request = reactive<LessonUpdateRequest>({...initialState})
const {hasChanges, changedFields, resetHasChanges} = useInputHasChanges(request)
const {pictureMedia, trackMedia, upload, preview, uploadProgress} = useUpload(request)
useListen('uploading', (value: boolean) => {
  loading.value = value
})
/**********************************************/
const updateLesson = async () => {
  loading.value = true
  changedFields(initialState, request)
  try {
    await useLessonStore().update(request)
    useEvent('refreshMeditationsLessonsTable')
    useEvent('successMessage', `${initialState.title} is successfully Updated.`)
    useEvent('closeModal', false)
    Object.assign(initialState, toRaw(request))
    resetHasChanges(initialState, preview, pictureMedia, trackMedia)
  } finally {
    loading.value = false
  }
}


function close() {
  useEvent('closeModal', false)
  resetHasChanges(initialState, preview, pictureMedia, trackMedia)
  useValidationStore().clearErrors()
}

</script>

<template>

  <ModalsMain @on-click-outside="close">

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
          <v-text-field maxlength="76" variant="outlined" color="primary" density="comfortable" v-model="request.title"
                        :rules="
                        [$validationRules.required,
                        $validationRules.minLength,
                        $validationRules.maxLength(request.title,75)]"
                        :error-messages="errors['title']" :disabled="loading"
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-white pb-2">Description</div>
          <v-textarea :disabled="loading"
                      variant="outlined"
                      density="compact"
                      color="primary"
                      :rules="[$validationRules.minLength]"
                      v-model="request.description">
          </v-textarea>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-white pb-2">Upload a track</div>
          <v-file-input class="file-input-label upload-input"
                        v-model="trackMedia"
                        @change="upload(MediaType.TRACK)"
                        single-line :disabled="loading"
                        accept="audio/mpeg"
                        messages="File-format = 'mp3', Maximum-size = 100mb"
                        :clearable="false"
                        :error="errors['source']"
                        variant="outlined" prepend-icon="" color="primary" :error-message="errors['source']">
            <template #prepend-inner v-if="[...trackMedia].length === 0">
              <v-card width="80" height="80" class="bg-primary-light">
                <v-card-text style="padding: 0;" class="text-truncate text-white">
                  <div v-if="!preview.track" class="pl-4 py-1 align-center">
                    <a :href="props.source?.url">
                      <v-icon icon="mdi-play-circle" size="xxx-large" color="primary"/>
                    </a>
                  </div>

                  <div v-else class="pl-4 py-1 align-center">
                    <v-progress-circular
                        color="grey-lighten-4"
                        :model-value="uploadProgress"
                        :rotate="360"
                        :size="48"
                        :width="2"
                    >
                        <template v-slot:default>
                          <a :href="preview.track.url">
                            <v-icon icon="mdi-play-circle" size="xxx-large" color="primary" v-if="uploadProgress === 100"/>
                          </a>
                        </template>
                      </v-progress-circular>
                  </div>
                  <v-divider color="white" class="border-white border-opacity-25"/>
                  <span v-if="!preview.track" class="px-1 font-weight-thin"
                        style="font-size: 9px;">{{ props.source?.fileName }}</span>
                  <span v-else class="px-1 font-weight-thin" style="font-size: 9px;">Size : {{
                      preview.track?.size
                    }}</span>
                </v-card-text>
              </v-card>
            </template>
            <template v-slot:selection="{ fileNames }">
              <template v-for="fileName in fileNames" :key="fileName" v-if="uploadProgress !== 0">
                <v-card width="80" height="80" class="bg-primary-light">
                  <v-card-text style="padding: 0;" class="text-truncate text-white">
                    <div class="pl-4 py-1 align-center">
                      <v-progress-circular
                          color="grey-lighten-4"
                          :model-value="uploadProgress"
                          :rotate="360"
                          :size="48"
                          :width="2"
                      >
                        <template v-slot:default>
                          <v-icon icon="mdi-play-circle" size="xxx-large" color="primary"
                                  v-if="uploadProgress === 100"/>
                          {{ uploadProgress !== 100 ? uploadProgress + '%' : '' }}
                        </template>
                      </v-progress-circular>
                    </div>
                    <v-divider color="white" class="border-white border-opacity-25"/>
                    <span class="px-1 font-weight-thin" style="font-size: 9px;">{{ fileName }}</span>
                  </v-card-text>
                </v-card>
              </template>
            </template>
          </v-file-input>
        </v-col>
        <v-col cols="6" class="pt-4">
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

  </ModalsMain>


</template>

<style scoped lang="scss"></style>