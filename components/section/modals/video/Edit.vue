<script setup lang="ts">

import Index from "~/components/section/modals/index.vue";

const formTitle = ref('Edit Video Course')
const icon = ref('mdi mdi-pencil')

defineComponent({
  name: 'EditVideo',
})
</script>

<template>

  <index :form-title="formTitle" :icon="icon">
    <template #columns>
       <v-row justify="space-between">
      <v-col cols="12" class="pb-0">
        <div class="text-subtitle-1 text-medium-emphasis py-2">Title</div>
        <v-text-field variant="outlined" color="primary" density="comfortable"
                      placeholder="Enter video title"/>
      </v-col>
      <v-col cols="12" class="py-0">
        <div class="text-subtitle-1 text-medium-emphasis pb-2">Course description</div>
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
      <v-col cols="6" class="py-0">
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
  </index>


</template>

<style scoped lang="scss">

</style>