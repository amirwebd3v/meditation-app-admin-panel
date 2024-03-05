<script setup lang="ts">
import {useSanctumAuth} from "#imports";

definePageMeta({
  middleware: 'sanctum:guest',
})

definePageMeta({
  layout: 'auth'
})

const visible = ref(false);
const loading = ref(false);


const form = ref({
  email: null,
  password: null,
})


watch(loading, (val) => {
  if (!val) return;

  setTimeout(() => {
    loading.value = false;
  }, 2000);
});

onBeforeMount(() => {
  if (useSanctumAuth().isAuthenticated) {
    navigateTo('/panel')
  }
})

const errors = ref([])

async function login() {
  loading.value = true;
  useSanctumAuth().login(form.value)
      .catch((error) => {
        errors.value = error.response._data.errors
      })
      .finally(() => {
        loading.value = false;
      })
}

</script>
<template>
  <v-container fluid class="fill-height">
    <v-row no-gutters align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="6" md="4" lg="4">
        <div class="logo">
          <v-img class="mx-auto mb-5  d-flex align-center justify-center" width="186" cover src="/img/logo.svg"/>
        </div>
        <p class="text-center mb-12 font-weight-bold text-white" style="font-size: 23px;">Welcome to admin panel</p>
        <v-form>
          <v-text-field v-model="form.email" density="compact" placeholder="Enter Email"
                        variant="outlined" :error-messages="errors['email']" />
          <v-text-field v-model="form.password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'" autocomplete="off"
                        density="compact" placeholder="Enter Password" variant="outlined"
                        @click:append-inner="visible = !visible"/>
          <v-btn
              :disabled="loading"
              :loading="loading"
              @click="login"
              block rounded="xl"
              class="mb-8 mt-4"
              color="primary"
              size="large"
              variant="flat"
              text="Login"
          >
          </v-btn>
        </v-form>

      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>