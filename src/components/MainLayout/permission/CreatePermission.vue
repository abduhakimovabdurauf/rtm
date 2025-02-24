<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="company_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kompaniya ID</label>
      <select
          id="company_id"
          required
          v-if="companies && companies.data && companies.data.length > 0"
          v-model="newPermission.company_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option v-for="company in companies.data" :key="company.id" :value="company.id">
          {{ company.name }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Huquq</label>
      <input
          v-model.trim="newPermission.name"
          type="text"
          id="name"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newPermission.status"
          id="status"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="active">Faol</option>
        <option value="inactive">Faol emas</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Huquqlar</label>
      <div v-if="roles?.data?.length" class="flex flex-wrap gap-3">
        <div v-for="role in roles.data" :key="role.id" class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow-sm">
          <input
              type="checkbox"
              :id="'role_' + role.id"
              :value="role.id"
              v-model="newPermission.roles"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <label :for="'role_' + role.id" class="cursor-pointer text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
            {{ role.name }}
          </label>
        </div>
      </div>
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
    const newPermission = reactive({
      name: '',
      company_id: '',
      roles: [],
      status: 'active',
    });

    const isFormValid = computed(() => {
      return newPermission.name.length > 0;
    });

    const companies = ref(null)
    const roles = ref(null)
    const fetchData = async () => {
      try {
        companies.value = await store.dispatch("company/getAllCompanies");
        roles.value = await store.dispatch("role/getAllRoles");
        newPermission.company_id = companies.value.data[0].id;
      } catch (error) {
        console.error(error);
      }
    }

    onMounted(fetchData)
    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append('name', newPermission.name);
        formData.append('company_id', newPermission.company_id);
        formData.append('roles', newPermission.roles);
        formData.append('status', newPermission.status);

        await store.dispatch('permission/addPermission', formData);
        closeModal();
        newPermission.name = '';
      } catch (e) {
        console.error(e);
      }
    };

    function closeModal() {
      emit('close');
    }

    return {
      newPermission,
      handleSubmit,
      closeModal,
      isFormValid,
      companies,
      roles
    };
  },
};
</script>
