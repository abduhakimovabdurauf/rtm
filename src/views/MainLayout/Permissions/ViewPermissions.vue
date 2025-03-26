<template>
  <actionSidebar
      :title="sidebarTitle"
      @closeSidebar="toggleSidebar"
  >
    <CreatePermission
        v-if="isCreating"
        :isOpen="isCreating"
        @close="closeCreateModal"
    />

    <UpdatePermission
        v-if="isUpdating"
        :permissionId="selectedPermissionId"
        @close="closeUpdateModal"
    />

  </actionSidebar>
  <div class="p-6 min-h-screen dark:bg-gray-900">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">Huquqlar ro'yxati: {{permissions.length}}</h1>
      <button
          @click="openCreateModal"
          class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
      >
        <i class="bx bx-plus-circle text-xl"></i> <span>Huquq qo'shish</span>
      </button>
    </div>

    <div class="overflow-x-auto shadow-xl rounded-lg">
      <table class="w-full bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
        <thead>
        <tr class="bg-gray-700 text-white">
          <th class="px-6 py-4 text-left">Nomi</th>
          <th class="px-6 py-4 text-right ">
            Amallar
          </th>
        </tr>
        </thead>
        <tbody v-if="permissions && permissions.length > 0">
        <tr
            v-for="permission in permissions"
            :key="permission.id"
            class="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 cursor-pointer"
        >
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{{ permission.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a
                @click="deleteById(permission.id)"
                class="mr-1 transition text-white bg-red-500 hover:bg-red-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-trash-alt"></i>
            </a>
            <a
                @click.prevent="openUpdateModal(permission.id)"
                href="#"
                class="mr-1 transition text-white bg-green-500 hover:bg-green-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-edit-alt"></i>
            </a>
          </td>
        </tr>
        </tbody>

        <tbody class="w-full h-10" v-else>
        <tr class="w-full text-center text-lg">
          Malumot mavjud emas!
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import CreatePermission from "@/components/MainLayout/permission/CreatePermission.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import UpdatePermission from "@/components/MainLayout/permission/UpdatePermission.vue";
export default {
  components: {
    UpdatePermission,
    actionSidebar,
    CreatePermission,
  },
  setup() {
    const store = useStore();
    const isModalOpen = ref(false);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const isReading = ref(false);
    const selectedPermissionId = ref(null);
    const permissions = computed(() => store.getters['permission/permissions']);
    const isSidebarOpen = computed(() => store.getters.isSidebarOpen);
    const sidebarTitle = computed(() => {
      if (isCreating.value) return "Huquq qo'shish";
      if (isUpdating.value) return "Huquqni o'zgartirish";
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
      selectedPermissionId.value = id;
      store.dispatch("toggleSidebar", true);
    };

    const openReadModal = (id) => {
      isReading.value = true;
      isCreating.value = false;
      isUpdating.value = false;
      selectedPermissionId.value = id;
      store.dispatch("toggleSidebar", true);
    }

    const toggleSidebar = () => {
      isCreating.value = false;
      isUpdating.value = false;
      isReading.value = false
      selectedPermissionId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const closeCreateModal = () => {
      isCreating.value = false;
      store.dispatch("toggleSidebar", false);
    };

    const closeUpdateModal = () => {
      isUpdating.value = false;
      selectedPermissionId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const closeReadModal = () => {
      isReading.value = false;
      selectedPermissionId.value = null;
      store.dispatch("toggleSidebar", false);
    }

    const deleteById = (id) => {
      store.dispatch("permission/deletePermission", id);
    };
    const fetchPermissions = async () => {
      try {
        store.commit("SET_LOADING", true, { root: true });
        await store.dispatch("permission/getAllPermissions");

      } catch (e) {
        console.error("Huquqlarni olishda xatolik:", e.message);
      }
    };

    onMounted(() => {
      fetchPermissions();
    });


    return {
      permissions,
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
      selectedPermissionId,
    };
  },
};
</script>