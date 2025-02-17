<template>
  <actionSidebar
      :title="sidebarTitle"
      @closeSidebar="toggleSidebar"
  >
    <CreateUserForm
        v-if="isCreating"
        :isOpen="isCreating"
        @close="closeCreateModal"
    />
    <UpdateUserForm
        v-if="isUpdating"
        :userId="selectedUserId"
        @close="closeUpdateModal"
    />
  </actionSidebar>

  <div class="flex justify-between mt-4">
    <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">Xodimlar ro'yxati</h1>

    <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
        v-if="users && users.length >0"
    >
      <i class="bx bx-plus-circle text-xl"></i> <span>Xodim qo'shish</span>
    </button>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
    <div
        v-for="user in users"
        :key="user.id"
        class="bg-white shadow-md rounded-lg p-4"
    >
      <div class="flex items-center space-x-4">
        <img
            class="w-16 h-16 rounded-full"
            :src="user.image ? `http://192.168.11.71:8000/storage/${user.images[0]}` : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'"
            alt="User Avatar"
        />
        <div>
          <h2 class="text-lg font-bold">{{ user.full_name }}</h2>
          <p class="text-gray-600">{{ user.email }}</p>
        </div>
      </div>
      <div class="mt-4 flex justify-around">
        <router-link
            :to="{ name: 'WatchUser', params: { id: user.id } }"
            class="mr-1 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
        >
            Ko'rish
        </router-link>
        <button
            @click="openUpdateModal(user.id)"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <i class="bx bxs-edit-alt"></i>
        </button>
        <button
            @click="deleteUser(user.id)"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <i class="bx bxs-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>

  <div class="flex justify-center items-center mt-6" v-if="users && users.length >0">
    <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
    >
      <i class="bx bx-chevron-left"></i>
    </button>
    <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="{'bg-blue-500 text-white': currentPage === page, 'bg-gray-300': currentPage !== page}"
        class="px-4 py-2 rounded-md font-semibold"
    >
      {{ page }}
    </button>
    <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
    >
      <i class="bx bx-chevron-right"></i>
    </button>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import CreateUserForm from "@/components/MainLayout/user/CreateUser.vue";
import UpdateUserForm from "@/components/MainLayout/user/UpdateUser.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";

export default {
  components: {
    CreateUserForm,
    UpdateUserForm,
    actionSidebar,
  },
  setup() {
    const store = useStore();
    const currentPage = ref(1);
    const users = computed(() => store.getters['user/users']);
    const totalPages = ref(null);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const selectedUserId = ref(null);
    const perPage = ref(6);
    const loading = computed(store.getters.isLoading)
    const sidebarTitle = computed(() => {
      if (isCreating.value) return "Xodim qo'shish";
      if (isUpdating.value) return "Xodim malumotlarini o'zgartirish";
      return "";
    });
    const openCreateModal = () => {
      isCreating.value = true;
      isUpdating.value = false;
      store.dispatch("toggleSidebar", true);
    };

    const openUpdateModal = (userId) => {
      isCreating.value = false;
      isUpdating.value = true;
      selectedUserId.value = userId;
      console.log(selectedUserId.value)
      store.dispatch("toggleSidebar", true);
    };

    const closeCreateModal = () => {
      isCreating.value = false;
      store.dispatch("toggleSidebar", false);
    };

    const closeUpdateModal = () => {
      isUpdating.value = false;
      selectedUserId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const deleteUser = async (userId) => {
      try {
        await store.dispatch("user/deleteUser", userId);
        await fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error.message);
      }
    };

    const toggleSidebar = () => {
      isCreating.value = false;
      isUpdating.value = false;
      selectedUserId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value && !isNaN(page)) {
        currentPage.value = page;
        fetchUsers();
      }
    };


    const fetchUsers = async () => {
      try {
        store.commit("SET_LOADING", true, { root: true });
        const total = await store.dispatch("user/getAllUsers", {
          page: currentPage.value,
          perPage: perPage.value,
        });
        totalPages.value = Math.ceil(total.total / perPage.value);
      } catch (e) {
        console.error("Error fetching users:", e.message);
      }
    };

    onMounted(fetchUsers);

    return {
      users,
      selectedUserId,
      currentPage,
      isCreating,
      isUpdating,
      sidebarTitle,
      openCreateModal,
      openUpdateModal,
      closeCreateModal,
      closeUpdateModal,
      deleteUser,
      totalPages,
      changePage,
      toggleSidebar,
    };
  },
};
</script>
