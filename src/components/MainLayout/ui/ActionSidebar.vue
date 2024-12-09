<template>
  <div :class="['w-[70vh]', 'overflow-auto', 'h-[100vh]', 'shadow-lg', 'fixed', 'bg-white', 'right-0', isSidebarOpen ? 'translate-x-0' : 'translate-x-full', 'transition-transform', 'duration-300']">
    <div class="flex justify-between items-center p-4">
      <button @click="toggleSidebar" class="text-2xl">&times;</button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const isSidebarOpen = computed(() => store.state.isSidebarOpen);

    const toggleSidebar = () => {
      store.dispatch('toggleSidebar');
    };

    const form = ref({
      name: '',
      duration: '',
      price: '',
      description: ''
    });

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(form.value);
    };

    return {
      isSidebarOpen,
      toggleSidebar,
      form,
      handleSubmit
    };
  }
};
</script>
