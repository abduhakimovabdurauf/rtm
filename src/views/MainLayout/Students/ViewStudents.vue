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
        :studentId="selectedStudentId"
        @close="closeUpdateModal"
    />
    <Pay
      v-if="isPaying"
      :studentId="selectedStudentId"
      :groupData="selectedGroupData"
      @close="closePayModal"
    />
  </actionSidebar>
    <div class="min-h-screen p-6 dark:bg-gray-900">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">O'quvchilar ro'yxati: {{totalValue}} ta</h1>
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
            class="flex items-center gap-2 px-5 py-2 font-medium text-white transition rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
        >
          <i class="text-xl bx bx-plus-circle"></i> <span>Oquvchi qo'shish</span>
        </button>

      </div>
      <div class="overflow-x-auto rounded-lg shadow-xl">

        <table class="w-full text-sm text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300">
          <thead>
          <tr class="w-full text-white bg-gray-700">
            <th class="px-6 py-4 text-left">№</th>
            <th class="px-6 py-4 text-left">Ism</th>
            <th class="px-6 py-4 text-left">Telefon</th>
            <th class="px-6 py-4 text-left">Ota-ona telefoni</th>
            <th class="px-6 py-4 text-left">Holati</th>
            <th class="px-6 py-4 text-right">
              Amallar
            </th>
          </tr>
          </thead>
          <tr v-if="isSortLoading">
            <td colspan="7" class="py-6 text-center">
              <loader></loader>
            </td>
          </tr>
          <tbody v-if="!isSortLoading || students">

          <tr
              v-for="(student,index) in students"
              :key="student.id"
              class="transition border-b hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <td class="px-6 py-1 font-semibold text-gray-800 dark:text-white">{{ index + 1 }}</td>
            <td class="px-6 py-1 font-semibold">{{ student.full_name }}</td>
            <td class="px-6 py-1 font-semibold">{{ student.phone }}</td>
            <td class="px-6 py-1 font-semibold">{{ student.parent_phone }}</td>
            <td class="px-6 py-1">
              <StatusBadge :status="student.status" />
            </td>
            <td
                class="px-6 py-2 space-x-3 text-right"
            >
              <button @click="openPayModal(student.id,student.groups)" class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 p-3 py-2 rounded duration-200">
                <i class='bx bxs-dollar-circle'></i>
                To'lov
              </button>
              <router-link
                  :to="{ name: 'WatchStudent', params: { id: student.id } }"
                  class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 p-3 py-2 rounded duration-200"
              >
                <i class="bx bxs-show"></i>
              </router-link>
              <button
                  @click="deleteStudent(student.id)"
                  class="mr-0.5 transition text-white bg-red-500 hover:bg-red-600 p-3 py-2 rounded duration-200"
              >
                <i class="bx bxs-trash-alt"></i>
              </button>
              <button
                  @click="openUpdateModal(student.id)"
                  class="mr-0.5 transition text-white bg-green-500 hover:bg-green-600 p-3 py-2 rounded duration-200"
              >
                <i class="bx bxs-edit-alt"></i>
              </button>
            </td>
          </tr>
          </tbody>
          <tbody class="w-full h-10" v-if="!students.length>0">
          <tr class="w-full text-lg text-center">
            Malumot mavjud emas!
          </tr>
          </tbody>
        </table>
        <div class="flex items-center justify-center mt-6 space-x-2" v-if="students && students.length > 0">
          <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
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
              class="px-3 py-1 font-medium transition duration-150 rounded-md"
          >
            {{ page }}
          </button>
          <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
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

import CreateStudentForm from "@/components/MainLayout/students/CreateStudent.vue";
import UpdateStudentForm from "@/components/MainLayout/students/UpdateStudent.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import Pay from "@/components/MainLayout/students/Pay.vue";
import loader from '@/components/MainLayout/ui/Loader.vue'
import StatusBadge from "@/components/MainLayout/ui/StatusBadge.vue";
export default {
  components: {
    CreateStudentForm,
    UpdateStudentForm,
    actionSidebar,
    StatusBadge,
    Pay,
    loader
  },
  setup() {
    const store = useStore();
    const currentPage = ref(1);
    const students = computed(() => store.getters['student/students']);
    const totalPages = ref(null);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const isPaying = ref(false)
    const selectedStudentId = ref(null);
    const selectedGroupData = ref(null)
    const perPage = ref(15);
    const isSortLoading = computed(()=> store.getters['isSortLoading'])
    const keyWord = ref('')
    const sidebarTitle = computed(() => {
      if (isCreating.value) return "O'quvchi qo'shish";
      if (isUpdating.value) return "O'quvchi malumotlarini o'zgartirish";
      if (isPaying.value) return "Tolov qilish";
      return "";
    });

    const openCreateModal = () => {
      isCreating.value = true;
      isPaying.value = false;
      isUpdating.value = false;
      store.dispatch("toggleSidebar", true);
    };

    const openPayModal = (studentId,groupData) => {
      isPaying.value = true;
      isCreating.value = false;
      isUpdating.value = false;
      selectedStudentId.value = studentId;
      selectedGroupData.value = groupData
      store.dispatch("toggleSidebar", true);
    };

    const openUpdateModal = (studentId) => {
      isCreating.value = false;
      isPaying.value = false;
      isUpdating.value = true;
      selectedStudentId.value = studentId;
      store.dispatch("toggleSidebar", true);
    };

    const closePayModal = () => {
      isPaying.value = false;
      store.dispatch("toggleSidebar", false);
    };

    const closeCreateModal = () => {
      isCreating.value = false;
      store.dispatch("toggleSidebar", false);
    };

    const closeUpdateModal = () => {
      isUpdating.value = false;
      selectedStudentId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const deleteStudent = async (Id) => {
      try {
        await store.dispatch("student/deleteStudent", Id);
        await fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error.message);
      }
    };

    const toggleSidebar = () => {
      isCreating.value = false;
      isUpdating.value = false;
      selectedStudentId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value && !isNaN(page)) {
        currentPage.value = page;
        fetchStudents();
      }
    };


    const totalValue = ref(0)
    const fetchStudents = async () => {
      console.log('sorov')
      try {
        const total = await store.dispatch("student/getAllStudents", {
          page: currentPage.value,
          perPage: perPage.value,
          key: keyWord.value
        });
        totalValue.value = total.total
        totalPages.value = Math.ceil(total.total / perPage.value);
      } catch (e) {
        console.error("Error fetching Students:", e.message);
      } finally {
        store.commit("SET_SORTLOADING", false, { root: true });
      }
    };

    const debouncedFetchStudents = debounce(fetchStudents, 1500);

    const updateKeyWord = (value) => {
      keyWord.value = value;
      debouncedFetchStudents();
      store.commit("SET_SORTLOADING", true, { root: true });
    };

    onMounted(fetchStudents);

    return {
      students,
      selectedStudentId,
      selectedGroupData,
      currentPage,
      isCreating,
      isUpdating,
      isPaying,
      sidebarTitle,
      openCreateModal,
      openUpdateModal,
      openPayModal,
      closeCreateModal,
      closeUpdateModal,
      closePayModal,
      deleteStudent,
      totalPages,
      changePage,
      toggleSidebar,
      isSortLoading,
      fetchStudents,
      keyWord,
      updateKeyWord,
      totalValue,
    };
  },
};
</script>
