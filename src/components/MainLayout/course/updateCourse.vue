<template>
  <div>
    <form @submit.prevent="handleSubmit" class="pb-2 overflow-scroll">
      <div>
        <label for="branch_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filial ID</label>
        <select
            id="branch_id"
            required
            v-if="branches && branches.data && branches.data.length > 0"
            v-model="form.branch_id"
            class="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option disabled selected>
            Filialni tanlang!
          </option>
          <option v-for="branch in branches.data" :key="branch.id" :value="branch.id">
            {{ branch.name }}
          </option>
        </select>
      </div>

      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nomi</label>
        <input
            type="text"
            id="name"
            v-model="form.name"
            class="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="duration" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Davomiyligi</label>
        <input
            type="number"
            id="duration"
            v-model="form.duration"
            class="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Narxi</label>
        <input
            type="number"
            id="price"
            v-model="form.price"
            class="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
        <select
            id="status"
            v-model="form.status"
            class="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="active">Faol</option>
          <option value="inactive">Faol emas</option>
        </select>
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
        <textarea
            id="description"
            v-model="form.description"
            rows="4"
            class="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Hodimlar</label>
        <div v-if="users?.data?.length" class="flex flex-wrap gap-3">
          <div v-for="user in users.data" :key="user.id" class="flex items-center p-2 space-x-2 bg-gray-100 rounded-md shadow-sm dark:bg-gray-800">
            <input
                type="checkbox"
                :id="'user_' + user.id"
                :value="user.id"
                :checked="form.users.some(r => r.id === user.id)"
                @change="toggleUser(user)"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 focus:ring-blue-500 dark:bg-gray-700"
            />
            <label :for="'user_' + user.id" class="cursor-pointer text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
              {{ user.full_name }}
            </label>
          </div>
        </div>
      </div>

      <div>
        <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Image</label>
        <input
            type="file"
            id="image"
            @change="handleImageChange"
            class="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            accept="image/*"
        />
        <div v-if="imagePreview" class="mt-2">
          <img :src="imagePreview" alt="Image Preview" class="w-full h-auto rounded-md" />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <button
            type="submit"
            class="w-full px-6 py-2 mt-2 mb-6 font-semibold text-white bg-indigo-600 rounded-md dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Saqlash
        </button>
      </div>
    </form>
  </div>
</template>



<script>
import { ref, watch, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { isEqual } from 'lodash';

export default {
  props: {
    courseId: {
      type: Number,
      required: true,
    },
  },
  emits: ['close'],
  setup(props,{ emit }) {
    const store = useStore();

    const selectedCourse = ref(null)
    onMounted(() => {
      selectedCourse.value = store.state.course.courses.find((course) => course.id === props.courseId)
    })

    console.log('courseId: ', props.courseId)
    console.log('selectedCourse: ', selectedCourse.value)
    const form = ref({
      name: '',
      duration: '',
      price: '',
      description: '',
      branch_id: '',
      id: props.courseId,
      status: '',
      users:[],
      image: null,
    });

    const branches = ref(null);
    const users = ref(null)
    const fetchData = async () => {
      try {
        branches.value = await store.dispatch("branch/getAllBranches");
        users.value = await store.dispatch("user/getAllUsers");
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    onMounted(fetchData);

    const initialForm = ref({});

    const imagePreview = ref(null);

    watch(
        selectedCourse,
        (course) => {
          if (course) {
            form.value = { ...course };
            initialForm.value = { ...course };
            imagePreview.value =
                course.image && `http://192.168.11.71:8000/storage/courses/${course.image}`;
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

    const isFormChanged = computed(() => {
      const normalizeUsers = (users) => users.map(user => user.id).sort();

      return !isEqual(
          { ...form.value, users: normalizeUsers(form.value.users) },
          { ...initialForm.value, users: normalizeUsers(initialForm.value.users) }
      );
    });






    const toggleUser = (user) => {
      const index = form.value.users.findIndex(r => r.id === user.id);
      if (index !== -1) {
        form.value.users.splice(index, 1);
      } else {
        form.value.users.push(user);
      }
    };
    
    const handleSubmit = () => {

      const apiPayload = {
        ...form.value,
        id: props.courseId,
      };
      const fullBranch = branches.value.data.find(b => b.id === form.value.branch_id);
      const localPayload = {
        ...form.value,
        branch: fullBranch,
      };
      store.dispatch('course/updateCourse', { apiPayload, localPayload });
      closeModal();
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
      users,
      toggleUser,
    };
  },
};
</script>
