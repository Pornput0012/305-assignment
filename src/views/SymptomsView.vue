<script setup>
import FilterList from "@/components/FilterList.vue";
import SidebarLayout from "@/components/layouts/SidebarLayout.vue";
import FourColLayout from "@/components/layouts/FourColLayout.vue";
import { useSearchStore } from "@/stores/search";
import { onMounted, ref, watch } from "vue";
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
} from "firebase/firestore";

import CardSymptoms from "@/components/CardSymptoms.vue";

const severity = ["medium", "high"];
const typesOutbreaks = ["ทั่วไป", "เฉพาะ"];

const syms = ref([]);

const selectSeverity = ref("");
const selectTypesOutbreaks = ref("");
const searchStore = useSearchStore();

const isHasFilter = ref(false);
const hasNextPage = ref(true);
const currentPage = ref(0);

const firstVisible = ref(null);
const lastVisible = ref(null);

const clearFilter = () => {
  selectSeverity.value = "";
  selectTypesOutbreaks.value = "";
  searchStore.setSearch("");
};

const buildStaticQuery = () => {
  const symptomsRef = collection(db, "symptoms");

  const hasSeverity = selectSeverity.value !== "";
  const hasTypesOutbreaks = selectTypesOutbreaks.value !== "";

  const order = orderBy("name");

  if (hasSeverity && hasTypesOutbreaks) {
    return query(
      symptomsRef,
      where("severity", "==", selectSeverity.value),
      where(
        "isGeneral",
        "==",
        selectTypesOutbreaks.value === typesOutbreaks[0]
      ),
      order
    );
  }

  if (hasTypesOutbreaks) {
    return query(
      symptomsRef,
      where(
        "isGeneral",
        "==",
        selectTypesOutbreaks.value === typesOutbreaks[0]
      ),
      order
    );
  }

  if (hasSeverity) {
    return query(
      symptomsRef,
      where("severity", "==", selectSeverity.value),
      order
    );
  }

  return query(symptomsRef, order);
};

const getFirstPage = async () => {
  currentPage.value = 0;

  const q = query(buildStaticQuery(), limit(10));
  const snap = await getDocs(q);

  handleSnapshot(snap);
};

const getNextPage = async () => {
  if (!lastVisible.value) return;

  currentPage.value += 1;

  const q = query(buildStaticQuery(), startAfter(lastVisible.value), limit(10));
  const snap = await getDocs(q);

  handleSnapshot(snap);
};

const getPrevPage = async () => {
  if (!firstVisible.value) return;

  currentPage.value -= 1;

  const q = query(
    buildStaticQuery(),
    endBefore(firstVisible.value),
    limitToLast(10)
  );

  const snap = await getDocs(q);

  handleSnapshot(snap);
};

const handleSnapshot = (snap) => {
  let docs;

  if (searchStore.search) {
    const filterSearch = snap.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((doc) => doc.name.includes(searchStore.search));

    hasNextPage.value = filterSearch.length === 10;
    docs = filterSearch.slice(0, 10);
  } else {
    hasNextPage.value = snap.docs.length === 10;
    docs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  syms.value = docs;

  firstVisible.value = snap.docs[0] || null;
  lastVisible.value = snap.docs[snap.docs.length - 1] || null;
};

const goToMainPage = () => getFirstPage();

onMounted(() => getFirstPage());

watch(
  [selectSeverity, selectTypesOutbreaks, () => searchStore.search],
  () => {
    getFirstPage();
    isHasFilter.value =
      selectSeverity.value || selectTypesOutbreaks.value || searchStore.search;
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
          <FilterList
            title="ระดับความรุนแรง"
            :menu="severity"
            type="radio"
            v-model="selectSeverity"
          />
          <FilterList
            title="ประเภทการระบาด"
            :menu="typesOutbreaks"
            type="radio"
            v-model="selectTypesOutbreaks"
          />
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
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div class="flex items-center gap-2">
            <h1 class="text-lg md:text-xl">รายการทั้งหมด</h1>
          </div>
          <p class="text-black/60 text-sm">
            {{ syms.length || "ไม่มีรายการ" }}
            {{ syms.length && "รายการ" }}
          </p>
        </div>

        <FourColLayout class="mt-4">
          <CardSymptoms
            v-for="s in syms"
            :id="s.id"
            :cause="s.cause"
            :description="s.description"
            :image-url="s.images[0]"
            :is-general="s.isGeneral"
            :name="s.name"
            :severity="s.severity"
            :solution="s.solution"
            :specific-plant-ids="!s.isGeneral && s.specificPlantIds"
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
              @click="goToMainPage"
            >
              หน้าแรก
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
