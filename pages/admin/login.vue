<script setup lang="ts">


const visible = ref(false);


</script>
<template>
  <v-app>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card
              class="mx-auto bg-transparent"
              elevation="0"
              width="400"

          >
            <v-img
                class="mx-auto my-6"
                max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
            ></v-img>

            <h4 class="text-center mb-10 ">Welcome to Admin panel</h4>

            <v-text-field
                density="compact"
                placeholder="Enter Email"
                variant="outlined"
            ></v-text-field>


            <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Enter Password"
                variant="outlined"
                @click:append-inner="visible = !visible"
            ></v-text-field>

            <v-card
                class="mb-12"
                color="surface-variant"
                variant="tonal"
            >
            </v-card>

            <v-btn
                block=""
                rounded="xl"
                class="mb-8"
                color="primary"
                size="large"
                variant="flat"
            >
              Login
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>