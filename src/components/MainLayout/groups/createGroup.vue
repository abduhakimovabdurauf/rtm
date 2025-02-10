<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="branch_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filial ID</label>
      <select
          id="branch_id"
          required
          v-if="branches && branches.data && branches.data.length > 0"
          v-model="newGroup.branch_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option v-for="branch in branches.data" :key="branch.id" :value="branch.id">
          {{ branch.name }}
        </option>
      </select>
    </div>
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
      <label for="start_time" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Boshlanish Vaqti</label>
      <input
          v-model="newGroup.start_time"
          type="time"
          id="start_time"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>


    <div class="mb-4">
      <label for="end_time" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tugash Vaqti</label>
      <input
          v-model="newGroup.end_time"
          type="time"
          id="end_time"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>


    <div class="mb-4">
      <label for="start_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Boshlanish Sanasi</label>
      <input
          v-model="newGroup.start_date"
          type="date"
          id="start_date"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>


    <div class="mb-4">
      <label for="end_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tugash Sanasi</label>
      <input
          v-model="newGroup.end_date"
          type="date"
          id="end_date"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>

    <div class="mb-4">
      <label for="part_of_day" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Hafta kuni</label>
      <select
          v-model="newGroup.part_of_day"
          id="part_of_time"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="odd">Toq kunlar</option>
        <option value="even">Juft kunlar</option>
      </select>
    </div>


    <div class="mb-4">
      <label for="part_of_time" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kun Qismi</label>
      <select
          v-model="newGroup.part_of_time"
          id="part_of_time"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="morning">Ertalab</option>
        <option value="afternoon">Tushdan Keyin</option>
      </select>
    </div>


    <div class="mb-4">
      <label for="lvl" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Daraja</label>
      <select
          v-model="newGroup.lvl"
          id="lvl"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="beginner">Boshlovchi</option>
        <option value="intermediate">O'rtacha</option>
        <option value="advanced">Yuqori</option>
      </select>
    </div>


    <div class="mb-4">
      <label for="course_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kurs ID</label>
      <select
          id="course_id"
          required
          v-if="courses && courses.data && courses.data.length > 0"
          v-model="newGroup.course_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option v-for="course in courses.data" :key="course.id" :value="course.id">
          {{ course.name }}
        </option>
      </select>
    </div>


    <div class="mb-4">
      <label for="room_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Xona ID</label>
      <select
          id="room_id"
          required
          v-if="rooms && rooms.data && rooms.data.length > 0"
          v-model="newGroup.room_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option v-for="room in rooms.data" :key="room.id" :value="room.id">
          {{ room.name }}
        </option>
      </select>
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
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
      <textarea
          v-model="newGroup.description"
          id="description"
          required
          rows="3"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      ></textarea>
    </div>


    <div class="flex justify-end">
      <button
          type="submit"
          :disabled="!isFormValid"
          class="w-full px-4 py-2 rounded-lg mb-12"
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
    const activeUser = JSON.parse(localStorage.getItem("user"));
    const newGroup = ref({
      user_id: activeUser.id,
      course_id: "",
      room_id: "",
      name: "",
      start_time: "",
      end_time: "",
      start_date: "",
      end_date: "",
      part_of_day: "",
      part_of_time: "",
      lvl: "",
      status: "active",
      description: "",
      branch_id: "",
    });

    const courses = ref(null);
    const rooms = ref(null);
    const users = ref(null);
    const branches = ref(null);
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
        branches.value = await store.dispatch("branch/getAllBranches");
        if (branches.value.data.length > 0) {
          newGroup.value.branch_id = branches.value.data[0].id;
        }
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    onMounted(fetchData);

    const isFormValid = computed(() => {
      return (
          newGroup.value.name &&
          newGroup.value.description &&
          newGroup.value.status &&
          newGroup.value.course_id &&
          newGroup.value.room_id &&
          newGroup.value.start_time &&
          newGroup.value.end_time &&
          newGroup.value.start_date &&
          newGroup.value.end_date &&
          newGroup.value.part_of_day &&
          newGroup.value.part_of_time
      );
    });

    const handleSubmit = async () => {
      try {
        await store.dispatch("group/addGroup", { ...newGroup.value });
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
        start_time: "",
        end_time: "",
        start_date: "",
        end_date: "",
        part_of_day: "",
        part_of_time: "",
        lvl: "",
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
      branches,
    };
  },
};
</script>
