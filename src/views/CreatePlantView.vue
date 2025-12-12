<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import db from "@/firebase/init";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import PlantForm from "@/components/PlantForm.vue";

const router = useRouter();
const categories = ref([]);
const symptoms = ref([]);
const isLoading = ref(false);
const errorMessage = ref("");

const plantData = ref({
  name: "",
  scientificName: "",
  description: "",
  origin: "",
  difficulty: "ง่าย",
  imageUrl: "",
  maxHeight: 1,
  viewCount: 0,
  category: null,
  topSymptoms: [],
  careInfo: {
    water: "",
    sunlight: "",
    soil: "",
    temperature: "",
  },
});

const getCategories = async () => {
  const snap = await getDocs(collection(db, "categories"));
  categories.value = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const getSymptoms = async () => {
  const snap = await getDocs(collection(db, "symptoms"));
  symptoms.value = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const handleSubmit = async (formData) => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    if (
      !formData.name ||
      !formData.scientificName ||
      !formData.origin ||
      !formData.difficulty ||
      !formData.imageUrl ||
      !formData.category ||
      !formData.careInfo.water ||
      !formData.careInfo.sunlight ||
      !formData.careInfo.soil ||
      !formData.careInfo.temperature
    ) {
      errorMessage.value = "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน";
      return;
    }

    const preparedSymptoms = formData.topSymptoms.map((symId) => {
      const symptom = symptoms.value.find((s) => s.id === symId);
      return {
        id: symptom.id,
        name: symptom.name,
        severity: symptom.severity,
        isGeneral: symptom.isGeneral,
        imageUrl: symptom.images?.[0] || "",
      };
    });

    const plantDoc = {
      name: formData.name,
      scientificName: formData.scientificName,
      description: formData.description,
      origin: formData.origin,
      difficulty: formData.difficulty,
      imageUrl: formData.imageUrl,
      maxHeight: Number(formData.maxHeight),
      viewCount: Number(formData.viewCount),
      category: formData.category,
      topSymptoms: preparedSymptoms,
      careInfo: formData.careInfo,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "plants"), plantDoc);
    console.log("Plant created with ID:", docRef.id);

    router.push({ name: "plant-detail", params: { plantId: docRef.id } });
  } catch (error) {
    console.error("Error creating plant:", error);
    errorMessage.value = "เกิดข้อผิดพลาดในการบันทึกข้อมูล";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getCategories();
  getSymptoms();
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-6">
      <div class="breadcrumbs text-sm font-light">
        <ul>
          <li>
            <router-link to="/" class="text-black/60 hover:text-black"
              >หน้าหลัก</router-link
            >
          </li>
          <li>เพิ่มพืช</li>
        </ul>
      </div>
    </div>

    <h1 class="text-3xl font-bold mb-6 text-green-700">เพิ่มพืชใหม่</h1>

    <div
      v-if="errorMessage"
      class="alert alert-error mb-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg"
    >
      {{ errorMessage }}
    </div>

    <PlantForm
      :plant-data="plantData"
      :categories="categories"
      :symptoms="symptoms"
      :is-loading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped></style>
