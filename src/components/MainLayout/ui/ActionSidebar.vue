<template>
  <div
      :class="[
      'w-[70vh]', 'overflow-auto', 'h-[100vh]', 'shadow-lg', 'fixed', 'right-0',
      'transition-transform', 'duration-300', 'bg-white', 'dark:bg-gray-900', 'dark:text-gray-200',
      isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
    ]"
      style="z-index: 1050"
  >
    <div class="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800 sticky top-0 z-10">
      <p class="font-semibold text-2xl">{{ title }}</p>
      <button
          @click="toggleSidebar"
          class="text-2xl transition-transform duration-200 hover:rotate-90 hover:scale-110"
      >
        &times;
      </button>
    </div>

    <div class="p-4">
      <slot></slot>
    </div>
  </div>
</template>


<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['closeSidebar'],
  setup(_, { emit }) {
    const store = useStore();
    const isSidebarOpen = computed(() => store.state.isSidebarOpen);

    const toggleSidebar = () => {
      store.commit("closeSidebar");
      emit('closeSidebar');
    };

    return {
      isSidebarOpen,
      toggleSidebar,
    };
  },
};
</script>
