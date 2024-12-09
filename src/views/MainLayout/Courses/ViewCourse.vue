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

  <div class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg mt-6">
    <table class="min-w-full bg-white rounded-lg overflow-hidden">
      <thead class="bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-300">
      <tr>
        <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Kurs Nomi</th>
        <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Davomiyligi</th>
        <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Narxi</th>
        <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Tafsif</th>
        <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Status</th>
        <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Rasm</th>
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
          v-for="course in courses"
          :key="course.id"
          class="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 cursor-pointer"
      >
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{{ course.name }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">{{ course.duration }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">{{ course.price }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">{{ course.description }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">{{ course.status }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <img
              class="w-28"
              :src="course.image ? `https://api.mrtm.uz/storage/` + course.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFrS3DfXBwOlJdjx8cnKEiSIxaPPnoMOgOvGbhNGz_7rY0DiQUcAcMkiCf_5kkpkH7E18&usqp=CAU'"
              alt="Course Image"
          />
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" colspan="1">
          <router-link
              :to="{ name: 'WatchCourse', params: { id: course.id } }"
              class="mr-1 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
          >
            Ko'rish
          </router-link>
          <a
              @click="deleteById(course.id)"
              class="mr-1 transition text-white bg-red-500 hover:bg-red-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
          >
            <i class="bx bxs-trash-alt"></i>
          </a>
          <a
              @click.prevent="openUpdateModal(course.id)"
              href="#"
              class="mr-1 transition text-white bg-green-500 hover:bg-green-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
          >
            <i class="bx bxs-edit-alt"></i>
          </a>
        </td>
      </tr>
      </tbody>
    </table>



  <!--  Pagination  -->
    <div class="flex justify-between items-center mt-4 w-[300px] mx-auto">
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
          class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          :disabled="currentPage === totalPages"
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
    const courses = computed(() => store.state.course.courses);
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
        totalPages.value = Math.ceil(total / perPage.value);
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
