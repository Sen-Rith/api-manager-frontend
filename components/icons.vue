<template>
  <div
    class="d-flex flex-wrap justify-center"
    :style="{ maxWidth: (width ?? 250) + 'px' }"
  >
    <v-btn
      v-for="icon in icons"
      :key="icon"
      class="ma-1"
      variant="flat"
      :color="icon === modelValue ? selectedColor : ''"
      @click="$emit('update:modelValue', icon)"
    >
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: String,
  selectedColor: {
    type: String,
    required: false,
  },
  width: {
    type: Number,
    required: false,
  },
});
defineEmits(["update:modelValue"]);

const icons = [
  "mdi-cash",
  "mdi-shield-bug-outline",
  "mdi-account-box-outline",
  "mdi-account-group-outline",
  "mdi-alarm-panel-outline",
  "mdi-animation-play-outline",
  "mdi-application-brackets-outline",
  "mdi-archive-arrow-up-outline",
  "mdi-badge-account-horizontal-outline",
  "mdi-bank-outline",
  "mdi-basket-outline",
  "mdi-book-open-outline",
  "mdi-briefcase-variant-outline",
  "mdi-car-outline",
  "mdi-cake-variant-outline",
  "mdi-calendar-account-outline",
  "mdi-camera-outline",
  "mdi-card-account-mail-outline",
  "mdi-cards-club-outline",
  "mdi-cards-heart-outline",
  "mdi-cellphone-basic",
  "mdi-chart-line",
  "mdi-flag-variant-outline",
  "mdi-chat-outline",
  "mdi-cloud-check-outline",
  "mdi-clipboard-list-outline",
  "mdi-clock-time-eight-outline",
  "mdi-video-outline",
  "mdi-gamepad-round-outline",
  "mdi-earth",
  "mdi-image-frame",
  "mdi-laptop",
  "mdi-microphone-outline",
  "mdi-music-note",
  "mdi-cog-outline",
  "mdi-compass-outline",
  "mdi-home-outline",
  "mdi-airplane-takeoff",
  "mdi-gamepad-variant-outline",
  "mdi-key-outline",
  "mdi-folder",
  "mdi-folder-search-outline",
];
</script>
