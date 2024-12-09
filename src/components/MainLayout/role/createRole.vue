<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Role Nomi</label>
      <input
          v-model.trim="newRole.name"
          type="text"
          id="name"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
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
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

export default {

  emits: ['close'],
  setup(_,{ emit }) {
    const store = useStore();
    const newRole = reactive({
      name: '',
    });

    const isFormValid = computed(() => {
      return newRole.name.length > 0;
    });

    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append('name', newRole.name);

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
    };
  },
};
</script>
