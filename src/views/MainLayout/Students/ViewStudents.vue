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
    <div class="p-6 min-h-screen dark:bg-gray-900">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">O'quvchilar ro'yxati</h1>
        <button
            @click="openCreateModal"
            class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
        >
          <i class="bx bx-plus-circle text-xl"></i> <span>Oquvchi qo'shish</span>
        </button>
      </div>
      <div class="overflow-x-auto shadow-xl rounded-lg">
        <table class="w-full bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300" v-if="students && students.length > 0">
          <thead>
          <tr class="bg-gray-700 text-white">
            <th class="px-6 py-4 text-left">№</th>
            <th class="px-6 py-4 text-left">Ism</th>
            <th class="px-6 py-4 text-left">Telefon</th>
            <th class="px-6 py-4 text-left">Manzil</th>
            <th class="px-6 py-4 text-left">Tavsif</th>
            <th class="px-6 py-4 text-left">Holati</th>
            <th class="px-6 py-4 text-right">
              Amallar
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(student,index) in students"
              :key="student.id"
              class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <td class="px-6 py-4 font-semibold text-gray-800 dark:text-white">{{ index + 1 }}</td>
            <td class="px-6 py-4 font-semibold">{{ student.full_name }}</td>
            <td class="px-6 py-4 font-semibold">{{ student.phone }}</td>
            <td class="px-6 py-4 font-semibold">{{ student.address }}</td>
            <td class="px-6 py-4 font-semibold">{{ student.description }}</td>
            <td class="px-6 py-4 font-semibold">{{ student.status }}</td>
            <td class="px-6 py-4 space-x-3 text-right">
              <router-link
                  :to="{ name: 'WatchStudent', params: { id: student.id } }"
                  class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
              >
                <i class="bx bxs-show"></i>
              </router-link>
              <button
                  @click="deleteStudent(student.id)"
                  class="mr-0.5 transition text-white bg-red-500 hover:bg-red-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
              >
                <i class="bx bxs-trash-alt"></i>
              </button>
              <button
                  @click.prevent="openUpdateModal(student.id)"
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
        totalPages.value = Math.ceil(total.total / perPage.value);
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
