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
      <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Turi</label>
      <input
          v-model="newNotification.type"
          id="type"
          @input="validateField('type')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.type }"
      />
      <p v-if="errors.type" class="text-red-500 text-sm mt-1">{{ errors.type }}</p>
    </div>

    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newNotification.status"
          id="status"
          @change="validateField('status')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.status }"
      >
        <option value="active" selected>Faol</option>
        <option value="inactive">Faol emas</option>
      </select>
      <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
    </div>

    <div class="flex justify-end">
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
import {reactive, computed, onMounted,ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const newNotification = reactive({
      title: '',
      text: '',
      type: '',
      status: 'active',
      company_id: '',
    });

    const errors = reactive({
      title: '',
      text: '',
      type: '',
      status: '',
    });

    const isFormValid = computed(() => {
      return Object.values(errors).every((error) => !error) &&
          Object.values(newNotification).every((field) => field.trim?.() || field > 0);
    });
    const companies = ref(null)

    const fetchData = async () => {
      try {
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
        Object.entries(newNotification).forEach(([key, value]) => {
          formData.append(key, value);
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
    };
  },
};
</script>
