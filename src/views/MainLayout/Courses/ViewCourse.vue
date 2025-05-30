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

    <updateCourse
        v-if="isUpdating"
        :courseId="selectedCourseId"
        @close="closeUpdateModal"
    />
  </actionSidebar>

  <div class="min-h-screen p-6 dark:bg-gray-900">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">Kurslar ro'yxati: {{totalValue}} ta</h1>
      <button
          @click="openCreateModal"
          class="flex items-center gap-2 px-5 py-2 font-medium text-white transition rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
      >
        <i class="text-xl bx bx-plus-circle"></i> <span>Kurs qo'shish</span>
      </button>
    </div>

    <div class="overflow-x-auto rounded-lg shadow-xl">
      <table class="w-full text-sm text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300">
        <thead>
        <tr class="text-white bg-gray-700">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Filial</th>
          <th class="px-6 py-4 text-left">Kurs nomi</th>
          <th class="px-6 py-4 text-left">Davomiyligi</th>
          <th class="px-6 py-4 text-left">Narxi</th>
          <th class="px-6 py-4 text-left">Holat</th>
          <th class="px-6 py-4 text-right">Amallar</th>
        </tr>
        </thead>
        <tbody v-if="courses && courses.length > 0">
        <tr
            v-for="(course, index) in courses"
            :key="course.id"
            class="transition border-b hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <td class="px-4 py-1 font-semibold text-gray-800 dark:text-white">{{ index + 1 }}</td>
          <td class="px-4 py-1 font-semibold">{{ course?.branch?.name }}</td>
          <td class="px-4 py-1 font-semibold">{{ course.name }}</td>
          <td class="px-4 py-1 font-semibold">{{ course.duration }} oy</td>
          <td class="px-4 py-1 font-semibold">{{ course.price }} UZS</td>
          <td class="px-4 py-1">
              <StatusBadge :status="course.status" />
          </td>
          <td class="px-4 py-1 space-x-3 text-right">
            <router-link
                :to="{ name: 'WatchCourse', params: { id: course.id } }"
                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-show"></i>
            </router-link>
            <button
                @click="deleteById(course.id)"
                class="mr-0.5 transition text-white bg-red-500 hover:bg-red-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-trash-alt"></i>
            </button>
            <button
                @click.prevent="openUpdateModal(course.id)"
                class="mr-0.5 transition text-white bg-green-500 hover:bg-green-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-edit-alt"></i>
            </button>
          </td>
        </tr>
        </tbody>
        <tbody class="w-full h-10" v-else>
          <tr class="w-full text-lg text-center">
            Malumot mavjud emas!
          </tr>
        </tbody>
      </table>
      <div class="flex items-center justify-center mt-6 space-x-2" v-if="courses.length > 0">
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
import StatusBadge from "@/components/MainLayout/ui/StatusBadge.vue";
import CreateForm from "@/components/MainLayout/course/CreateForm.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import updateCourse from "@/components/MainLayout/course/updateCourse.vue";
export default {
  components: {
    updateCourse,
    actionSidebar,
    CreateForm,
    StatusBadge
  },
  setup() {
    const store = useStore();
    const currentPage = ref(1);
    const perPage = ref(20);
    const isModalOpen = ref(false);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const isReading = ref(false);
    const selectedCourseId = ref(null);
    const courses = computed(() => store.getters['course/courses']);
    const sortBy = ref('id');
    const orderBy = ref('desc');
    const totalPages = ref(null)
    const sidebarTitle = computed(() => {
      if (isCreating.value) return "Kurs qo'shish";
      if (isUpdating.value) return "Kursni o'zgartirish";
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
      selectedCourseId.value = id;
      store.dispatch("toggleSidebar", true);
    };

    const toggleSidebar = () => {
      isCreating.value = false;
      isUpdating.value = false;
      isReading.value = false
      selectedCourseId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const closeCreateModal = () => {
      isCreating.value = false;
      store.dispatch("toggleSidebar", false);
    };
    const closeUpdateModal = () => {
      isUpdating.value = false;
      selectedCourseId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const deleteById = (id) => {
      store.dispatch("course/deleteCourse", id);
    };

    const paginatedCourses = computed(() => {
      const startIndex = (currentPage.value - 1) * perPage.value;
      const endIndex = startIndex + perPage.value;
      return courses.value.slice(startIndex, endIndex);
    });

    const changePage = (page) => {
      if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
      }
      fetchCourses()
    };
    const totalValue = ref(0)
    const fetchCourses = async () => {
      try {
        store.commit("SET_LOADING", true, { root: true });
        const total = await store.dispatch("course/getAllCourses", {
          page: currentPage.value,
          perPage: perPage.value,
          sortBy: sortBy.value,
          orderBy: orderBy.value,
        });
        totalPages.value = Math.ceil(total.total / perPage.value);
        totalValue.value = total.total
      } catch (e) {
        console.error("Error fetching courses:", e.message);
      }
    };

    onMounted(() => {
      fetchCourses();
    });


    return {
      courses,
      currentPage,
      totalPages,
      paginatedCourses,
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
      selectedCourseId,
      totalValue
    };
  },
};
</script>
