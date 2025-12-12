<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isGeneral: { type: Boolean, required: true },
  severity: { type: String, required: true },
});
</script>

<template>
  <router-link
    :to="{ name: 'sym-detail', params: { symId: id } }"
    class="w-full h-70 group"
  >
    <div
      class="rounded-xl shadow hover:shadow-xl hover:-translate-y-1 h-full transition-all duration-200 overflow-hidden"
    >
      <div class="w-full h-1/2 max-h-1/2 rounded-t-lg bg-cover bg-center">
        <div class="relative flex h-full justify-end overflow-hidden">
          <img
            :src="imageUrl"
            class="w-full h-full object-cover absolute -z-1 group-hover:scale-110 transition-transform duration-500"
            alt=""
          />
          <span
            class="badge border-none badge-soft font-medium rounded-3xl m-3"
            :class="severity == 'high' ? 'badge-error' : 'badge-warning'"
            >{{ severity }}</span
          >
        </div>
      </div>
      <div class="flex flex-col w-full h-1/2 p-4">
        <div class="flex">
          <div>
            <h1 class="text-lg font-semibold leading-4">
              <span>{{ name }}</span>
            </h1>
            <div class="flex-1">
              <p class="line-clamp-1 text-[14px] font-light mt-2">
                {{ description }}
              </p>
            </div>
          </div>
          <span
            class="justify-self-end badge badge-outline bg-transparent font-medium text-xs wrap-none rounded-3xl"
            :class="
              isGeneral
                ? 'border-blue-500 text-blue-500 '
                : 'border-yellow-600 text-yellow-600'
            "
          >
            {{ isGeneral ? "ทั่วไป" : "เฉพาะ" }}</span
          >
        </div>

        <div class="flex flex-1 justify-end items-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path stroke-dasharray="20" stroke-dashoffset="20" d="M3 12h17.5">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.2s"
                  values="20;0"
                />
              </path>
              <path
                stroke-dasharray="12"
                stroke-dashoffset="12"
                d="M21 12l-7 7M21 12l-7 -7"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.2s"
                  dur="0.2s"
                  values="12;0"
                />
              </path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped></style>
