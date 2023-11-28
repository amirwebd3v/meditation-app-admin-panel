<script setup lang="ts">

const { user, loggedIn } = useAuth()

definePageMeta({
  middleware: 'auth'
})

</script>

<template>
  <v-container fluid="">
    {{ user }}
    <v-btn @click="$sanctumAuth.logout" color="primary">
      Logout
    </v-btn>
    <v-row justify="center">
      <v-col class="d-flex" cols="12" md="3">
        <v-card class="mx-auto" max-width="400">
          <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
            <v-card-title>Top 10 Australian beaches</v-card-title>
          </v-img>
          <v-card-subtitle class="pt-4">
            Number 10
          </v-card-subtitle>
          <v-card-text>
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="d-flex" cols="12" md="3">
        <v-card class="mx-auto" width="400" color="primary-light">
          <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                 cover="">
          </v-img>
          <v-card-text class="text-center font-weight-bold font-16 ">
            Meditation
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>