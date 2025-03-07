<template>
  <div>
    <form @submit.prevent="handleSubmit" class="overflow-scroll pb-2">
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
          <div v-for="user in users?.data" :key="user.id" class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow-sm">
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

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Huquqlar</label>
        <div v-if="permissions?.data?.length" class="flex flex-wrap gap-3">
          <div v-for="permission in permissions?.data" :key="permission.id" class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow-sm">
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
      </div>

      <div class="flex justify-between items-center">
        <button
            type="submit"
            class="w-full px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
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
    
    const selectedRole = computed(() =>
        store.state.role.roles.find((course) => course.id === props.roleId)
    );
    const form = ref({
      name: '',
      users: [],
      permissions: [],
      id: props.roleId,
    });

    const initialForm = ref({});
    const users = ref(null)
    const permissions = ref(null)
    const fetchData = async () => {
      console.info(selectedRole.value)
      try {
        users.value = await store.dispatch('user/getAllUsers')
        permissions.value = await store.dispatch('permission/getAllPermissions')
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
      };
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
      permissions,
      toggleUser,
      togglePermission,
    };
  },
};
</script>
