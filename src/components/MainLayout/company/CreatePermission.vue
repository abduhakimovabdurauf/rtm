<template>
  <form @submit.prevent="handleSubmit">
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
  props: {
    companyId: {
      type: Number,
      required: true
    }
  },
  setup(props,{ emit }) {
    const store = useStore();
    const newPermission = reactive({
      name: '',
      company_id: props.companyId,
      status: 'active',
    });

    const isFormValid = computed(() => {
      return newPermission.name.length > 0;
    });

    const companies = ref(null)

    const fetchData = async () => {
      try {
        companies.value = await store.dispatch("company/getAllCompanies");
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
    };
  },
};
</script>
