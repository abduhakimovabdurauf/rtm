<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ismi</label>
      <input
          v-model="newStudent.full_name"
          type="text"
          id="name"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="duration" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Login</label>
      <input
          v-model="newStudent.login"
          type="text"
          id="duration"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Parol</label>
      <input
          v-model="newStudent.password"
          type="text"
          id="password"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
      <input
          v-model="newStudent.email"
          type="email"
          id="email"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon</label>
      <input
          v-model="newStudent.phone"
          type="text"
          id="phone"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Manzili</label>
      <input
          v-model="newStudent.address"
          type="text"
          id="address"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="links" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Havolalar</label>
      <input
          v-model="newStudent.links"
          type="text"
          id="links"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="birthday" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tug'ilgan sana</label>
      <input
          v-model="newStudent.birthday"
          type="date"
          id="birthday"
          required
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
          required
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
          required
          @input="formatDate('work_end')"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>

    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
      <textarea
          v-model="newStudent.description"
          id="description"
          required
          rows="3"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      ></textarea>
    </div>
    <div class="mb-4">
      <label for="from" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Dan</label>
      <select
          v-model="newStudent.from"
          id="gender"
          required
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
          required
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
          required
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
          multiple
          ref="image"
          @change="handleImageUpload"
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
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useStore();
    const newStudent = reactive({
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
      status: 'active',
      description: '',
      images: null,
    });

    const isFormValid = computed(() => {
      return (
          newStudent.full_name.trim() &&
          newStudent.login.trim() &&
          newStudent.password.trim() &&
          newStudent.email.trim() &&
          newStudent.phone.trim() &&
          newStudent.description.trim() &&
          newStudent.address.trim() &&
          newStudent.birthday.trim() &&
          newStudent.gender.trim() &&
          newStudent.from.trim() &&
          newStudent.links.trim() &&
          newStudent.work_start.trim() &&
          newStudent.work_end.trim() &&
          newStudent.status.trim()
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
        formData.append('full_name', newStudent.full_name);
        formData.append('login', newStudent.login);
        formData.append('password', newStudent.password);
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
        if (newStudent.image) formData.append('image', newStudent.image);

        await store.dispatch('student/addStudent', formData);
        closeModal();

        newStudent.full_name = '';
        newStudent.login = '';
        newStudent.password = '';
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
    };
  },
};
</script>