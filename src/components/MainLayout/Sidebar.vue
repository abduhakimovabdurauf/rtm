<template>
  <aside
      :class="[
      'flex flex-col h-full overflow-y-auto transition-all duration-300 ease-in-out bg-gray-800 text-sm text-gray-300',
      isOpen ? 'w-64' : 'w-20'
    ]"
  >
    <div class="flex items-center justify-between px-4 py-5 border-b border-gray-700">
      <div class="flex items-center space-x-2">
        <img class="w-12" src="@/assets/images/logo.svg" alt="Logo" />
      </div>
      <button @click="toggleSidebar" class="text-gray-400 focus:outline-none">
        <i
            :class="`bx ${isOpen ? 'bx-chevron-left' : 'bx-chevron-right'} text-2xl`"
        ></i>
      </button>
    </div>

    <div class="p-4">
      <ul class="mt-4 space-y-2">
        <router-link to="/dashboard" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bxs-home-alt-2' ></i>
          <span v-if="isOpen" class="ml-3">Dashboard</span>
        </router-link>
        <router-link
            to="/roles"
            class="flex items-center p-2 rounded-md hover:bg-gray-700"
        >
          <i class='bx bxs-user'></i>
          <span v-if="isOpen" class="ml-3">Rollar</span>
        </router-link>

        <router-link
            to="/rooms"
            class="flex items-center p-2 rounded-md hover:bg-gray-700"
        >
          <i class="bx bx-grid-alt text-lg"></i>
          <span v-if="isOpen" class="ml-3">Xonalar</span>
        </router-link>

        <router-link
            to="/courses"
            class="flex items-center p-2 rounded-md hover:bg-gray-700"
        >
          <i class="bx bxs-book-open text-lg"></i>
          <span v-if="isOpen" class="ml-3">Kurslar</span>
        </router-link>

        <router-link
            to="/users"
            class="flex items-center p-2 rounded-md hover:bg-gray-700"
        >
          <i class="bx bx-grid-alt text-lg"></i>
          <span v-if="isOpen" class="ml-3">Foydalanuvchilar</span>
        </router-link>

        <li
            class="flex items-center p-2 rounded-md hover:bg-gray-700"
        >
          <i class="bx bx-grid-alt text-lg"></i>
          <span v-if="isOpen" class="ml-3">Projects</span>
        </li>

      </ul>
    </div>
  </aside>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'Sidebar',
  setup() {
    const isOpen = ref(true);

    const toggleSidebar = () => {
      isOpen.value = !isOpen.value;
    };

    const handleResize = () => {
      isOpen.value = window.innerWidth > 1024;
    };

    onMounted(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    return {
      isOpen,
      toggleSidebar,
    };
  },
};
</script>

<style scoped>

</style>
