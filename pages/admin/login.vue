<script setup lang="ts">


const visible = ref(false);


</script>

<template>
  <div class="d-flex align-center justify-center bg-black" style="height: 100vh">


      <v-card
          class="mx-auto pa-6 bg-transparent"
          elevation="0"
          width="500"
      >

        <v-img
            class="mx-auto my-6"
            max-width="228"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
        ></v-img>

        <h4 class="text-center pb-8 ">Welcome to Admin panel</h4>

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
          Log In
        </v-btn>

      </v-card>

  </div>
</template>

<style scoped>

</style>