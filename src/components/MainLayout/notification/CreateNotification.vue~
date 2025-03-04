<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="company_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kompaniya ID</label>
      <select
          id="company_id"
          required
          v-if="companies && companies.data && companies.data.length > 0"
          v-model="newNotification.company_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option v-for="company in companies.data" :key="company.id" :value="company.id">
          {{ company.name }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sarlavha</label>
      <input
          v-model="newNotification.title"
          type="text"
          id="title"
          @input="validateField('title')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.title }"
      />
      <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
    </div>

    <div class="mb-4">
      <label for="text" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Matn</label>
      <input
          v-model="newNotification.text"
          type="text"
          id="text"
          @input="validateField('text')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.text }"
      />
      <p v-if="errors.text" class="text-red-500 text-sm mt-1">{{ errors.text }}</p>
    </div>

    <div class="mb-4">
      <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Rangi
      </label>
      <select
          v-model="newNotification.type"
          id="type"
          @change="validateField('type')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.type }"
      >
        <option
            v-for="color in colors"
            :key="color.value"
            :value="color.value"
        >
          {{ color.label }}
        </option>
      </select>
      <p v-if="errors.type" class="text-red-500 text-sm mt-1">{{ errors.type }}</p>
    </div>


    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">O'qildimi</label>
      <select
          v-model="newNotification.n_status"
          id="status"
          @change="validateField('status')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      >
        <option value="active" selected>O'qildi</option>
        <option value="inactive">O'qilmadi</option>
      </select>
    </div>

    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newNotification.status"
          id="status"
          @change="validateField('status')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      >
        <option value="active" selected>Faol</option>
        <option value="inactive">Faol emas</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Hodimlar</label>
      <div v-if="users?.data?.length" class="flex flex-wrap gap-3">
        <div v-for="user in users.data" :key="user.id" class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow-sm">
          <input
              type="checkbox"
              :id="'user_' + user.id"
              :value="user.id"
              v-model="newNotification.users"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <label :for="'user_' + user.id" class="cursor-pointer text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
            {{ user.full_name }}
          </label>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button
          type="submit"
          :disabled="!isFormValid"
          class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg mb-20"
          :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
      >
        Qo'shish
      </button>
    </div>
  </form>
</template>


<script>
import {reactive, computed, onMounted,ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const newNotification = reactive({
      title: '',
      text: '',
      type: 'bg-green-500',
      status: 'active',
      company_id: '',
      n_status: 'inactive',
      users: [],
    });
    const colors = [
      { label: "🟢 Yashil", value: "bg-green-500" },
      { label: "🔴 Qizil", value: "bg-red-500" },
      { label: "🟡 Sariq", value: "bg-yellow-500" },
      { label: "🔵 Ko'k", value: "bg-blue-500" },
      { label: "🟣 Binafsha", value: "bg-violet-500" },
    ];

    const errors = reactive({
      title: '',
      text: '',
      type: '',
      status: '',
    });

    const isFormValid = computed(() => {
      return !!newNotification.title.trim() &&
          !!newNotification.text.trim() &&
          !!newNotification.type.trim() &&
          !!newNotification.status &&
          !!newNotification.company_id;
    });

    const companies = ref(null)
    const users = ref(null)
    const fetchData = async () => {
      try {
        users.value = await store.dispatch("user/getAllUsers")
        companies.value = await store.dispatch("company/getAllCompanies");
        newNotification.company_id = companies.value.data[0].id;
      } catch (error) {
        console.error(error);
      }
    }

    onMounted(fetchData)
    const validateField = (field) => {
      if (!newNotification[field]?.trim()) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} bo'sh bo'lmasligi kerak.`;
      } else {
        errors[field] = '';
      }
    };

    const handleSubmit = async () => {
      try {
        if (!isFormValid.value) return;
        const formData = new FormData();
        formData.append("title", newNotification.title);
        formData.append("text", newNotification.text);
        formData.append("type", newNotification.type);
        formData.append("status", newNotification.status);
        formData.append("n_status", newNotification.n_status);
        formData.append("company_id", newNotification.company_id);
        newNotification.users.forEach(userId => {
          formData.append("users[]", userId);
        });
        await store.dispatch('notification/addNotification', formData);
        Object.keys(newNotification).forEach((key) => {
          newNotification[key] = key === 'status' ? 'active' : '';
        });
      } catch (e) {
        console.error(e);
      }
    };

    return {
      newNotification,
      errors,
      validateField,
      handleSubmit,
      isFormValid,
      companies,
      users,
      colors,
    };
  },
};
</script>
