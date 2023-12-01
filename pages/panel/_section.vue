<script setup lang="ts">
const tags = [
  'All',
  'Sleep',
  'Relationship',
  'Nutrition',
  'Drawers',
  'Shopping',
  'Art',
  'Tech',
  'Creative Writing',
]

const search = ref('');
const items = ref([
  {
    titleOfMeditation: 'Nebula GTX 3080',
    type: 'Course',
    category: 'Relationship',
    description: 'description',
    meditationQuantity: '4',
    picture: '1.png',
    price: 699.99
  },
  {
    titleOfMeditation: 'Nebula ssasd',
    type: 'Codurse',
    category: 'Relationship',
    description: 'description',
    meditationQuantity: '4',
    picture: '2.png',
    price: 699.99
  },
  {
    titleOfMeditation: 'Nebula dsadsd0',
    type: 'Coursdadsdse',
    category: 'Relationship',
    description: 'description',
    meditationQuantity: '4',
    picture: '4.png',
    price: 699.99
  },
]);


const headers = ref([
  {title: 'Title Of Meditation', align: 'start', sortable: false, key: 'titleOfMeditation'},
  {title: 'Type', key: 'type'},
  {title: 'Category ', key: 'category'},
  {title: 'Description', key: 'description'},
  {title: 'Meditation Quantity', key: 'meditationQuantity', align: 'center'},
  {title: 'Picture', key: 'picture', align: 'center'},
  {title: 'Price', key: 'price'},
  {title: '', key: 'actions', sortable: false},
])


const menu = ref(false)

</script>

<template>
  <div class="mt-16">
    <v-container>

      <v-col cols="12" md="7" sm="8">
        <v-row justify="start" align="center" class="mb-10">
          <h2 class="text-white pr-10">Video</h2>
          <v-text-field
              v-model="search"
              density="comfortable"
              hide-details
              variant="outlined"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              single-line
          ></v-text-field>
        </v-row>
      </v-col>

      <v-row justify="space-between" align="center" class="mt-2 px-3">
        <span class="text-white font-weight-medium font-18">Categories</span>
        <v-btn
            color="primary"
            text="Add category"
            :size="$vuetify.display.smAndDown ? 'small' : 'default'"
            :icon="$vuetify.display.smAndDown"
            rounded="xl"
        >
          <template v-slot:default v-if="$vuetify.display.smAndDown">
            <v-icon class="mdi mdi-plus"/>
          </template>
          <template v-slot:prepend v-if="$vuetify.display.smAndUp">
            <v-icon class="mdi mdi-plus"/>
          </template>
        </v-btn>
      </v-row>


      <v-row justify="start" align="center">
        <v-col cols="auto">
          <v-sheet class="bg-transparent">
            <v-chip-group
                multiple=""
                selected-class="text-white bg-primary border-none"
                variant="flat"
                mandatory="force"
            >
              <v-chip
                  size="large"
                  class="px-4 font-weight-light text-white"
                  style="border-color: #96AE50 !important;"
                  variant="outlined"
                  v-for="tag in tags"
                  :key="tag"
                  :text="tag"
              >
                <template v-slot:append>
                  <v-icon class="mdi mdi-close pl-4 cursor-pointer" size="x-small" @click=""></v-icon>
                </template>
              </v-chip>
            </v-chip-group>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row justify="space-between" align="center" class="mt-4 px-3">
        <span class="text-white font-weight-medium font-18">All meditations</span>
        <v-btn
            color="primary"
            text="Add meditation"
            :size="$vuetify.display.smAndDown ? 'small' : 'default'"
            rounded="xl"
            :icon="$vuetify.display.smAndDown"
        >
          <template v-slot:default v-if="$vuetify.display.smAndDown">
            <v-icon class="mdi mdi-plus"/>
          </template>
          <template v-slot:prepend v-if="$vuetify.display.smAndUp">
            <v-icon class="mdi mdi-plus"/>
          </template>
        </v-btn>
      </v-row>


      <v-data-table v-model:search="search"
                    :items="items"
                    class="mt-10 rounded-lg bg-light-brown-1"
                    v-model:headers="<any>headers">


        <template v-slot:item.picture="{ item }">
          <v-card class="my-2" elevation="2" rounded>
            <v-img
                :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.picture}`"
                height="64"
                cover=""
            ></v-img>
          </v-card>
        </template>



        <template v-slot:item.titleOfMeditation="{item}">
          <div class="text-truncate" style="max-width: 150px">{{ item.titleOfMeditation }}</div>
        </template>
        <template v-slot:item.meditationQuantity="{item}">
          <div class="text-center">{{ item.meditationQuantity }}</div>
        </template>


        <template v-slot:item.actions="{item}">

            <v-row justify="space-evenly">
              <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  location="start"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                      class="text-primary"
                      variant="text"
                      v-bind="props"
                      icon="mdi mdi-dots-vertical"
                      size="small"

                  />
                </template>

                <v-card class="bg-light-brown-1" rounded>
                  <v-btn
                      class="text-primary"
                      variant="text"
                      icon="mdi mdi-plus"
                      size="small"

                  />
                  <v-btn
                      class="text-primary"
                      variant="text"
                      icon="mdi mdi-pencil"
                      size="small"

                  />
                  <v-btn
                      class="text-primary"
                      variant="text"
                      icon="mdi mdi-delete-outline"
                      size="small"

                  />
                </v-card>
              </v-menu>
              <v-btn
                  class="text-primary"
                  variant="text"
                  size="small"
                  icon="mdi-chevron-right"
                  @click=""
              />
            </v-row>


        </template>
      </v-data-table>


    </v-container>
  </div>
</template>

<style lang="scss" scoped>
div:deep(.v-table__wrapper) {
  thead {
    background-color: #7C6346;
  }
}
</style>