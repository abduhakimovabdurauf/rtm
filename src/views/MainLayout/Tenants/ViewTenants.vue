<template>
  <actionSidebar
      :title="sidebarTitle"
      @closeSidebar="toggleSidebar"
  >
    <CreateTenant
        v-if="isCreating"
        :isOpen="isCreating"
        @close="closeCreateModal"
    />
    <UpdateTenantForm
        v-if="isUpdating"
        :tenantId="selectedTenantId"
        @close="closeUpdateModal"
    />
  </actionSidebar>
  <div class="p-6 min-h-screen dark:bg-gray-900">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">O'quvchilar ro'yxati: {{totalValue}}</h1>
      <div>
        <input
            type="text"
            v-model="keyWord"
            @input="updateKeyWord($event.target.value)"
            placeholder="Saralash"
            class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <button
          @click="openCreateModal"
          class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
      >
        <i class="bx bx-plus-circle text-xl"></i> <span>Ijarachi qo'shish</span>
      </button>

    </div>
    <div class="overflow-x-auto shadow-xl rounded-lg">

      <table class="w-full bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
        <thead>
        <tr class="bg-gray-700 text-white w-full">
          <th class="px-6 py-4 text-left">#</th>
          <th class="px-6 py-4 text-left">Full Name</th>
          <th class="px-6 py-4 text-left">Phone</th>
          <th class="px-6 py-4 text-left">Address</th>
          <th class="px-6 py-4 text-left">Fix Amount</th>
          <th class="px-6 py-4 text-left">Status</th>
          <th class="px-6 py-4 text-right">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="isSortLoading">
          <td colspan="7" class="text-center py-6">
            <loader></loader>
          </td>
        </tr>
        <tr
            v-for="(tenant, index) in tenants"
            :key="tenant.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-4 font-semibold text-gray-800 dark:text-white">{{ index + 1 }}</td>
          <td class="px-6 py-4 font-semibold">{{ tenant.fullname }}</td>
          <td class="px-6 py-4 font-semibold">{{ tenant.phone }}</td>
          <td class="px-6 py-4 font-semibold">{{ tenant.address }}</td>
          <td class="px-6 py-4 font-semibold">{{ tenant.fix_amount }}</td>
          <td class="px-6 py-4">
            <StatusBadge :status="tenant.status" />
          </td>
          <td class="px-6 py-4 space-x-3 text-right">
            <router-link
                :to="{ name: 'WatchTenant', params: { id: tenant.id } }"
                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-show"></i>
            </router-link>
            <button
                @click="deleteTenant(tenant.id)"
                class="mr-0.5 transition text-white bg-red-500 hover:bg-red-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-trash-alt"></i>
            </button>
            <button
                @click.prevent="openUpdateModal(tenant.id)"
                class="mr-0.5 transition text-white bg-green-500 hover:bg-green-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-edit-alt"></i>
            </button>
          </td>
        </tr>
        <tr v-if="tenants.length === 0">
          <td colspan="7" class="text-center py-6">Malumot mavjud emas!</td>
        </tr>
        </tbody>
      </table>

      <div class="flex justify-center items-center mt-6 space-x-2" v-if="tenants && tenants.length > 0">
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
import { debounce } from "lodash";
import { getStatus } from '@/utils/stutus.js';

import CreateTenant from "@/components/MainLayout/tenant/CreateTenant.vue";
import UpdateTenantForm from "@/components/MainLayout/tenant/UpdateTenant.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import loader from '@/components/MainLayout/ui/Loader.vue'
import StatusBadge from "@/components/MainLayout/ui/StatusBadge.vue";
export default {
  components: {
    CreateTenant,
    UpdateTenantForm,
    actionSidebar,
    StatusBadge,
    loader
  },
  setup() {
    const store = useStore();
    const currentPage = ref(1);
    const tenants = computed(() => store.getters['tenant/tenants']);
    const totalPages = ref(null);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const isPaying = ref(false)
    const selectedTenantId = ref(null);
    const selectedGroupData = ref(null)
    const perPage = ref(6);
    const isSortLoading = computed(()=> store.getters['isSortLoading'])
    const keyWord = ref('')
    const sidebarTitle = computed(() => {
      if (isCreating.value) return "Ijarachi qo'shish";
      if (isUpdating.value) return "Ijarachi malumotlarini o'zgartirish";
      if (isPaying.value) return "Tolov qilish";
      return "";
    });

    const openCreateModal = () => {
      isCreating.value = true;
      isPaying.value = false;
      isUpdating.value = false;
      store.dispatch("toggleSidebar", true);
    };

    const openUpdateModal = (tenantId) => {
      isCreating.value = false;
      isPaying.value = false;
      isUpdating.value = true;
      selectedTenantId.value = tenantId;
      store.dispatch("toggleSidebar", true);
    };

    const closeCreateModal = () => {
      isCreating.value = false;
      store.dispatch("toggleSidebar", false);
    };

    const closeUpdateModal = () => {
      isUpdating.value = false;
      selectedTenantId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const deleteTenant = async (Id) => {
      try {
        await store.dispatch("user/deleteUser", Id);
        await fetchTenants();
      } catch (error) {
        console.error("Error deleting tenant:", error.message);
      }
    };

    const toggleSidebar = () => {
      isCreating.value = false;
      isUpdating.value = false;
      selectedTenantId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value && !isNaN(page)) {
        currentPage.value = page;
        fetchTenants();
      }
    };

    const totalValue = ref(0);

    const fetchTenants = async () => {
      try {
        const total = await store.dispatch("tenant/getAllTenants", {
          page: currentPage.value,
          perPage: perPage.value,
          key: keyWord.value
        });
        totalPages.value = Math.ceil(total.total / perPage.value);
        totalValue.value = total.total
      } catch (e) {
        console.error("Error fetching tenants:", e.message);
      } finally {
        store.commit("SET_SORTLOADING", false, { root: true });
      }
    };

    const debouncedFetchTenants = debounce(fetchTenants, 1500);

    const updateKeyWord = (value) => {
      keyWord.value = value;
      debouncedFetchTenants();
      store.commit("SET_SORTLOADING", true, { root: true });
    };

    onMounted(fetchTenants);

    return {
      tenants,
      selectedTenantId,
      selectedGroupData,
      currentPage,
      isCreating,
      isUpdating,
      isPaying,
      sidebarTitle,
      openCreateModal,
      openUpdateModal,
      closeCreateModal,
      closeUpdateModal,
      deleteTenant,
      totalPages,
      changePage,
      toggleSidebar,
      isSortLoading,
      fetchTenants,
      keyWord,
      updateKeyWord,
      totalValue,
    };
  },
};
</script>
