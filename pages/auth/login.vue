<script setup lang="ts">
const visible = ref(false);

const form = ref({
  email: 'smjjalalzadeh93@gmail.com',
  password: '123456789',
})

async function login() {
  await useSanctumAuth().login(form.value)
  console.log(
      useSanctumAuth().user
  )
}

definePageMeta({
  middleware: 'sanctum:guest',
})
</script>
<template>
    <v-container fluid class="fill-height">
      <v-row no-gutters align="center" justify="center" class="fill-height">
        <v-col cols="12" sm="6" md="4" lg="4">
          <div class="logo">
            <v-img
                class="mx-auto mb-5  d-flex align-center justify-center"
                width="186" cover
                src="/images/Vector.svg">
            </v-img>
            <h1 class="logo-text logo-text-size font-weight-bold">OmniWell</h1>
          </div>
            <p class="text-center mb-12 font-weight-bold text-white" style="font-size: 23px;">Welcome to Admin panel</p>
          <v-form>
            <v-text-field v-model="form.email" density="compact" placeholder="Enter Email"
                          variant="outlined"></v-text-field>
            <v-text-field v-model="form.password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                          :type="visible ? 'text' : 'password'"
                          density="compact" placeholder="Enter Password" variant="outlined"
                          @click:append-inner="visible = !visible"/>
            <v-btn @click="login" block rounded="xl" class="mb-8" color="primary" size="large" variant="flat">Login
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
</template>

<style scoped>

</style>