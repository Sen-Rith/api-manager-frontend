<template>
  <div>{{ $route.params }}</div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["workspace"],
});
</script>
