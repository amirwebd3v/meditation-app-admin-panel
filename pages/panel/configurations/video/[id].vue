<script setup lang="ts">



import DataTable from "~/components/section/configuration/DataTable.vue";


const route = useRoute();
const search = ref('')
const pageId = route.params.id;
const pageHeader = computed(() => items.value[pageId].titleOfVideo);
const btnText = ref("Add course")



const items = ref([
  {
    id: '1',
    titleOfVideo: 'Nebula GTX 3080',
    type: 'Free',
    picture: '1.png',
  },
  {
    id: '2',
    titleOfVideo: 'Nebula ssasd',
    type: 'Paid',
    picture: '2.png',
  },
  {
    id: '3',
    titleOfVideo: 'Nebula dsadsd0',
    type: 'Free',
    picture: '4.png',
  },
]);

const tableHeaders = ref([
  {title: 'Title Of Video', align: 'start', key: 'titleOfVideo'},
  {title: 'Free/Paid', key: 'type', align: 'center'},
  {title: 'Picture', key: 'picture', align: 'center'},
  {title: '', key: 'actions', sortable: false, align: 'center'},
])


</script>

<template>
  <div class="mt-16">
    <v-container fluid="">


      <DataTable :header="pageHeader" :items="items" :table-headers="tableHeaders" :search="search" >


        <template #item.picture="{ item }" >
          <v-card class="my-2" elevation="2" rounded>
            <v-img
                :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.picture}`"
                height="64"
                cover=""
            ></v-img>
          </v-card>
        </template>


        <template #item.titleOfVideo="{item}" class="w-100">
          <div class="text-truncate">{{ item.titleOfVideo }}</div>
        </template>


        <template #item.type="{item}">
          <div>{{ item.type }}</div>
        </template>

        <template #item.actions="{item}">

          <v-row justify="end" no-gutters>
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