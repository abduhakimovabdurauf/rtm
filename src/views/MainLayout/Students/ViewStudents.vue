<template>
  <actionSidebar
      :title="sidebarTitle"
      @closeSidebar="toggleSidebar"
  >
    <CreateStudentForm
        v-if="isCreating"
        :isOpen="isCreating"
        @close="closeCreateModal"
    />
    <UpdateStudentForm
        v-if="isUpdating"
        :studentId="selectedUserId"
        @close="closeUpdateModal"
    />
  </actionSidebar>

  <div class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg mt-6">
  <table class="min-w-full bg-white rounded-lg overflow-hidden" v-if="students && students.length > 0">
    <thead class="bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-300">
    <tr>
      <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Ism</th>
      <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Telefon</th>
      <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Manzil</th>
      <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Tavsif</th>
      <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Holati</th>
      <th scope="col" class="px-6 py-4 text-right">
        <button
            @click="openCreateModal"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition duration-200"
        >
          Qo'shish
        </button>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="student in students"
        :key="student.id"
        class="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 cursor-pointer"
    >
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{{ student.full_name }}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm">{{ student.phone }}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm">{{ student.address }}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm">{{ student.description }}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm">{{ student.status }}</td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" colspan="1">
        <router-link
            :to="{ name: 'WatchStudent', params: { id: student.id } }"
            class="mr-1 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
        >
          Ko'rish
        </router-link>
        <a
            @click="deleteStudent(student.id)"
            class="mr-1 transition text-white bg-red-500 hover:bg-red-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
        >
          <i class="bx bxs-trash-alt"></i>
        </a>
        <a
            @click.prevent="openUpdateModal(student.id)"
            href="#"
            class="mr-1 transition text-white bg-green-500 hover:bg-green-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
        >
          <i class="bx bxs-edit-alt"></i>
        </a>
      </td>
    </tr>
    </tbody>
  </table>
  <div class="flex justify-center items-center mt-6" v-if="students && students.length > 0">
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
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import CreateStudentForm from "@/components/MainLayout/students/CreateStudent.vue";
import UpdateStudentForm from "@/components/MainLayout/students/UpdateStudent.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";

export default {
  components: {
    CreateStudentForm,
    UpdateStudentForm,
    actionSidebar,
  },
  setup() {
    const store = useStore();
    const currentPage = ref(1);
    const students = computed(() => store.getters['student/students']);
    const totalPages = ref(null);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const selectedUserId = ref(null);
    const perPage = ref(6);

    const sidebarTitle = computed(() => {
      if (isCreating.value) return "Oquvchi qo'shish";
      if (isUpdating.value) return "Oquvchi malumotlarini o'zgartirish";
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

    const deleteStudent = async (Id) => {
      try {
        await store.dispatch("user/deleteUser", Id);
        await fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error.message);
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
        fetchStudents();
      }
    };


    const fetchStudents = async () => {
      try {
        const total = await store.dispatch("student/getAllStudents", {
          page: currentPage.value,
          perPage: perPage.value,
        });
        totalPages.value = Math.ceil(total / perPage.value);
      } catch (e) {
        console.error("Error fetching Students:", e.message);
      }
    };

    onMounted(fetchStudents);

    return {
      students,
      selectedUserId,
      currentPage,
      isCreating,
      isUpdating,
      sidebarTitle,
      openCreateModal,
      openUpdateModal,
      closeCreateModal,
      closeUpdateModal,
      deleteStudent,
      totalPages,
      changePage,
      toggleSidebar,
    };
  },
};
</script>
