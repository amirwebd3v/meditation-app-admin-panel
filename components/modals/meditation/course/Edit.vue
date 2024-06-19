<script setup lang="ts">

import type {CourseUpdateRequest} from "~/utils/requests";
import type {ValidationRules} from "~/utils/types";
import type {MediaType} from "~/utils/enums";
import {CourseSet} from "~/utils/enums";


/********************************************/
const trackFileName = ref()
const loading = ref()
const route = useRoute()
const {errors} = storeToRefs(useValidationStore());
const {$validationRules}: { $validationRules: ValidationRules } = useNuxtApp()
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
  description: {
    type: String || null,
    required: true
  },
  categories: {
    type: Array<number> || null,
    required: true
  },
  courseSet: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: Object,
    required: true,
    default: {
      url: '',
      fileName: ''
    }
  },
})


/********************************************/
onBeforeMount(async () => {
  const {url, duration, fileName} = await getSingleMeditationTrackData()

  initialState.duration = duration
  initialState.source = url
  trackFileName.value = fileName

})
/********************************************/
const initialState = {
  id: props.id,
  title: props.title,
  description: props.description,
  categories: props.categories,
  price: props.price,
  is_lock: props.price > 0,
  thumbnail: null,
  source: null,
  duration: null,
}


const request = reactive<CourseUpdateRequest>({...initialState})
const {hasChanges, resetHasChanges} = useInputHasChanges(request)
const {pictureMedia, trackMedia, upload, preview} = useUpload(request)
useListen('uploading', (value: boolean) => {
  loading.value = value
})


/********************************************/
const meditationCategoriesArray = computed(() =>
    Array.from(useCategoryStore().meditationCategories.values()))

const selectAllCategories = computed(() => {
  return request.categories.length === meditationCategoriesArray.value.length
})

const selectSomeCategories = computed(() => {
  return request.categories.length > 0 && request.categories.length < meditationCategoriesArray.value.length
})

const toggle = () => {
  if (selectAllCategories.value) {
    request.categories = []
  } else {
    request.categories = meditationCategoriesArray.value.map(c => c.id)
  }
}

/**********************************************/
function singleOrCourse(request) {
  let keysToExclude = ['is_lock', 'source', 'duration', 'is_popular']
  if (request.set === CourseSet.Course) {
    for (let key of keysToExclude) {
      delete request[key];
    }
  }
}

function freeOrPaid(request) {
  if (request.is_lock || props.courseSet === CourseSet.Course) {
    return request.price;
  } else {
    request.price = 0;
  }
}


const updateCourse = async () => {
  loading.value = true
  singleOrCourse(request);
  freeOrPaid(request);
  try {
    await useMeditationStore().update(request)
    useEvent('closeMenu', false)
    useEvent('refreshMeditationsCourseTable')
    useEvent('successMessage', `${request.title} is successfully Updated.`)
    useEvent('closeModal', false)
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

const getSingleMeditationTrackData = async () => {
  let url, duration, fileName;

  const result = await useLessonStore().get(<string>props.id);

  url = result[0]?.source?.urls?.original.toString();
  fileName = result[0]?.source?.file_name.toString();
  duration = result[0]?.duration;

  return {url, duration, fileName}
}


</script>

<template>

  <ModalsMain @on-click-outside="close">

    <template #dialogButton="props">
      <v-btn class="text-primary" variant="text" icon="mdi mdi-pencil-outline" v-bind="props" size="small"/>
    </template>

    <template #header>
      <span class="pl-3" v-if="props.courseSet === CourseSet.Single">Edit single Meditation Course</span>
      <span class="pl-3" v-if="props.courseSet === CourseSet.Course">Edit Meditation Course</span>
      <v-icon class="pr-5 cursor-pointer" size="small" icon="mdi mdi-close" @click="close"/>
    </template>

    <template #columns>
      <v-row justify="space-between">
        <v-col cols="12" class="pb-0">
          <div class="text-white py-2">Title</div>
          <v-text-field maxlength="76" variant="outlined" color="primary" density="comfortable"
                        v-model="request.title"
                        placeholder="Enter meditation title" :disabled="loading"
                        :error-messages="errors['title']"
                        :rules="
                        [$validationRules.required,
                        $validationRules.minLength,
                        $validationRules.maxLength(request.title,75)]"
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-white pb-2">Description</div>
          <v-textarea :disabled="loading || !request.is_lock" variant="outlined" density="compact" color="primary"
                      v-model="request.description" :rules="[$validationRules.minLength]"/>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-white pb-2">Select Tag(s)</div>
          <v-autocomplete
              variant="outlined"
              :disabled="loading"
              chips
              closable-chips
              multiple
              v-model="request.categories"
              color="primary"
              density="comfortable"
              single-line
              :items="meditationCategoriesArray"
              menu-icon="mdi mdi-chevron-down"
              auto-select-first
              item-title="name"
              item-value="id"
          >
            <template v-slot:chip="{ props,item, index }">
              <v-chip v-if="index < 2" v-bind="props">
                <span>{{ item.title }}</span>
              </v-chip>
              <span
                  v-if="index === 2 && request.categories"
                  class="text-grey text-caption align-self-center"
              >
              (+{{ request['categories'].length - 2 }} others)
              </span>
            </template>
            <template v-slot:prepend-item>
              <v-list-item
                  title="All Tags"
                  @click="toggle"
              >
                <template v-slot:prepend>
                  <v-checkbox-btn
                      color="primary"
                      :indeterminate="selectSomeCategories && !selectAllCategories"
                      :model-value="selectAllCategories"
                  ></v-checkbox-btn>
                </template>
              </v-list-item>
              <v-divider/>
            </template>

          </v-autocomplete>
        </v-col>

        <v-col cols="12" class="py-0" v-if="props.courseSet === CourseSet.Single">
          <div class="text-white pb-2">Upload a track</div>
          <v-file-input class="file-input-label upload-input" :label="!initialState.source ? 'Select a track to Upload' : '' "
                        :rules="[$validationRules.trackFormat]"
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
                    <a :href="initialState.source">
                      <v-icon icon="mdi-play-circle" size="xxx-large" color="primary"/>
                    </a>
                  </div>

                  <div v-else class="pl-4 py-1 align-center">
                    <a :href="preview.track.url">
                      <v-icon icon="mdi-play-circle" size="xxx-large" color="primary"/>
                    </a>
                  </div>
                  <v-divider color="white" class="border-white border-opacity-25"/>
                  <span v-if="!preview.track" class="px-1 font-weight-thin" style="font-size: 9px;">{{ trackFileName }}</span>
                  <span v-else class="px-1 font-weight-thin" style="font-size: 9px;">Size : {{ preview.track?.size }}</span>
                </v-card-text>
              </v-card>
            </template>
            <template v-slot:selection="{ fileNames }">
              <template v-for="fileName in fileNames" :key="fileName">
                <v-card width="80" height="80" class="bg-primary-light">
                  <v-card-text style="padding: 0;" class="text-truncate text-white">
                    <div class="pl-4 py-1 align-center">
                      <v-icon icon="mdi-play-circle" size="xxx-large" color="primary"/>
                    </div>
                    <v-divider color="white" class="border-white border-opacity-25"/>
                    <span class="px-1 font-weight-thin" style="font-size: 9px;">{{ fileName }}</span>
                  </v-card-text>
                </v-card>
              </template>
            </template>
          </v-file-input>
        </v-col>
        <v-col cols="12" :class="`${props.courseSet === CourseSet.Single ? 'pt-4' : 'pt-0'} pb-0`">
          <div class="text-white pb-2">Upload a picture</div>
          <v-file-input class="file-input-label upload-input"
                        :label="!props.thumbnail ? 'Select a picture to Upload' : ''"
                        :rules="[$validationRules.pictureFormat]"
                        v-model="pictureMedia"
                        @change="upload(MediaType.PICTURE)"
                        single-line :disabled="loading"
                        accept="image/jpeg,.png"
                        messages="File-format = 'jpg,jpeg,png', Maximum-size = 100mb"
                        :clearable="false"
                        :error="errors['thumbnail']"
                        variant="outlined" prepend-icon="" color="primary" :error-message="errors['thumbnail']">
            <template #prepend-inner v-if="[...pictureMedia].length === 0">
              <v-card width="80" height="80" class="bg-primary-light">
                <v-card-text style="padding: 0;" class="text-truncate text-white">

                  <v-img v-if="!preview.picture" lazy-src="/img/meditation-card.jpg" cover height="56"
                         :src="<string>props.thumbnail?.url">
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
                  <v-img v-else lazy-src="/img/meditation-card.jpg" cover height="56"
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
                  <span v-if="!preview.picture" class="px-1 font-weight-thin"
                        style="font-size: 9px;">{{ props.thumbnail?.fileName }}</span>
                  <span v-else class="px-1 font-weight-thin" style="font-size: 9px;">{{ preview.picture?.size }}</span>
                </v-card-text>
              </v-card>
            </template>
            <template v-slot:selection="{ fileNames }">
              <template v-for="fileName in fileNames" :key="fileName">
                <v-card width="75" height="80" class="bg-primary-light">
                  <v-card-text style="padding: 0;" class="text-truncate text-white">
                    <v-img lazy-src="/img/meditation-card.jpg" cover height="56"
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
                <!--                <v-card width="75" height="80" class="bg-primary-light">-->
                <!--                  <v-card-text style="padding: 0;" class="text-truncate text-white">-->
                <!--                    <v-img lazy-src="/img/meditation-card.jpg" cover height="56"-->
                <!--                           :src="<string>props.thumbnail?.urls?.original">-->
                <!--                      <template v-slot:placeholder>-->
                <!--                        <div class="d-flex align-center justify-center fill-height">-->
                <!--                          <v-progress-circular-->
                <!--                              color="grey-lighten-4"-->
                <!--                              indeterminate-->
                <!--                              size="x-small"-->
                <!--                          ></v-progress-circular>-->
                <!--                        </div>-->
                <!--                      </template>-->
                <!--                    </v-img>-->
                <!--                    <v-divider color="white" class="border-white border-opacity-25"/>-->
                <!--                    <span class="px-1 font-weight-thin" style="font-size: 9px;" >{{ props.thumbnail?.name }}</span>-->
                <!--                  </v-card-text>-->
                <!--                </v-card>-->
              </template>
            </template>
          </v-file-input>
        </v-col>
        <v-col cols="6" class="pt-4 pb-1" v-if="props.courseSet === CourseSet.Single">
          <div class="text-white mb-md-5">Free/Paid</div>
          <v-radio-group class="mt-5" inline v-model="request.is_lock" :disabled="loading"
                         :error-messages="errors['is_lock']">
            <v-radio
                density="compact"
                :value="false"
                label="Free"
                color="primary"
                class="pr-md-8"
                @change="request.price = 0; request.description = null"
            />
            <v-radio
                density="compact"
                :value="true"
                label="Paid"
                color="primary"
                @change="request.price = initialState.price"
            />
          </v-radio-group>
        </v-col>
        <v-col cols="6" class="pt-3 pb-0"
               v-if="request.is_lock || props.courseSet === CourseSet.Course">
          <div class="text-white pb-2">Price ($)</div>
          <v-text-field maxlength="6"
                        :disabled="loading"
                        variant="outlined"
                        v-model="request.price"
                        color="primary"
                        density="comfortable"
                        :rules="[$validationRules.required,$validationRules.price]"

                        :error-messages="errors['price']"
          ></v-text-field>
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
          @click="updateCourse"
      >
      </v-btn>
    </template>

  </ModalsMain>


</template>

