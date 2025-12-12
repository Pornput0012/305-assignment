<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  plantData: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    default: () => [],
  },
  symptoms: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit"]);

const formData = ref({ ...props.plantData });
const difficultyOptions = ["ง่าย", "ง่ายมาก", "ปานกลาง", "ยาก"];

watch(
  () => props.plantData,
  (newVal) => {
    formData.value = { ...newVal };
  },
  { deep: true }
);

const toggleSymptom = (symptomId) => {
  const index = formData.value.topSymptoms.indexOf(symptomId);
  if (index > -1) {
    formData.value.topSymptoms.splice(index, 1);
  } else {
    formData.value.topSymptoms.push(symptomId);
  }
};

const handleSubmit = () => {
  emit("submit", formData.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- ข้อมูลพื้นฐาน -->
    <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 class="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#10b981"
            d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8"
          />
        </svg>
        ข้อมูลพื้นฐาน
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">
            ชื่อพืช <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.name"
            type="text"
            required
            class="input input-bordered w-full"
            placeholder="เช่น ต้นผักบุ้ง"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">
            ชื่อวิทยาศาสตร์ <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.scientificName"
            type="text"
            required
            class="input input-bordered w-full"
            placeholder="เช่น Ipomoea aquatica"
          />
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium mb-2">
            คำอธิบาย
          </label>
          <textarea
            v-model="formData.description"
            class="textarea textarea-bordered w-full"
            rows="3"
            placeholder="อธิบายเกี่ยวกับพืชนี้..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">
            แหล่งกำเนิด <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.origin"
            type="text"
            required
            class="input input-bordered w-full"
            placeholder="เช่น เอเชียตะวันออกเฉียงใต้"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">
            ความยากในการปลูก <span class="text-red-500">*</span>
          </label>
          <select
            v-model="formData.difficulty"
            class="select select-bordered w-full"
            required
          >
            <option v-for="diff in difficultyOptions" :key="diff" :value="diff">
              {{ diff }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">
            URL รูปภาพ <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.imageUrl"
            type="url"
            required
            class="input input-bordered w-full"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">
            ความสูงสูงสุด (เมตร) <span class="text-red-500">*</span>
          </label>
          <input
            v-model.number="formData.maxHeight"
            type="number"
            step="0.1"
            min="0"
            required
            class="input input-bordered w-full"
            placeholder="เช่น 0.5"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">
            หมวดหมู่ <span class="text-red-500">*</span>
          </label>
          <select
            v-model="formData.category"
            class="select select-bordered w-full"
            required
          >
            <option :value="null">เลือกหมวดหมู่</option>
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="{ id: cat.id, name: cat.name, icon: cat.icon }"
            >
              {{ cat.icon }} {{ cat.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- ข้อมูลการดูแล -->
    <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 class="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
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
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">
            น้ำ <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.careInfo.water"
            type="text"
            required
            class="input input-bordered w-full"
            placeholder="เช่น ทุกวัน"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">
            แสงแดด <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.careInfo.sunlight"
            type="text"
            required
            class="input input-bordered w-full"
            placeholder="เช่น 4-6 ชั่วโมง"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">
            ดิน <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.careInfo.soil"
            type="text"
            required
            class="input input-bordered w-full"
            placeholder="เช่น ดินร่วน"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">
            อุณหภูมิ <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.careInfo.temperature"
            type="text"
            required
            class="input input-bordered w-full"
            placeholder="เช่น 25-32°C"
          />
        </div>
      </div>
    </div>

    <!-- โรคที่พบบ่อย -->
    <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 class="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#c4577d"
            d="M20 8h-2.81c-.45-.8-1.07-1.5-1.82-2L17 4.41L15.59 3l-2.17 2.17a6 6 0 0 0-2.83 0L8.41 3L7 4.41L8.62 6c-.75.5-1.36 1.21-1.81 2H4v2h2.09c-.06.33-.09.66-.09 1v1H4v2h2v1c0 .34.03.67.09 1H4v2h2.81A5.99 5.99 0 0 0 15 20.18c.91-.52 1.67-1.28 2.19-2.18H20v-2h-2.09c.06-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.03-.67-.09-1H20zm-4 7a4 4 0 0 1-4 4a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4a4 4 0 0 1 4 4zm-2-5v2h-4v-2zm-4 4h4v2h-4z"
          />
        </svg>
        โรคที่พบบ่อย (เลือกได้หลายรายการ)
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label
          v-for="symptom in symptoms"
          :key="symptom.id"
          class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          :class="
            formData.topSymptoms.includes(symptom.id)
              ? 'border-pink-400 bg-pink-50'
              : 'border-gray-200'
          "
        >
          <input
            type="checkbox"
            :checked="formData.topSymptoms.includes(symptom.id)"
            @change="toggleSymptom(symptom.id)"
            class="checkbox checkbox-sm checkbox-primary"
          />
          <div class="flex-1">
            <p class="font-medium text-sm">{{ symptom.name }}</p>
            <div class="flex gap-2 mt-1">
              <span
                class="badge badge-xs"
                :class="
                  symptom.severity == 'high' ? 'badge-error' : 'badge-warning'
                "
              >
                {{ symptom.severity }}
              </span>
              <span
                class="badge badge-xs"
                :class="symptom.isGeneral ? 'badge-info' : 'badge-warning'"
              >
                {{ symptom.isGeneral ? "ทั่วไป" : "เฉพาะ" }}
              </span>
            </div>
          </div>
        </label>
      </div>
    </div>

    <!-- ปุ่มบันทึก -->
    <div class="flex justify-end gap-4">
      <router-link to="/" class="btn btn-outline">ยกเลิก</router-link>
      <button
        type="submit"
        class="btn bg-green-600 hover:bg-green-700 text-white"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="loading loading-spinner"></span>
        {{ isLoading ? "กำลังบันทึก..." : "บันทึกข้อมูล" }}
      </button>
    </div>
  </form>
</template>

<style scoped></style>
