<template>
  <v-app>
    <v-theme-provider class="h-100" with-background :theme="theme">
      <div class="h-100 d-flex justify-center flex-wrap">
        <div class="d-inline-flex justify-center flex-column">
          <p class="text-h1">{{ error.statusCode }}</p>
          <p>{{ error.message }}</p>
          <v-btn class="mt-2" @click="handleError">Home</v-btn>
        </div>
        <div class="d-inline-flex justify-center flex-column">
          <v-icon size="200" icon="mdi-robot-vacuum-alert" />
        </div>
      </div>
    </v-theme-provider>
  </v-app>
</template>

<script setup>
const props = defineProps({
  error: Object,
});

const error = useError();
const theme = useTheme();

async function handleError() {
  await clearError({ redirect: "/" });
}
</script>
