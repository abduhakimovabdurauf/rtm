<template>
  <actionSidebar
      :title="sidebarTitle"
      @closeSidebar="toggleSidebar"
  >
    <CreateCompany
        v-if="isCreating"
        :isOpen="isCreating"
        @close="closeCreateModal"
    />

    <UpdateCompany
        v-if="isUpdating && selectedCompanyId !== null"
        :companyId="selectedCompanyId"
        @close="closeUpdateModal"
    />
  </actionSidebar>

  <div class="p-6 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">
        Kompaniyalar ro'yxati: {{totalValue}} ta
      </h1>
      <button
          @click="openCreateModal"
          class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
      >
        <i class="bx bx-plus-circle text-xl"></i>
        <span>Kompaniya qo'shish</span>
      </button>
    </div>

    <div class="overflow-x-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
            v-if="companies && companies.length > 0"
            v-for="company in companies"
            class="bg-gray-50 dark:bg-gray-800 dark:text-white rounded-lg shadow-md p-4 mb-4 transition duration-300"
        >
          <img v-if="company?.image" :src="'https://api.mrtm.uz/storage/companies/' + company?.image" alt="">

          <h1 v-if="company?.name" class="text-xl font-bold text-gray-800 dark:text-white">
            {{ company?.name }}
          </h1>

          <div v-if="company?.phone" class="mb-2 flex justify-between p-2 border-b dark:border-gray-600">
            <div class="font-medium text-gray-600 dark:text-gray-300">Telefon</div>
            <div class="text-gray-800 dark:text-gray-200">{{ company?.phone }}</div>
          </div>

          <div v-if="company?.address" class="mb-2 flex justify-between p-2 border-b dark:border-gray-600">
            <div class="font-medium text-gray-600 dark:text-gray-300">Manzil</div>
            <div class="text-gray-800 dark:text-gray-200">{{ company?.address }}</div>
          </div>

          <div v-if="company?.description" class="mb-2 flex justify-between p-2 border-b dark:border-gray-600">
            <div class="font-medium text-gray-600 dark:text-gray-300">Tavsif</div>
            <div class="text-gray-800 dark:text-gray-200">{{ company?.description }}</div>
          </div>

          <div v-if="company?.status" class="mb-2 flex justify-between p-2 border-b dark:border-gray-600">
            <div class="font-medium text-gray-600 dark:text-gray-300">Holat</div>
            <StatusBadge :status="company?.status"/>
          </div>

          <div v-if="company?.id" class="flex justify-end mt-4">
            <router-link
                :to="{ name: 'WatchCompany', params: { id: company?.id } }"
                class="transition ml-2 text-white bg-blue-500 hover:bg-blue-600 p-2 py-1 rounded duration-200"
            >
              Batasil <i class="bx bxs-show"></i>
            </router-link>
            <button
                @click="openUpdateModal(company.id)"
                class="transition ml-2 text-white bg-green-500 hover:bg-green-600 p-2 py-1 rounded duration-200"
            >
              <i class="bx bxs-edit-alt"></i>
            </button>
            <button
                @click="deleteById(company.id)"
                class="transition ml-2 text-white bg-red-500 hover:bg-red-600 p-2 py-1 rounded duration-200"
            >
              <i class="bx bxs-trash-alt"></i>
            </button>
          </div>
        </div>

        <div
            class="w-full flex justify-center align-center bg-white dark:bg-gray-800 dark:text-white p-4 rounded-lg"
            v-if="companies.length === 0"
        >
          <p>Ma'lumot mavjud emas!</p>
        </div>
      </div>
      <div class="flex justify-center items-center mt-6 space-x-2">
        <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-md text-gray-700 dark:text-white disabled:opacity-50"
        >
          <i class="bx bx-chevron-left"></i>
        </button>
        <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            :class="{
            'bg-blue-600 text-white': currentPage === page,
            'bg-gray-300 dark:bg-gray-700': currentPage !== page,
          }"
            class="px-3 py-1 rounded-md font-medium transition duration-150"
        >
          {{ page }}
        </button>
        <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-md text-gray-700 dark:text-white disabled:opacity-50"
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
import CreateCompany from "@/components/MainLayout/company/CreateCompany.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import UpdateCompany from "@/components/MainLayout/company/UpdateCompany.vue";
import StatusBadge from "@/components/MainLayout/ui/StatusBadge.vue";

export default {
  components: {
    UpdateCompany,
    actionSidebar,
    CreateCompany,
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
    const selectedCompanyId = ref(null);
    const companies = computed(() => store.getters['company/companies']);
    const sortBy = ref('id');
    const orderBy = ref('desc');
    const totalPages = ref(null);
    const sidebarTitle = computed(() => {
      if (isCreating.value) return "Kompaniya qo'shish";
      if (isUpdating.value) return "Kompaniyani o'zgartirish";
      return "";
    });

    const openCreateModal = () => {
      isCreating.value = true;
      isUpdating.value = false;
      isReading.value = false;
      store.dispatch("toggleSidebar", true);
    };

    const openUpdateModal = (id) => {
      if (!id) return console.error("Invalid company ID");
      isUpdating.value = true;
      isCreating.value = false;
      isReading.value = false;
      selectedCompanyId.value = id;
      store.dispatch("toggleSidebar", true);
    };

    const toggleSidebar = () => {
      isCreating.value = false;
      isUpdating.value = false;
      isReading.value = false;
      selectedCompanyId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const closeCreateModal = () => {
      isCreating.value = false;
      store.dispatch("toggleSidebar", false);
    };

    const closeUpdateModal = () => {
      isUpdating.value = false;
      selectedCompanyId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const deleteById = (id) => {
      if (!id) return console.error("Invalid company ID");
      store.dispatch("company/deleteCompany", id);
    };

    const paginatedCompanies = computed(() => {
      const startIndex = (currentPage.value - 1) * perPage.value;
      const endIndex = startIndex + perPage.value;
      return companies.value.slice(startIndex, endIndex) || [];
    });

    const changePage = (page) => {
      if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
      }
      fetchCompanies();
    };
    const totalValue = ref(0);
    const fetchCompanies = async () => {
      store.commit('SET_LOADING', true, { root: true });
      try {
        store.commit("SET_LOADING", true, { root: true });
        const total = await store.dispatch("company/getAllCompanies", {
          page: currentPage.value,
          perPage: perPage.value,
          sortBy: sortBy.value,
          orderBy: orderBy.value,
        });

        if (total && total.total) {
          totalPages.value = Math.ceil(total?.total / perPage.value);
          totalValue.value = total.total
        } else {
          console.error("Error: Total value is missing.");
          totalPages.value = 1;
        }
      } catch (e) {
        console.error("Error fetching companies:", e.message);
      } finally {
        store.commit("SET_LOADING", false, { root: true });
      }
    };

    onMounted(() => {
      fetchCompanies();
    });

    return {
      companies,
      currentPage,
      totalPages,
      paginatedCompanies,
      changePage,
      isCreating,
      isUpdating,
      sidebarTitle,
      openCreateModal,
      openUpdateModal,
      closeCreateModal,
      closeUpdateModal,
      deleteById,
      toggleSidebar,
      isModalOpen,
      selectedCompanyId,
      totalValue,
    };
  },
};
</script>
