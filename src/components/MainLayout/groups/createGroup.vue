<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Guruh Nomi</label>
      <input
          v-model="newGroup.name"
          type="text"
          id="name"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
      <textarea
          v-model="newGroup.description"
          id="description"
          required
          rows="3"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      ></textarea>
    </div>
    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newGroup.status"
          id="status"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="active">Faol</option>
        <option value="inactive">Faol emas</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="user_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Xodim ID</label>
      <select
          id="user_id"
          required
          v-if="users && users.data && users.data.length>0"
          v-model="newGroup.user_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option
            v-for="user in users.data"
            :key="user.id"
            :value="user.id"
        >
          {{ user.full_name }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label for="course_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kurs ID</label>
      <select
          id="course_id"
          required
          v-if="courses && courses.data && courses.data.length>0"
          v-model="newGroup.course_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option
            v-for="course in courses.data"
            :key="course.id"
            :value="course.id"
        >
          {{ course.name }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label for="room_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Xona ID</label>
      <select
          id="room_id"
          required
          v-if="rooms && rooms.data && rooms.data.length >0"
          v-model="newGroup.room_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option
            v-for="room in rooms.data"
            :key="room.id"
            :value="room.id"
        >
          {{ room.name }}
        </option>
      </select>
    </div>
    <div class="flex justify-end">
      <button
          type="submit"
          :disabled="!isFormValid"
          class="w-full px-4 py-2 rounded-lg"
          :class="{
            'bg-blue-600 text-white': isFormValid,
            'bg-gray-400 text-gray-700 cursor-not-allowed': !isFormValid
          }"
      >
        Qo'shish
      </button>
    </div>
  </form>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  emits: ["close"],
  setup(_, { emit }) {
    const store = useStore();

    const newGroup = ref({
      user_id: "",
      course_id: "",
      room_id: "",
      name: "",
      status: "active",
      description: "",
    });

    const courses = ref(null);
    const rooms = ref(null);
    const users = ref(null);

    const fetchData = async () => {
      try {
        courses.value = await store.dispatch("course/getAllCourses", {
          page: 1,
          perPage: 5,
          sortBy: "id",
          orderBy: "desc",
        });
        rooms.value = await store.dispatch("room/getAllRooms", {
          page: 1,
          perPage: 5,
          sortBy: "id",
          orderBy: "desc",
        });
        users.value = await store.dispatch("user/getAllUsers", {
          page: 1,
          perPage: 5,
          sortBy: "id",
          orderBy: "desc",
        });
        console.log("Users:", users.value);
        console.log("Rooms:", rooms.value);
        console.log("Courses:", courses.value);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    onMounted(fetchData);

    const isFormValid = computed(() => {
      return (
          newGroup.value.name.trim() &&
          newGroup.value.description.trim() &&
          newGroup.value.status.trim() &&
          newGroup.value.user_id &&
          newGroup.value.course_id &&
          newGroup.value.room_id
      );
    });

    const handleSubmit = async () => {
      try {
        console.log("Yuborilayotgan ma'lumot:", newGroup.value);
        await store.dispatch("group/addGroup", {...newGroup.value});
        resetForm();
        emit("close");
      } catch (error) {
        alert("Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
        console.error(error);
      }
    };

    const resetForm = () => {
      newGroup.value = {
        user_id: "",
        course_id: "",
        room_id: "",
        name: "",
        status: "active",
        description: "",
      };
    };

    return {
      newGroup,
      handleSubmit,
      isFormValid,
      courses,
      rooms,
      users,
    };
  },
};
</script>