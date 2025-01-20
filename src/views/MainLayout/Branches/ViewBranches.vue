<template>

<!--  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-->
    <actionSidebar
        :title="sidebarTitle"
        @closeSidebar="toggleSidebar"
    >
      <CreateBranch
          v-if="isCreating"
          :isOpen="isCreating"
          @close="closeCreateModal"
      />

      <updateBranch
          v-if="isUpdating"
          :branchId="selectedBranchId"
          @close="closeUpdateModal"
      />
    </actionSidebar>

    <div class="p-6 min-h-screen dark:bg-gray-900">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">Filiallar ro'yxati</h1>
        <button
            @click="openCreateModal"
            class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
        >
          <i class="bx bx-plus-circle text-xl"></i> <span>Filial qo'shish</span>
        </button>
      </div>

      <div class="overflow-x-auto shadow-xl rounded-lg">
        <table class="w-full bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
          <thead>
          <tr class="bg-gray-700 text-white">
            <th class="px-6 py-4 text-left">№</th>
            <th class="px-6 py-4 text-left">Filial nomi</th>
            <th class="px-6 py-4 text-left">Telefon Raqami</th>
            <th class="px-6 py-4 text-left">Telefon Manzili</th>
            <th class="px-6 py-4 text-left">Tafsif</th>
            <th class="px-6 py-4 text-left">Holat</th>
            <th class="px-6 py-4 text-right">Amallar</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(branch, index) in branches"
              :key="branch.id"
              class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <td class="px-6 py-4 font-semibold text-gray-800 dark:text-white">{{ index + 1 }}</td>
            <td class="px-6 py-4 font-semibold">{{ branch.name }}</td>
            <td class="px-6 py-4 font-semibold">{{ branch.phone }}</td>
            <td class="px-6 py-4 font-semibold">{{ branch.address }}</td>
            <td class="px-6 py-4 font-semibold">
              {{ branch.description.length > 15 ? branch.description.substring(0, 15) + '...' : branch.description }}
            </td>

            <td class="px-6 py-4">
              <StatusBadge :status="branch.status" />
            </td>
            <td class="px-6 py-4 space-x-3 text-right">
              <router-link
                  :to="{ name: 'WatchBranch', params: { id: branch.id } }"
                  class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
              >
                <i class="bx bxs-show"></i>
              </router-link>
              <button
                  @click="deleteById(branch.id)"
                  class="mr-0.5 transition text-white bg-red-500 hover:bg-red-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
              >
                <i class="bx bxs-trash-alt"></i>
              </button>
              <button
                  @click.prevent="openUpdateModal(branch.id)"
                  class="mr-0.5 transition text-white bg-green-500 hover:bg-green-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
              >
                <i class="bx bxs-edit-alt"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="flex justify-center items-center mt-6 space-x-2">
          <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-700 disabled:opacity-50"
          >
            <i class="bx bx-chevron-left"></i>
          </button>
          <button
              v-for="page in totalPages"
              :key="page"
              @click="changePage(page)"
              :class="{
              'bg-blue-600 text-white': currentPage === page,
              'bg-gray-300': currentPage !== page,
            }"
              class="px-3 py-1 rounded-md font-medium transition duration-150"
          >
            {{ page }}
          </button>
          <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-700 disabled:opacity-50"
          >
            <i class="bx bx-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import CreateBranch from "@/components/MainLayout/branch/CreateBranch.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import updateBranch from "@/components/MainLayout/branch/updateBranch.vue";
import StatusBadge from "@/components/MainLayout/ui/StatusBadge.vue";
export default {
  components: {
    updateBranch,
    actionSidebar,
    CreateBranch,
    StatusBadge,
  },
  setup() {
    const store = useStore();
    const currentPage = ref(1);
    const perPage = ref(5);
    const isModalOpen = ref(false);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const isReading = ref(false);
    const selectedBranchId = ref(null);
    const branches = computed(() => store.getters['branch/branches']);
    const sortBy = ref('id');
    const orderBy = ref('desc');
    const totalPages = ref(null)
    const isSidebarOpen = computed(() => store.getters.isSidebarOpen);
    const sidebarTitle = computed(() => {
      if (isCreating.value) return "Filial qo'shish";
      if (isUpdating.value) return "Filialni o'zgartirish";
      if (isReading.value) return "Ko'rish";
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
      selectedBranchId.value = id;
      store.dispatch("toggleSidebar", true);
    };

    const toggleSidebar = () => {
      isCreating.value = false;
      isUpdating.value = false;
      isReading.value = false
      selectedBranchId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const closeCreateModal = () => {
      isCreating.value = false;
      store.dispatch("toggleSidebar", false);
    };

    const closeUpdateModal = () => {
      isUpdating.value = false;
      selectedBranchId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const deleteById = (id) => {
      store.dispatch("branch/deletebranch", id);
    };

    const paginatedBranches = computed(() => {
      const startIndex = (currentPage.value - 1) * perPage.value;
      const endIndex = startIndex + perPage.value;
      return branches.value.slice(startIndex, endIndex);
    });

    const changePage = (page) => {
      if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
      }
      fetchBranches()
    };

    const fetchBranches = async () => {
      try {
        store.commit("SET_LOADING", true, {root: true});
        const total = await store.dispatch("branch/getAllBranches", {
          page: currentPage.value,
          perPage: perPage.value,
          sortBy: sortBy.value,
          orderBy: orderBy.value,
        });
        totalPages.value = Math.ceil(total.total / perPage.value);
      } catch (e) {
        console.error("Error fetching branches:", e.message);
      }
    };

    onMounted(() => {
      fetchBranches();
    });


    return {
      branches,
      currentPage,
      totalPages,
      paginatedBranches,
      changePage,
      isCreating,
      isUpdating,
      isReading,
      sidebarTitle,
      openCreateModal,
      openUpdateModal,
      closeCreateModal,
      closeUpdateModal,
      deleteById,
      toggleSidebar,
      isModalOpen,
      selectedBranchId,
    };
  },
};
</script>
