<template>
  <v-app>
    <NuxtLoadingIndicator style="opacity: 1" class="loading-indicator" />
    <v-theme-provider class="h-100" with-background :theme="theme">
      <nuxt-layout>
        <div class="pt-16 h-100">
          <nuxt-page />
        </div>
      </nuxt-layout>
    </v-theme-provider>
  </v-app>
</template>

<script setup lang="ts">
const theme = useTheme();
</script>

<style lang="scss">
.loading-indicator {
  color: var(--v-primary-base);
}
</style>
