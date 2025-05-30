<template>
  <aside
      :class="[
      'flex flex-col z-[99999999] h-full overflow-y-auto transition-all duration-300 ease-in-out bg-gray-800 text-sm text-gray-300',
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
        <router-link v-if="hasAccess('/dashboard')" to="/dashboard" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bx-tachometer' ></i>
          <span v-if="isOpen" class="ml-3">Dashboard</span>
        </router-link>

        <router-link v-if="hasAccess('/users')" to="/users" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class="bx bx-user text-lg"></i>
          <span v-if="isOpen" class="ml-3">Xodimlar</span>
        </router-link>

        <router-link v-if="hasAccess('/companies')" to="/companies" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bxs-buildings'></i>
          <span v-if="isOpen" class="ml-3">Kompaniyalar</span>
        </router-link>

        <router-link v-if="hasAccess('/branches')" to="/branches" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bx-git-branch'></i>
          <span v-if="isOpen" class="ml-3">Filiallar</span>
        </router-link>

        <router-link v-if="hasAccess('/courses')" to="/courses" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class="bx bx-book text-lg"></i>
          <span v-if="isOpen" class="ml-3">Kurslar</span>
        </router-link>

        <router-link v-if="hasAccess('/students')" to="/students" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class="bx bx-group text-lg"></i>
          <span v-if="isOpen" class="ml-3">Oquvchilar</span>
        </router-link>

        <router-link v-if="hasAccess('/callLogs')" to="/callLogs" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bxl-blogger'></i>
          <span v-if="isOpen" class="ml-3">Qo'ngiroqlar tarixi</span>
        </router-link>

        <router-link v-if="hasAccess('/rooms')" to="/rooms" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class="bx bx-home-alt text-lg"></i>
          <span v-if="isOpen" class="ml-3">Xonalar</span>
        </router-link>

        <router-link v-if="hasAccess('/groups')" to="/groups" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bx-group'></i>
          <span v-if="isOpen" class="ml-3">Guruhlar</span>
        </router-link>

        <router-link v-if="hasAccess('/discounts')" to="/discounts" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bxs-discount'></i>
          <span v-if="isOpen" class="ml-3">Chegirmalar</span>
        </router-link>

        <router-link v-if="hasAccess('/payments')" to="/payments" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bxs-credit-card'></i>
          <span v-if="isOpen" class="ml-3">To'lovlar</span>
        </router-link>

        <router-link v-if="hasAccess('/notifications')" to="/notifications" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bx-bell'></i>
          <span v-if="isOpen" class="ml-3">Bildirishnomalar</span>
        </router-link>

        <router-link v-if="hasAccess('/tasks')" to="/tasks" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bx-task'></i>
          <span v-if="isOpen" class="ml-3">Topshiriqlar</span>
        </router-link>

        <router-link v-if="hasAccess('/roles')" to="/roles" class="flex items-center p-2 rounded-md hover:bg-gray-700">
          <i class='bx bx-user-circle'></i>
          <span v-if="isOpen" class="ml-3">Lavozimlar</span>
        </router-link>



      </ul>
    </div>

  </aside>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Sidebar',
  setup() {
    const isOpen = ref(true);
    const router = useRouter();

    const userRoles = JSON.parse(localStorage.getItem("user")).roles.map(role => role.name);

    const hasAccess = (routePath) => {
      const route = router.getRoutes().find(route => route.path === routePath);
      return route?.meta?.roles?.some(role => userRoles.includes(role));
    };

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
      hasAccess
    };
  },
};
</script>

