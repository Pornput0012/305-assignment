<script setup>
defineProps({
  variant: {
    type: String,
    default: "info",
    validator: (value) =>
      ["info", "success", "warning", "error"].includes(value),
  },
  icon: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
});

const variantClasses = {
  error: "border-pink-500  text-pink-600 ",
  success: "border-green-500  text-green-600 ",
  warning: "border-yellow-500  text-yellow-600 ",
  info: "border-blue-500  text-blue-600 ",
};
</script>

<template>
  <div
    class="relative border-2 flex flex-col gap-1 min-h-8 w-full rounded-2xl p-4 transition-all duration-300 ease-in-out transform  "
    
    :class="variantClasses[variant] + (variant =='success' && 'shadow-md')"
  >
    <div
      class="absolute top-0 right-0 w-20 h-20 opacity-10 overflow-hidden rounded-tr-2xl"
    >
      <div
        class="absolute top-0 right-0 w-full h-full transform rotate-45 translate-x-8 -translate-y-8"
        :class="
          variant === 'error'
            ? 'bg-pink-400'
            : variant === 'success'
            ? 'bg-green-400'
            : variant === 'warning'
            ? 'bg-yellow-400'
            : 'bg-blue-400'
        "
      ></div>
    </div>

    <div class="flex gap-2 items-center relative z-10">
      <div
        class="shrink-0 p-1.5 rounded-lg transition-transform duration-300 hover:scale-110"
      >
        <slot name="icon">
          <svg
            v-if="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            v-html="icon"
            class="transition-transform duration-300 hover:rotate-12"
          ></svg>
        </slot>
      </div>
      <span class="font-semibold text-base tracking-wide">{{ title }}</span>
    </div>
    <div class="ml-12 text-gray-700 leading-relaxed relative z-10">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
