<script setup>
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <div class="xl:max-w-7xl 2xl:max-w-[1440px] bg-transparent mx-auto min-h-screen pb-12 md:pb-24 lg:pb-48 px-4 md:px-6">
    <button
      @click="toggleMobileMenu"
      class="lg:hidden fixed bottom-4 right-4 z-50 bg-pink-400 text-white p-4 rounded-full shadow-lg hover:bg-pink-500"
    >
      <svg v-if="!isMobileMenuOpen" width="24" height="24" viewBox="0 0 512 512">
        <path
          fill="none"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
          d="M32 144h448M112 256h288M208 368h96"
        />
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24">
        <path fill="white" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/>
      </svg>
    </button>

    <div
      v-if="isMobileMenuOpen"
      @click="toggleMobileMenu"
      class="lg:hidden fixed inset-0 bg-black/50 z-40"
    ></div>

    <div class="flex flex-col lg:flex-row">
      <div
        class="lg:flex-1 fixed pl-10 lg:p-0 lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 w-64 overflow-y-auto bg-white lg:bg-transparent"
        :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
      >
        <slot name="sidebar"></slot>
      </div>

      <div class="lg:flex-5 w-full">
        <slot name="main"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
