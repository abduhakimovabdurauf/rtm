<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="company_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kompaniya ID</label>
      <select
          id="company_id"
          required
          v-if="companies && companies.data && companies.data.length > 0"
          v-model="newRole.company_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option v-for="company in companies.data" :key="company.id" :value="company.id">
          {{ company.name }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Lavozim</label>
      <input
          v-model.trim="newRole.name"
          type="text"
          id="name"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newRole.status"
          id="status"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      >
        <option value="active">Faol</option>
        <option value="inactive">Faol emas</option>
      </select>
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
import {reactive, computed, ref, onMounted} from 'vue';
import { useStore } from 'vuex';

export default {
  emits: ['close'],
  setup(_,{ emit }) {
    const store = useStore();
    const newRole = reactive({
      name: '',
      company_id: '',
      status: 'active',
    });

    const isFormValid = computed(() => {
      return newRole.name.length > 0;
    });
    
    const companies = ref(null)
    
    const fetchData = async () => {
      try {
        companies.value = await store.dispatch("company/getAllCompanies");
        newRole.company_id = companies.value.data[0].id;
        console.log("company_id : ", typeof newRole.company_id);
      } catch (error) {
        console.error(error);
      }
    }
    
    onMounted(fetchData)
    const handleSubmit = async () => {
      console.log()
      try {
        const formData = new FormData();
        formData.append('name', newRole.name);
        formData.append('company_id', newRole.company_id);
        formData.append('status', newRole.status);

        await store.dispatch('role/addRole', formData);
        closeModal();
        newRole.name = '';
      } catch (e) {
        console.error(e);
      }
    };

    function closeModal() {
      emit('close');
    }

    return {
      newRole,
      handleSubmit,
      closeModal,
      isFormValid,
      companies,
    };
  },
};
</script>
