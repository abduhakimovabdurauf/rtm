<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Lavozim</label>
      <input
          v-model="newRole.name"
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

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Hodimlar</label>
      <div v-if="users?.data?.length" class="flex flex-wrap gap-3">
        <div v-for="user in users.data" :key="user.id" class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow-sm">
          <input
              type="checkbox"
              :id="'user_' + user.id"
              :value="user.id"
              v-model="newRole.users"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <label :for="'user_' + user.id" class="cursor-pointer text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
            {{ user.full_name }}
          </label>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Huquqlar</label>
      <div v-if="permissions?.data?.length" class="flex flex-wrap gap-3">
        <div v-for="permission in permissions.data" :key="permission.id" class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow-sm">
          <input
              type="checkbox"
              :id="'permission_' + permission.id"
              :value="permission.id"
              v-model="newRole.permissions"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <label :for="'permission_' + permission.id" class="cursor-pointer text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
            {{ permission.name }}
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
  props: ['company_id'],
  setup(props,{ emit }) {
    const store = useStore();
    const newRole = reactive({
      name: '',
      company_id: props.company_id,
      users: [],
      permissions: [],
      status: 'active',
    });

    const isFormValid = computed(() => {
      return newRole.name.length > 0;
    });

    const users = ref(null)
    const permissions = ref(null)
    const fetchData = async () => {
      try {
        users.value = await store.dispatch('user/getAllUsers')
        permissions.value = await store.dispatch('permission/getAllPermissions')
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
        formData.append('users', newRole.users);
        formData.append('permissions', newRole.permissions);
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
      users,
      permissions
    };
  },
};
</script>
