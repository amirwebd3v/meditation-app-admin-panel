<script setup lang="ts">
import AddMeditation from "~/components/section/modals/meditation/Add.vue";
import AddVideo from "~/components/section/modals/video/Add.vue";

defineProps({
  Item: {
    type: String,
    required: true,
  },
})
/***************************************/
const router = useRouter();
const currentRouteName = router.currentRoute.value.name;

const isMeditationCoursePage = computed(() => {
  return currentRouteName === 'panel-meditation';
})
const isVideoCoursePage = computed(() => {
  return currentRouteName === 'panel-video';
})
</script>

<template>
  <!--      Fourth section-->
  <v-row justify="space-between" align="center" class="mt-4 px-3">
    <span class="text-white font-weight-medium font-18 ">{{ Item }}</span>
    <!--    <v-btn-->
    <!--        color="primary"-->
    <!--        class="px-6-md"-->
    <!--        :text="BtnText"-->
    <!--        :size="$vuetify.display.smAndDown ? 'small' : 'default'"-->
    <!--        rounded="xl"-->
    <!--        :icon="$vuetify.display.smAndDown"-->
    <!--    >-->
    <!--      <template v-slot:default v-if="$vuetify.display.smAndDown">-->
    <!--        <v-icon class="mdi mdi-plus"/>-->
    <!--      </template>-->
    <!--      <template v-slot:prepend v-if="$vuetify.display.smAndUp">-->
    <!--        <v-icon class="mdi mdi-plus"/>-->
    <!--      </template>-->
    <!--    </v-btn>-->
    <AddMeditation v-if="isMeditationCoursePage"/>
    <AddVideo v-if="isVideoCoursePage"/>
  </v-row>
</template>

<style scoped lang="scss">

</style>