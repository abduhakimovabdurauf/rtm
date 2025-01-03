<template>
  <actionSidebar
      :title="sidebarTitle"
      @closeSidebar="toggleSidebar"
  >
    <CreateTask
        v-if="isCreating"
        :isOpen="isCreating"
        @close="closeCreateModal"
    />


    <updateTask
        v-if="isUpdating"
        :TaskId="selectedTaskId"
        @close="closeUpdateModal"
    />
  </actionSidebar>

  <div class="p-6 min-h-screen dark:bg-gray-900">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">Topshiriq ro'yxati</h1>
      <button
          @click="openCreateModal"
          class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
      >
        <i class="bx bx-plus-circle text-xl"></i> <span>Topshiriq qo'shish</span>
      </button>
    </div>

    <div class="overflow-x-auto shadow-xl rounded-lg" v-if="Tasks && Tasks.length > 0">
      <table class="w-full bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
        <thead>
        <tr class="bg-gray-700 text-white">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Sarlavha</th>
          <th class="px-6 py-4 text-left">Text</th>
          <th class="px-6 py-4 text-left">Tafsif</th>
          <th class="px-6 py-4 text-left">Status</th>
          <th class="px-6 py-4 text-right">Muhlat</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(Task,index) in Tasks"
            :key="Task.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-4 font-semibold text-gray-800 dark:text-white">{{ index+1 }}</td>
          <td class="px-6 py-4 font-semibold text-gray-800 dark:text-white">{{ Task.title }}</td>
          <td class="px-6 py-4 font-semibold">
            {{ Task.text.length > 20 ? Task.text.slice(0, 20) + '...' : Task.text }}
          </td>
          <td class="px-6 py-4 font-semibold">
            {{ Task.description.length > 20 ? Task.description.slice(0, 20) + '...' : Task.description }}
          </td>
          <td class="px-6 py-4">
              <span
                  :class="{
                  'px-3 py-1 text-xs font-medium rounded-full shadow-sm': true,
                  'bg-green-200 text-green-800': Task.status === 'completed',
                  'bg-red-200 text-red-800': Task.status === 'unread',
                  'bg-red-200 text-orange-800': Task.status === 'pending',
                }"
              >
                {{ Task.status }}
              </span>
          </td>
          <td class="px-6 py-4 space-x-3 text-right">
            <router-link
                :to="{ name: 'WatchTask', params: { id: Task.id } }"
                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-show"></i>
            </router-link>
            <button
                @click="deleteById(Task.id)"
                class="mr-0.5 transition text-white bg-red-500 hover:bg-red-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-trash-alt"></i>
            </button>
            <button
                @click.prevent="openUpdateModal(Task.id)"
                class="mr-0.5 transition text-white bg-green-500 hover:bg-green-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-edit-alt"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import CreateTask from "@/components/MainLayout/task/CreateTask.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import updateTask from "@/components/MainLayout/task/UpdateTask.vue";
export default {
  components: {
    updateTask,
    actionSidebar,
    CreateTask,
  },
  setup() {
    const store = useStore();
    const isModalOpen = ref(false);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const isReading = ref(false);
    const selectedTaskId = ref(null);
    const Tasks = computed(() => store.getters['task/tasks']);
    const isSidebarOpen = computed(() => store.getters.isSidebarOpen);
    const sidebarTitle = computed(() => {
      if (isCreating.value) return "Topshiriq qo'shish";
      if (isUpdating.value) return "Topshiriq o'zgartirish";
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
      selectedTaskId.value = id;
      store.dispatch("toggleSidebar", true);
    };


    const toggleSidebar = () => {
      isCreating.value = false;
      isUpdating.value = false;
      isReading.value = false
      selectedTaskId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const closeCreateModal = () => {
      isCreating.value = false;
      store.dispatch("toggleSidebar", false);
    };

    const closeUpdateModal = () => {
      isUpdating.value = false;
      selectedTaskId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const deleteById = (id) => {
      store.dispatch("Task/deleteTask", id);
    };

    const fetchTasks = async () => {
      try {
        const result = await store.dispatch("task/getAllTasks");
        console.log("Fetched Tasks:", result);
      } catch (e) {
        console.error("Error fetching Tasks:", e.message);
      }
    };


    onMounted(() => {
      fetchTasks();
      console.log('Vazifalar: ',Tasks.value)
    });


    return {
      Tasks,
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
      selectedTaskId,
    };
  },
};
</script>
