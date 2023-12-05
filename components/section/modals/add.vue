<script setup lang="ts">
defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
  formTitle: {
    type: String,
    required : true,
  },

});


</script>

<template>
    <v-dialog
        :v-model="dialog"
        max-width="500px"
    >
      <template v-slot:activator="{ props }">
        <v-btn
            class="text-primary"
            variant="text"
            icon="mdi mdi-plus"
            v-bind="props"
            size="small"
        />
      </template>
      <v-card class="bg-light-brown-1" rounded="lg">
        <v-container>
        <v-card-title>
          {{ formTitle }}
        </v-card-title>

        <v-card-text>
            <v-row justify="space-between" >
              <v-col cols="12" class="pb-0">
                <div class="text-subtitle-1 text-medium-emphasis py-2">Title</div>
                <v-text-field variant="outlined" color="primary" density="comfortable"
                              placeholder="Enter meditation title"/>
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

        </v-card-text>

        <v-card-actions class="float-right pt-0 mb-2 mr-2" >
          <v-btn
              color="primary"
              class="px-12"
              size="large"
              rounded="xl"
              variant="outlined"
              text="Cancel"
          >
          </v-btn>
          <v-btn
              class="text-white  px-15 bg-primary"
              rounded="xl"
              size="large"
              variant="outlined"
              text="Save"
              @click="close"
          >
          </v-btn>
        </v-card-actions>
         </v-container>
      </v-card>
    </v-dialog>

</template>

<style scoped lang="scss">
div:deep(.v-file-input){
  height: 150px ;
}
</style>