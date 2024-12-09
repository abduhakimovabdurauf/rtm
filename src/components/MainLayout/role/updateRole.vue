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

      <div class="flex justify-between items-center">
        <button
            type="submit"
            :disabled="!isFormChanged"
            class="w-full px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Saqlash
        </button>
      </div>
    </form>
  </div>
</template>


<script>
import { ref, watch, computed } from 'vue';
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
      id: props.roleId,
    });

    const initialForm = ref({});

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

    const isFormChanged = computed(() => {
      const { name } = form.value;
      const { name: initName } = initialForm.value;

      return (
          name !== initName
      );
    });

    const handleSubmit = () => {
      const updatedRole = {
        ...form.value,
        id: props.roleId,
      };
      store.dispatch('role/updateRole', updatedRole);
      closeModal();
    };

    function closeModal() {
      emit('close');
    }

    return {
      form,
      handleSubmit,
      isFormChanged,
    };
  },
};
</script>
