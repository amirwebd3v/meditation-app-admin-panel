<script setup lang="ts">
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
  return currentRouteName === 'panel-meditations';
})
const isVideoCoursePage = computed(() => {
  return currentRouteName === 'panel-videos';
})
</script>

<template>
  <!--      Fourth section-->
  <v-row justify="space-between" align="center" class="mt-4 px-3">
    <span class="text-white font-weight-medium font-18 ">{{ Item }}</span>

    <ModalsMeditationCourseType v-if="isMeditationCoursePage"/>
    <ModalsVideoCourseAdd  v-if="isVideoCoursePage"/>

  </v-row>
</template>

<style scoped lang="scss">

</style>