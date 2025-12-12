<script setup>
import SidebarLayout from "@/components/layouts/SidebarLayout.vue";
import db from "@/firebase/init";
import { doc, getDoc } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const plant = ref({});
const getPlant = async () => {
  const docRef = doc(db, "plants", route.params?.plantId);
  const snapDoc = await getDoc(docRef);
  plant.value = { id: snapDoc.id, ...snapDoc.data() };
  console.log(snapDoc.data());
};
onMounted(async () => {
  await getPlant();
});
</script>

<template>
  <div class="flex flex-col h-screen max-w-5xl mx-auto">
    <div class="relative flex-2 min-h-[250px] md:min-h-[350px]">
      <div class="">
        <img
          :src="plant.imageUrl"
          class="absolute w-full h-full object-cover object-center"
        />
        <div
          class="bg-linear-to-b from-transparent via-transparent to-black/70 inset-0 absolute"
        ></div>
      </div>
      <div class="absolute inset-0 py-3 px-4 md:px-6">
        <div class="flex flex-col justify-end h-full text-white">
          <div class="flex flex-col-reverse md:flex-row-reverse justify-between items-start md:items-end gap-4">
            <div class="breadcrumbs text-sm font-light">
              <ul>
                <li>
                  <router-link to="/" class="text-white/60 hover:text-white"
                    >หน้าหลัก</router-link
                  >
                </li>
                <li>{{ plant.name }}</li>
              </ul>
            </div>
            <div class="flex flex-col gap-3 w-full md:w-auto">
              <div class="flex gap-1 items-end flex-wrap">
                <span class="badge badge-sm opacity-80">{{
                  plant.category?.name
                }}</span>
                <span class="badge badge-sm opacity-80">{{
                  plant?.origin
                }}</span>
              </div>
              <div class="flex flex-col mb-4 md:mb-6 gap-1">
                <h1 class="text-2xl md:text-3xl font-bold">{{ plant.name }}</h1>
                <p class="italic text-gray-300 text-sm md:text-base">{{ plant.scientificName }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-3 p-4 md:p-6 flex flex-col lg:flex-row gap-6">
      <div class="flex-1 lg:flex-6 flex flex-col">
        <div>
          <h1 class="flex gap-2 font-medium text-base md:text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 256 256"
            >
              <g
                fill="none"
                stroke="#1fa978"
                stroke-linecap="round"
                stroke-width="1"
              >
                <path stroke-width="15.992" d="M 32,48 V 207.9236" />
                <path
                  stroke-linejoin="round"
                  stroke-width="15.992"
                  d="M 224,96 V 208"
                />
                <path
                  stroke-linejoin="round"
                  stroke-width="15.992"
                  d="m 64,16 h 80"
                />
                <path stroke-width="15.992" d="M 64,240 H 192" />
                <path
                  stroke-linejoin="round"
                  stroke-width="15.992"
                  d="m 224,208 c 0.0874,15.98169 -16,32 -32,32"
                />
                <path
                  stroke-linejoin="round"
                  stroke-width="15.992"
                  d="m -32,208 c -10e-7,16 -16,32 -32,32"
                  transform="scale(-1 1)"
                />
                <path
                  stroke-linejoin="round"
                  stroke-width="15.992"
                  d="M -32,-47.976784 C -32,-32 -48,-16.356322 -63.999997,-16.000002"
                  transform="scale(-1)"
                />
                <path
                  stroke-linejoin="round"
                  stroke-width="15.992"
                  d="M 223.91257,96.071779 144,16"
                />
                <path
                  stroke-linejoin="round"
                  stroke-width="15.992"
                  d="m -144,64 c -0.0492,15.912926 -16.06452,31.999995 -32,32"
                  transform="scale(-1 1)"
                />
                <path
                  stroke-linejoin="round"
                  stroke-width="15.992"
                  d="M 144,64 V 16"
                />
                <path
                  stroke-linejoin="round"
                  stroke-width="15.992"
                  d="m 176,96 h 48"
                />
                <path
                  stroke-linejoin="round"
                  stroke-width="16"
                  d="m 64,208 h 48"
                />
                <path
                  stroke-linejoin="round"
                  stroke-width="16"
                  d="m 64,176 h 80"
                />
                <path
                  stroke-linejoin="round"
                  stroke-width="16"
                  d="m 64,144 h 48"
                />
              </g>
            </svg>
            ข้อมูลทั่วไป
          </h1>
          <p class="text-gray-500 text-sm md:text-base">{{ plant.description }}</p>
        </div>
        <div
          class="border border-green-200 mt-6 p-4 rounded-xl shadow-lg"
        >
          <h1 class="flex items-center gap-2 text-base md:text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#1fa978"
                d="M20.998 3v2a7 7 0 0 1-7 7h-1v1h5v7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-7h5v-3a7 7 0 0 1 7-7zm-15.5-1a7.49 7.49 0 0 1 6.124 3.169A7.96 7.96 0 0 0 9.998 10v1h-.5a7.5 7.5 0 0 1-7.5-7.5V2z"
              />
            </svg>
            การดูแลรักษา
          </h1>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div
              v-if="plant.careInfo"
              v-for="[key, value] in Object.entries(plant.careInfo)"
            >
              <h1 class="text-sm text-gray-700/70">
                {{
                  key == "soil"
                    ? "ประเภทดิน"
                    : key == "sunlight"
                    ? "แสงแดด"
                    : key == "water"
                    ? "น้ำ"
                    : "อุณหภูมิ"
                }}
              </h1>
              <p class="text-sm font-medium">
                {{ value }}
              </p>
            </div>
          </div>
        </div>
        <p v-if="plant.updatedAt" class="text-xs italic font-light text-gray-500 mt-6 text-left">
          แก้ไขล่าสุด:
          {{
            new Date(plant.updatedAt.seconds * 1000).toLocaleDateString(
              "th-TH",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            )
          }}
        </p>
      </div>

      <div class="flex-1 lg:flex-2 relative flex flex-col lg:px-6">
        <div class="hidden lg:block w-px h-1/2 left-0 absolute bg-black/30"></div>
        <div class="border-t lg:border-t-0 pt-6 lg:pt-0">
          <h1 class="flex items-center gap-2 text-pink-400 font-medium text-base md:text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#c4577d"
                d="M20 8h-2.81c-.45-.8-1.07-1.5-1.82-2L17 4.41L15.59 3l-2.17 2.17a6 6 0 0 0-2.83 0L8.41 3L7 4.41L8.62 6c-.75.5-1.36 1.21-1.81 2H4v2h2.09c-.06.33-.09.66-.09 1v1H4v2h2v1c0 .34.03.67.09 1H4v2h2.81A5.99 5.99 0 0 0 15 20.18c.91-.52 1.67-1.28 2.19-2.18H20v-2h-2.09c.06-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.03-.67-.09-1H20zm-4 7a4 4 0 0 1-4 4a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4a4 4 0 0 1 4 4zm-2-5v2h-4v-2zm-4 4h4v2h-4z"
              /></svg
            >โรคที่พบบ่อย
          </h1>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 mt-4">
            <router-link
              v-for="sym in plant.topSymptoms"
              :to="{ name: 'sym-detail', params: { symId: sym.id } }"
              class="p-2 w-full border rounded-md flex gap-2 hover:shadow-md transition-shadow"
            >
              <img
                class="w-10 aspect-square object-cover rounded-md"
                :src="sym.imageUrl"
                alt=""
              />
              <div class="flex flex-col gap-2">
                <h1 class="text-sm font-semibold">{{ sym.name }}</h1>
                <span
                  class="badge badge-xs"
                  :class="
                    sym.severity == 'medium'
                      ? 'badge-warning'
                      : sym.severity == 'high'
                      ? 'bg-red-500/70'
                      : ''
                  "
                  >{{ sym.severity }}</span
                >
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template><style scoped></style>
