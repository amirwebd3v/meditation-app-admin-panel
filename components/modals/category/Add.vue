<script setup lang="ts">
import {useValidationStore} from "~/stores/validation";
import type {CategoryStoreRequest} from "~/utils/requests";
import {storeToRefs} from "pinia";

/*********************************************/
const {errors} = storeToRefs(useValidationStore());
const loading = ref(false)

const categoryFieldRules = [
  (v: string) => (v && v.length >= 3) || 'Minimum 3 characters',
  (v: string) => (v && v.length <= 30) || 'Maximum 30 characters',
];

/*********************************************/
const initialState = {
  name : ''
}

const request = reactive<CategoryStoreRequest>({...initialState})

/*********************************************/
const saveCategory = async () => {
  loading.value = true
  try {
    await useCategoryStore().store(request)
    useEvent('successMessage', 'New category is successfully Added.')
    useEvent('closeModal', false)
  } finally {
    loading.value = false
    Object.assign(request, initialState);
  }
}


function close() {
  Object.assign(request, initialState);
  useValidationStore().clearErrors()
  useEvent('closeModal', false)
}


</script>

<template>


  <LazyModalsMain>

    <template #dialogButton="props">
      <v-btn
          color="primary"
          :width="$vuetify.display.xs || $vuetify.display.smAndDown  ? '' : '215'"
          v-bind="props"
          text="Add Category"
          :size="$vuetify.display.smAndDown ? 'small' : 'default'"
          :icon="$vuetify.display.smAndDown"
          rounded="xl"
      >
        <template v-slot:default v-if="$vuetify.display.smAndDown">
          <v-icon icon="mdi-plus"/>
        </template>
        <template v-slot:prepend v-if="$vuetify.display.smAndUp">
          <v-icon class="pr-6" icon="mdi-plus"/>
        </template>
      </v-btn>

    </template>
    <template #header>
      <span class="pl-3">Add Category</span>
      <v-icon class="pr-5 cursor-pointer" size="small" icon="mdi mdi-close" @click="close"/>
    </template>
    <template #columns>
      <v-row justify="space-between">
        <v-col cols="12" class="pb-0">
          <div class="text-white py-2">Category</div>
          <v-text-field
              v-model="request.name"
              clearable
              :rules="categoryFieldRules"
              variant="outlined" color="primary" density="comfortable"
              placeholder="Enter category name(s)" :error-messages="errors['name']"/>
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
          @click="saveCategory"
      >
      </v-btn>
    </template>

  </LazyModalsMain>
</template>
