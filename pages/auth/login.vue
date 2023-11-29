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

    <v-container fluid="" class="fill-height">
      <v-row no-gutters align="center" justify="center" class="fill-height">
        <v-col cols="12" sm="6" md="4" lg="4">
            <v-img class="mx-auto mb-5  d-flex align-center justify-center" max-width="250" cover=""
                   src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"/>
            <p class="text-center mb-12 font-weight-bold font-18">Welcome to Admin panel</p>
          <v-form class="max-w-300">
            <v-text-field v-model="form.email" density="compact" placeholder="Enter Email"
                          variant="outlined"></v-text-field>
            <v-text-field v-model="form.password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                          :type="visible ? 'text' : 'password'"
                          density="compact" placeholder="Enter Password" variant="outlined"
                          @click:append-inner="visible = !visible"/>
            <v-btn @click="login" block="" rounded="xl" class="mb-8" color="primary" size="large" variant="flat">Login
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>

</template>

<style scoped>

</style>