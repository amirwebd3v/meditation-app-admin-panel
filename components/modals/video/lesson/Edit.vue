<script setup lang="ts">
import type {LessonUpdateRequest} from "~/utils/requests";
import type {Preview} from "~/utils/types";

/********************************************/
const loading = ref()
const route = useRoute()
const {errors} = storeToRefs(useValidationStore());
const preview = ref<Preview | null>(null)

const validateSource = (value) => {

  const isValidURL = /^https?:\/\/.*/.test(value);
  return isValidURL || 'Please enter a valid URL (starting with http:// or https://)';
};
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
    type: String,
    required: true
  },
  categories: {
    type: Array<number>,
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


/**********************************************/
const upload = async (files: File[]) => {
  preview.value = (await useMediaStore().uploads([files[0]]))[0]
  request.thumbnail = preview.value?.id
}


const updateLesson = async () => {
  loading.value = true
  try {
    await useLessonStore().update(request)
    useEvent('successMessage', `${request.title} is successfully Updated.`)
    useEvent('refreshVideosLessonsTable')
    useEvent('closeModal', false)
    Object.assign(request, initialState);
  } finally {
    loading.value = false
    useValidationStore().clearErrors()
  }
}


function close() {
  useEvent('closeModal', false)
  Object.assign(request, initialState);
  useValidationStore().clearErrors()
}
</script>

<template>

  <LazyModalsMain>

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
          <v-text-field maxlength="30" variant="outlined" color="primary" density="comfortable" v-model="request.title"
                        :error-messages="errors['title']"
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-white pb-2">Video Link</div>
          <v-text-field maxlength="30" variant="outlined" color="primary" density="comfortable" v-model="request.source"
                        placeholder="https://" :disabled="loading" :error-messages="errors['source']"
                        :rules="[validateSource]"
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-white pb-2">Description</div>
          <v-textarea variant="outlined" density="compact" color="primary" v-model="request.description"></v-textarea>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-white pb-2">Upload a picture</div>
          <v-file-input class="file-input-label mb-3" label="Select a picture to Upload" @update:model-value="upload"
                        variant="outlined" prepend-icon="" color="primary" :error-message="errors['source']">
            <template v-slot:selection="{ fileNames }">
              <template v-for="fileName in fileNames" :key="fileName">
                <v-card width="100" height="100" class="justify-center align-center">
                  <v-col align-self="auto">
                    <v-img width="48" height="48" cover :src="preview?.url as string"/>
                    <v-card-text class="text-truncate">{{ fileName }}</v-card-text>
                  </v-col>
                </v-card>
              </template>
            </template>
          </v-file-input>
        </v-col>
        <v-col cols="6" class="pt-3 pb-0">
          <div class="text-white mb-md-5 text-white">Free/Locked</div>
          <v-radio-group class="mt-5" inline v-model="request.is_lock" :error-messages="errors['is_lock']">
            <v-radio density="compact" :value="false" label="Free" color="primary" class="pr-md-8"/>
            <v-radio density="compact" :value="true" label="Locked" color="primary"/>
          </v-radio-group>
        </v-col>
        <v-col cols="6" class="pt-3 pb-0">
          <div class="text-white mb-md-5 text-white">Popular</div>
          <v-radio-group class="mt-5" inline v-model="request.is_popular" :error-messages="errors['is_popular']">
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
          :disabled="loading"
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