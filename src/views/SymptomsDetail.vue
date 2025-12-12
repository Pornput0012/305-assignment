<script setup>
import db from "@/firebase/init";
import { doc, getDoc } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Callout from "@/components/Callout.vue";

const route = useRoute();
const sym = ref({});
const plants = ref([]);

const getSym = async () => {
  const docRef = doc(db, "symptoms", route.params?.symId);
  const snapDoc = await getDoc(docRef);
  sym.value = { id: snapDoc.id, ...snapDoc.data() };
  console.log(snapDoc.data());
};

const getSpecificPlants = async () => {
  if (sym.value.isGeneral || !sym.value.specificPlantIds?.length) {
    return;
  }

  const plantPromises = sym.value.specificPlantIds.map(async (plantId) => {
    const plantDocRef = doc(db, "plants", plantId);
    const plantSnap = await getDoc(plantDocRef);
    if (plantSnap.exists()) {
      return { id: plantSnap.id, ...plantSnap.data() };
    }
    return null;
  });

  const plantsData = await Promise.all(plantPromises);
  plants.value = plantsData.filter((plant) => plant !== null);
};

onMounted(async () => {
  await getSym();
  await getSpecificPlants();
});
</script>

<template>
  <div class="flex flex-col min-h-screen max-w-5xl mx-auto">
    <div class="relative flex-2 min-h-[250px] md:min-h-[350px]">
      <div class="">
        <img
          v-if="sym.images?.length"
          :src="sym.images[0]"
          class="absolute w-full h-full object-cover object-center"
        />
        <div
          class="bg-linear-to-b from-transparent via-transparent to-black/70 inset-0 absolute"
        ></div>
      </div>
      <div class="absolute inset-0 py-3 px-4 md:px-6">
        <div class="flex flex-col justify-center h-full text-white">
          <div class="flex justify-center items-center">
            <div class="flex flex-col gap-4">
              <div class="flex gap-1 justify-center">
                <span
                  class="badge badge-sm text-white"
                  :class="
                    sym.severity == 'high' ? 'badge-error' : 'badge-warning'
                  "
                  >ความรุนแรง: {{ sym?.severity }}</span
                >
              </div>
              <div class="flex flex-col items-center mb-6 gap-2">
                <h1 class="text-2xl md:text-3xl font-bold text-center">
                  {{ sym.name }}
                </h1>
                <p class="italic text-gray-300 text-sm md:text-base">
                  {{ sym.isGenrenal ? "โรคทั่วไป" : "โรคเฉพาะพืช" }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="breadcrumbs text-sm font-light absolute right-4 md:right-6 bottom-3"
      >
        <ul>
          <li>
            <router-link to="/" class="text-white/60 hover:text-white"
              >หน้าหลัก</router-link
            >
          </li>
          <li class="text-white">{{ sym.name }}</li>
        </ul>
      </div>
    </div>

    <div class="flex-3 p-4 md:p-6 flex flex-col lg:flex-row gap-6">
      <div class="flex-1 lg:flex-6 flex flex-col gap-6">
        <Callout variant="error" title="ลักษณะอาการ">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#c4577d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M19 11.5a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08"
              />
            </svg>
          </template>
          <p class="text-gray-600 text-sm md:text-base">
            {{ sym.description }}
          </p>
        </Callout>
        <Callout title="สาเหตุ">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#1896f2"
                d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.712T12 11t-.712.288T11 12v4q0 .425.288.713T12 17m0-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
              />
            </svg>
          </template>
          <p class="text-gray-600 text-sm md:text-base">{{ sym.cause }}</p>
        </Callout>
        <Callout variant="success" title="วิธีป้องกันและรักษา">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path
                  fill="#1fa978"
                  d="m8.962 19.379l-.473.582zM12 5.574l-.548.512a.75.75 0 0 0 1.096 0zm3.038 13.805l.473.582zM12 21v-.75zm-2.566-2.204c-1.45-1.176-3.142-2.719-4.466-4.408c-1.339-1.707-2.218-3.46-2.218-5.07h-1.5c0 2.117 1.13 4.202 2.537 5.996c1.422 1.813 3.21 3.436 4.702 4.647zM2.75 9.318c0-2.905 1.268-4.7 2.836-5.315c1.565-.613 3.754-.175 5.866 2.083l1.096-1.024c-2.388-2.554-5.199-3.36-7.509-2.456C2.732 3.51 1.25 5.992 1.25 9.318zM15.51 19.96c1.493-1.211 3.281-2.834 4.703-4.647c1.407-1.794 2.537-3.879 2.537-5.997h-1.5c0 1.612-.88 3.364-2.218 5.071c-1.324 1.689-3.016 3.232-4.466 4.408zm7.24-10.644c0-3.325-1.482-5.807-3.79-6.71c-2.31-.905-5.12-.1-7.508 2.455l1.096 1.024c2.112-2.258 4.301-2.696 5.866-2.083c1.568.614 2.836 2.41 2.836 5.314zM8.49 19.961c1.27 1.032 2.152 1.789 3.51 1.789v-1.5c-.723 0-1.173-.324-2.566-1.454zm6.076-1.165c-1.393 1.13-1.843 1.454-2.566 1.454v1.5c1.358 0 2.24-.757 3.51-1.789z"
                />
                <path
                  stroke="#1fa978"
                  stroke-linecap="round"
                  stroke-width="1.5"
                  d="M18.5 9h-2m0 0h-2m2 0V7m0 2v2"
                />
              </g>
            </svg>
          </template>
          <p class="text-gray-600 text-sm md:text-base">{{ sym.solution }}</p>
        </Callout>
      </div>

      <div
        v-if="sym.isGeneral"
        class="flex-1 lg:flex-3 relative flex flex-col lg:px-6"
      >
        <div
          class="hidden lg:block w-px h-1/2 left-0 absolute bg-black/30"
        ></div>
        <div class="border-t lg:border-t-0 pt-6 lg:pt-0">
          <Callout variant="info" title="โรคทั่วไป" class="max-w-full">
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#1896f2"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
                />
              </svg>
            </template>
            <p class="text-gray-600 text-sm md:text-base">
              โรคนี้สามารถเกิดขึ้นได้กับพืชหลายชนิด ไม่เฉพาะพืชใดชนิดหนึ่ง
            </p>
          </Callout>
        </div>
      </div>

      <div
        v-if="!sym.isGeneral"
        class="flex-1 lg:flex-2 relative flex flex-col lg:px-6"
      >
        <div
          class="hidden lg:block w-px h-1/2 left-0 absolute bg-black/30"
        ></div>
        <div class="border-t lg:border-t-0 pt-6 lg:pt-0">
          <h1
            class="flex items-center gap-2 text-pink-600 font-medium text-base md:text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#1fa978"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 15h10v4a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2zm5-6a6 6 0 0 0-6-6H3v2a6 6 0 0 0 6 6h3m0 0a6 6 0 0 1 6-6h3v1a6 6 0 0 1-6 6h-3m0 3V9"
              />
            </svg>
            <p>พืชที่เสี่ยงต่อโรคนี้</p>
          </h1>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 mt-4"
          >
            <router-link
              v-for="plant in plants"
              :key="plant.id"
              :to="{ name: 'plant-detail', params: { plantId: plant.id } }"
              class="p-2 w-full border rounded-md flex gap-2 hover:shadow-md transition-shadow"
            >
              <img
                class="w-10 aspect-square object-cover rounded-md"
                :src="plant.imageUrl"
                alt=""
              />
              <div class="flex flex-col gap-2">
                <h1 class="text-sm font-semibold">{{ plant.name }}</h1>
                <span
                  class="badge badge-xs"
                  :class="
                    plant.difficulty == 'ปานกลาง'
                      ? 'badge-warning'
                      : plant.difficulty == 'ยาก'
                      ? 'badge-error'
                      : 'badge-success'
                  "
                  >{{ plant.difficulty }}</span
                >
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
