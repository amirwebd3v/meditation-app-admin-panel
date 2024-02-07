<script setup lang="ts">
const router = useRouter();
const showHeader = ref(true);
const showNavItem = ref(true);
const drawer = ref(null);

const isLoginPage = () => router.currentRoute.value.name === 'auth-login';
const isConfigurationPage = () => router.currentRoute.value.name === 'panel';

watchEffect(() => {
  showHeader.value = !isLoginPage()
  showNavItem.value = !isConfigurationPage()

})
</script>

<template>
  <v-app-bar class="bg-light text-white " elevation="0" v-if="showHeader">
    <v-container>
      <v-row justify="space-between" align="center">
        <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = <any>!drawer"/>
        <div class="float-md-right">
          <v-img
              width="128"
              height="128"
              src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg">
          </v-img>
        </div>
        <div class="hidden-sm-and-down">
          <v-row class="align-center">
            <div class="mr-15" v-if="showNavItem">
              <v-btn :to="{name:  'panel-video'}" text="Video courses" color="#9AB157" class="mr-2" variant="plain"/>
              <v-btn :to="{name:  'panel-meditations'}" class="px-8" text="Meditations" color="#9AB157"
                     variant="plain"/>
            </div>
            <v-avatar class="avatar-border" image="https://cdn.vuetifyjs.com/images/john.jpg" size="44"></v-avatar>
            <p class="font-16 font-weight-light mx-4">Anna</p>
            <v-btn icon="mdi mdi-logout"/>
          </v-row>
        </div>
      </v-row>
    </v-container>
  </v-app-bar>
  <v-navigation-drawer
      class="bg-light"
      v-model="drawer"
      temporary>
    <v-list-item title="John Leider">
      <template v-slot:prepend>
        <v-avatar class="avatar-border" image="https://cdn.vuetifyjs.com/images/john.jpg" size="46"></v-avatar>
      </template>
    </v-list-item>

    <v-divider thickness="2"/>

    <v-list density="compact" nav="" v-if="showNavItem">
      <v-list-item prepend-icon="mdi-video-box" title="Video courses"></v-list-item>
      <v-list-item prepend-icon="mdi-meditation" title="Meditations"></v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block="" color="danger-dark">
          Log out
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>

</style>