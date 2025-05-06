<template>
  <div>
    <form @submit.prevent="handleSubmit" class="pb-2 overflow-scroll">

      <div class="mb-4" v-if="activeUser?.roles?.map(role => role.name).includes('admin')">
        <label for="company_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kompaniya</label>
        <div v-if="companies==null">
          <span class="text-gray-600">Malumotlar yuklanmoqda...</span>
        </div>
        <select
            id="company_id"
            required
            v-else-if="companies && companies?.data && companies.data?.length > 0"
            v-model="form.company_id"
            class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option v-for="company in companies.data" :key="company.id" :value="company.id">
            {{ company.name }}
          </option>
        </select>

        <div v-else>
          <span class="text-gray-600">Malumotlar mavjud emas! :(</span>
        </div>
      </div>
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nomi</label>
        <input
            type="text"
            id="name"
            v-model="form.name"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Hodimlar</label>
        <div v-if="users?.data?.length" class="flex flex-wrap gap-3">
          <div v-for="user in users?.data" :key="user.id" class="flex items-center p-2 space-x-2 bg-gray-100 rounded-md shadow-sm dark:bg-gray-800">
            <input
                type="checkbox"
                :id="'user_' + user?.id"
                :value="user?.id"
                :checked="form.users?.some(b => b.id === user.id)"
                @change="toggleUser(user)"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <label :for="'user_' + user.id" class="cursor-pointer text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
              {{ user?.full_name }}
            </label>
          </div>
        </div>
      </div>

      <!-- <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Huquqlar</label>
        <div v-if="permissions?.data?.length" class="flex flex-wrap gap-3">
          <div v-for="permission in permissions?.data" :key="permission.id" class="flex items-center p-2 space-x-2 bg-gray-100 rounded-md shadow-sm dark:bg-gray-800">
            <input
                type="checkbox"
                :id="'permission_' + permission?.id"
                :value="permission?.id"
                :checked="form.permissions?.some(b => b.id === permission.id)"
                @change="togglePermission(permission)"
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
      </div> -->

      <div class="flex items-center justify-between">
        <button
            type="submit"
            class="w-full px-6 py-2 mt-2 mb-6 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Saqlash
        </button>
      </div>
    </form>
  </div>
</template>


<script>
import {ref, watch, computed, onMounted} from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    roleId: {
      type: Number,
      required: true,
    },
  },
  emits: ['close'],
  setup(props,{ emit }) {
    const store = useStore();
    const activeUser = JSON.parse(localStorage.getItem("user"))
    const selectedRole = computed(() =>
        store.state.role.roles.find((course) => course.id === props.roleId)
    );
    const form = ref({
      name: '',
      users: [],
      company_id: activeUser.company_id,
      permissions: [],
    });

    
    const initialForm = ref({});
    const users = ref(null)
    // const permissions = ref(null)
    const companies = ref(null)
    const fetchData = async () => {
      console.info(selectedRole.value)
      try {
        if (activeUser?.roles?.map(role => role.name).includes("admin")) {
          companies.value = await store.dispatch('company/getAllCompanies')
        }
        users.value = await store.dispatch('user/getAllUsers')
        // permissions.value = await store.dispatch('permission/getAllPermissions')
      } catch (error) {
        console.error(error);
      }
    }
    
    onMounted(fetchData)
    watch(
        selectedRole,
        (role) => {
          if (role) {
            form.value = { ...role };
            initialForm.value = { ...role };
          }
        },
        { immediate: true }
    );

    const isFormChanged = ref(false);

    watch(
        form,
        (newForm) => {
          const { name, users, permissions } = newForm;
          const { name: initName, users: initUsers, permissions: initPermissions } = initialForm.value;

          const usersChanged = users.length !== initUsers.length ||
              users.some(user => !initUsers.find(initUser => initUser.id === user.id));

          const permissionsChanged = permissions.length !== initPermissions.length ||
              permissions.some(permission => !initPermissions.find(initPermission => initPermission.id === permission.id));

          isFormChanged.value = name !== initName || usersChanged || permissionsChanged;
        },
        { deep: true }
    );



    const handleSubmit = () => {
      const updatedRole = {
        ...form.value,
        id: props.roleId,
        user_id: activeUser.id,
      };

      console.log('submitted role: ', updatedRole);
      
      store.dispatch('role/updateRole', updatedRole);
      closeModal();
    };

    const toggleUser = (user) => {
      const index = form.value.users.findIndex(b => b.id === user.id);
      isFormChanged.value = true
      if (index !== -1) {
        form.value.users.splice(index, 1);
      } else {
        form.value.users.push(user);
      }
    };

    const togglePermission = (permission) => {
      const index = form.value.permissions.findIndex(b => b.id === permission.id);
      isFormChanged.value = true
      if (index !== -1) {
        form.value.permissions.splice(index, 1);
      } else {
        form.value.permissions.push(permission);
      }
    };
    
    function closeModal() {
      emit('close');
    }

    return {
      form,
      handleSubmit,
      isFormChanged,
      users,
      // permissions,
      companies,
      toggleUser,
      togglePermission,
      activeUser,
    };
  },
};
</script>
