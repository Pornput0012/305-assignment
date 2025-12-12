<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  viewCount: { type: Number, required: true },
  difficulty: { type: String, required: true },
  scientificName: { type: String, required: true },
});

const badgeColorCategory = () => {
  switch (props.category) {
    case "ไม้ผล":
      return "bg-orange-200 text-orange-700";
    case "พืชผัก":
    case "สมุนไพร":
      return "bg-green-200 text-green-700";
    case "ไม้ดอก":
      return "bg-red-200 text-red-700";
    case "อื่นๆ":
      return;
  }
};
const badgeColorDifficulty = () => {
  switch (props.difficulty) {
    case "ง่าย":
      return "bg-green-200 text-green-700";
    case "ง่ายมาก":
      return "bg-green-100 text-green-600";
    case "ปานกลาง":
      return "bg-orange-200 text-orange-700";
    case "ยาก":
      return "bg-red-200 text-red-700";
  }
};
</script>

<template>
  <router-link
    :to="{ name: 'plant-detail', params: { plantId: id } }"
    class="w-full h-80 group"
  >
    <div
      class="rounded-xl shadow hover:shadow-xl hover:-translate-y-1 h-full transition-all duration-200 overflow-hidden"
    >
      <div class="w-full h-1/2 max-h-1/2 rounded-t-lg bg-cover bg-center">
        <div
          class="relative flex flex-col h-full justify-between overflow-hidden"
        >
          <img
            :src="imageUrl"
            class="w-full h-full object-cover absolute z-1 group-hover:scale-110 transition-transform duration-500"
            alt=""
          />
          <span
            class="badge border-none badge-soft font-medium rounded-3xl m-3 z-1"
            :class="badgeColorCategory()"
            >{{ category }}</span
          >
          <span
            class="flex items-center gap-1 text-xs text-white font-mono! p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3" />
                <path
                  d="M20.188 10.934c.388.472.582.707.582 1.066s-.194.594-.582 1.066C18.768 14.79 15.636 18 12 18s-6.768-3.21-8.188-4.934c-.388-.472-.582-.707-.582-1.066s.194-.594.582-1.066C5.232 9.21 8.364 6 12 6s6.768 3.21 8.188 4.934Z"
                />
              </g>
            </svg>
            {{ viewCount.toLocaleString() }}
          </span>
        </div>
      </div>
      <div class="flex flex-col w-full h-1/2 p-4">
        <h1 class="text-lg font-semibold leading-4">
          <span>{{ name }}</span>
          <br />
          <span class="text-xs italic text-black/50 font-normal">
            {{ scientificName }}
          </span>
        </h1>
        <div class="flex-1">
          <p class="line-clamp-1 text-[14px] font-light mt-2">
            {{ description }}
          </p>
        </div>
        <div class="flex justify-between items-center">
          <span
            class="justify-self-end badge badge-outline bg-transparent font-medium rounded-3xl"
            :class="badgeColorDifficulty()"
            >{{ difficulty }}</span
          >
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

<style scoped>
.transition-bg-img {
  transition: background-image 0.2s ease-in-out;
}
</style>
