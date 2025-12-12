<script setup>
defineProps(["class"]);
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 md:gap-6" :class="class">
    <slot name="default"></slot>
  </div>
</template>

<style scoped></style>
