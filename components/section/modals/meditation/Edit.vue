<script setup lang="ts">

import Base from "~/components/section/modals/Base.vue";
import { useMeditationStore } from "~/stores/meditation";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "~/stores/category";
import type { CourseUpdateRequest } from "~/utils/requests";
import {useMediaStore} from "~/stores/media";


/********************************************/
const loading = ref()
const dialog = ref()
const route = useRoute();
const { allCategories } = storeToRefs(useCategoryStore())
/********************************************/
defineComponent({
  name: 'EditMeditation',
})

const props = defineProps({
  formTitle: {
    type: String,
    required: true
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
  id: {
    type: String,
    required: true,
  }

})
//**************************************

const maskPrice = {
  mask: '0.99',
  tokens: {
    0: { pattern: /\d/, multiple: true }, // Multiple digits for integer part
    9: { pattern: /\d/, optional: true }, // Optional decimal point and digit
  }
}

// const {files} = storeToRefs(useMediaStore())

/********************************************/
const request = reactive<CourseUpdateRequest>({
  id: props.id,
  title: props.title,
  // thumbnail: [...files.value.values()][0]['file_id'],
  description: props.description,
  categories: props.categories,
  price: props.price,
  is_popular: props.isPopular
})

// const images = ref<File[]>([])

// watch(images, (newFile: File[], oldFile: File[]) => {
//   useMediaStore().upload(newFile)
// })

const updateCourse = async () => {
  loading.value = true
  await useMeditationStore().update(request)
  dialog.value = false
  loading.value = false
}


</script>

<template>
  <Base :form-title="formTitle" :loading="loading" :action-btn="updateCourse" :dialog-status="dialog">

  <template v-slot:button="props">
    <v-btn class="text-primary" variant="text" icon="mdi mdi-pencil-outline" v-bind="props" size="small"/>
  </template>


  <template #columns>
    <v-row justify="space-between">
      <v-col cols="12" class="pb-0">
        <div class="text-subtitle-1 text-medium-emphasis py-2 text-white">Title</div>
        <v-text-field variant="outlined" color="primary" density="comfortable" v-model="request.title" />
      </v-col>
      <v-col cols="12" class="py-0">
        <div class="text-subtitle-1 text-medium-emphasis pb-2 text-white">Course description</div>
        <v-textarea variant="outlined" density="compact" color="primary" v-model="request.description"></v-textarea>
      </v-col>
      <v-col cols="12" class="py-0">
        <div class="text-subtitle-1 text-medium-emphasis pb-2 text-white">Select category</div>
        <v-autocomplete variant="outlined" :disabled="loading" chips closable-chips multiple v-model="request.categories"
          color="primary" density="comfortable" single-line :items="allCategories" item-title="name" item-value="id"
          required />
      </v-col>
      <v-col cols="6" class="py-0">
        <div class="text-subtitle-1 text-white text-medium-emphasis pb-2 text-white">Price ($)</div>
        <v-text-field required variant="outlined" v-model="request.price" color="primary" density="comfortable"
          v-maska:[maskPrice]></v-text-field>
      </v-col>
      <v-col cols="6" class="py-0">
        <div class="text-subtitle-1 text-white text-medium-emphasis mb-md-5 text-white">Popular</div>
        <v-radio-group class="mt-5" inline v-model="request.is_popular">
          <v-radio density="compact" :value="false" label="No" color="primary" class="pr-md-8" />
          <v-radio density="compact" :value="true" label="Yes" color="primary" />
        </v-radio-group>
      </v-col>
      <v-col cols="12" class="py-0">
        <div class="text-subtitle-1 text-medium-emphasis text-white pb-2">Upload a picture</div>
          <v-file-input placeholder="Upload your documents" variant="outlined" prepend-icon="" color="primary"
                        hide-details="">
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

  </Base>
</template>

<style scoped lang="scss"></style>