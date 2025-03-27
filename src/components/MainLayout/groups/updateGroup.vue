<template>
  <div>
    <form @submit.prevent="handleSubmit">

      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Guruh Nomi</label>
        <input
            v-model="form.name"
            type="text"
            id="name"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div class="mb-4">
        <label for="start_time" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Boshlanish Vaqti</label>
        <input
            v-model="form.start_time"
            type="time"
            id="start_time"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div class="mb-4">
        <label for="end_time" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tugash Vaqti</label>
        <input
            v-model="form.end_time"
            type="time"
            id="end_time"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div class="mb-4">
        <label for="start_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Boshlanish Sanasi</label>
        <input
            v-model="form.start_date"
            type="date"
            id="start_date"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div class="mb-4">
        <label for="end_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tugash Sanasi</label>
        <input
            v-model="form.end_date"
            type="date"
            id="end_date"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div class="mb-4">
        <label for="part_of_time" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kun Qismi</label>
        <select
            v-model="form.part_of_time"
            id="part_of_time"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="morning">Ertalab</option>
          <option value="afternoon">Tushdan Keyin</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="lvl" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Daraja</label>
        <select
            v-model="form.lvl"
            id="lvl"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="beginner">Boshlovchi</option>
          <option value="intermediate">O'rtacha</option>
          <option value="advanced">Yuqori</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="user_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Xodim ID</label>
        <select
            id="user_id"
            v-if="users && users?.data && users?.data?.length > 0"
            v-model="form.user_id"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option v-for="user in users.data" :key="user.id" :value="user.id">
              {{ user.full_name }}
            </option>
        </select>
      </div>

      <div class="mb-4">
        <label for="course_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kurs ID</label>
        <select
            id="course_id"
            v-if="courses && courses?.data && courses.data.length > 0"
            v-model="form.course_id"
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
            v-if="rooms && rooms?.data && rooms.data.length > 0"
            v-model="form.room_id"
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
            v-model="form.status"
            id="status"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="active">Faol</option>
          <option value="inactive">Faol emas</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
        <textarea
            v-model="form.description"
            id="description"
            rows="3"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        ></textarea>
      </div>

      <div class="flex justify-end">
        <button
            type="submit"
            :disabled="!isFormChanged"
            class="w-full px-4 py-2 rounded-lg mb-12"
            :class="{
              'bg-blue-600 text-white': isFormChanged,
              'bg-gray-400 text-gray-700 cursor-not-allowed': !isFormChanged
            }"
        >
          O'zgartirish
        </button>
      </div>

    </form>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import isEqual from "lodash/isEqual";

export default {
  props: {
    groupId: {
      type: Number,
      required: true,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();

    const selectedGroup = computed(() =>
        store.state.group.groups.find((group) => group.id === props.groupId)
    );

    const courses = ref([]);
    const rooms = ref([]);
    const users = ref([]);

    const fetchData = async () => {
      try {
        courses.value = await store.dispatch("course/getAllCourses", {
          page: 1,
          perPage: 10,
          sortBy: "id",
          orderBy: "desc",
        });
        rooms.value = await store.dispatch("room/getAllRooms", {
          page: 1,
          perPage: 10,
          sortBy: "id",
          orderBy: "desc",
        });
        users.value = await store.dispatch("user/getAllUsers", {
          page: 1,
          perPage: 10,
          sortBy: "id",
          orderBy: "desc",
        });
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    onMounted(fetchData);

    const form = ref({
      user_id: "",
      course_id: "",
      room_id: "",
      id: props.groupId,
      name: "",
      start_time: "",
      end_time: "",
      start_date: "",
      end_date: "",
      part_of_time: "",
      lvl: "",
      status: "active",
      description: "",
    });

    const initialForm = ref({});

    watch(
        selectedGroup,
        (group) => {
          if (group) {
            form.value = { ...group };
            initialForm.value = { ...group };
          }
        },
        { immediate: true }
    );

    const isFormChanged = computed(() => {
      return !isEqual(form.value, initialForm.value);
    });

    const handleSubmit = async () => {
      try {
        const updatedGroup = {...form.value};
        await store.dispatch("group/updateGroup", updatedGroup);
        initialForm.value = {...form.value};
        closeModal();
      } catch (error) {
        console.error("O'zgartirishda xatolik yuz berdi:", error);
      }
    };

    const closeModal = () => {
      emit("close");
    };

    return {
      form,
      handleSubmit,
      isFormChanged,
      users,
      rooms,
      courses,
    };
  },
};
</script>
