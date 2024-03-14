<script setup lang="ts">
import type {CourseStoreRequest} from "~/utils/requests";
import {CourseSet, CourseType} from "~/utils/enums";
import type {Preview} from "~/utils/types";

/*********************************************/
const singleCourseModal = ref()
const CourseModal = ref()
const selectedCourse = ref<CourseSet>()
const loading = ref(false)
const {errors} = storeToRefs(useValidationStore());
const preview = ref<Preview | null>(null)
/********************************************/
//Todo: Fix duration value later

const initialState = {
  type: CourseType.Meditation,
  set: selectedCourse,
  title: null,
  description: null,
  duration: 123,
  categories: [],
  price: 0,
  is_lock: false,
  is_popular: false
}

const request = reactive<CourseStoreRequest>({...initialState})


const numberOrFloatRule = (value: string) => {
  const pattern = /^-?\d+\.?\d*$/
  return pattern.test(value)
}

/********************************************/
const meditationCategoriesArray = computed(() =>
    Array.from(useCategoryStore().allCategories(CourseType.Meditation).values()))

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
  let keysToExclude = ['is_lock', 'is_popular', 'source', 'duration']
  if (request.set === CourseSet.Course) {
    for (let key of keysToExclude) {
      delete request[key];
    }
  }
}

//Todo: Set file type rules for file-input
const upload = async (files: File[]) => {
  preview.value = (await useMediaStore().uploads([files[0]]))[0]
  if(preview.value?.mime_type === 'image/jpeg'){
    request.thumbnail = preview.value?.id
  } else if(preview.value?.mime_type === 'audio/mpeg'){
    request.source = preview.value?.id
  }
}



const saveCourse = async () => {
  loading.value = true
  singleOrCourse(request);
  try {
    await useMeditationStore().store(request)
    useEvent('refreshMeditationsCourseTable')
    useEvent('successMessage', `${request.title} is successfully Added as a ${request.set.toLowerCase()} Meditation.`)
    useEvent('closeModal', false)
    Object.assign(request, initialState);
  } finally {
    loading.value = false
  }
}


function closeTypeModal() {
  useEvent('closeModal', false)
  Object.assign(request, initialState);
}

function closeCourseModal(val) {
  val.value = false
  Object.assign(request, initialState);
  useValidationStore().clearErrors()
}

</script>

<template>

  <LazyModalsMain>
    <template #dialogButton="props">
      <v-row class="mt-15 mb-0 pb-0" justify="space-evenly">
        <v-btn text="Single"
               :density="$vuetify.display.smAndDown ? 'comfortable' : 'default'"
               color="primary"
               ref="singleCourseModal"
               :class="{
                'px-7': $vuetify.display.smAndDown,
                'px-12':$vuetify.display.mdAndUp,
                 'text-white' : true}"
               size="large"
               variant="outlined"
               @click="selectedCourse = CourseSet.Single">
          <template #prepend>
            <v-radio v-model="selectedCourse" :value="CourseSet.Single" readonly disabled
                     style="opacity: 1; color: #96AE50;"/>
          </template>
        </v-btn>

        <v-btn text="Course"
               :density="$vuetify.display.smAndDown ? 'comfortable' : 'default'"
               color="primary"
               ref="CourseModal"
               :class="{
                'px-7': $vuetify.display.smAndDown,
                'px-12':$vuetify.display.mdAndUp,
                 'text-white' : true
               }"
               size="large"
               variant="outlined"
               @click="selectedCourse = CourseSet.Course"
        >
          <template #prepend>
            <v-radio v-model="selectedCourse" :value="CourseSet.Course" readonly disabled
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


  <v-dialog :activator="CourseModal" max-width="600">

    <template v-slot:default="{ isActive }">

      <v-card class="bg-light-brown-1" rounded="lg">
        <v-container class="pb-0">
          <v-card-title class="v-row justify-space-between align-center mt-auto">
            <span class="pl-3">Add Meditation Course</span>

            <v-icon class="pr-5 cursor-pointer" size="small" icon="mdi mdi-close"
                    @click="closeCourseModal(isActive)"/>
          </v-card-title>

          <v-card-text>
            <v-row justify="space-between">
              <v-col cols="12" class="pb-0">
                <div class="text-white py-2">Title</div>
                <v-text-field maxlength="30" variant="outlined" color="primary" density="comfortable"
                              v-model="request.title"
                              placeholder="Enter meditation title" :disabled="loading"
                              :error-messages="errors['title']"/>
              </v-col>
              <v-col cols="12" class="py-0">
                <div class="text-white pb-2">Description</div>
                <v-textarea :disabled="loading" variant="outlined" density="compact" color="primary"
                            v-model="request.description"/>
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
                              v-model="request.price"
                              color="primary"
                              density="comfortable"
                              :rules="[numberOrFloatRule]"
                              validate-on="blur"
                              :error-messages="errors['price']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <div class="text-white pb-2">Upload a picture</div>
                <v-file-input class="file-input-label" label="Select a picture to Upload"
                              @update:model-value="upload"
                              single-line :disabled="loading"
                              variant="outlined" prepend-icon="" color="primary" :error-message="errors['thumbnail']">
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
                    @click="closeCourseModal(isActive)"
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
                    @click="saveCourse"
                >
                </v-btn>
              </div>
            </v-card-actions>
          </v-container>
        </template>
      </v-card>
    </template>
  </v-dialog>


  <v-dialog :activator="singleCourseModal" max-width="600">

    <template v-slot:default="{ isActive }">

      <v-card class="bg-light-brown-1" rounded="lg">
        <v-container class="pb-0">
          <v-card-title class="v-row justify-space-between align-center mt-auto">
            <span class="pl-3">Add single meditation</span>
            <v-icon class="pr-5 cursor-pointer" size="small" icon="mdi mdi-close"
                    @click="closeCourseModal(isActive)"/>
          </v-card-title>

          <v-card-text>
            <v-row justify="space-between">
              <v-col cols="12" class="pb-0">
                <div class="text-white py-2">Title</div>
                <v-text-field maxlength="30" variant="outlined" color="primary" density="comfortable"
                              v-model="request.title"
                              placeholder="Enter meditation title" :disabled="loading"
                              :error-messages="errors['title']"/>
              </v-col>
              <v-col cols="12" class="py-0">
                <div class="text-white pb-2">Description</div>
                <v-textarea :disabled="loading" variant="outlined" density="compact" color="primary"
                            v-model="request.description"/>
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
                <v-file-input class="file-input-label" label="Select a track to Upload"
                              @update:model-value="upload"
                              single-line :disabled="loading"
                              variant="outlined" prepend-icon="" color="primary" :error-message="errors['source']">
                  <template v-slot:selection="{ fileNames }">
                    <template v-for="fileName in fileNames" :key="fileName">
                      <v-card width="100" height="100" class="justify-center align-center">
                        <v-col align-self="auto">
                          <v-img width="48" height="48" cover :src="preview?.url as string"/>
                          <v-card-text class="font-12 text-truncate mx-auto">{{ fileName }}</v-card-text>
                        </v-col>
                      </v-card>
                    </template>
                  </template>
                </v-file-input>
              </v-col>
              <v-col cols="12" class="py-0">
                <div class="text-white pb-2">Upload a picture</div>
                <v-file-input class="file-input-label" label="Select a picture to Upload"
                              @update:model-value="upload"
                              single-line :disabled="loading"
                              variant="outlined" prepend-icon="" color="primary"
                              :error-message="errors['thumbnail']">
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
              <v-col cols="6" class="pt-1 pb-1">
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
              <v-col cols="6" class="py-0" v-if="request.is_lock">
                <div class="text-white pb-2">Price($)</div>
                <v-text-field maxlength="6"
                              :disabled="loading"
                              variant="outlined"
                              v-model="request.price"
                              color="primary"
                              density="comfortable"
                              :rules="[numberOrFloatRule]"
                              validate-on="blur"
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
                    @click="closeCourseModal(isActive)"
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
                    @click="saveCourse"
                >
                </v-btn>
              </div>
            </v-card-actions>
          </v-container>
        </template>
      </v-card>
    </template>

  </v-dialog>

</template>

