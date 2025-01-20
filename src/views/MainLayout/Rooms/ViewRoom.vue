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

  <div class="p-6 min-h-screen dark:bg-gray-900">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-extrabold text-gray-800 dark:text-white">Xonalar ro'yxati</h1>
      <button
          @click="openCreateModal"
          class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
      >
        <i class="bx bx-plus-circle text-xl"></i> <span>Xona qo'shish</span>
      </button>
    </div>

    <div class="overflow-x-auto shadow-xl rounded-lg">
      <table class="w-full bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
        <thead>
        <tr class="bg-gray-700 text-white">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Xona Nomi</th>
          <th class="px-6 py-4 text-left">Raqami</th>
          <th class="px-6 py-4 text-left">Tafsif</th>
          <th class="px-6 py-4 text-left">Status</th>
          <th class="px-6 py-4 text-right">Amallar</th>
        </tr>
        </thead>
        <tbody v-if="rooms && rooms.length > 0">
        <tr
            v-for="(room,index) in rooms"
            :key="room.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-4 font-semibold text-gray-800 dark:text-white">{{ index+1 }}</td>
          <td class="px-6 py-4 font-semibold text-gray-800 dark:text-white">{{ room.name }}</td>
          <td class="px-6 py-4 font-semibold">{{ room.quantity }}</td>
          <td class="px-6 py-4 font-semibold">{{ room.description }}</td>
          <td class="px-6 py-4">
            <StatusBadge :status="room.status" />
          </td>
          <td class="px-6 py-4 space-x-3 text-right">
            <router-link
                :to="{ name: 'WatchRoom', params: { id: room.id } }"
                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-show"></i>
            </router-link>
            <button
                @click="deleteById(room.id)"
                class="mr-0.5 transition text-white bg-red-500 hover:bg-red-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-trash-alt"></i>
            </button>
            <button
                @click.prevent="openUpdateModal(room.id)"
                class="mr-0.5 transition text-white bg-green-500 hover:bg-green-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-edit-alt"></i>
            </button>
          </td>
        </tr>
        </tbody>
        <tbody class="w-full h-10" v-else>
        <tr class="w-full text-center text-lg">
          Malumot mavjud emas!
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import CreateRoom from "@/components/MainLayout/room/createRoom.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import updateRoom from "@/components/MainLayout/room/updateRoom.vue";
import StatusBadge from "@/components/MainLayout/ui/StatusBadge.vue";
export default {
  components: {
    updateRoom,
    actionSidebar,
    CreateRoom,
    StatusBadge,
  },
  setup() {
    const store = useStore();
    const isModalOpen = ref(false);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const isReading = ref(false);
    const selectedRoomId = ref(null);
    const rooms = computed(() => store.getters['room/rooms']);
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
        store.commit("SET_LOADING", true, { root: true });
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
