<script setup lang="ts">
import Base from "~/components/section/modals/Base.vue";
import type {CourseStoreRequest} from "~/utils/requests";
import {CourseType} from "~/utils/enums";
import {useMeditationStore} from "~/stores/meditation";
import {useCategoryStore} from "~/stores/category";
import {storeToRefs} from "pinia";

/*********************************************/
defineComponent({
  name: 'AddMeditation',
})

defineProps({
  btnOutTable: {
    type: Boolean,
    default: true
  },
  btnInTable: {
    type: Boolean,
    default: false
  },
})

/*********************************************/
const formTitle = ref('Add Meditation Course')
const icon = ref('mdi mdi-plus')
const isBtnText = ref('')
const loading = ref()
const dialog = ref()
const {allCategories} = storeToRefs(useCategoryStore())

/********************************************/
const request = reactive<CourseStoreRequest>({
  title: '',
  description: null,
  categories: [],
  price: 0,
  type: CourseType.Meditation,
  is_popular: false
})
/********************************************/

const maskPrice = {
  mask: '0.99',
  tokens: {
    0: {pattern: /\d/, multiple: true}, // Multiple digits for integer part
    9: {pattern: /\d/, optional: true}, // Optional decimal point and digit
  }
}



/********************************************/
const saveCourse = async () => {
  loading.value = true
  await useMeditationStore().store(request)
  dialog.value = false
  loading.value = false
}




</script>

<template>

  <Base :form-title="formTitle" :icon="icon" :loading="loading" :save-btn="saveCourse" :dialog-status="dialog">

    <template v-slot:button="props">
      <v-btn
          v-if="btnInTable"
          class="text-primary"
          variant="text"
          :icon="icon"
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


    <template #columns>
      <v-row justify="space-between">
        <v-col cols="12" class="pb-0">
          <div class="text-subtitle-1 text-white text-medium-emphasis py-2">Title</div>
          <v-text-field variant="outlined" color="primary" density="comfortable" v-model="request.title"
                        placeholder="Enter meditation title" required/>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-subtitle-1 text-white text-medium-emphasis pb-2">Description</div>
          <v-textarea variant="outlined" density="compact" color="primary" v-model="request.description" required/>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-subtitle-1 text-white text-medium-emphasis pb-2">Select category</div>
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
              :items="allCategories"
              item-title="name"
              item-value="id"
              required
          >
<!--            <template v-slot:prepend-item>-->
<!--              <v-list-item-->
<!--                  title="All Categories"-->
<!--                  @click="toggle"-->

<!--              >-->
<!--                <template v-slot:prepend>-->
<!--                  <v-checkbox-btn-->
<!--                      color="primary"-->
<!--                      :indeterminate="likesSomeFruit && !likesAllFruit"-->
<!--                      :model-value="allCategories"-->
<!--                  ></v-checkbox-btn>-->
<!--                </template>-->
<!--              </v-list-item>-->

<!--              <v-divider class="mt-2"></v-divider>-->
<!--            </template>-->

          </v-autocomplete>
        </v-col>
        <v-col cols="6" class="py-0">
          <div class="text-subtitle-1 text-white text-medium-emphasis pb-2">Price ($)</div>
          <v-text-field
              required
              variant="outlined"
              v-model="request.price"
              color="primary"
              density="comfortable"
              v-maska:[maskPrice]
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="py-0">
          <div class="text-subtitle-1 text-white text-medium-emphasis mb-md-5">Popular</div>
          <v-radio-group class="mt-5" inline v-model="request.is_popular" >
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
          <div class="text-subtitle-1 text-white text-medium-emphasis pb-2">Upload a picture</div>
          <v-file-input
              placeholder="Upload your documents"
              variant="outlined"
              prepend-icon=""
              color="primary"
              hide-details=""
          >
            <template v-slot:selection="{ fileNames }">
              <div v-for="fileName in fileNames" :key="fileName">
                <v-card width="125" height="125" class="justify-center align-center">
                  <v-col align-self="auto">
                    <v-img
                        width="auto"
                        height="50"
                        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
                    >
                    </v-img>
                    <v-card-text class="text-truncate">{{ fileName }}</v-card-text>
                  </v-col>


                </v-card>

              </div>
            </template>
          </v-file-input>
        </v-col>
      </v-row>
    </template>

  </Base>

</template>

<style scoped lang="scss">

</style>