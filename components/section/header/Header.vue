<script setup lang="ts">
const router = useRouter();
const showHeader = ref(true);


const isLoginPage = () => router.currentRoute.value.name === 'auth-login';

watchEffect(() => {
  showHeader.value = !isLoginPage()
})
</script>

<template>
  <v-app-bar class="bg-light text-white " elevation="0" v-if="showHeader">
    <v-container>
      <v-row justify="space-between" align="center">
        <div>
          <v-img
              width="135"
              height="135"
              src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg">
          </v-img>
        </div>
        <div >
          <v-row class="align-center">
            <v-avatar image="https://cdn.vuetifyjs.com/images/john.jpg" size="45"></v-avatar>
            <p class="font-16 font-weight-light mx-4">Jalallinux</p>
            <v-btn icon="mdi mdi-logout"/>
          </v-row>
        </div>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style scoped>

</style>