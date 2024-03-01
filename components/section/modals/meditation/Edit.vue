<script setup lang="ts">

import Modal from "~/components/section/modals/Modal.vue";

import {useMeditationStore} from "~/stores/meditation";
import {useValidationStore} from "~/stores/validation";
import {useCategoryStore} from "~/stores/category";
import {useMediaStore} from "~/stores/media";
import {storeToRefs} from "pinia";
import type {CourseUpdateRequest} from "~/utils/requests";
import type {Preview} from "~/utils/types";



/********************************************/
const loading = ref()
const route = useRoute()
const {allCategories} = storeToRefs(useCategoryStore())
const {errors} = storeToRefs(useValidationStore());
const preview = ref<Preview | null>(null)
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
    type: String,
    required: true
  },
  categories: {
    type: Array<number>,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isPopular: {
    type: Boolean,
    required: true
  },
})

/********************************************/
const initialState = {
  id: props.id,
  title: props.title,
  description: props.description,
  categories: props.categories,
  price: props.price,
  is_popular: props.isPopular,
}
const request = reactive<CourseUpdateRequest>({...initialState})

const numberOrFloatRule = (value: string) => {
  const pattern = /^-?\d+\.?\d*$/
  return pattern.test(value)
}

/********************************************/
const allCategoriesArray = computed(() => Array.from(allCategories.value.values()))

const selectAllCategories = computed(() => {
  return request.categories.length === allCategoriesArray.value.length
})

const selectSomeCategories = computed(() => {
  return request.categories.length > 0 && request.categories.length < allCategoriesArray.value.length
})

const toggle = () => {
  if (selectAllCategories.value) {
    request.categories = []
  } else {
    request.categories = allCategoriesArray.value.slice()
  }
}

/**********************************************/

const upload = async (files: File[]) => {
  preview.value = (await useMediaStore().uploads([files[0]]))[0]
  request.thumbnail = preview.value?.id
}



const updateCourse = async () => {
  loading.value = true
  try {
    await useMeditationStore().update(request)
    useEvent('closeModal', false)
  } catch (err) {
    console.error(err)
  } finally {
    Object.assign(request, initialState);
    loading.value = false
  }
}


function close() {
  useEvent('closeModal', false)
  Object.assign(request, initialState);
  useValidationStore().clearErrors()
}
</script>

<template>

  <Modal>

    <template #dialogButton="props">
      <v-btn class="text-primary" variant="text" icon="mdi mdi-pencil-outline" v-bind="props" size="small"/>
    </template>

    <template #header>
      <span class="pl-3">Edit Meditation Course</span>
      <v-icon class="pr-5 cursor-pointer" size="small" icon="mdi mdi-close" @click="close"/>
    </template>

    <template #columns>
      <v-row justify="space-between">
        <v-col cols="12" class="pb-0">
          <div class="text-subtitle-1 text-medium-emphasis py-2 text-white">Title</div>
          <v-text-field variant="outlined" color="primary" density="comfortable" v-model="request.title"
                        :error-messages="errors['title']"
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-subtitle-1 text-medium-emphasis pb-2 text-white">Course description</div>
          <v-textarea variant="outlined" density="compact" color="primary" v-model="request.description"></v-textarea>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-subtitle-1 text-medium-emphasis pb-2 text-white">Select category</div>
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
              :items="allCategoriesArray"
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
              color="primary"
              density="comfortable"
              :rules="[numberOrFloatRule]"
              validate-on="blur"
              :error-messages="errors['price']"
          />
        </v-col>
          <v-col cols="6" class="py-0">
          <div class="text-subtitle-1 text-white text-medium-emphasis mb-md-5 text-white">Popular</div>
          <v-radio-group class="mt-5" inline v-model="request.is_popular" :error-messages="errors['is_popular']">
            <v-radio density="compact" :value="false" label="No" color="primary" class="pr-md-8"/>
            <v-radio density="compact" :value="true" label="Yes" color="primary"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-subtitle-1 text-medium-emphasis text-white pb-2">Upload a picture</div>
          <v-file-input @update:model-value="upload" placeholder="Upload your documents"
                        variant="outlined" prepend-icon="" color="primary" hide-details="">
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
          @click="updateCourse"
      >
      </v-btn>
    </template>

  </Modal>


</template>

<style scoped lang="scss"></style>