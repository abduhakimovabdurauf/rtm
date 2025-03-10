<!--<script setup>-->
<!--import { useDarkMode } from "@/composables/useDarkMode";-->

<!--const { isDark, toggleDarkMode } = useDarkMode();-->
<!--</script>-->

<!--<template>-->
<!--  <button-->
<!--      @click="toggleDarkMode"-->
<!--      class="relative flex items-center justify-center w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-all duration-300"-->
<!--  >-->
<!--    <span-->
<!--        class="absolute w-5 h-5 bg-white dark:bg-gray-800 rounded-full transform transition-all duration-300"-->
<!--        :class="isDark ? 'translate-x-3' : '-translate-x-3'"-->
<!--    ></span>-->

<!--    <svg-->
<!--        class="absolute left-1 w-4 h-4 text-yellow-500 transition-opacity duration-300"-->
<!--        :class="isDark ? 'opacity-0' : 'opacity-100'"-->
<!--        viewBox="0 0 24 24"-->
<!--        fill="none"-->
<!--        stroke="currentColor"-->
<!--        stroke-width="2"-->
<!--        stroke-linecap="round"-->
<!--        stroke-linejoin="round"-->
<!--        xmlns="http://www.w3.org/2000/svg"-->
<!--    >-->
<!--      <circle cx="12" cy="12" r="4" fill="currentColor" />-->
<!--      <line x1="12" y1="2" x2="12" y2="6" />-->
<!--      <line x1="12" y1="18" x2="12" y2="22" />-->
<!--      <line x1="2" y1="12" x2="6" y2="12" />-->
<!--      <line x1="18" y1="12" x2="22" y2="12" />-->
<!--      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />-->
<!--      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />-->
<!--      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />-->
<!--      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />-->
<!--    </svg>-->

<!--    <svg-->
<!--        class="absolute right-1 w-4 h-4 text-gray-300 transition-opacity duration-300"-->
<!--        :class="isDark ? 'opacity-100' : 'opacity-0'"-->
<!--        viewBox="0 0 24 24"-->
<!--        fill="currentColor"-->
<!--    >-->
<!--      <path-->
<!--          d="M21.64 13.89a1 1 0 0 0-1.17-.78 8 8 0 0 1-9.58-9.58 1 1 0 0 0-.78-1.17A10 10 0 1 0 21.64 13.9z"-->
<!--      />-->
<!--    </svg>-->
<!--  </button>-->
<!--</template>-->


<script setup>
import { useDarkMode } from "@/composables/useDarkMode";

const { isDark, toggleDarkMode } = useDarkMode();
</script>

<template>
  <button
      @click="toggleDarkMode"
      class="relative flex items-center justify-between w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full shadow-inner transition-all duration-300 p-1"
  >
    <!-- Quyosh (light mode) -->
    <svg
        class="w-5 h-5 text-yellow-500 transition-all z-[100] duration-300"
        :class="isDark ? 'opacity-0' : 'opacity-100'"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    </svg>

    <!-- O‘tish tugmasi -->
    <span
        class="absolute top-1 left-1 w-5 h-5 bg-white dark:bg-gray-800 rounded-full shadow-md transform transition-all duration-300"
        :class="isDark ? 'translate-x-7' : 'translate-x-0'"
    ></span>

    <!-- Oy (dark mode) -->
    <svg
        class="w-5 h-5 text-gray-300 transition-all duration-300 z-10"
        :class="isDark ? 'opacity-100' : 'opacity-0'"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
      <path
          d="M21.64 13.89a1 1 0 0 0-1.17-.78 8 8 0 0 1-9.58-9.58 1 1 0 0 0-.78-1.17A10 10 0 1 0 21.64 13.9z"
      />
    </svg>
  </button>
</template>
