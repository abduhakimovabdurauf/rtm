<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="branch_id" class="block text-sm font-medium text-gray-700">Filial ID</label>
        <select
            id="branch_id"
            required
            v-if="branches && branches.data && branches.data.length > 0"
            v-model="form.branch_id"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option v-for="branch in branches.data" :key="branch.id" :value="branch.id">
            {{ branch.name }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ismi</label>
        <input
            v-model="form.full_name"
            type="text"
            id="name"
            required
            class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon</label>
        <input
            v-model="form.phone"
            @input="form.phone = formatPhone(form.phone)"
            type="text"
            id="phone"
            maxlength="14"
            class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div class="mb-4">
        <label for="parent_phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ota-ona telefoni</label>
        <input
            v-model="form.parent_phone"
            type="text"
            @input="form.parent_phone = formatPhone(form.parent_phone)"
            id="parent_phone"
            maxlength="14"
            class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kurslar</label>
        <div v-if="courses?.data?.length" class="flex flex-wrap gap-3">
          <div v-for="course in courses.data" :key="course.id" class="flex items-center p-2 space-x-2 bg-gray-100 rounded-md shadow-sm dark:bg-gray-800">
            <input
                type="checkbox"
                :id="'course_' + course.id"
                :value="course.id"
                :checked="form.courses.some(r => r.id === course.id)"
                @change="toggleCourse(course)"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <label :for="'course_' + course.id" class="cursor-pointer text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
              {{ course.name }}
            </label>
            <select
                v-if="form.courses.some((r) => r.id === course.id)"
                :value="form.courses.find((r) => r.id === course.id)?.c_status"
                @change="updateCourseStatus(course.id, $event.target.value)"
                class="p-1 border rounded"
            >
              <option selected disabled>Kursga qo'shilish holati</option>
              <option value="pending">Yozilish jarayonida</option>
              <option value="enrolled">Kursga qabul qilindi</option>
              <option value="studying">Hozirda o‘qiyapti</option>
              <option value="completed">Kursni tugatdi</option>
              <option value="dropped">Kursni tashlab ketdi</option>
              <option value="on_hold">Vaqtincha to‘xtatilgan</option>
              <option value="failed">Kursdan o‘ta olmadi</option>
            </select>
          </div>
        </div>
      </div>


      <label for="showOptional" class="inline-flex items-center mb-2 cursor-pointer">
        <input type="checkbox" id="showOptional" v-model="showOptionalFields" class="sr-only peer">
        <div class="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        <span class="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">Qo‘shimcha ma’lumotlar</span>
      </label>


      <div v-if="showOptionalFields">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
              v-model="form.email"
              type="email"
              id="email"
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Manzili</label>
          <input
              v-model="form.address"
              type="text"
              id="address"
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div class="mb-4">
          <label for="links" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Havolalar</label>
          <input
              v-model="form.links"
              type="text"
              id="links"
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div class="mb-4">
          <label for="birthday" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tug'ilgan sana</label>
          <input
              v-model="form.birthday"
              type="date"
              id="birthday"
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
          <textarea
              v-model="form.description"
              id="description"
              rows="3"
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="from" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Dan</label>
          <select
              v-model="form.from"
              id="gender"
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="tanish">tanish</option>
            <option value="maktab">maktab</option>
            <option value="telegram">telegram</option>
            <option value="instagram">instagram</option>
            <option value="facebook">facebook</option>
            <option value="ota-onam">ota-onam</option>
            <option value="tashqi reklama">tashqi reklama</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="gender" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Jinsi</label>
          <select
              v-model="form.gender"
              id="gender"
              required
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="man">Erkak</option>
            <option value="woman">Ayol</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
          <select
              v-model="form.status"
              id="status"
              required
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="pending">Jarayonda</option>
            <option value="active">Faol</option>
            <option value="inactive">Faol emas</option>
            <option value="completed">Bajarilgan</option>
            <option value="dropped">Bekor qilingan</option>
            <option value="expelled">Haydalgan</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Rasm Yuklash</label>
          <input
              type="file"
              id="image"
              multiple
              ref="image"
              @change="handleImageChange"
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>



      <div class="flex justify-end mb-20">
        <button
            type="submit"
            :disabled="!isFormChanged"
            class="w-full px-4 py-2 text-white bg-blue-600 rounded-lg"
            :class="{ 'opacity-50 cursor-not-allowed': !isFormChanged }"
        >
          O`zgartirish
        </button>
      </div>
    </form>
  </div>
</template>



<script>
import { ref, watch, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import isEqual from 'lodash/isEqual';
export default {
  props: {
    studentId: {
      type: Number,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useStore();
    const branches = ref(null);
    const courses = ref(null);
    const fetchData = async () => {
      try {
        branches.value = await store.dispatch("branch/getAllBranches");
        courses.value = await store.dispatch("course/getAllCourses");

        form.value.courses = courses.value.map((course) => ({
          id: course.id,
          c_status: course?.c_status ? course?.c_status : "pending",
        }));
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    onMounted(fetchData);
    const selectedStudent = computed(() =>
        store.state.student.students.find((student) => student.id === props.studentId)
    );

    const formatPhone = (value) => {
        let digits = value.replace(/\D/g, '');
        let match = digits.match(/^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);

        if (!match) return value;

        return !match[2]
            ? match[1]
            : `(${match[1]}) ${match[2]}${match[3] ? '-' + match[3] : ''}${match[4] ? '-' + match[4] : ''}`;
      };

    const form = ref({
      full_name: '',
      email: '',
      address: '',
      links: '',
      phone: '',
      parent_phone: '',
      birthday: '',
      work_start: '',
      id: props.studentId,
      description: '',
      branch_id: '',
      status: '',
      courses: [],
      image: null,
    });

    const initialForm = ref({});

    const imagePreview = ref(null);

    watch(
        selectedStudent,
        (student) => {
          if (student) {
            Object.assign(form.value, student);
            Object.assign(initialForm.value, student);
            imagePreview.value = student.image
                ? `https://api.mrtm.uz/storage/${student.image}`
                : null;
          }
        },
        { immediate: true }
    );

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        form.value.image = file;
        const reader = new FileReader();
        reader.onload = () => {
          imagePreview.value = reader.result;
        };
        reader.readAsDataURL(file);
      }
    };
    const showOptionalFields = ref(false);

    const isFormChanged = computed(() => {
      return !isEqual(form.value, initialForm.value);
    });




    const handleSubmit = () => {
      const updatedStudent = { ...form.value };
      store.dispatch('student/updateStudent', updatedStudent);
      initialForm.value = { ...form.value };
      closeModal();
    };

    const toggleCourse = (course) => {
      const index = form.value.courses.findIndex((r) => r.id === course.id);
      if (index === -1) {
        form.value.courses.push({ id: course.id, c_status: "pending" });
      } else {
        form.value.courses.splice(index, 1);
      }
    };

    const updateCourseStatus = (courseId, status) => {
      const course = form.value.courses.find((r) => r.id === courseId);
      if (course) course.c_status = status;
    };

    function closeModal() {
      emit('close');
    }

    return {
      form,
      imagePreview,
      handleSubmit,
      handleImageChange,
      isFormChanged,
      branches,
      courses,
      showOptionalFields,
      toggleCourse,
      updateCourseStatus,
      formatPhone,
    };
  },
};
</script>

