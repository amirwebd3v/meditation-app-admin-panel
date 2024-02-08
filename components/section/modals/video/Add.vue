<script setup lang="ts">

import Base from "~/components/section/modals/Base.vue";

defineComponent({
  name: 'AddVideo',
})

defineProps({
  btnOutTable : {
    type : Boolean,
    default : true
  },
  btnInTable: {
    type : Boolean,
    default : false
  }
})
/*********************************************/
const formTitle = ref('Add Video Course')
const icon = ref('mdi mdi-plus')
const isBtnText = ref('')

/********************************************/
const router = useRouter()
const currentRouteName = router.currentRoute.value.name;
const isVideoCoursePage = computed(() => {
  return currentRouteName === 'panel-videos-course-title-lessons';
})

</script>

<template>

  <Base :form-title="formTitle" :icon="icon">

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
          :text="btnOutTable ? isBtnText = 'Add Video' : ''"
          :size="$vuetify.display.smAndDown ? 'small' : 'default'"
          :icon="$vuetify.display.smAndDown"
          rounded="xl"

      >
        <template v-slot:default v-if="$vuetify.display.smAndDown">
          <v-icon  icon="mdi-plus"/>
        </template>
        <template v-slot:prepend v-if="$vuetify.display.smAndUp">
          <v-icon class="pr-3" icon="mdi-plus"/>
        </template>
      </v-btn>
    </template>


    <template #columns>
      <v-row justify="space-between">
        <v-col cols="12" class="pb-0">
          <div class="text-subtitle-1 text-medium-emphasis py-2">Title</div>
          <v-text-field variant="outlined" color="primary" density="comfortable"
                        placeholder="Enter title"/>
        </v-col>
        <v-col cols="12" class="py-0" v-if="isVideoCoursePage">
          <div class="text-subtitle-1 text-medium-emphasis pb-2">Video Link</div>
          <v-text-field variant="outlined" color="primary" density="comfortable"
                        placeholder="https://"/>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-subtitle-1 text-medium-emphasis pb-2">Description</div>
          <v-textarea variant="outlined" density="compact" color="primary"></v-textarea>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-subtitle-1 text-medium-emphasis pb-2">Select category</div>
          <v-select
              variant="outlined"
              multiple=""
              color="primary"
              density="comfortable"
              single-line
              :items="['All Category', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          ></v-select>
        </v-col>
        <v-col cols="6" class="py-0">
          <div class="text-subtitle-1 text-medium-emphasis pb-2">Price ($)</div>
          <v-combobox
              variant="outlined"
              multiple=""
              :items="['Free']"
              color="primary"
              density="comfortable"
          ></v-combobox>
        </v-col>
        <v-col cols="6" class="py-0" v-if="isVideoCoursePage">
          <div class="text-subtitle-1 text-medium-emphasis pb-2">Type</div>
          <v-select
              variant="outlined"
              color="primary"
              density="comfortable"
              single-line
              :items="['Single', 'Course']"
          ></v-select>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="text-subtitle-1 text-medium-emphasis pb-2">Upload a picture</div>
          <v-file-input
              placeholder="Upload your documents"
              variant="outlined"
              prepend-icon=""
              color="primary"
              hide-details=""
          >
            <template v-slot:selection="{ fileNames }">
              <template v-for="fileName in fileNames" :key="fileName">
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

              </template>
            </template>
          </v-file-input>
        </v-col>
      </v-row>
    </template>

  </Base>


</template>

<style scoped lang="scss">

</style>