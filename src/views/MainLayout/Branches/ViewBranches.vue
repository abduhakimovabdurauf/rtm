<template>
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
      <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">
        Filiallar ro'yxati
      </h1>
      <button
          @click="openCreateModal"
          class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
      >
        <i class="bx bx-plus-circle text-xl"></i> <span>Filial qo'shish</span>
      </button>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
          v-if="branches?.length === 0"
          class="flex justify-center items-center col-span-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-6 rounded-lg shadow-md"
      >
        <p class="text-lg font-semibold">Ma'lumot mavjud emas</p>
      </div>

      <div
          v-for="branch in branches"
          :key="branch?.id"
          class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col justify-between"
      >
        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">
            {{ branch?.name }}
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400" v-if="branches && branch && branch.phone">
            Telefon: {{ branch?.phone }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400" v-if="branches && branch && branch.address">
            Manzil: {{ branch?.address }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400" v-if="branches && branch && branch.description">
            Tavsif: {{
              branch?.description.length > 15
                  ? branch?.description.substring(0, 15) + "..."
                  : branch?.description
            }}
          </p>
        </div>
        <div class="mt-4 flex justify-between items-center">
          <StatusBadge :status="branch?.status" />
          <div class="flex space-x-2">
            <router-link
                :to="{ name: 'WatchBranch', params: { id: branch?.id } }"
                class="text-white bg-blue-500 hover:bg-blue-600 p-2 py-1 rounded transition"
            >
              <i class="bx bxs-show"></i>
            </router-link>
            <button
                @click="deleteById(branch.id)"
                class="text-white bg-red-500 hover:bg-red-600 p-2 py-1 rounded transition"
            >
              <i class="bx bxs-trash-alt"></i>
            </button>
            <button
                @click.prevent="openUpdateModal(branch.id)"
                class="text-white bg-green-500 hover:bg-green-600 p-2 py-1 rounded transition"
            >
              <i class="bx bxs-edit-alt"></i>
            </button>
          </div>
        </div>
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
      store.dispatch("branch/deleteBranch", id);
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
