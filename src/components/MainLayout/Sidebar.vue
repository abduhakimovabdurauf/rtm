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
          <i class='bx bx-tachometer' ></i>
          <span v-if="isOpen" class="ml-3">Dashboard</span>
        </router-link>

        <router-link to="/roles" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bx-user-circle'></i>
          <span v-if="isOpen" class="ml-3">Lavozimlar</span>
        </router-link>

        <router-link to="/rooms" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class="bx bx-home-alt text-lg"></i>
          <span v-if="isOpen" class="ml-3">Xonalar</span>
        </router-link>

        <router-link to="/courses" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class="bx bx-book text-lg"></i>
          <span v-if="isOpen" class="ml-3">Kurslar</span>
        </router-link>

        <router-link to="/users" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class="bx bx-user text-lg"></i>
          <span v-if="isOpen" class="ml-3">Xodimlar</span>
        </router-link>

        <router-link to="/students" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class="bx bx-group text-lg"></i>
          <span v-if="isOpen" class="ml-3">Oquvchilar</span>
        </router-link>

        <router-link to="/groups" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bx-group'></i>
          <span v-if="isOpen" class="ml-3">Guruhlar</span>
        </router-link>

        <router-link to="/payments" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bxs-credit-card'></i>
          <span v-if="isOpen" class="ml-3">To'lovlar</span>
        </router-link>



        <router-link to="/tasks" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bx-task'></i>
          <span v-if="isOpen" class="ml-3">Topshiriqlar</span>
        </router-link>

        <router-link to="/discounts" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bxs-discount'></i>
          <span v-if="isOpen" class="ml-3">Chegirmalar</span>
        </router-link>
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
