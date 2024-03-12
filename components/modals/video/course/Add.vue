<script setup lang="ts">
import type {CourseStoreRequest} from "~/utils/requests";
import {CourseSet, CourseType} from "~/utils/enums";

/*********************************************/
const loading = ref()
const {errors} = storeToRefs(useValidationStore());
/********************************************/
const initialState = {
  title: null,
  set: CourseSet.Course,
  description: null,
  categories: [],
  price: 0,
  type: CourseType.Video,
  is_lock: false,
  is_popular: false
}

const request = reactive<CourseStoreRequest>({...initialState})

const numberOrFloatRule = (value: string) => {
  const pattern = /^-?\d+\.?\d*$/
  return pattern.test(value)
}

/********************************************/
const videoCategoriesArray = computed(() =>
    Array.from(useCategoryStore().allCategories(CourseType.Video).values()))

const selectAllCategories = computed(() => {
  return request.categories.length === videoCategoriesArray.value.length
})

const selectSomeCategories = computed(() => {
  return request.categories.length > 0 && request.categories.length < videoCategoriesArray.value.length
})

const toggle = () => {
  if (selectAllCategories.value) {
    request.categories = []
  } else {
    request.categories = videoCategoriesArray.value.map(c => c.id)
  }
}

/**********************************************/
const saveCourse = async () => {
  loading.value = true
  try {
    await useVideoStore().store(request)
    useEvent('refreshVideosCourseTable')
    useEvent('successMessage', `${request.title} is successfully Added as a video ${request.set.toLowerCase()}.`)
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

      <v-btn
          color="primary"
          :width="$vuetify.display.xs || $vuetify.display.smAndDown  ? '' : '215'"
          v-bind="props"
          text="Add course"
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
      <span class="pl-3">Add course</span>
      <v-icon class="pr-5 cursor-pointer" size="small" icon="mdi mdi-close" @click="close"/>
    </template>
    <template #columns>
      <v-row justify="space-between">
        <v-col cols="12" class="pb-0">
          <div class="text-white py-2">Title</div>
          <v-text-field maxlength="30" variant="outlined" color="primary" density="comfortable" v-model="request.title"
                        placeholder="Enter course title" :disabled="loading" :error-messages="errors['title']"/>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-white pb-2">Description</div>
          <v-textarea :disabled="loading" variant="outlined" density="compact" color="primary"
                      v-model="request.description"/>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-white pb-2">Select category</div>
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
              :items="videoCategoriesArray"
              auto-select-first
              item-title="name"
              item-value="id"
              menu-icon="mdi-chevron-down"
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
                  title="All Categories"
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
          <v-file-input class="file-input-label mb-2" label="Select a picture to Upload" variant="outlined" prepend-icon=""
                        color="primary" hide-details="" :disabled="loading">
            <template v-slot:selection="{ fileNames }">
              <template v-for="fileName in fileNames" :key="fileName">
                <v-card width="45" height="45" class="justify-center align-center">
                  <v-col align-self="auto">
                    <v-img width="auto" height="25" cover
                           src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg">
                    </v-img>
                    <v-card-text class="text-truncate">{{ fileName }}</v-card-text>
                  </v-col>
                </v-card>
              </template>
            </template>
          </v-file-input>
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
    </template>
  </LazyModalsMain>
</template>

