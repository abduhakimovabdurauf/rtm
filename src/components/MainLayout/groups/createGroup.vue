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
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  emits: ["close"],
  setup(_, { emit }) {
    const store = useStore();

    const newGroup = reactive({
      user_id: "",
      course_id: "",
      room_id: "",
      name: "",
      status: "active",
      description: "",
    });

    const courses = reactive({ data: [] });
    const rooms = reactive({ data: [] });
    const users = reactive({ data: [] });

    const fetchData = async () => {
      try {
        courses.data = await store.dispatch('course/getAllCourses');
        rooms.data = await store.dispatch('room/getAllRooms');
        users.data = await store.dispatch('user/getAllUsers');
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    onMounted(fetchData);

    const isFormValid = computed(() => {
      return (
          newGroup.name.trim() &&
          newGroup.description.trim() &&
          newGroup.status.trim() &&
          newGroup.user_id &&
          newGroup.course_id &&
          newGroup.room_id
      );
    });

    const handleSubmit = async () => {
      try {
        await store.dispatch("group/addGroup", {...newGroup});
        resetForm();
        emit("close");
      } catch (error) {
        alert("Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
        console.error(error);
      }
    };

    const resetForm = () => {
      Object.assign(newGroup, {
        user_id: "",
        course_id: "",
        room_id: "",
        name: "",
        status: "active",
        description: "",
      });
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
