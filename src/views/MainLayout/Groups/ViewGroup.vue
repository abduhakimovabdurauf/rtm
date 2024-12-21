<template>
  <actionSidebar
      :title="sidebarTitle"
      @closeSidebar="toggleSidebar"
  >
    <CreateGroup
        v-if="isCreating"
        :isOpen="isCreating"
        @close="closeCreateModal"
    />

    <updateGroup
        v-if="isUpdating"
        :groupId="selectedGroupId"
        @close="closeUpdateModal"
    />
  </actionSidebar>

  <div class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg mt-6">
    <table class="min-w-full bg-white rounded-lg overflow-hidden">
      <thead class="bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-300">
      <tr>
        <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Guruh</th>
        <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Vaqti</th>
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
          v-for="group in groups"
          :key="group.id"
          class="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 cursor-pointer"
      >
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{{ group.course.name }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">{{ group.start_time }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">{{ group.status }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <img
              class="w-28"
              :src="group.image ? `https://api.mrtm.uz/storage/` + group.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFrS3DfXBwOlJdjx8cnKEiSIxaPPnoMOgOvGbhNGz_7rY0DiQUcAcMkiCf_5kkpkH7E18&usqp=CAU'"
              alt="group Image"
          />
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" colspan="1">
          <router-link
              :to="{ name: 'WatchGroup', params: { id: group.id } }"
              class="mr-1 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
          >
            Ko'rish
          </router-link>
          <a
              @click="deleteById(group.id)"
              class="mr-1 transition text-white bg-red-500 hover:bg-red-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
          >
            <i class="bx bxs-trash-alt"></i>
          </a>
          <a
              @click.prevent="openUpdateModal(group.id)"
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
import CreateGroup from "@/components/MainLayout/groups/createGroup.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import updateGroup from "@/components/MainLayout/groups/updateGroup.vue";
export default {
  components: {
    updateGroup,
    actionSidebar,
    CreateGroup,
  },
  setup() {
    const store = useStore();
    const currentPage = ref(1);
    const perPage = ref(5);
    const isModalOpen = ref(false);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const isReading = ref(false);
    const selectedGroupId = ref(null);
    const groups = computed(() => store.getters['group/groups']);
    const sortBy = ref('id');
    const orderBy = ref('desc');
    const totalPages = ref(null)
    const isSidebarOpen = computed(() => store.getters.isSidebarOpen);
    const sidebarTitle = computed(() => {
      if (isCreating.value) return "Guruh qo'shish";
      if (isUpdating.value) return "Guruh o'zgartirish";
      if(isReading.value) return "Ko'rish";
      return "";
    });

    const openCreateModal = () => {
      console.log(groups.value);
      isCreating.value = true;
      isUpdating.value = false;
      isReading.value = false
      store.dispatch("toggleSidebar", true);
    };

    const openUpdateModal = (id) => {
      isUpdating.value = true;
      isCreating.value = false;
      isReading.value = false
      selectedGroupId.value = id;
      store.dispatch("toggleSidebar", true);
    };

    const toggleSidebar = () => {
      isCreating.value = false;
      isUpdating.value = false;
      isReading.value = false
      selectedGroupId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const closeCreateModal = () => {
      isCreating.value = false;
      store.dispatch("toggleSidebar", false);
    };

    const closeUpdateModal = () => {
      isUpdating.value = false;
      selectedGroupId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const deleteById = (id) => {
      try{
        store.dispatch("group/deleteGroup", id);
        fetchGroups()
      } catch (e) {
        console.error(e)
      }
    };

    const paginatedGroups = computed(() => {
      const startIndex = (currentPage.value - 1) * perPage.value;
      const endIndex = startIndex + perPage.value;
      return groups.value.slice(startIndex, endIndex);
    });

    const changePage = (page) => {
      if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
      }
      fetchGroups()
    };

    const fetchGroups = async () => {
      try {
        const total = await store.dispatch("group/getAllGroups", {
          page: currentPage.value,
          perPage: perPage.value,
          sortBy: sortBy.value,
          orderBy: orderBy.value,
        });
        console.info('guruhlar malumotlari',groups.value)
        totalPages.value = Math.ceil(total / perPage.value);
        console.log(groups.value)
      } catch (e) {
        console.error("Error fetching groups:", e.message);
      }
    };

    onMounted(() => {
      fetchGroups();
    });


    return {
      groups,
      currentPage,
      totalPages,
      paginatedGroups,
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
      selectedGroupId,
    };
  },
};
</script>
