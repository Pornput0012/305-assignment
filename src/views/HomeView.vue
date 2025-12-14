<script setup>
import SidebarLayout from "@/components/layouts/SidebarLayout.vue";
import CardPlant from "@/components/CardPlant.vue";
import FourColLayout from "@/components/layouts/FourColLayout.vue";
import FilterList from "@/components/FilterList.vue";
import db from "@/firebase/init";
import {
  collection,
  getDocs,
  limit,
  limitToLast,
  query,
  startAfter,
  endBefore,
  orderBy,
  where,
  or,
  getAggregateFromServer,
  average,
  count,
} from "firebase/firestore";
import { onMounted, ref, watch } from "vue";
import { useSearchStore } from "@/stores/search";

const searchStore = useSearchStore();
const categories = ref([]);
const plants = ref([]);
const symptoms = ref([]);
const difficulty = ["ง่าย", "ปานกลาง", "ยาก"];
const heightRanges = [
  { label: "0-1 เมตร", min: 0, max: 1 },
  { label: "1-3 เมตร", min: 1, max: 3 },
  { label: "3-5 เมตร", min: 3, max: 5 },
  { label: "5-10 เมตร", min: 5, max: 10 },
  { label: "10+ เมตร", min: 10, max: 999 },
];
const sortBy = ["ยอดนิยม", "ความยาก: ง่าย-มาก", "ความยาก: มาก-ง่าย"];

const selectedCategories = ref([]);
const selectedDifficulty = ref("");
const selectedSymptom = ref("");
const selectedHeightRange = ref(null);
const selectedSortBy = ref("ยอดนิยม");
const isBeginnerMode = ref(false);

const firstVisible = ref(null);
const lastVisible = ref(null);
const hasNextPage = ref(true);
const currentPage = ref(0);
const avgHeight = ref(null);
const totalPlants = ref(null);
const mostPopularPlant = ref(null);

const isHasFilter = ref(false);

const clearFilter = () => {
  selectedCategories.value = [];
  selectedDifficulty.value = "";
  selectedHeightRange.value = null;
  selectedSymptom.value = "";
  selectedSortBy.value = "ยอดนิยม";
  isBeginnerMode.value = false;
  searchStore.setSearch("");
};

const toggleSelect = (list, value) =>
  list.includes(value) ? list.filter((x) => x !== value) : [...list, value];

const buildStaticQuery = () => {
  const plantRef = collection(db, "plants");

  const hasCategory = selectedCategories.value.length > 0;
  const hasDifficulty = selectedDifficulty.value !== "";
  const hasHeightRange = selectedHeightRange.value !== null;
  const hasSymptom = selectedSymptom.value !== "";

  let orderByField, orderByDirection;
  if (selectedSortBy.value === "ยอดนิยม") {
    orderByField = "viewCount";
    orderByDirection = "desc";
  } else if (selectedSortBy.value === "ความยาก: ง่าย-มาก") {
    orderByField = "difficulty";
    orderByDirection = "asc";
  } else if (selectedSortBy.value === "ความยาก: มาก-ง่าย") {
    orderByField = "difficulty";
    orderByDirection = "desc";
  }

  if (hasHeightRange) {
    const range = heightRanges[selectedHeightRange.value];
    const constraints = [
      where("maxHeight", ">=", range.min),
      where("maxHeight", "<=", range.max),
    ];

    if (hasCategory) {
      constraints.push(where("category.name", "in", selectedCategories.value));
    }

    constraints.push(orderBy("maxHeight", "asc"));
    return query(plantRef, ...constraints);
  }

  if (hasSymptom) {
    const constraints = [where("topSymptomIds", "array-contains", selectedSymptom.value)];

    if (hasCategory) {
      constraints.push(where("category.name", "in", selectedCategories.value));
    }

    constraints.push(orderBy(orderByField, orderByDirection));
    return query(plantRef, ...constraints);
  }

  if (isBeginnerMode.value) {
    const beginnerQuery = or(
      where("difficulty", "==", "ง่าย"),
      where("difficulty", "==", "ง่ายมาก")
    );

    if (hasCategory) {
      return query(
        plantRef,
        beginnerQuery,
        where("category.name", "in", selectedCategories.value),
        orderBy(orderByField, orderByDirection)
      );
    }

    return query(
      plantRef,
      beginnerQuery,
      orderBy(orderByField, orderByDirection)
    );
  }

  if (hasCategory && hasDifficulty) {
    return query(
      plantRef,
      where("category.name", "in", selectedCategories.value),
      where("difficulty", "==", selectedDifficulty.value),
      orderBy(orderByField, orderByDirection)
    );
  }

  if (hasDifficulty) {
    return query(
      plantRef,
      where("difficulty", "==", selectedDifficulty.value),
      orderBy(orderByField, orderByDirection)
    );
  }

  if (hasCategory) {
    return query(
      plantRef,
      where("category.name", "in", selectedCategories.value),
      orderBy(orderByField, orderByDirection)
    );
  }

  return query(plantRef, orderBy(orderByField, orderByDirection));
};

const handleSnapshot = (snap) => {
  const docs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  plants.value = docs;

  firstVisible.value = snap.docs[0] || null;
  lastVisible.value = snap.docs[snap.docs.length - 1] || null;
  hasNextPage.value = snap.docs.length === 10;
};

const getFirstPage = async () => {
  currentPage.value = 0;

  const baseQuery = query(buildStaticQuery(), limit(10));
  const snap = await getDocs(baseQuery);

  handleSnapshot(snap);
};

const getNextPage = async () => {
  if (!lastVisible.value) return;

  currentPage.value += 1;

  const baseQuery = query(
    buildStaticQuery(),
    startAfter(lastVisible.value),
    limit(10)
  );

  const snap = await getDocs(baseQuery);
  handleSnapshot(snap);
};

const getPrevPage = async () => {
  if (!firstVisible.value) return;

  currentPage.value -= 1;

  const baseQuery = query(
    buildStaticQuery(),
    endBefore(firstVisible.value),
    limitToLast(10)
  );

  const snap = await getDocs(baseQuery);
  handleSnapshot(snap);
};

const toggleCategory = (value) => {
  selectedCategories.value = toggleSelect(selectedCategories.value, value);
};

const getCategories = async () => {
  const snap = await getDocs(collection(db, "categories"));
  categories.value = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const getSymptoms = async () => {
  const snap = await getDocs(collection(db, "symptoms"));
  symptoms.value = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};


const getAverageHeight = async () => {
  const plantsRef = collection(db, "plants");
  const snapshot = await getAggregateFromServer(plantsRef, {
    avgHeight: average("maxHeight"),
    totalCount: count(),
  });
  avgHeight.value = snapshot.data().avgHeight;
  totalPlants.value = snapshot.data().totalCount;
};

const getMostPopularPlant = async () => {
  const plantsRef = collection(db, "plants");
  const q = query(plantsRef, orderBy("viewCount", "desc"), limit(1));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    mostPopularPlant.value = {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    };
  }
};

onMounted(() => {
  getCategories();
  getSymptoms();
  getFirstPage();
  getAverageHeight();
  getMostPopularPlant();
});

watch(
  [
    selectedCategories,
    selectedDifficulty,
    selectedHeightRange,
    selectedSymptom,
    selectedSortBy,
    isBeginnerMode,
    () => searchStore.search,
  ],
  () => {
    isHasFilter.value =
      selectedCategories.value.length > 0 ||
      selectedDifficulty.value ||
      selectedHeightRange.value !== null ||
      selectedSymptom.value ||
      isBeginnerMode.value ||
      searchStore.search;

    getFirstPage();
  },
  { deep: true }
);
</script>

<template>
  <SidebarLayout>
    <template #sidebar>
      <div class="flex flex-col mt-6">
        <h1 class="flex gap-2 items-center text-black/50">
          <svg width="24" height="24" viewBox="0 0 512 512">
            <path
              fill="none"
              stroke="rgba(0,0,0,0.5)"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M32 144h448M112 256h288M208 368h96"
            />
          </svg>
          <p class="text-sm">ตัวกรอง</p>
        </h1>

        <div class="flex flex-col gap-4 mt-4">
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                v-model="isBeginnerMode"
                class="checkbox checkbox-success"
              />
              <span class="label-text font-medium"> 🌱 เหมาะกับมือใหม่ </span>
            </label>
          </div>

          <FilterList
            title="หมวดหมู่"
            :menu="categories"
            @toggle-select="toggleCategory"
            v-model="selectedCategories"
          />
          <FilterList
            title="ความยากในการปลูก"
            :menu="difficulty"
            type="radio"
            v-model="selectedDifficulty"
            :disabled="isBeginnerMode"
          />

          <div class="border-t pt-4 max-w-[75%]">
            <label class="block text-sm font-medium mb-2">🌾 ช่วงความสูง</label>
            <select
              v-model="selectedHeightRange"
              class="select select-bordered select-sm w-full"
            >
              <option :value="null">ทั้งหมด</option>
              <option
                v-for="(range, index) in heightRanges"
                :key="index"
                :value="index"
              >
                {{ range.label }}
              </option>
            </select>
          </div>

          <div class="border-t pt-4 max-w-[75%]">
            <label class="block text-sm font-medium mb-2">🦠 ค้นหาตามโรค</label>
            <select
              v-model="selectedSymptom"
              class="select select-bordered select-sm w-full"
            >
              <option value="">ทั้งหมด</option>
              <option v-for="sym in symptoms" :key="sym.id" :value="sym.id">
                {{ sym.name }}
              </option>
            </select>
          </div>
        </div>

        <button
          @click="clearFilter"
          :disabled="!isHasFilter"
          class="mt-4 border w-2/3 btn btn-outline rounded-lg hover:bg-pink-400 hover:text-white"
          :class="
            !isHasFilter
              ? 'border-transparent text-black/50!'
              : 'border-pink-400 text-pink-400'
          "
        >
          ลบทั้งหมด
        </button>
      </div>
    </template>
    <template #main>
      <div class="mt-6">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
        >
          <div class="flex items-center gap-2">
            <h1 class="text-lg md:text-xl">รายการทั้งหมด</h1>
            <p class="text-black/60 text-xs">
              {{ plants.length || "ไม่มีรายการ" }}
              {{ plants.length && "รายการ" }}
            </p>
          </div>

          <div class="flex gap-2 items-center text-sm">
            <label for="sortby" class="whitespace-nowrap">เรียงโดย</label>
            <select
              name="sortby"
              id="sortby"
              class="border rounded-xl px-2 py-1 text-sm"
              v-model="selectedSortBy"
            >
              <option :value="s" v-for="s in sortBy">{{ s }}</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div
            v-if="avgHeight"
            class="p-4 bg-blue-50 border border-blue-200 rounded-xl"
          >
            <div class="flex gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#3b82f6"
                  d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91c4.59-1.15 8-5.86 8-10.91V5zm-1 16h2v2h-2zm0-12h2v10h-2z"
                />
              </svg>
              <h3 class="text-sm font-semibold text-blue-700">ความสูงเฉลี่ย</h3>
            </div>
            <p class="text-sm text-blue-600">
              <span class="font-bold">{{ avgHeight.toFixed(2) }}</span> เมตร
            </p>
            <p class="text-xs text-blue-500 mt-1">
              เตรียมพื้นที่อย่างน้อย {{ Math.ceil(avgHeight) }} เมตร
            </p>
          </div>

          <div
            v-if="totalPlants"
            class="p-4 bg-green-50 border border-green-200 rounded-xl"
          >
            <div class="flex gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#10b981"
                  d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8"
                />
              </svg>
              <h3 class="text-sm font-semibold text-green-700">พืชทั้งหมด</h3>
            </div>
            <p class="text-sm text-green-600">
              <span class="font-bold text-2xl">{{ totalPlants }}</span> ชนิด
            </p>
            <p class="text-xs text-green-500 mt-1">ในฐานข้อมูล</p>
          </div>

          <div
            v-if="mostPopularPlant"
            class="p-4 bg-amber-50 border border-amber-200 rounded-xl"
          >
            <div class="flex gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#f59e0b"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
              <h3 class="text-sm font-semibold text-amber-700">พืชยอดนิยม</h3>
            </div>
            <p class="text-sm text-amber-600 font-semibold">
              {{ mostPopularPlant.name }}
            </p>
            <p class="text-xs text-amber-500 mt-1">
              {{ mostPopularPlant.viewCount.toLocaleString() }} ครั้ง
            </p>
          </div>
        </div>
        <FourColLayout class="mt-4">
          <CardPlant
            v-for="p in plants"
            :id="p.id"
            :name="p.name"
            :description="p.description"
            :category="p.category.name"
            :image-url="p.imageUrl"
            :view-count="p.viewCount"
            :difficulty="p.difficulty"
            :scientific-name="p.scientificName"
          />
        </FourColLayout>
        <div class="flex justify-center mt-6">
          <div class="join">
            <button
              class="join-item btn"
              :disabled="!currentPage"
              @click="getPrevPage"
            >
              «
            </button>

            <button
              class="join-item btn"
              :disabled="!currentPage"
              @click="getFirstPage"
            >
              หน้าหลัก
            </button>

            <button
              class="join-item btn"
              :disabled="!hasNextPage"
              @click="getNextPage"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </template>
  </SidebarLayout>
</template>

<style scoped></style>
