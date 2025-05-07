<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="company_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kompaniya ID</label>
      <span v-if="companies==null" class="text-gray-600 dark:text-gray-400">Malumotlar yuklanmoqda...</span>
      <select
          id="company_id"
          required
          v-else-if="companies && companies.data && companies.data.length > 0"
          v-model="newRole.company_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option v-for="company in companies.data" :key="company.id" :value="company.id">
          {{ company.name }}
        </option>
      </select>
      <span v-else class="text-gray-600 dark:text-gray-400">Kompaniyalar malumotlari mavjud emas! :(</span>
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

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Hodimlar</label>

      <div v-if="users == null">
        Ma'lumotlar yuklanmoqda...
      </div>

      <div v-else-if="users?.data?.length">
        <Multiselect
          v-model="newRole.users"
          :options="users.data"
          :multiple="true"
          :searchable="true"
          label="full_name"
          track-by="id"
          placeholder="Hodimlarni tanlang"
        />
      </div>

      <div v-else>
        Hodimlar ma'lumotlari mavjud emas! :(
      </div>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Huquqlar</label>

      <div v-if="permissions==null">
        Malumotlar yuklanmoqda...
      </div>
      <div v-else-if="permissions?.data?.length" class="flex flex-wrap gap-3">
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
      <div v-else>
        Huquq malumotlari mavjud emas! :(
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
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
export default {
  emits: ['close'],
  components: {
    Multiselect,
  },
  setup(_,{ emit }) {
    const store = useStore();
    const newRole = reactive({
      name: '',
      company_id: '',
      users: [],
      permissions: [],
      status: 'active',
    });

    const isFormValid = computed(() => {
      return newRole.name.length > 0;
    });
    
    const companies = ref(null)
    const users = ref(null)
    const permissions = ref(null)
    const fetchData = async () => {
      try {
        companies.value = await store.dispatch("company/getAllCompanies");
        users.value = await store.dispatch('user/getAllUsers')
        console.log('userRoles: ', users.value);
        
        permissions.value = await store.dispatch('permission/getAllPermissions')
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

        const formData = {
          ...newRole,
          users: newRole.users.map(user => user.id),
          permissions: JSON.stringify(newRole.permissions)
        };
        console.log('hodimlar: ', formData);
        
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
      users,
      permissions
    };
  },
};
</script>
