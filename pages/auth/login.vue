<script setup lang="ts">
import {useSanctumAuth} from "#imports";
import type {ValidationRules} from "~/utils/types";
const { $validationRules }: { $validationRules: ValidationRules } = useNuxtApp()

/*******************************************/
definePageMeta({
  middleware: 'sanctum:guest',
})

definePageMeta({
  layout: 'auth'
})

const visible = ref(false);
const loading = ref(false);
const errors = ref([])

const form = ref({
  email: null,
  password: null,
})

/*******************************************/

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

/*******************************************/

async function login() {
  loading.value = true;
  useSanctumAuth().login(form.value)
      .catch((error) => {
       useEvent('errorMessage',error.response._data.message)
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
          <v-img lazy-src="/img/meditation-card.jpg" class="mx-auto mb-5  d-flex align-center justify-center"
                 width="186" cover src="/img/logo.svg">
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                    color="grey-lighten-4"
                    indeterminate
                    size="x-small"
                ></v-progress-circular>
              </div>
            </template>
          </v-img>
        </div>
        <p class="text-center mb-12 font-weight-bold text-white" style="font-size: 23px;">Welcome to admin panel</p>
        <v-form>
          <v-text-field maxlength="45" v-model="form.email" density="compact" placeholder="Enter Email"
                        variant="outlined" :error-messages="errors['email']"
                        :rules="[$validationRules.required,$validationRules.email]"/>
          <v-text-field maxlength="31" v-model="form.password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'" autocomplete="off"
                        density="compact" placeholder="Enter Password" variant="outlined"
                        @click:append-inner="visible = !visible" :rules="[$validationRules.required]"/>
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