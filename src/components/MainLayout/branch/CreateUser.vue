<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ismi</label>
      <input
          v-model="newUser.full_name"
          type="text"
          id="name"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="duration" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Login</label>
      <input
          v-model="newUser.login"
          type="text"
          id="duration"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Parol</label>
      <input
          v-model="newUser.password"
          type="text"
          id="password"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>

    <div class="mb-4">
      <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon Raqami</label>
      <input
          v-model="newUser.phone"
          type="text"
          id="phone"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>

    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
      <input
          v-model="newUser.email"
          type="email"
          id="email"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Manzili</label>
      <input
          v-model="newUser.address"
          type="text"
          id="address"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="links" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Havolalar</label>
      <input
          v-model="newUser.links"
          type="text"
          id="links"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="birthday" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tugilgan sana</label>
      <input
          v-model="newUser.birthday"
          type="date"
          id="birthday"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="work_start" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ish boshlagan vaqti</label>
      <input
          v-model="newUser.work_start"
          type="date"
          id="work_start"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="work_end" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ish tamomlagan vaqti</label>
      <input
          v-model="newUser.work_end"
          type="date"
          id="work_end"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
      <textarea
          v-model="newUser.description"
          id="description"
          rows="3"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      ></textarea>
    </div>
    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newUser.status"
          id="status"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="active">Faol</option>
        <option value="inactive">Faol emas</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Rasm Yuklash</label>
      <input
          type="file"
          id="image"
          @change="handleImageUpload"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="file" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fayl Yuklash</label>
      <input
          type="file"
          id="file"
          @change="handleFileUpload"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
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
import {reactive, computed} from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    branchId: {
      type: Number,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useStore();
    const activeUser = JSON.parse(localStorage.getItem("user"))
    const newUser = reactive({
      branch_id: props.branchId,
      full_name: '',
      login: '',
      password: '',
      email: '',
      phone: '',
      address: '',
      links: '',
      birthday: '',
      work_start: '',
      work_end: '',
      status: 'active',
      description: '',
      images: null,
      files: null,
      user_id: activeUser.id,
    });

    const isFormValid = computed(() => {
      return (
          newUser.full_name.trim() &&
          newUser.login.trim() &&
          newUser.password.trim() &&
          newUser.phone.trim() &&
          newUser.status.trim()
      );
    });

    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append('full_name', newUser.full_name);
        formData.append('login', newUser.login);
        formData.append('password', newUser.password);
        formData.append('email', newUser.email);
        formData.append('phone', newUser.phone);
        formData.append('description', newUser.description);
        formData.append('address', newUser.address);
        formData.append('birthday', newUser.birthday);
        formData.append('links', newUser.links);
        formData.append('work_start', newUser.work_start);
        formData.append('work_end', newUser.work_end);
        formData.append('status', newUser.status);
        if (newUser.images) formData.append('files', newUser.images);
        if (newUser.files) formData.append('files', newUser.files);

        await store.dispatch('user/addUser', formData);
        closeModal();

        newUser.full_name = '';
        newUser.login = '';
        newUser.password = '';
        newUser.email = '';
        newUser.phone = '';
        newUser.address = '';
        newUser.links = '';
        newUser.birthday =  '';
        newUser.work_start = '';
        newUser.work_end = '';
        newUser.status = 'active';
        newUser.description = '';
        newUser.images = null;
        newUser.files = null;
      } catch (e) {
        console.error(e);
      }
    };

    const handleImageUpload = (event) => {
      newUser.images = event.target.files[0];
    };

    const handleFileUpload = (event) => {
      newUser.files = event.target.files[0];
    };

    function closeModal() {
      emit('close');
    }

    return {
      newUser,
      handleSubmit,
      closeModal,
      handleImageUpload,
      handleFileUpload,
      isFormValid,
    };
  },
};
</script>