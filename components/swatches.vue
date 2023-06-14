<template>
  <div
    class="d-flex flex-wrap justify-center"
    :style="{ maxWidth: (width ?? 250) + 'px' }"
  >
    <v-btn
      v-for="color in colors"
      :key="color"
      :color="color"
      class="ma-1"
      size="x-small"
      :icon="color === modelValue ? 'mdi-check' : ''"
      :variant="color === modelValue ? 'outlined' : 'flat'"
      @click="$emit('update:modelValue', color)"
    >
    </v-btn>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: String,
  width: {
    type: Number,
    required: false,
  },
});
defineEmits(["update:modelValue"]);

const colors = [
  // lighter
  "#ffc2d4",
  "#ed8285",
  "#ffb55e",
  "#ffe885",
  "#ccf07d",
  "#91e38c",
  "#a1f7fa",
  "#91cfff",
  "#c29ee0",
  "#e8bd91",

  // darker
  "#ff7096",
  "#de2b2e",
  "#ff8500",
  "#fcd636",
  "#82c233",
  "#0dab52",
  "#00a0d2",
  "#5294f5",
  "#7352b5",
  "#8c5730",
];
</script>
