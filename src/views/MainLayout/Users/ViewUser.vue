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
    <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">Xodimlar ro'yxati: {{totalValue}}</h1>

    <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-5 py-2 font-medium text-white transition rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
    >
      <i class="text-xl bx bx-plus-circle"></i> <span>Xodim qo'shish</span>
    </button>
  </div>

  <div class="grid grid-cols-1 gap-4 mt-6 text-center sm:grid-cols-2 md:grid-cols-5">
    <div
        v-for="user in users"
        :key="user.id"
        class="p-2 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:shadow-lg"
    >
      <div class="flex flex-col">
        <img
            class="w-16 h-16 mx-auto border rounded-full dark:border-gray-500"
            :src="user.image ? `http://192.168.11.71:8000/storage/${user.images[0]}` : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'"
            alt="User Avatar"
        />
        <h2 class="mb-2 text-base font-semibold text-gray-800 dark:text-white">{{ user.full_name }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300" v-if="user?.roles?.length!==0"><span class="font-semibold text-md">Lavozimi:</span> {{ user?.roles?.map(role => tarjimaLavozim(role.name)).join(', ') }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-300"><span class="font-semibold text-md">Filial:</span> {{ user?.branches?.map(branch => branch.name).join(', ') }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-300" v-if="user?.my_courses?.length!==0"><span class="font-semibold text-md">Kurslar:</span> {{ user?.my_courses?.map(course => course.name).join(', ') }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-300"><span class="font-semibold text-md">Telefon:</span> {{ user.phone }}</p>
      </div> 
      <div class="flex justify-center gap-2 mt-3">
        <router-link
            :to="{ name: 'WatchUser', params: { id: user.id } }"
            class="text-sm transition text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-gray-600 px-3 py-1.5 rounded duration-200"
        >
          <i class="bx bxs-show"></i>
        </router-link>
        <button
            @click="openUpdateModal(user.id)"
            class="text-sm bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-gray-600"
        >
          <i class="bx bxs-edit-alt"></i>
        </button>
        <button
            @click="deleteUser(user.id)"
            class="text-sm bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-gray-600"
        >
          <i class="bx bxs-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>


  <div class="flex items-center justify-center mt-6" v-if="users && users.length >0">
    <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
          class="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      <i class="bx bx-chevron-left"></i>
    </button>
    <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="{
          'bg-blue-500 text-white': currentPage === page,
          'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300': currentPage !== page
        }"
        class="px-4 py-2 font-semibold rounded-md"
    >
      {{ page }}
    </button>
    <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
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
import {  positionTranslations  } from "@/utils/positionTranslations.js"
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
    const perPage = ref(15);
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

    function tarjimaLavozim(engNomi) {

      if (!positionTranslations[engNomi]) {
    console.warn(`Tarjimasi topilmadi: ${engNomi}`);
  }   

      if(!engNomi) {
        return "Nomalum"
      }
      return positionTranslations[engNomi] || engNomi;
    }

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

    const totalValue = ref(0)
    const fetchUsers = async () => {
      try {
        store.commit("SET_LOADING", true, { root: true });
        const total = await store.dispatch("user/getAllUsers", {
          page: currentPage.value,
          perPage: perPage.value,
        });


        console.log(users.value);
        
        totalPages.value = Math.ceil(total.total / perPage.value);
        totalValue.value = total.total
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
      totalValue,
      tarjimaLavozim
    };
  },
};
</script>
