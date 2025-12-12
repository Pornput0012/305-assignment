<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import Leaf from "./icons/Leaf.vue";
import { useSearchStore } from "@/stores/search";
import { useRoute } from "vue-router";

const route = useRoute();
const toggle = ref("");
const { setSearch, getSearch } = useSearchStore();
const localSearch = computed(getSearch);
const isMobileMenuOpen = ref(false);

watchEffect(() => {
  toggle.value = !route.path.includes("symptoms") ? "home" : "sym";
});

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm px-2 md:px-4">
    <div class="navbar-start gap-2 text-2xl md:text-3xl pl-2 md:pl-8">
      <router-link :to="{ name: 'home' }" class="select-none font-great-vibes!">
        GreenZone
      </router-link>
      <Leaf size="32" class="hidden sm:block" />
    </div>
    
    <div class="navbar-center hidden lg:flex">
      <div
        class="relative flex gap-2 shadow p-1.5 px-2.5 rounded-xl text-center"
      >
        <router-link
          :to="{ name: 'home' }"
          class="px-4 py-2 rounded-lg z-10 transition-all transition-duration-700"
          :class="toggle == 'home' && 'text-white'"
          @click="toggle = 'home'"
          >Home</router-link
        >
        <router-link
          :to="{ name: 'sym' }"
          class="px-4 py-2 rounded-lg z-10 transition-all transition-duration-700"
          :class="toggle == 'sym' && 'text-white'"
          @click="toggle = 'sym'"
          >Symptoms</router-link
        >
        <div
          class="absolute text-transparent px-4 py-2 rounded-lg z-0 transition-all transition-duration-700"
          :class="
            toggle == 'home' ? 'bg-green-600' : 'bg-pink-600 translate-x-[84px]'
          "
        >
          {{ toggle == "home" ? "Home" : "Symptoms" }}
        </div>
      </div>
    </div>

    <div class="navbar-end gap-2">
      <!-- Add Plant Button -->
      <router-link
        :to="{ name: 'create-plant' }"
        class="btn btn-sm bg-green-600 hover:bg-green-700 text-white hidden md:flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
        </svg>
        เพิ่มพืช
      </router-link>

      <label class="input rounded-xl max-w-2/5 hidden md:flex">
        <input
          type="search"
          @input="
            (e) => {
              setSearch(e.target.value);
            }
          "
          class="grow"
          :value="localSearch"
          :placeholder="!route.path.includes('symptoms') ? 'ค้นหาชื่อพืช...':'ค้นหาชื่อโรค...'"
        />
        <svg
          class="h-[1.5em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
      </label>

      <button
        @click="toggleMobileMenu"
        class="lg:hidden btn btn-ghost btn-circle"
      >
        <svg
          v-if="!isMobileMenuOpen"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>

  <div
    v-if="isMobileMenuOpen"
    class="lg:hidden fixed inset-0 z-50 bg-black/50"
    @click="closeMobileMenu"
  >
    <div
      class="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6"
      @click.stop
    >
      <div class="flex justify-end mb-6">
        <button @click="closeMobileMenu" class="btn btn-ghost btn-circle">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="flex flex-col gap-4">
        <label class="input rounded-xl">
          <input
            type="search"
            @input="
              (e) => {
                setSearch(e.target.value);
              }
            "
            class="grow"
            :value="localSearch"
            :placeholder="!route.path.includes('symptoms') ? 'ค้นหาชื่อพืช...':'ค้นหาชื่อโรค...'"
          />
          <svg
            class="h-[1.5em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
        </label>

        <router-link
          :to="{ name: 'home' }"
          @click="closeMobileMenu"
          class="btn btn-outline rounded-xl"
          :class="toggle == 'home' ? 'btn-success' : ''"
        >
          Home
        </router-link>
        <router-link
          :to="{ name: 'sym' }"
          @click="closeMobileMenu"
          class="btn btn-outline rounded-xl"
          :class="toggle == 'sym' ? 'btn-secondary' : ''"
        >
          Symptoms
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
