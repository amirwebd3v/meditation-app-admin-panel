<script setup lang="ts">
import type {LessonStoreRequest} from "~/utils/requests";
import type {ValidationRules} from "~/utils/types";
/*********************************************/
const props = defineProps({
  btnOutTable: {
    type: Boolean,
    default: true
  },
  btnInTable: {
    type: Boolean,
    default: false
  },
  courseId: {
    type: String,
    required: true
  },
  courseTitle: {
    type: String,
    required: true
  },
})

/*********************************************/
const isBtnText = ref()
const loading = ref()
const {errors} = storeToRefs(useValidationStore())
const { $validationRules }: { $validationRules: ValidationRules } = useNuxtApp()
/********************************************/
const initialState = {
  course_uuid: props.courseId,
  title: null,
  source: null,
  thumbnail: null,
  description: null,
  is_new: true,
  is_popular: false,
  is_lock: false,
}

const request = reactive<LessonStoreRequest>({...initialState})
const {hasChanges, resetHasChanges} = useInputHasChanges(request)
const {pictureMedia, upload, preview} = useUpload(request)

/**********************************************/
const saveLesson = async () => {
  loading.value = true
  try {
    await useLessonStore().store(request)
    useEvent('closeMenu')
    useEvent('refreshVideosLessonsTable')
    useEvent('successMessage', `${request.title} is successfully Added to ${props.courseTitle}.`)
    useEvent('closeModal', false)
    resetHasChanges(initialState, pictureMedia)
  } finally {
    loading.value = false
  }
}


function close() {
  useEvent('closeModal', false)
  resetHasChanges(initialState, pictureMedia)
  useValidationStore().clearErrors()
}

</script>

<template>
  <LazyModalsMain @on-click-outside="close">
    <template #dialogButton="props">
      <v-btn
          v-if="btnInTable"
          class="text-primary"
          variant="text"
          icon="mdi mdi-plus"
          v-bind="props"
          size="small">
      </v-btn>
      <v-btn
          v-if="btnOutTable"
          color="primary"
          :width="$vuetify.display.xs || $vuetify.display.smAndDown  ? '' : '215'"
          v-bind="props"
          :text="btnOutTable ? isBtnText = 'Add video' : ''"
          :size="$vuetify.display.smAndDown ? 'small' : 'default'"
          :icon="$vuetify.display.smAndDown"
          rounded="xl"
      >
        <template v-slot:default v-if="$vuetify.display.smAndDown">
          <v-icon icon="mdi-plus"/>
        </template>
        <template v-slot:prepend v-if="$vuetify.display.smAndUp">
          <v-icon class="pr-3" icon="mdi-plus"/>
        </template>
      </v-btn>
    </template>
    <template #header>
      <span class="pl-3">Add video</span>
      <v-icon class="pr-5 cursor-pointer" size="small" icon="mdi mdi-close" @click="close"/>
    </template>
    <template #columns>
      <v-row justify="space-between" no-gutters>
        <v-col cols="12" class="pb-0">
          <div class="text-white py-2">Title</div>
          <v-text-field maxlength="30" variant="outlined" color="primary" density="comfortable" v-model="request.title"
                        :rules="[$validationRules.required,$validationRules.minLength,$validationRules.maxLength]"
                        placeholder="Enter video title" :disabled="loading" :error-messages="errors['title']"/>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-white pb-2">Video Link</div>
          <v-text-field maxlength="30" variant="outlined" color="primary" density="comfortable" v-model="request.source"
                        placeholder="https://" :disabled="loading" :error-messages="errors['source']"
                        :rules="[$validationRules.required,$validationRules.url]"
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-white pb-2">Description</div>
          <v-textarea :disabled="loading" variant="outlined" density="compact" color="primary"
                      v-model="request.description" :rules="[$validationRules.minLength]"/>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-white pb-2">Upload a picture</div>
          <v-file-input class="file-input-label upload-input" label="Select a picture to Upload"
                        :rules="[$validationRules.pictureFormat]"
                        v-model="pictureMedia"
                        @change="upload(MediaType.PICTURE)"
                        single-line :disabled="loading"
                        accept="image/*"
                        clearable
                        @click:clear="request.thumbnail = pictureMedia ? null : ''"
                        variant="outlined" prepend-icon="" color="primary" :error-message="errors['thumbnail']">
            <template v-slot:selection="{ fileNames }">
              <template v-for="fileName in fileNames" :key="fileName">
                <v-card width="75" height="80" class="bg-primary-light">
                  <v-card-text style="padding: 0;" class="text-truncate text-white">
                    <v-img lazy-src="/img/video-card.jpg" cover height="56"
                           :src="<string>preview.picture?.url">
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular
                              color="grey-lighten-4"
                              indeterminate
                              size="x-small"
                          ></v-progress-circular>
                        </div>
                      </template>
                    </v-img>
                    <v-divider color="white" class="border-white border-opacity-25"/>
                    <span class="px-1 font-weight-thin" style="font-size: 9px;">{{ fileName }}</span>
                  </v-card-text>
                </v-card>
              </template>
            </template>
          </v-file-input>
        </v-col>
        <v-col cols="6" class="pt-1 pb-0">
          <div class="text-white">Free/Locked</div>
          <v-radio-group class="mt-5" inline v-model="request.is_lock" :disabled="loading"
                         :error-messages="errors['is_lock']">
            <v-radio
                density="compact"
                :value="false"
                label="Free"
                color="primary"
                class="pr-md-8 "
            />
            <v-radio
                density="compact"
                :value="true"
                label="Locked"
                color="primary"
            />
          </v-radio-group>
        </v-col>
        <v-col cols="6" class="pt-1 pb-0">
          <div class="text-white">Popular</div>
          <v-radio-group class="mt-5" inline v-model="request.is_popular" :disabled="loading"
                         :error-messages="errors['is_popular']">
            <v-radio
                density="compact"
                :value="false"
                label="No"
                color="primary"
                class="pr-md-8"
            />
            <v-radio
                density="compact"
                :value="true"
                label="Yes"
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
                'px-12':$vuetify.display.mdAndUp}"
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
          @click="saveLesson"
      >
      </v-btn>
    </template>
  </LazyModalsMain>
</template>

