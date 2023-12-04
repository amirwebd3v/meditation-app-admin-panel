<script setup lang="ts">



import DataTable from "~/components/section/configuration/DataTable.vue";


const route = useRoute();
const search = ref('')
const pageId = route.params.id;
const pageHeader = computed(() => items.value[pageId].titleOfMeditation);
const btnText = ref("Add Meditation")



const items = ref([
  {
    id: '1',
    titleOfMeditation: 'Nebula GTX 3080',
    type: 'Free',
    category: 'Relationship',
    description: 'description',
    picture: '1.png',
  },
  {
    id: '2',
    titleOfMeditation: 'Nebula ssasd',
    type: 'Paid',
    category: 'Relationship',
    description: 'description',
    picture: '2.png',
  },
  {
    id: '3',
    titleOfMeditation: 'Nebula dsadsd0',
    type: 'Free',
    category: 'Relationship',
    description: 'description',
    picture: '4.png',
  },
]);

const tableHeaders = ref([
  {title: 'Title Of Meditation', align: 'start', key: 'titleOfMeditation'},
  {title: 'Category ', key: 'category'},
  {title: 'Free/Paid', key: 'type'},
  {title: 'Description', key: 'description'},
  {title: 'Picture', key: 'picture', align: 'center'},
  {title: '', key: 'actions', sortable: false},
])


</script>

<template>
  <div class="mt-16">
    <v-container>


      <DataTable :header="pageHeader" :items="items" :table-headers="tableHeaders" :search="search" >


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


        <template #item.type="{item}">
          <div>{{ item.type }}</div>
        </template>

        <template #item.actions="{item}">

          <v-row justify="space-evenly" no-gutters>
            <v-btn
                class="text-primary"
                variant="text"
                size="small"
                icon="mdi-pencil-outline"
                @click=""
            />
            <v-btn
                class="text-primary"
                variant="text"
                size="small"
                icon="mdi-delete-outline"
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