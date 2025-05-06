<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="branch_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filial ID</label>
      <select
          id="branch_id"
          v-if="branches && branches.data && branches.data.length > 0"
          v-model="newGroup.branch_id"
          @change="fetchData"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="">Filialni tanlang!</option>
        <option v-for="branch in branches.data" :key="branch.id" :value="branch.id">
          {{ branch.name }}
        </option>
      </select>
      <div v-else>Ma'lumotlar yuklanmoqda...</div>
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">O'qituvchi ID</label>
      <div v-if="loadingCourses">O'qituvchilar ma'lumotlari yuklanmoqda...</div>
      <div class="text-red-600" v-else-if="newGroup?.branch_id && teachers?.length === 0">O'qituvchi mavjud emas!</div>
      <select
          id="teacher_id"
          v-else-if="newGroup.branch_id && teachers?.length > 0"
          v-model="newGroup.teacher_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="">O'qituvchini tanlang!</option>
        <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
          {{ teacher.full_name }}
        </option>
      </select>
      <div class="text-red-600" v-else>O'qituvchini tanlash uchun avval filialni tanlang!</div>
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kurs ID</label>
      <div v-if="loadingCourses">Kurslar ma'lumotlari yuklanmoqda...</div>
      <div class="text-red-600" v-else-if="newGroup?.branch_id && courses?.length === 0">Kurs mavjud emas!</div>
      <select
          id="course_id"
          v-else-if="newGroup.branch_id && courses?.length > 0"
          v-model="newGroup.course_id"
          @change="fetchStudents"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="">Kursni tanlang!</option>
        <option v-for="course in courses" :key="course.id" :value="course.id">
          {{ course.name }}
        </option>
      </select>
      <div class="text-red-600" v-else>Kursni tanlash uchun avval filialni tanlang!</div>
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Xona ID</label>
      <div v-if="loadingRooms">Xonalar ma'lumotlari yuklanmoqda...</div>
      <div class="text-red-600" v-else-if="newGroup.branch_id && rooms?.length === 0">Xona mavjud emas!</div>
      <select
          id="room_id"
          v-else-if="newGroup.branch_id && rooms?.length > 0"
          v-model="newGroup.room_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="">Xonani tanlang!</option>
        <option v-for="room in rooms" :key="room.id" :value="room.id">
          {{ room.name }}
        </option>
      </select>
      <div class="text-red-600" v-else>Xonani tanlash uchun avval filialni tanlang!</div>
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">O'quvchilar</label>
      <div v-if="loadingStudents">O'quvchilar ma'lumotlari yuklanmoqda...</div>
      <div class="text-red-600" v-else-if="newGroup.course_id && students?.length === 0">O'quvchilar mavjud emas!</div>
      <div v-else-if="newGroup.course_id && students?.length > 0" class="flex flex-wrap gap-3">
        <div v-for="student in students" :key="student.id" class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow-sm">
          <input
              type="checkbox"
              :id="'student_' + student.id"
              :value="student.id"
              v-model="newGroup.students"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <label :for="'student_' + student.id" class="cursor-pointer text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
            {{ student.full_name }}
          </label>
        </div>
      </div>
      <div class="text-red-600" v-else>O'quvchini tanlash uchun avval kursni tanlang!</div>
    </div>
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Guruh Nomi</label>
      <input
          v-model="newGroup.name"
          type="text"
          id="name"
          placeholder="Majburiy"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newGroup.status"
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
          v-model="newGroup.description"
          id="description"
          required
          rows="3"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      ></textarea>
    </div>
    <div>
      <div class="mb-4">
        <label for="start_time" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Boshlanish Vaqti</label>
        <input
            v-model="newGroup.start_time"
            type="time"
            id="start_time"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="end_time" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tugash Vaqti</label>
        <input
            v-model="newGroup.end_time"
            type="time"
            id="end_time"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="start_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Boshlanish Sanasi</label>
        <Datepicker v-model="newGroup.start_date" />
      </div>
      <div class="mb-4">
        <label for="end_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tugash Sanasi</label>
        <Datepicker v-model="newGroup.end_date" />
      </div>
      <div class="mb-4">
        <label for="part_of_day" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Hafta kuni</label>
        <select
            v-model="newGroup.part_of_day"
            id="part_of_time"
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
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="beginner">Boshlovchi</option>
          <option value="intermediate">O'rtacha</option>
          <option value="advanced">Yuqori</option>
        </select>
      </div>
    </div>
    <div class="flex justify-end">
      <button
          type="submit"
          class="w-full px-4 py-2 rounded-lg mb-12"
      >
        Qo'shish
      </button>
    </div>
  </form>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
export default {
  emits: ["close"],
  components: {
    Datepicker
  },
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
      part_of_day: "odd",
      part_of_time: "morning",
      lvl: "beginner",
      status: "active",
      description: "",
      branch_id: "",
      teacher_id: "",
      students: [],
    });
    const courses = ref(null);
    const rooms = ref(null);
    const branches = ref(null);
    const students = ref(null);
    const teachers = ref(null);
    const selectedCourse = ref(null);
    const selectedBranch = ref(null);
    const loadingCourses = ref(false);
    const loadingRooms = ref(false);
    const loadingStudents = ref(false);
    const fetchStudents = async () => {
      selectedCourse.value = newGroup.value.course_id
      loadingStudents.value = true;
      if (!selectedCourse.value) return;
      try {
        const response = await store.dispatch('student/getStudentByCourseId', selectedCourse.value);
        students.value = response.students;
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        loadingStudents.value = false;
      }
    };
    const fetchData = async () => {
      selectedBranch.value = newGroup.value.branch_id
      loadingCourses.value = true;
      loadingRooms.value = true;
      try {
        const response = await store.dispatch("branch/getBranchById", selectedBranch.value);
        teachers.value = await store.dispatch("user/getBranchTeachers", selectedBranch.value)
        courses.value = response?.courses;
        rooms.value = response?.rooms;
        // teachers.value = response?.users;
        const startDate = new Date();
        newGroup.value.start_date = startDate.toISOString().split('T')[0];
        const selectedCourse = courses.value.find(course => course.id === newGroup.value.course_id);
        if (selectedCourse && selectedCourse.duration) {
          const endDate = new Date(startDate);
          endDate.setMonth(endDate.getMonth() + selectedCourse.duration);
          newGroup.value.end_date = endDate.toISOString().split('T')[0];
          console.log("end_date:", newGroup.value.end_date);
        } else {
          console.warn("Kurs topilmadi yoki duration yo'q!");
        }
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      } finally {
        loadingCourses.value = false;
        loadingRooms.value = false;
      }
    }
    const fetchBranch = async () => {
      try {
        branches.value = await store.dispatch("branch/getAllBranches");
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };
    onMounted(fetchBranch);
    const isFormValid = computed(() => {
      return (
          newGroup.value.name &&
          newGroup.value.status &&
          newGroup.value.course_id &&
          newGroup.value.room_id
      );
    });
    const showOptionalFields = ref(false);
    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append("user_id", newGroup.value.user_id);
        formData.append("course_id", newGroup.value.course_id);
        formData.append("room_id", newGroup.value.room_id);
        formData.append("name", newGroup.value.name);
        formData.append("start_time", newGroup.value.start_time);
        formData.append("end_time", newGroup.value.end_time);
        formData.append("start_date", newGroup.value.start_date);
        formData.append("end_date", newGroup.value.end_date);
        formData.append("part_of_day", newGroup.value.part_of_day);
        formData.append("part_of_time", newGroup.value.part_of_time);
        formData.append("lvl", newGroup.value.lvl);
        formData.append("status", newGroup.value.status);
        formData.append("description", newGroup.value.description);
        formData.append("branch_id", newGroup.value.branch_id);
        formData.append("teacher_id", newGroup.value.teacher_id);
        formData.append("students", JSON.stringify(newGroup.value.students));
        await store.dispatch("group/addGroup", formData);
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
        course_id: null,
        room_id: null,
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
      teachers,
      branches,
      students,
      showOptionalFields,
      fetchStudents,
      fetchData,
      loadingCourses,
      loadingRooms,
      loadingStudents,
    };
  },
};
</script>
