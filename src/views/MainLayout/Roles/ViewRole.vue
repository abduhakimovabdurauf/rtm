<template>
  <actionSidebar
      :title="sidebarTitle"
      @closeSidebar="toggleSidebar"
  >
    <createRole
        v-if="isCreating"
        :isOpen="isCreating"
        @close="closeCreateModal"
    />

    <updateRole
      v-if="isUpdating"
      :roleId="selectedRoleId"
      @close="closeUpdateModal"
    />

  </actionSidebar>
  <div class="p-6 min-h-screen dark:bg-gray-900">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">Lavozimlar ro'yxati</h1>
      <button
          @click="openCreateModal"
          class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
      >
        <i class="bx bx-plus-circle text-xl"></i> <span>Lavozim qo'shish</span>
      </button>
    </div>

    <div class="overflow-x-auto shadow-xl rounded-lg" v-if="roles && roles.length > 0">
      <table class="w-full bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
        <thead>
        <tr class="bg-gray-700 text-white">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Nomi</th>
          <th class="px-6 py-4 text-right ">
            Amallar
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(role,index) in roles"
            :key="role.id"
            class="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 cursor-pointer"
        >
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{{ index+1 }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{{ role.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a
                @click="deleteById(role.id)"
                class="mr-1 transition text-white bg-red-500 hover:bg-red-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-trash-alt"></i>
            </a>
            <a
                @click.prevent="openUpdateModal(role.id)"
                href="#"
                class="mr-1 transition text-white bg-green-500 hover:bg-green-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-edit-alt"></i>
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import createRole from "@/components/MainLayout/role/createRole.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import updateRole from "@/components/MainLayout/role/updateRole.vue";
export default {
  components: {
    updateRole,
    actionSidebar,
    createRole,
  },
  setup() {
    const store = useStore();
    const isModalOpen = ref(false);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const isReading = ref(false);
    const selectedRoleId = ref(null);
    const roles = computed(() => store.getters['role/roles']);
    const isSidebarOpen = computed(() => store.getters.isSidebarOpen);
    const sidebarTitle = computed(() => {
      if (isCreating.value) return "Role qo'shish";
      if (isUpdating.value) return "Roleni o'zgartirish";
      if(isReading.value) return "Ko'rish";
      return "";
    });

    const openCreateModal = () => {
      isCreating.value = true;
      isUpdating.value = false;
      isReading.value = false
      store.dispatch("toggleSidebar", true);
    };

    const openUpdateModal = (id) => {
      isUpdating.value = true;
      isCreating.value = false;
      isReading.value = false
      selectedRoleId.value = id;
      store.dispatch("toggleSidebar", true);
    };

    const openReadModal = (id) => {
      isReading.value = true;
      isCreating.value = false;
      isUpdating.value = false;
      selectedRoleId.value = id;
      store.dispatch("toggleSidebar", true);
    }

    const toggleSidebar = () => {
      isCreating.value = false;
      isUpdating.value = false;
      isReading.value = false
      selectedRoleId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const closeCreateModal = () => {
      isCreating.value = false;
      store.dispatch("toggleSidebar", false);
    };

    const closeUpdateModal = () => {
      isUpdating.value = false;
      selectedRoleId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const closeReadModal = () => {
      isReading.value = false;
      selectedRoleId.value = null;
      store.dispatch("toggleSidebar", false);
    }

    const deleteById = (id) => {
      store.dispatch("role/deleteRole", id);
    };

    const fetchRoles = async () => {
      try {
        store.commit("SET_LOADING", true, { root: true });
        await store.dispatch("role/getAllRoles");

      } catch (e) {
        console.error("Rollarni olishda xatolik:", e.message);
      }
    };

    onMounted(() => {
      fetchRoles();
    });


    return {
      roles,
      isCreating,
      isUpdating,
      isReading,
      sidebarTitle,
      openCreateModal,
      openUpdateModal,
      closeCreateModal,
      closeUpdateModal,
      openReadModal,
      closeReadModal,
      deleteById,
      toggleSidebar,
      isModalOpen,
      selectedRoleId,
    };
  },
};
</script>