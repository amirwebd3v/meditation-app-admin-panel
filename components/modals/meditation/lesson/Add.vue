<script setup lang="ts">
import type { LessonStoreRequest} from "~/utils/requests";
import {useCategoryStore} from "~/stores/category";
import {useValidationStore} from "~/stores/validation";
import {useLessonStore} from "~/stores/lesson";
import {storeToRefs} from "pinia";



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
  }
})

/*********************************************/
const isBtnText = ref()
const loading = ref()
const {allMeditationCategories} = storeToRefs(useCategoryStore());
const {errors} = storeToRefs(useValidationStore());
/********************************************/
const initialState = {
  course_id: props.courseId,
  title: '',
  description: null,
  categories: [],
  price: 0,
  is_popular: false,
}

const request = reactive<LessonStoreRequest>({...initialState})

const numberOrFloatRule = (value: string) => {
  const pattern = /^-?\d+\.?\d*$/
  return pattern.test(value)
}

/********************************************/
const allMeditationCategoriesArray = computed(() => Array.from(allMeditationCategories.value.values()))

const selectAllCategories = computed(() => {
  return request.categories.length === allMeditationCategoriesArray.value.length
})

const selectSomeCategories = computed(() => {
  return request.categories.length > 0 && request.categories.length < allMeditationCategoriesArray.value.length
})

const toggle = () => {
  if (selectAllCategories.value) {
    request.categories = []
  } else {
    request.categories = allMeditationCategoriesArray.value.slice()
  }
}

/**********************************************/
const saveLesson = async () => {
  loading.value = true
  try {
    await useLessonStore().store(request)
    useEvent('successMessage', 'Single Meditation is successfully Added.')
    useEvent('closeModal', false)
  } catch (err) {
    useEvent('errorMessage', useValidationStore().errors)
  } finally {
    loading.value = false
    Object.assign(request, initialState);
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
          :text="btnOutTable ? isBtnText = 'Add Meditation' : ''"
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
      <span class="pl-3">Add Single Meditation</span>
      <v-icon class="pr-5 cursor-pointer" size="small" icon="mdi mdi-close" @click="close"/>
    </template>
    <template #columns>
      <v-row justify="space-between">
        <v-col cols="12" class="pb-0">
          <div class="text-subtitle-1 text-white text-medium-emphasis py-2">Title</div>
          <v-text-field variant="outlined" color="primary" density="comfortable" v-model="request.title"
                        placeholder="Enter single Meditation title" :disabled="loading" :error-messages="errors['title']"/>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-subtitle-1 text-white text-medium-emphasis pb-2">Description</div>
          <v-textarea :disabled="loading" variant="outlined" density="compact" color="primary"
                      v-model="request.description"/>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-subtitle-1 text-white text-medium-emphasis pb-2">Select category</div>
          <v-autocomplete
              variant="outlined"
              :disabled="loading"
              clearable
              chips
              closable-chips
              multiple
              v-model="request.categories"
              color="primary"
              density="comfortable"
              single-line
              :items="allMeditationCategoriesArray"
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
          <div class="text-subtitle-1 text-white text-medium-emphasis pb-2">Price ($)</div>
          <v-text-field
              :disabled="loading"
              variant="outlined"
              v-model="request.price"
              type="number"
              color="primary"
              density="comfortable"
              :rules="[numberOrFloatRule]"
              validate-on="blur"
              :error-messages="errors['price']"
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="py-0">
          <div class="text-subtitle-1 text-white text-medium-emphasis mb-md-5">Popular</div>
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
        <v-col cols="12" class="py-0">
          <div class="text-subtitle-1 text-medium-emphasis text-white pb-2">Upload a picture</div>
          <v-file-input placeholder="Upload your documents" variant="outlined" prepend-icon="" color="primary"
                        hide-details="" :disabled="loading">
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
          @click="saveLesson"
      >
      </v-btn>
    </template>
  </LazyModalsMain>
</template>

