<script setup lang="ts">
import type {CourseStoreRequest} from "~/utils/requests";
import {CourseSet, CourseType, MediaType} from "~/utils/enums";
import type {ValidationRules} from "~/utils/types";
/*********************************************/
const singleCourseModal = ref(false)
const courseModal = ref(false)
const selectedModal = ref<CourseSet>()
const loading = ref(false)
const {errors} = storeToRefs(useValidationStore());
const {$validationRules}: { $validationRules: ValidationRules } = useNuxtApp()
/********************************************/
const initialState = {
  type: CourseType.Meditation,
  set: null,
  title: null,
  description: null,
  duration: 123,
  thumbnail: null,
  source: null,
  categories: [],
  price: 0,
  is_lock: false,
  is_popular: false,
}


const request = reactive<CourseStoreRequest>({...initialState})
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
function selectedCourse(set) {
  if (set === CourseSet.Single) {
    selectedModal.value = CourseSet.Single
    singleCourseModal.value = true
  } else if (set === CourseSet.Course) {
    selectedModal.value = CourseSet.Course
    courseModal.value = true
  }
}


function singleOrCourse(request) {
  let keysToExclude = ['is_lock', 'source', 'duration']
  if (selectedModal.value === CourseSet.Course) {
    for (let key of keysToExclude) {
      delete request[key];
    }
    request.set = CourseSet.Course
  } else {
    request.set = CourseSet.Single
  }
}


const saveCourse = async () => {
  loading.value = true
  singleOrCourse(request);
  try {
    await useMeditationStore().store(request)
    useEvent('refreshMeditationsCourseTable')
    useEvent('successMessage', `${request.title} is successfully Added to Meditations.`)
    useEvent('closeModal', false)
    resetHasChanges(initialState, pictureMedia, trackMedia)
  } finally {
    loading.value = false
  }
}


function closeTypeModal() {
  useEvent('closeModal', false)
  resetHasChanges(initialState)
}

function closeCourseModal() {
  if (courseModal.value) {
    courseModal.value = false
  } else if (singleCourseModal.value) {
    singleCourseModal.value = false
  }
  resetHasChanges(initialState, pictureMedia, trackMedia)
  useValidationStore().clearErrors()
}


watch(courseModal, (newVal1) => {
  if (!newVal1) {
    closeCourseModal()
  }
});

watch(singleCourseModal, (newVal2) => {
  if (!newVal2) {
    closeCourseModal()
  }
});

// watchEffect(()=>{
//    const res = !(hasChanges && preview.value.track !== null)
//   console.log('hasChanges',hasChanges.value)
//   console.log('preview',preview.value.track !== null)
//   console.log('res',res)
//
//
// })
</script>

<template>

  <LazyModalsMain>
    <template #dialogButton="props">
      <v-row class="mt-15 mb-0 pb-0" justify="space-evenly">
        <v-btn text="Single"
               :density="$vuetify.display.smAndDown ? 'comfortable' : 'default'"
               color="primary"
               :class="{
                'px-7': $vuetify.display.smAndDown,
                'px-12':$vuetify.display.mdAndUp,
                 'text-white' : true}"
               size="large"
               variant="outlined"
               @click="selectedCourse(CourseSet.Single)">
          <template #prepend>
            <v-radio v-model="selectedModal" :value="CourseSet.Single" readonly disabled
                     style="opacity: 1; color: #96AE50;"/>
          </template>
        </v-btn>

        <v-btn text="Course"
               :density="$vuetify.display.smAndDown ? 'comfortable' : 'default'"
               color="primary"
               :class="{
                'px-7': $vuetify.display.smAndDown,
                'px-12':$vuetify.display.mdAndUp,
                 'text-white' : true
               }"
               size="large"
               variant="outlined"
               @click="selectedCourse(CourseSet.Course)"
        >
          <template #prepend>
            <v-radio v-model="selectedModal" :value="CourseSet.Course" readonly disabled
                     style="opacity: 1;color: #96AE50;"/>
          </template>
        </v-btn>

      </v-row>
    </template>

    <template #header>
      <span class="pl-3">Add Meditation</span>
      <v-icon class="pr-5 cursor-pointer" size="small" icon="mdi mdi-close" @click="closeTypeModal"/>
    </template>
  </LazyModalsMain>


  <v-dialog v-model="courseModal" max-width="600">

    <v-card class="bg-light-brown-1" rounded="lg">
      <v-container class="pb-0">
        <v-card-title class="v-row justify-space-between align-center mt-auto">
          <span class="pl-3">Add Meditation Course</span>

          <v-icon class="pr-5 cursor-pointer" size="small" icon="mdi mdi-close"
                  @click="closeCourseModal"/>
        </v-card-title>

        <v-card-text>
          <v-row justify="space-between">
            <v-col cols="12" class="pb-0">
              <div class="text-white py-2">Title</div>
              <v-text-field maxlength="76" variant="outlined" color="primary" density="comfortable"
                            v-model="request.title"
                            :rules="
                        [$validationRules.required,
                        $validationRules.minLength,
                        $validationRules.maxLength(request.title,75)]"
                            placeholder="Enter meditation title" :disabled="loading"
                            :error-messages="errors['title']"/>
            </v-col>
            <v-col cols="12" class="py-0">
              <div class="text-white pb-2">Description</div>
              <v-textarea :disabled="loading" variant="outlined" density="compact" color="primary"
                          v-model="request.description"
                          :rules="[$validationRules.minLength]"
              />
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
                  menu-icon="mdi mdi-chevron-down"
                  single-line
                  :items="meditationCategoriesArray"
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
              (+{{ request?.categories.length - 2 }} others)
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
                  <v-divider></v-divider>
                </template>

              </v-autocomplete>
            </v-col>
            <v-col cols="6" class="py-0">
              <div class="text-white pb-2">Price ($)</div>
              <v-text-field maxlength="6"
                            :disabled="loading"
                            variant="outlined"
                            :rules="[$validationRules.required,$validationRules.price]"
                            v-model="request.price"
                            color="primary"
                            density="comfortable"

                            :error-messages="errors['price']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <div class="text-white pb-2">Upload a picture</div>
              <v-file-input class="file-input-label upload-input" label="Select a picture to Upload"
                            :rules="[$validationRules.pictureFormat]"
                            v-model="pictureMedia"
                            @change="upload(MediaType.PICTURE)"
                            single-line :disabled="loading"
                            accept="image/jpeg,.png"
                            messages="File-format = 'jpg,jpeg,png', Maximum-size = 100mb"
                            clearable
                            @click:clear="request.thumbnail = pictureMedia ? null : ''"
                            variant="outlined" prepend-icon="" color="primary" :error-message="errors['thumbnail']">
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
                  </template>
                </template>
              </v-file-input>
            </v-col>
          </v-row>
        </v-card-text>

      </v-container>

      <template v-slot:actions>
        <v-container class="pt-0">
          <v-card-actions class="float-right mr-1 pt-4">
            <div class="d-sm-flex">
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
                  @click="closeCourseModal"
              />
              <v-btn
                  :disabled="loading || !(hasChanges &&  preview.picture !== null)"
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
                  @click="saveCourse"
              >
              </v-btn>
            </div>
          </v-card-actions>
        </v-container>
      </template>
    </v-card>

  </v-dialog>


  <v-dialog v-model="singleCourseModal" max-width="600">

    <v-card class="bg-light-brown-1" rounded="lg">
      <v-container class="pb-0">
        <v-card-title class="v-row justify-space-between align-center mt-auto">
          <span class="pl-3">Add single meditation</span>
          <v-icon class="pr-5 cursor-pointer" size="small" icon="mdi mdi-close"
                  @click="closeCourseModal"/>
        </v-card-title>

        <v-card-text>
          <v-row justify="space-between">
            <v-col cols="12" class="pb-0">
              <div class="text-white py-2">Title</div>
              <v-text-field maxlength="76" variant="outlined" color="primary" density="comfortable"
                            v-model="request.title"
                            :rules="[$validationRules.required,$validationRules.minLength,$validationRules.maxLength]"
                            placeholder="Enter meditation title" :disabled="loading"
                            :error-messages="errors['title']"/>
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
              (+{{ request?.categories.length - 2 }} others)
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
                  <v-divider></v-divider>
                </template>

              </v-autocomplete>
            </v-col>
            <v-col cols="12" class="py-0">
              <div class="text-white pb-2">Upload a track</div>
              <v-file-input class="file-input-label upload-input" label="Select a track to Upload"
                            :rules="[$validationRules.trackFormat]"
                            v-model="trackMedia"
                            @change="upload(MediaType.TRACK)"
                            single-line :disabled="loading"
                            accept="audio/mpeg"
                            messages="File-format = 'mp3', Maximum-size = 100mb"
                            clearable
                            @click:clear="request.source = trackMedia ? null : ''"
                            variant="outlined" prepend-icon="" color="primary" :error-message="errors['source']">
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
            <v-col cols="12" class="pt-4 pb-0">
              <div class="text-white pb-2">Upload a picture</div>
              <v-file-input class="file-input-label upload-input" label="Select a picture to Upload"
                            :rules="[$validationRules.pictureFormat]"
                            v-model="pictureMedia"
                            @change="upload(MediaType.PICTURE)"
                            single-line :disabled="loading"
                            accept="image/jpeg,.png"
                            messages="File-format = 'jpg,jpeg,png', Maximum-size = 100mb"
                            clearable
                            @click:clear="request.thumbnail = pictureMedia ? null : ''"
                            variant="outlined" prepend-icon="" color="primary" :error-message="errors['thumbnail']">
                <template v-slot:selection="{ fileNames }">
                  <template v-for="fileName in fileNames" :key="fileName">
                    <v-card width="80" height="80" class="bg-primary-light">
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
                  </template>
                </template>
              </v-file-input>
            </v-col>
            <v-col cols="6" class="pt-4 pb-1">
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
                />
              </v-radio-group>
            </v-col>
            <v-col cols="6" class="pt-3 pb-0" v-if="request.is_lock">
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
        </v-card-text>

      </v-container>

      <template v-slot:actions>
        <v-container class="pt-0">
          <v-card-actions class="float-right mr-1 pt-0">
            <div class="d-sm-flex">
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
                  @click="closeCourseModal"
              />
              <v-btn
                  :disabled="loading || !(hasChanges && (preview.track !== null && preview.picture !== null))"
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
                  @click="saveCourse"
              >
              </v-btn>
            </div>
          </v-card-actions>
        </v-container>
      </template>
    </v-card>

  </v-dialog>

</template>

