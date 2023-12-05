<script setup lang="ts">


import Categories from "~/components/section/configuration/Categories.vue";
import AddConfigurationItem from "~/components/section/configuration/AddConfigurationItem.vue";
import DataTable from "~/components/section/configuration/DataTable.vue";
import AddVideo from "~/components/section/modals/video/Add.vue";
import EditVideo from "~/components/section/modals/video/Edit.vue";



const search = ref('')
const pageHeader = ref("Video")
const item = ref("All Courses")
const btnText = ref("Add course")
const menu = ref(false)



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
    titleOfCourse: 'Nebula GTX 3080',
    category: 'sleep',
    quantity: '4',
    picture: '1.png',
    price: 699.99
  },
  {
    titleOfCourse: 'Nebula ssasd',
    category: 'sleep',
    quantity: '4',
    picture: '2.png',
    price: 699.99
  },
  {
    titleOfCourse: 'Nebula dsadsd0',
    category: 'sleep',
    quantity: '4',
    picture: '4.png',
    price: 699.99
  },
]);

const tableHeaders = ref([
  {title: 'Title of course', align: 'start', key: 'titleOfCourse'},
  {title: 'Category ', key: 'category'},
  {title: 'Quantity Video', key: 'quantity', align: 'center'},
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


        <template #item.titleOfVideo="{item}">
          <div class="text-truncate" style="max-width: 150px">{{ item.titleOfMeditation }}</div>
        </template>


        <template #item.quantity="{item}">
          <div class="text-center">{{ item.quantity }}</div>
        </template>

        <template #item.actions="{item}">

          <v-row justify="space-evenly">
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
               <AddVideo/>
                <EditVideo/>
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