<script setup lang="ts">
definePageMeta({
  middleware: 'sanctum:auth',
  path: '/panel'
})
</script>


<template>
  <v-container class="fill-height d-flex flex-column align-center" fluid>

    <v-row class="ma-0 pb-5 " align="end">
      <p class="text-center text-white font-20 font-weight-medium">Select what you are going to configure</p>
    </v-row>

    <v-row align="start" class="ma-0">
      <v-col cols="12" sm="6" md="6">
        <v-card :to="{name:  'panel-videos'}" class="bg-primary-light" max-height="225" rounded="lg">
          <v-img
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              cover
              max-height="175"
          >
          </v-img>

          <v-card-text class="text-center  font-16 ">
            Video Lessons
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-card :to="{name:  'panel-meditations'}" class="bg-primary-light" max-height="225" rounded="lg">
          <v-img
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              max-height="175"
              cover
          >
          </v-img>

          <v-card-text class="text-center  font-16 ">
            Meditations
          </v-card-text>
        </v-card>

      </v-col>

    </v-row>

  </v-container>
</template>

<style scoped lang="scss">
.v-card {
  @media (max-width: 1600px) {
    width: 375px !important;
    max-width: 100% !important;
  }

  @media (max-width: 1024px) {
    width: 320px !important;
  }

  @media (max-width: 767px) {
    width: 360px !important;
  }

  @media (max-width: 576px) {
    max-width: 345px !important;
    width: 100% !important;
  }

  @media (min-width: 576px) {
    width: 370px !important;
  }
}
</style>






