<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <!--    start required fields-->
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ismi</label>
        <input
            v-model="form.full_name"
            type="text"
            id="name"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="duration" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Login</label>
        <input
            v-model="form.login"
            type="text"
            id="duration"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Parol</label>
        <input
            v-model="form.password"
            type="text"
            id="password"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon Raqami</label>
        <input
            v-model="form.phone"
            type="text"
            id="phone"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filiallar</label>
        <div v-if="branches?.data?.length" class="flex flex-wrap gap-3">
          <div v-for="branch in branches.data" :key="branch.id" class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow-sm">
            <input
                type="checkbox"
                :id="'branch_' + branch.id"
                :value="branch.id"
                :checked="form.branches.some(b => b.id === branch.id)"
                @change="toggleBranch(branch)"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <label :for="'branch_' + branch.id" class="cursor-pointer text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
              {{ branch.name }}
            </label>
          </div>
        </div>

      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kurslar</label>
        <div v-if="courses?.data?.length" class="flex flex-wrap gap-3">
          <div v-for="course in courses.data" :key="course.id" class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow-sm">
            <input
                type="checkbox"
                :id="'course_' + course.id"
                :value="course.id"
                :checked="form.my_courses.some(c => c.id === course.id)"
                @change="toggleCourse(course)"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <label :for="'course_' + course.id" class="cursor-pointer text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
              {{ course.name }}
            </label>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Lavozimlar</label>
        <div v-if="roles?.data?.length" class="flex flex-wrap gap-3">
          <div v-for="role in roles.data" :key="role.id" class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow-sm">
            <input
                type="checkbox"
                :id="'role_' + role.id"
                :value="role.id"
                :checked="form.roles.some(r => r.id === role.id)"
                @change="toggleRole(role)"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <label :for="'role_' + role.id" class="cursor-pointer text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
              {{ role.name }}
            </label>
          </div>
        </div>
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
      <!--    end required fields-->

      <label for="showOptional" class="inline-flex items-center cursor-pointer mb-2">
        <input type="checkbox" id="showOptional" v-model="showOptionalFields" class="sr-only peer">
        <div class="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Qo‘shimcha ma’lumotlar</span>
      </label>

      <!--  nullable qiymatlar   -->

      <div v-if="showOptionalFields">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
              v-model="form.email"
              type="email"
              id="email"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Manzili</label>
          <input
              v-model="form.address"
              type="text"
              id="address"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div class="mb-4">
          <label for="links" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Havolalar</label>
          <input
              v-model="form.links"
              type="text"
              id="links"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div class="mb-4">
          <label for="birthday" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tugilgan sana</label>
          <input
              v-model="form.birthday"
              type="date"
              id="birthday"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div class="mb-4">
          <label for="work_start" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ish boshlagan vaqti</label>
          <input
              v-model="form.work_start"
              type="date"
              id="work_start"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div class="mb-4">
          <label for="work_end" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ish tamomlagan vaqti</label>
          <input
              v-model="form.work_end"
              type="date"
              id="work_end"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
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
<!--        <div class="mb-4">-->
<!--          <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Rasm Yuklash</label>-->
<!--          <input-->
<!--              type="file"-->
<!--              id="image"-->
<!--              @change="handleImageUpload"-->
<!--              class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="mb-4">-->
<!--          <label for="file" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fayl Yuklash</label>-->
<!--          <input-->
<!--              type="file"-->
<!--              id="file"-->
<!--              @change="handleFileUpload"-->
<!--              class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"-->
<!--          />-->
<!--        </div>-->

      </div>

      <!--    end nullable qiymatlar    -->


      <div class="flex justify-end mb-20">
        <button
            type="submit"
            :disabled="!isFormChanged"
            class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
            :class="{ 'opacity-50 cursor-not-allowed': !isFormChanged }"
        >
          O'zgartirish
        </button>
      </div>
    </form>
  </div>
</template>



<script>
import { ref, watch, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import isEqual from 'lodash/isEqual';
import {root} from "postcss";

export default {
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useStore();

    const selectedUser = computed(() =>
        store.state.user.users.find((user) => user.id === props.userId)
    );

    console.log(selectedUser.value)

    const form = ref({
      full_name: '',
      login: '',
      password: '',
      email: '',
      phone: '',
      address: '',
      links: '',
      birthday: '',
      gender: '',
      from: '',
      work_start: '',
      work_end: '',
      id: props.userId,
      status: '',
      description: '',
      branches: [],
      my_courses: [],
      roles: [],
      images: null,
    });

    const initialForm = ref({});

    const imagePreview = ref(null);

    watch(
        selectedUser,
        (user) => {
          if (user) {
            Object.assign(form.value, user);
            Object.assign(initialForm.value, user);
            imagePreview.value = user.image
                ? `https://api.mrtm.uz/storage/${user.image}`
                : null;
          }}, { immediate: true }
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
    const courses = ref(null)
    const roles = ref(null)
    const branches = ref(null);
    const fetchData = async () => {
      try {
        branches.value = await store.dispatch("branch/getAllBranches");
        courses.value = await store.dispatch("course/getAllCourses");
        roles.value = await store.dispatch("role/getAllRoles");
        console.log('form: ', form.value)
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    onMounted(fetchData);

    const showOptionalFields = ref(false);
    
    const isFormChanged = computed(() => {
      return !isEqual(form.value, initialForm.value);
    });


    const handleSubmit = () => {
      const updatedUser = {
        id: form.value.id,
        full_name: form.value.full_name,
        login: form.value.login,
        password: form.value.password,
        email: form.value.email,
        phone: form.value.phone,
        address: form.value.address,
        links: form.value.links,
        birthday: form.value.birthday,
        gender: form.value.gender,
        from: form.value.from,
        work_start: form.value.work_start,
        work_end: form.value.work_end,
        status: form.value.status,
        description: form.value.description,
        branches: form.value.branches.map(branch => branch.id),
        my_courses: form.value.my_courses.map(course => course.id),
        roles: form.value.roles.map(role => role.id),
        images: form.value.image || null,
      };

      console.log('submitted data: ', updatedUser);
      store.dispatch('user/updateUser', updatedUser);
      store.commit('SET_LOADING', true);
      store.dispatch('user/getAllUsers');
      initialForm.value = { ...form.value };
      closeModal();
    };

    const toggleBranch = (branch) => {
      const index = form.value.branches.findIndex(b => b.id === branch.id);
      if (index !== -1) {
        form.value.branches.splice(index, 1);
      } else {
        form.value.branches.push(branch);
      }
    };

    const toggleCourse = (course) => {
      const index = form.value.my_courses.findIndex(c => c.id === course.id);
      if (index !== -1) {
        form.value.my_courses.splice(index, 1);
      } else {
        form.value.my_courses.push(course);
      }
    };

    const toggleRole = (role) => {
      const index = form.value.roles.findIndex(r => r.id === role.id);
      if (index !== -1) {
        form.value.roles.splice(index, 1);
      } else {
        form.value.roles.push(role);
      }
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
      showOptionalFields,
      courses,
      branches,
      roles,
      toggleBranch,
      toggleCourse,
      toggleRole,
    };
  },
};
</script>