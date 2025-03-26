<template>
  <actionSidebar
      :title="sidebarTitle"
      @closeSidebar="toggleSidebar"
  >
    <CreateNotification
        v-if="isCreating"
        :isOpen="isCreating"
        @close="closeCreateModal"
    />


    <UpdateNotification
        v-if="isUpdating"
        :notificationId="selectedNotificationId"
        @close="closeUpdateModal"
    />
  </actionSidebar>

  <div class="p-6 min-h-screen dark:bg-gray-900">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">Bildirishnomalar ro'yxati: {{totalValue}}</h1>
      <button
          @click="openCreateModal"
          class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
      >
        <i class="bx bx-plus-circle text-xl"></i> <span>Bildirishnoma qo'shish</span>
      </button>
    </div>

    <div class="overflow-x-auto shadow-xl rounded-lg">
      <table class="w-full bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
        <thead>
        <tr class="bg-gray-700 text-white">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Sarlavha</th>
          <th class="px-6 py-4 text-left">Text</th>
          <th class="px-6 py-4 text-left">Turi</th>
          <th class="px-6 py-4 text-left">Status</th>
          <th class="px-6 py-4 text-right">Muhlat</th>
        </tr>
        </thead>
        <tbody v-if="notifications && notifications.length > 0">
        <tr
            v-for="(notification, index) in notifications"
            :key="index"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-2 font-semibold text-gray-800 dark:text-white">
            {{ index + 1 }}
          </td>
          <td class="px-6 py-2 font-semibold text-gray-800 dark:text-white">
            {{ notification?.title || 'Noma’lum' }}
          </td>
          <td class="px-6 py-2 font-semibold">
            {{ notification?.text?.length > 20 ? notification?.text.slice(0, 20) + '...' : notification?.text || 'Noma’lum' }}
          </td>
          <td class="px-6 py-2 font-semibold">
            {{ notification?.type || 'Noma’lum' }}
          </td>
          <td class="px-6 py-2">
            <StatusBadge :status="notification?.status" />
          </td>
          <td class="px-6 py-2 space-x-3 text-right">
            <router-link
                :to="{ name: 'watchNotification', params: { id: notification?.id } }"
                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
                v-if="notification?.id"
            >
              <i class="bx bxs-show"></i>
            </router-link>
            <button
                @click="deleteById(notification?.id)"
                class="mr-0.5 transition text-white bg-red-500 hover:bg-red-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
                v-if="notification?.id"
            >
              <i class="bx bxs-trash-alt"></i>
            </button>
            <button
                @click.prevent="openUpdateModal(notification?.id)"
                class="mr-0.5 transition text-white bg-green-500 hover:bg-green-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
                v-if="notification?.id"
            >
              <i class="bx bxs-edit-alt"></i>
            </button>
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="6" class="px-6 py-4 text-center text-xl text-gray-500 dark:text-gray-400">
            Hozircha ma'lumot mavjud emas
          </td>
        </tr>
        </tbody>

      </table>
      <div class="flex justify-center items-center mt-6 space-x-2"  v-if="notifications && notifications.length > 0">
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
import StatusBadge from "@/components/MainLayout/ui/StatusBadge.vue";

import CreateNotification from "@/components/MainLayout/notification/CreateNotification.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import UpdateNotification from "@/components/MainLayout/notification/UpdateNotification.vue";
export default {
  components: {
    UpdateNotification,
    actionSidebar,
    CreateNotification,
    StatusBadge,
  },
  setup() {
    const store = useStore();
    const isModalOpen = ref(false);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const isReading = ref(false);
    const selectedNotificationId = ref(null);
    const notifications = computed(() => store.getters['notification/notifications']);
    const sortBy = ref('id');
    const orderBy = ref('desc');
    const totalPages = ref(null)
    const currentPage = ref(1);
    const perPage = ref(5);
    const sidebarTitle = computed(() => {
      if (isCreating.value) return "Bildirishnoma qo'shish";
      if (isUpdating.value) return "Bildirishnoma o'zgartirish";
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
      selectedNotificationId.value = id;
      store.dispatch("toggleSidebar", true);
    };


    const toggleSidebar = () => {
      isCreating.value = false;
      isUpdating.value = false;
      isReading.value = false
      selectedNotificationId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const closeCreateModal = () => {
      isCreating.value = false;
      store.dispatch("toggleSidebar", false);
    };

    const closeUpdateModal = () => {
      isUpdating.value = false;
      selectedNotificationId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const deleteById = (id) => {
      store.dispatch("notification/deleteNotification", id);
    };
    const paginatedDiscounts = computed(() => {
      const startIndex = (currentPage.value - 1) * perPage.value;
      const endIndex = startIndex + perPage.value;
      return notifications.value.slice(startIndex, endIndex);
    });

    const changePage = (page) => {
      if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
      }
      fetchNotifications()
    };
    const totalValue = ref(0)
    const fetchNotifications = async () => {
      try {
        store.commit("SET_LOADING", true, { root: true });
        const total = await store.dispatch("notification/getAllNotifications", {
          page: currentPage.value,
          perPage: perPage.value,
          sortBy: sortBy.value,
          orderBy: orderBy.value,
        });
        console.log(total)
        totalPages.value = Math.ceil(total / perPage.value);
        totalValue.value = total.total
      } catch (e) {
        console.error("Error fetching discounts:", e.message);
      }
    };


    onMounted(() => {
      fetchNotifications();
      console.log('Bildirishnomalar: ',notifications.value)
    });


    return {
      notifications,
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
      selectedNotificationId,
      currentPage,
      totalPages,
      paginatedDiscounts,
      changePage,
      totalValue,
    };
  },
};
</script>
