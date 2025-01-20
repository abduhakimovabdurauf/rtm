<template>
  <div :class="['w-[70vh]', 'overflow-auto', 'h-[100vh]', 'shadow-lg', 'fixed', 'bg-white', 'right-0', isSidebarOpen ? 'translate-x-0' : 'translate-x-full', 'transition-transform', 'duration-300']" style="z-index: 1050">
    <div class="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-10">
      <p class="font-semibold text-2xl">{{ title }}</p>
      <button @click="toggleSidebar" class="text-2xl">&times;</button>
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
