<script setup lang="ts">
import Header from "~/components/header/Header.vue";
import {useCategoryStore} from "~/stores/category";

useHead({
  meta: [
    {content: 'OmniWell'},
  ],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} Meditation ` : "OmniWell";
  },
});


onMounted(async () => {
  await useCategoryStore().fetch()
})

//Todo: create enum types for snackbar




const snackbar = ref({
  status: false,
  text: '',
  timeout: 5000,
  type: '',
  color: '',
  icon: '',
})



useListen('successMessage', (value: String) => {
  snackbar.value.color = 'primary'
  snackbar.value.type = 'Success'
  snackbar.value.text = value
  snackbar.value.icon = 'mdi-check-circle'
  snackbar.value.status = true
})

useListen('errorMessage', (value: String) => {
  snackbar.value.color = 'error'
  snackbar.value.type = 'Error'
  snackbar.value.text = value
  snackbar.value.icon = 'mdi-alert-circle'
  snackbar.value.status = true
})


useListen('infoMessage', (value: String) => {
  snackbar.value.color = 'info'
  snackbar.value.type = 'Info'
  snackbar.value.text = value
  snackbar.value.icon = 'mdi-information'
  snackbar.value.status = true
})

</script>

<template>
  <v-app>
    <Header/>
    <v-main>

      <slot/>

    </v-main>
    <v-snackbar
        v-model="snackbar.status"
        :color="snackbar.color"
        vertical
        max-width="500"
    >

      <v-row justify="start"  dense class="pb-3" align="center">
        <v-icon :icon="snackbar.icon" size="large"></v-icon>
        <h3 class="pl-2">{{snackbar.type}}</h3>
      </v-row>


      <p class="font-14 pt-2">{{ snackbar.text }}</p>
<!--      <template #default>-->
<!--          <v-alert-->
<!--              border="start"-->
<!--              variant="tonal"-->
<!--              closable-->
<!--              close-label="Close Alert"-->
<!--              color="error"-->
<!--              icon="mdi mdi-alert-circle"-->
<!--              title="Error"-->
<!--          >{{snackbar.text}}</v-alert>-->
<!--      </template>-->
<!--      <template v-slot:actions>-->
<!--        <v-btn-->
<!--            color="blue"-->
<!--            variant="text"-->
<!--            @click="snackbar.status = false"-->
<!--        >-->
<!--          Close-->
<!--        </v-btn>-->
<!--      </template>-->
    </v-snackbar>
  </v-app>
</template>

<style lang="scss">
@import '@/assets/scss/style.scss';
</style>
