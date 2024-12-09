<template>
  <actionSidebar
      :title="sidebarTitle"
      @closeSidebar="toggleSidebar"
  >
    <CreateRoom
        v-if="isCreating"
        :isOpen="isCreating"
        @close="closeCreateModal"
    />

    <!--    <readroom-->
    <!--      v-if="isReading"-->
    <!--      :roomId="selectedRoomId"-->
    <!--    />-->

    <updateRoom
        v-if="isUpdating"
        :roomId="selectedRoomId"
        @close="closeUpdateModal"
    />
  </actionSidebar>

  <div class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg mt-6" v-if="rooms && rooms.length > 0">
    <table class="min-w-full bg-white rounded-lg overflow-hidden">
      <thead class="bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-300">
      <tr>
        <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Xona Nomi</th>
        <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Raqami</th>
        <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Tafsif</th>
        <th scope="col" class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Status</th>
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
          v-if="rooms && rooms.length > 0"
          v-for="room in rooms"
          :key="room.id"
          class="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 cursor-pointer"
      >
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{{ room.name }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">{{ room.quantity }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">{{ room.description }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">{{ room.status }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" colspan="1">
          <router-link :to="{ name: 'WatchRoom', params: { id: room.id } }">
            <a class="mr-1 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200">Korish</a>
          </router-link>
          <a @click="deleteById(room.id)" class="mr-1 transition text-white bg-red-500 hover:bg-red-600 dark:text-gray-400 p-3 py-2 rounded duration-200"><i class="bx bxs-trash-alt"></i></a>
          <a @click.prevent="openUpdateModal(room.id)" href="#" class="mr-1 transition text-white bg-green-500 hover:bg-green-600 dark:text-gray-400 p-3 py-2 rounded duration-200"><i class="bx bxs-edit-alt"></i></a>
        </td>
      </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import CreateRoom from "@/components/MainLayout/room/createRoom.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import updateRoom from "@/components/MainLayout/room/updateRoom.vue";
export default {
  components: {
    updateRoom,
    actionSidebar,
    CreateRoom,
  },
  setup() {
    const store = useStore();
    const isModalOpen = ref(false);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const isReading = ref(false);
    const selectedRoomId = ref(null);
    const rooms = computed(() => store.state.room.rooms);
    const isSidebarOpen = computed(() => store.getters.isSidebarOpen);
    const sidebarTitle = computed(() => {
      if (isCreating.value) return "Xona qo'shish";
      if (isUpdating.value) return "Xonani o'zgartirish";
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
      selectedRoomId.value = id;
      store.dispatch("toggleSidebar", true);
    };

    const openReadModal = (id) => {
      isReading.value = true;
      isCreating.value = false;
      isUpdating.value = false;
      selectedRoomId.value = id || null;
      store.dispatch("toggleSidebar", true);
    };


    const toggleSidebar = () => {
      isCreating.value = false;
      isUpdating.value = false;
      isReading.value = false
      selectedRoomId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const closeCreateModal = () => {
      isCreating.value = false;
      store.dispatch("toggleSidebar", false);
    };

    const closeUpdateModal = () => {
      isUpdating.value = false;
      selectedRoomId.value = null;
      store.dispatch("toggleSidebar", false);
    };

    const closeReadModal = () => {
      isReading.value = false;
      selectedRoomId.value = null;
      store.dispatch("toggleSidebar", false);
    }

    const deleteById = (id) => {
      store.dispatch("room/deleteRoom", id);
    };

    const fetchRooms = async () => {
      try {
        const result = await store.dispatch("room/getAllRooms");
        console.log("Fetched rooms:", result);
      } catch (e) {
        console.error("Error fetching rooms:", e.message);
      }
    };


    onMounted(() => {
      fetchRooms();
      console.log('Xonalar: ',rooms.value)
    });


    return {
      rooms,
      isCreating,
      isUpdating,
      isReading,
      sidebarTitle,
      openCreateModal,
      openUpdateModal,
      closeCreateModal,
      closeUpdateModal,
      openReadModal,
      closeReadModal,
      deleteById,
      toggleSidebar,
      isModalOpen,
      selectedRoomId,
    };
  },
};
</script>
