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

  <div class="p-6 min-h-screen dark:bg-gray-900">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">Kurslar ro'yxati</h1>
      <button
          @click="openCreateModal"
          class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
      >
        <i class="bx bx-plus-circle text-xl"></i> <span>Kurs qo'shish</span>
      </button>
    </div>

    <div class="overflow-x-auto shadow-xl rounded-lg">
      <table class="w-full bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
        <thead>
        <tr class="bg-gray-700 text-white">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Kurs nomi</th>
          <th class="px-6 py-4 text-left">Davomiyligi</th>
          <th class="px-6 py-4 text-left">Narxi</th>
          <th class="px-6 py-4 text-left">Holat</th>
          <th class="px-6 py-4 text-right">Amallar</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(course, index) in courses"
            :key="course.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-4 font-semibold text-gray-800 dark:text-white">{{ index + 1 }}</td>
          <td class="px-6 py-4 font-semibold">{{ course.name }}</td>
          <td class="px-6 py-4 font-semibold">{{ course.duration }} oy</td>
          <td class="px-6 py-4 font-semibold">{{ course.price }} UZS</td>
          <td class="px-6 py-4">
              <span
                  :class="{
                  'px-3 py-1 text-xs font-medium rounded-full shadow-sm': true,
                  'bg-green-200 text-green-800': course.status === 'Active',
                  'bg-red-200 text-red-800': course.status === 'Inactive',
                }"
              >
                {{ course.status }}
              </span>
          </td>
          <td class="px-6 py-4 space-x-3 text-right">
            <router-link
                :to="{ name: 'WatchCourse', params: { id: course.id } }"
                class="text-gray-300 text-2xl rounded-full hover:text-gray-500 transition"
            >
              <i class="bx bxs-show"></i>
            </router-link>
            <button
                @click="deleteById(course.id)"
                class="text-gray-300 text-xl rounded-full hover:text-gray-500 transition"
            >
              <i class="bx bxs-trash-alt"></i>
            </button>
            <button
                @click.prevent="openUpdateModal(course.id)"
                class="text-gray-300 text-xl rounded-full hover:text-gray-500 transition"
            >
              <i class="bx bxs-edit-alt"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
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
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import CreateForm from "@/components/MainLayout/course/CreateForm.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import updateCourse from "@/components/MainLayout/course/updateCourse.vue";
export default {
  components: {
    updateCourse,
    actionSidebar,
    CreateForm,
  },
  setup() {
    const store = useStore();
    const currentPage = ref(1);
    const perPage = ref(5);
    const isModalOpen = ref(false);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const isReading = ref(false);
    const selectedCourseId = ref(null);
    const courses = computed(() => store.getters['course/courses']);
    const sortBy = ref('id');
    const orderBy = ref('desc');
    const totalPages = ref(null)
    const isSidebarOpen = computed(() => store.getters.isSidebarOpen);
    const sidebarTitle = computed(() => {
      if (isCreating.value) return "Kurs qo'shish";
      if (isUpdating.value) return "Kursni o'zgartirish";
      if(isReading.value) return "Ko'rish";
      return "";
    });

    const openCreateModal = () => {
      console.log(courses.value);
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

    const fetchCourses = async () => {
      try {
        const total = await store.dispatch("course/getAllCourses", {
          page: currentPage.value,
          perPage: perPage.value,
          sortBy: sortBy.value,
          orderBy: orderBy.value,
        });
        console.log('api.mrtm.uz/storage/'+courses.value[4].image);
        totalPages.value = Math.ceil(total.total / perPage.value);
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
    };
  },
};
</script>
