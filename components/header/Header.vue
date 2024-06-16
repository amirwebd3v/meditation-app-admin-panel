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

const isActiveLink = computed(() => {
  return (linkPath) => router.currentRoute.value.path.startsWith(linkPath);
})


</script>

<template>
  <v-app-bar class="bg-light text-white " elevation="0" v-if="showHeader">
    <v-container fluid>
      <v-row justify="space-between" align="center">
        <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = <any>!drawer"/>
        <nuxt-link to="/panel" class="float-md-right logo">
          <v-img  lazy-src="/img/meditation-card.jpg" width="42" height="40" src="/img/logo.svg">
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
        </nuxt-link>

        <div class="hidden-sm-and-down">
          <v-row class="align-center">
            <div class="mr-15" v-if="showNavItem">
              <nuxt-link :to="{name:  'panel-videos'}" variant="text" :class="
                  [isActiveLink('/panel/videos') ?
                  'text-primary text-decoration-underline' : 'text-white text-decoration-none']">
                Video courses
              </nuxt-link>
              <nuxt-link :to="{name:  'panel-meditations'}" class="px-8" variant="text" :class="
                  [isActiveLink('/panel/meditations') ?
                   'text-primary text-decoration-underline' : 'text-white text-decoration-none']">
                Meditations
              </nuxt-link>
<!--              <nuxt-link :to="{name:  'panel-analytics-sell-count-meditations'}" variant="text" :class="-->
<!--                  [isActiveLink('/panel/analytics/sell-count/meditations') ?-->
<!--                   'text-primary text-decoration-underline' : 'text-white text-decoration-none']">-->
<!--                Analytics-->
<!--              </nuxt-link>-->

            </div>
            <v-avatar class="avatar-border" :image="currentUser.avatar?.urls.medium" size="32"/>
            <p class="font-16 font-weight-light mx-2" v-text="currentUser.name"/>
            <v-btn class="mr-3" icon="mdi mdi-logout" @click="useSanctumAuth().logout"/>
          </v-row>
        </div>
      </v-row>
    </v-container>
  </v-app-bar>
  <v-navigation-drawer class="bg-light" v-model="drawer" temporary>
    <v-list-item :title="currentUser.name">
      <template v-slot:prepend>
        <v-avatar class="avatar-border" :image="currentUser.avatar?.urls.medium" size="46"/>
      </template>
    </v-list-item>

    <v-divider thickness="1"/>

    <v-list density="compact" nav v-if="showNavItem" bg-color="light">
<!--      <v-list-item :to="{name : 'panel-analytics-sell-count-meditations'}" prepend-icon="mdi-home-analytics"-->
<!--                   color="primary" title="Analytics"/>-->
      <v-list-item :to="{name : 'panel-videos'}" prepend-icon="mdi-video-box"
                   color="primary" title="Video courses"/>
      <v-list-item :to="{name : 'panel-meditations'}" prepend-icon="mdi-meditation"
                   color="primary" title="Meditations"/>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block color="error" @click="useSanctumAuth().logout">
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