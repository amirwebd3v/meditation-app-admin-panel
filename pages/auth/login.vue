<script setup lang="ts">
const {$sanctumAuth} = useNuxtApp()
const router = useRouter()
const errors = ref([])
const visible = ref(false);

const form = ref({
  email: null,
  password: null,
})


async function login() {
  await $sanctumAuth.login(form.value)
}


</script>
<template>
  <v-app>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="mx-auto bg-transparent" elevation="0" width="400">
            <v-img class="mx-auto my-6" max-width="228"
                   src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"/>
            <h4 class="text-center mb-10 ">Welcome to Admin panel</h4>
            <v-text-field v-model="form.email" density="compact" placeholder="Enter Email"
                          variant="outlined"></v-text-field>
            <v-text-field v-model="form.password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                          :type="visible ? 'text' : 'password'"
                          density="compact" placeholder="Enter Password" variant="outlined"
                          @click:append-inner="visible = !visible"/>
            <v-card class="mb-12" color="surface-variant" variant="tonal"/>
            <v-btn @click="login" block="" rounded="xl" class="mb-8" color="primary" size="large" variant="flat">Login
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>