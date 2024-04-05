<script setup lang="ts">
import type {LessonUpdateRequest} from "~/utils/requests";
import type {ValidationRules} from "~/utils/types";

/********************************************/
const loading = ref()
const route = useRoute()
const {errors} = storeToRefs(useValidationStore())
const { $validationRules }: { $validationRules: ValidationRules } = useNuxtApp()
/********************************************/
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  description: {
    type: String || null,
    required: true
  },
  categories: {
    type: Array<number> || null,
    required: true
  },
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
  source: props.source,
  description: props.description,
  is_popular: props.isPopular,
  is_lock: props.isLock
}
const request = reactive<LessonUpdateRequest>({...initialState})
const {hasChanges, resetHasChanges} = useInputHasChanges(request)
const {pictureMedia, upload, preview} = useUpload(request)
useListen('uploading', (value: boolean) => {
  loading.value = value
})
/**********************************************/


const updateLesson = async () => {
  loading.value = true
  try {
    await useLessonStore().update(request)
    useEvent('successMessage', `${request.title} is successfully Updated.`)
    useEvent('refreshVideosLessonsTable')
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
      <v-btn class="text-primary" variant="text" icon="mdi mdi-pencil-outline" v-bind="props" size="small"/>
    </template>

    <template #header>
      <span class="pl-3">Edit video</span>
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
          <div class="text-white pb-2">Video Link</div>
          <v-text-field variant="outlined" color="primary" density="comfortable" v-model="request.source"
                        placeholder="https://" :disabled="loading" :error-messages="errors['source']"
                        :rules="[$validationRules.required,$validationRules.url]"
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-white pb-2">Description</div>
          <v-textarea variant="outlined" density="compact" color="primary" v-model="request.description"
                      :disabled="loading" :rules="[$validationRules.minLength]"/>
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
                        @click:clear="delete request['thumbnail'] && pictureMedia ? null : []"
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
          <div class="text-white mb-md-5">Free/Locked</div>
          <v-radio-group class="mt-5" :disabled="loading" inline v-model="request.is_lock"
                         :error-messages="errors['is_lock']">
            <v-radio density="compact" :value="false" label="Free" color="primary" class="pr-md-8"/>
            <v-radio density="compact" :value="true" label="Locked" color="primary"/>
          </v-radio-group>
        </v-col>
        <v-col cols="6" class="pt-1 pb-0">
          <div class="text-white mb-md-5">Popular</div>
          <v-radio-group class="mt-5" :disabled="loading" inline v-model="request.is_popular"
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