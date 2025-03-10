<template>
  <form @submit.prevent="handleSubmit">

    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ismi</label>
      <input
          v-model="newStudent.full_name"
          type="text"
          id="name"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon</label>
      <input
          v-model="newStudent.phone"
          type="text"
          id="phone"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filial</label>
      <select
          v-if="branches?.data?.length"
          v-model="newStudent.branch_id"
          class="w-full p-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-500"
      >
        <option v-for="branch in branches.data" :key="branch.id" :value="branch.id">
          {{ branch.name }}
        </option>
      </select>
    </div>


    <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kurslar</label>
    <div v-if="courses?.data?.length" class="flex flex-wrap gap-3">
      <div v-for="course in courses.data" :key="course.id" class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow-sm">
        <input
            type="checkbox"
            :id="'course_' + course.id"
            :value="course.id"
            v-model="newStudent.courses"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        <label :for="'course_' + course.id" class="cursor-pointer text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
          {{ course.name }}
        </label>
      </div>
    </div>
  </div>



    <label for="showOptional" class="inline-flex items-center cursor-pointer mb-2">
      <input type="checkbox" id="showOptional" v-model="showOptionalFields" class="sr-only peer">
      <div class="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Qo‘shimcha ma’lumotlar</span>
    </label>





    <div v-if="showOptionalFields">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
            v-model="newStudent.email"
            type="email"
            id="email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Manzili</label>
        <input
            v-model="newStudent.address"
            type="text"
            id="address"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="links" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Havolalar</label>
        <input
            v-model="newStudent.links"
            type="text"
            id="links"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="birthday" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tug'ilgan sana</label>
        <input
            v-model="newStudent.birthday"
            type="date"
            id="birthday"
            @input="formatDate('birthday')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="work_start" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ish boshlagan vaqti</label>
        <input
            v-model="newStudent.work_start"
            type="date"
            id="work_start"
            @input="formatDate('work_start')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="work_end" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ish tamomlagan vaqti</label>
        <input
            v-model="newStudent.work_end"
            type="date"
            id="work_end"
            @input="formatDate('work_end')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
        <textarea
            v-model="newStudent.description"
            id="description"
            rows="3"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="from" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Dan</label>
        <select
            v-model="newStudent.from"
            id="gender"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            v-model="newStudent.gender"
            id="gender"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="man">Erkak</option>
          <option value="woman">Ayol</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
        <select
            v-model="newStudent.status"
            id="status"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            @change="handleImageUpload"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
    </div>



    <div class="flex justify-end mb-20">
      <button
          type="submit"
          :disabled="!isFormValid"
          class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
          :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
      >
        Qo'shish
      </button>
    </div>
  </form>
</template>

<script>
import {reactive, computed, ref, onMounted} from 'vue';
import { useStore } from 'vuex';

export default {
  emits: ['close'],
  setup(_, { emit }) {
    const store = useStore();
    const activeUser = JSON.parse(localStorage.getItem("user"))
    const newStudent = reactive({
      full_name: '',
      branch_id: '',
      email: '',
      phone: '',
      address: '',
      links: '',
      birthday: '',
      gender: 'man',
      from: 'tanish',
      work_start: '',
      work_end: '',
      status: 'active',
      description: '',
      images: null,
      courses: [],
      user_id: activeUser.id,
    });

    const branches = ref(null);
    const courses = ref(null)
    const fetchData = async () => {
      try {
        branches.value = await store.dispatch("branch/getAllBranches");
        newStudent.branch_id = branches?.value?.data[0].id
        courses.value = await store.dispatch("course/getAllCourses");
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    onMounted(fetchData);
    const isFormValid = computed(() => {
      return (
          newStudent.full_name.trim() &&
          newStudent.phone.trim()
      );
    });

    const formatDate = (field) => {
      const value = this.newStudent[field];
      if (value) {
        const [year, month, day] = value.split('-');
        this.newStudent[field] = `${year}-${month}-${day}`;
      }
    }

    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append('branch_id', newStudent.branch_id);
        formData.append('courses', JSON.stringify(newStudent.courses));
        formData.append('full_name', newStudent.full_name);
        formData.append('email', newStudent.email);
        formData.append('phone', newStudent.phone);
        formData.append('description', newStudent.description);
        formData.append('address', newStudent.address);
        formData.append('birthday', newStudent.birthday);
        formData.append('gender', newStudent.gender);
        formData.append('from', newStudent.from);
        formData.append('links', newStudent.links);
        formData.append('work_start', newStudent.work_start);
        formData.append('work_end', newStudent.work_end);
        formData.append('status', newStudent.status);
        formData.append('user_id', newStudent.user_id);
        if (newStudent.image) formData.append('image', newStudent.image);

        await store.dispatch('student/addStudent', formData);
        closeModal();

        newStudent.full_name = '';
        newStudent.email = '';
        newStudent.phone = '';
        newStudent.address = '';
        newStudent.links = '';
        newStudent.birthday =  '';
        newStudent.from = '';
        newStudent.gender = '';
        newStudent.work_start = '';
        newStudent.work_end = '';
        newStudent.status = 'active';
        newStudent.description = '';
        newStudent.images = null;
      } catch (e) {
        console.error(e);
      }
    };
    const showOptionalFields = ref(false);

    const handleImageUpload = (event) => {
      newStudent.image = event.target.files[0];
    };

    function closeModal() {
      emit('close');
    }

    return {
      newStudent,
      handleSubmit,
      closeModal,
      handleImageUpload,
      formatDate,
      isFormValid,
      branches,
      showOptionalFields,
      courses
    };
  },
};
</script>