<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  menu: {
    type: Array,
    required: true,
  },
  toggleFilter: {
    type: Array,
  },
  type: {
    type: String,
    default: "checkbox",
    validator: (value) => ["checkbox", "radio"].includes(value),
  },
  modelValue: {
    type: [Array, String],
    default: () => [],
  },
});

defineEmits(["toggleSelect", "update:modelValue"]);
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-sm font-semibold">{{ title }}</h1>
    <div class="flex flex-col items-start gap-1 mt-2">
      <div
        v-for="(m, i) in menu"
        class="flex gap-2 text-sm justify-center items-center"
      >
        <input
          :type="type"
          :name="title"
          :id="title + i"
          :value="m.name || m"
          :checked="
            type === 'radio'
              ? modelValue === (m.name || m)
              : modelValue?.includes(m.name || m)
          "
          @change="
            type === 'radio'
              ? $emit('update:modelValue', m.name || m)
              : $emit('toggleSelect', m.name || m)
          "
        />
        <label :for="title + i">{{ m.name || m }}</label>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
