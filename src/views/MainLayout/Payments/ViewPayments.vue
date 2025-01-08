<template>
  <actionSidebar
      :title="sidebarTitle"
      @closeSidebar="toggleSidebar"
  >
    <CreateForm
        v-if="isCreating"
        :isOpen="isCreating"
        @close="closeCreateModal"
    />

    <updatePayment
        v-if="isUpdating"
        :paymentId="selectedPaymentId"
        @close="closeUpdateModal"
    />
  </actionSidebar>

  <div class="p-6 min-h-screen dark:bg-gray-900">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">To'lovlar ro'yxati</h1>
      <button
          @click="openCreateModal"
          class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
      >
        <i class="bx bx-plus-circle text-xl"></i> <span>To'lov qo'shish</span>
      </button>
    </div>

    <div class="overflow-x-auto shadow-xl rounded-lg">
      <table class="w-full bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
        <thead>
        <tr class="bg-gray-700 text-white">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">O'quvchi ismi</th>
          <th class="px-6 py-4 text-left">To'lov summasi</th>
          <th class="px-6 py-4 text-left">To'lov sanasi</th>
          <th class="px-6 py-4 text-left">Holat</th>
          <th class="px-6 py-4 text-right">Amallar</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(payment, index) in payments"
            :key="payment.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-4 font-semibold text-gray-800 dark:text-white">{{ index + 1 }}</td>
          <td class="px-6 py-4 font-semibold"
            v-if="payment && payment.student"
          >
            {{ payment.student.full_name }}
          </td>
          <td class="px-6 py-4 font-semibold">{{ payment.summa }} UZS</td>
          <td class="px-6 py-4 font-semibold">{{ payment.payment_date }}</td>
          <td class="px-6 py-4">
              <span
                  :class="{
                  'px-3 py-1 text-xs font-medium rounded-full shadow-sm': true,
                  'bg-green-200 text-green-800': payment.status === 'completed',
                  'bg-orange-200 text-orange-800': payment.status === 'pending',
                  'bg-red-200 text-red-800': payment.status === 'failed',
                }"
              >
                {{ translateStatus( payment.status ) }}
              </span>
          </td>
          <td class="px-6 py-4 space-x-3 text-right">
            <button
                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
                @click="openModal(payment.id)"
            >
              <i class="bx bxs-show"></i>
            </button>
            <button
                @click="deleteById(payment.id)"
                class="mr-0.5 transition text-white bg-red-500 hover:bg-red-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-trash-alt"></i>
            </button>
            <button
                @click.prevent="openUpdateModal(payment.id)"
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

  <Modal :isVisible="isModalVisible" @update:isVisible="isModalVisible = $event">
    <ViewRequestPayments :id="Id"/>
  </Modal>
</template>

<script>
import {computed, ref, onMounted} from "vue";
import {useStore} from "vuex";
import CreateForm from "@/components/MainLayout/payment/CreateForm.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import Modal from '@/components/MainLayout/Modal.vue'
import updatePayment from "@/components/MainLayout/payment/updatePayment.vue";
import ViewRequestPayments from "@/views/MainLayout/Payments/ViewRequestPayments.vue";
import {getStatus} from "@/utils/stutus.js";
export default {
  components: {
    ViewRequestPayments,
    updatePayment,
    actionSidebar,
    CreateForm,
    Modal
  },
  setup() {
    const store = useStore();
    const currentPage = ref(1);
    const perPage = ref(5);
    const isModalOpen = ref(false);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const isReading = ref(false);
    const selectedPaymentId = ref(null);
    const payments = computed(() => store.getters['payment/payments']);
    const sortBy = ref('id');
    const orderBy = ref('desc');
    const totalPages = ref(null)
    const isSidebarOpen = computed(() => store.getters.isSidebarOpen);
    const sidebarTitle = computed(() => {
      if (isCreating.value) return "To'lo'v qo'shish";
      if (isUpdating.value) return "To'lo'vni o'zgartirish";
      if (isReading.value) return "Ko'rish";
      return "";
    });


    const translateStatus = (status) => {
      return getStatus(status)
    }

    const isModalVisible = ref(false);
    const Id = ref(null);
    const openModal = (id) => {
      isModalVisible.value = true;
      Id.value = id;
    };

    const openCreateModal = () => {
      console.log(payments.value);
      isCreating.value = true;
      isUpdating.value = false;
      isReading.value = false
      store.dispatch("toggleSidebar", true);
    };

    const openUpdateModal = (id) => {
      isUpdating.value = true;
      isCreating.value = false;
      isReading.value = false
      selectedPaymentId.value = id;
      store.dispatch("toggleSidebar", true);
    };

    const toggleSidebar = () => {
      isCreating.value = false;
      isUpdating.value = false;
      isReading.value = false
      selectedPaymentId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const closeCreateModal = () => {
      isCreating.value = false;
      store.dispatch("toggleSidebar", false);
    };

    const closeUpdateModal = () => {
      isUpdating.value = false;
      selectedPaymentId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const deleteById = (id) => {
      store.dispatch("payment/deletePayment", id);
    };

    const paginatedPayments = computed(() => {
      const startIndex = (currentPage.value - 1) * perPage.value;
      const endIndex = startIndex + perPage.value;
      return payments.value.slice(startIndex, endIndex);
    });

    const changePage = (page) => {
      if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
      }
      fetchPayments()
    };

    const fetchPayments = async () => {
      store.commit("SET_LOADING", true, { root: true });
      try {
        const total = await store.dispatch("payment/getAllPayments", {
          page: currentPage.value,
          perPage: perPage.value,
          sortBy: sortBy.value,
          orderBy: orderBy.value,
        });
        totalPages.value = Math.ceil(total / perPage.value);
      } catch (e) {
        console.error("Error fetching payments:", e.message);
      }
    };

    onMounted(() => {
      fetchPayments();
    });


    return {
      payments,
      currentPage,
      totalPages,
      paginatedPayments,
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
      selectedPaymentId,
      isModalVisible,
      openModal,
      Id,
      translateStatus,
    };
  },
};
</script>