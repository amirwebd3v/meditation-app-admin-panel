<script setup lang="ts">


import Categories from "~/components/section/configuration/Categories.vue";
import AddConfigurationItem from "~/components/section/configuration/AddConfigurationItem.vue";
import DataTable from "~/components/section/configuration/DataTable.vue";
import Add from "~/components/section/modals/add.vue";



const search = ref('')
const pageHeader = ref("Meditation section")
const item = ref("All Meditations")
const btnText = ref("Add Meditation")
const menu = ref(false)
const formTitle = ref('Add meditation course')
const addMeditationBtn = ref(false)


const filters = [
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

const tableHeaders = ref([
  {title: 'Title Of Meditation', align: 'start', key: 'titleOfMeditation'},
  {title: 'Type', key: 'type'},
  {title: 'Category ', key: 'category'},
  {title: 'Description', key: 'description'},
  {title: 'Meditation Quantity', key: 'meditationQuantity', align: 'center'},
  {title: 'Picture', key: 'picture', align: 'center'},
  {title: 'Price', key: 'price'},
  {title: '', key: 'actions', sortable: false},
])




</script>

<template>
  <div class="mt-16">
    <v-container>


      <DataTable :header="pageHeader" :items="items" :table-headers="tableHeaders" :menu="menu" :search="search" >

        <template #outsideTable>
          <Categories :Filters="filters"  />
          <AddConfigurationItem :Item="item" :BtnText="btnText"/>
        </template>

        <template #item.picture="{ item }">
          <v-card class="my-2" elevation="2" rounded>
            <v-img
                :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.picture}`"
                height="64"
                cover=""
            ></v-img>
          </v-card>
        </template>


        <template #item.titleOfMeditation="{item}">
          <div class="text-truncate" style="max-width: 150px">{{ item.titleOfMeditation }}</div>
        </template>


        <template #item.meditationQuantity="{item}">
          <div class="text-center">{{ item.meditationQuantity }}</div>
        </template>

        <template #item.actions="{item}">
            <v-row justify="center">
              <v-menu
                  :v-model="menu"
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
                  <add :form-title="formTitle" :dialog="addMeditationBtn"/>

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



      </DataTable>


    </v-container>
  </div>
</template>

<style scoped lang="scss">

</style>