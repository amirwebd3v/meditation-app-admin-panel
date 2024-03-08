<script setup>


const props = defineProps({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
  },
  categoryType : {
    type: String,
    required: true
  }
})

const loading = ref(false)


const deleteCategory = async () => {
  loading.value = true
  try {
    await useCategoryStore().destroy(props.slug)
    useEvent('successMessage', `${props.name} is successfully Deleted from ${props.categoryType.toLowerCase()}.`)
    useEvent('closeModal', false)
  } catch (err) {
    useEvent('errorMessage', err.data.message)
  } finally {
    await useCategoryStore().fetch()
    loading.value = false
    useValidationStore().clearErrors()
  }
}

function close() {
  useEvent('closeModal', false)
  useValidationStore().clearErrors()
}

</script>

<template>


  <LazyModalsMain>

    <template #dialogButton="props">
      <v-icon class="mdi mdi-close pl-5 cursor-pointer" size="x-small" v-bind="props"/>
    </template>

    <template #header>
      <span class="pl-3">Delete Category</span>
      <v-icon class="pr-5 cursor-pointer" size="small" icon="mdi mdi-close" @click="close"/>
    </template>

    <template #columns>
      <v-row justify="space-between">
        <v-col cols="12" class="my-3">
          <div class="py-5">
            <v-icon color="red" size="xx-large" class="text-orange pb-2">mdi-alert-outline</v-icon>
            <span class="font-weight-regular font-16">
              <strong class="font-18 text-orange">
                WARNING:
              </strong>
              This action cannot be undone.
            </span>
          </div>
          <div class="pb-5">
             <span class="text-white font-14  text-justify">
            <strong class="font-16 text-orange">"{{ props.name }}"</strong>will be permanently removed from all used items.
          </span>
          </div>

        </v-col>

      </v-row>
    </template>

    <template #actionButtons>
      <v-btn
          :disabled="loading"
          :density="$vuetify.display.smAndDown ? 'comfortable' : 'default'"
          color="primary"
          :class="{
                'px-7': $vuetify.display.smAndDown,
                'px-12':$vuetify.display.mdAndUp,
                }"
          size="large"
          rounded="xl"
          variant="outlined"
          text="Cancel"
          @click="close"
      />
      <v-btn
          :disabled="loading"
          :loading="loading"
          :density="$vuetify.display.smAndDown ? 'comfortable' : 'default'"
          :class="{
                  'px-10': $vuetify.display.smAndDown,
                  'px-14': $vuetify.display.mdAndUp,
                  'delete-btn-border bg-orange':true,
                }"
          rounded="xl"
          size="large"
          variant="outlined"
          text="Delete"
          @click="deleteCategory"
      >
      </v-btn>
    </template>

  </LazyModalsMain>

</template>
