<script setup lang="ts">
import type {User} from '~/utils/types'
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

const currentUser: User = useSanctumUser().value.data

</script>

<template>
  <v-app-bar class="bg-light text-white " elevation="0" v-if="showHeader">
    <v-container>
      <v-row justify="space-between" align="center">
        <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = <any>!drawer"/>
        <div class="float-md-right logo">
          <v-img
              width="42"
              height="40"
              src="/images/Vector.svg">
          </v-img>
          <h1 class="logo-text logo-text-size-header font-weight-medium">OmniWell</h1>
        </div>

        <div class="hidden-sm-and-down">
          <v-row class="align-center">
            <div class="mr-15" v-if="showNavItem">
              <v-btn :to="{name:  'panel-videos'}" text="Video courses"  class="mr-2" variant="text"/>
              <v-btn :to="{name:  'panel-meditations'}" class="px-8" text="Meditations"
                     variant="text"/>
            </div>
            <v-avatar class="avatar-border" :image="currentUser.avatar?.urls.medium" size="32"></v-avatar>
            <p class="font-16 font-weight-light mx-2" v-text="currentUser.name" />
            <v-btn class="mr-3" icon="mdi mdi-logout" @click="useSanctumAuth().logout" />
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

    <v-list density="compact" nav v-if="showNavItem">
      <v-list-item :to="{name : 'panel-videos'}" prepend-icon="mdi-video-box" title="Video courses"></v-list-item>
      <v-list-item :to="{name : 'panel-meditations'}" prepend-icon="mdi-meditation" title="Meditations"></v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block color="danger-dark">
          Log out
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
div:deep(.v-btn__overlay, .v-btn__overlay) {
  display: none;
}

div:deep(.v-btn--active) {
  color: #96AE50;
}
</style>