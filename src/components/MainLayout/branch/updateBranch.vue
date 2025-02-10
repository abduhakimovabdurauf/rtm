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

      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">Telefon Raqami</label>
        <input
            type="number"
            id="phone"
            v-model="form.phone"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">Manzili</label>
        <input
            type="text"
            id="address"
            v-model="form.address"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
        <select
            id="status"
            v-model="form.status"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="active">Faol</option>
          <option value="inactive">Faol emas</option>
        </select>
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Tavsif</label>
        <textarea
            id="description"
            v-model="form.description"
            rows="4"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
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
    branchId: {
      type: Number,
      required: true,
    },
  },
  emits: ['close'],
  setup(props,{ emit }) {
    const store = useStore();

    const selectedBranch = computed(() =>
        store.state.branch.branches.find((branch) => branch.id === props.branchId)
    );

    const form = ref({
      name: '',
      phone: '',
      address: '',
      description: '',
      id: props.branchId,
      status: '',
    });

    const initialForm = ref({});

    watch(
        selectedBranch,
        (branch) => {
          if (branch) {
            form.value = { ...branch };
            initialForm.value = { ...branch };
          }
        },
        { immediate: true }
    );


    const isFormChanged = computed(() => {
      const { name, phone, address, description } = form.value;
      const { name: initName, phone: initPhone, address: initAddress, description: initDescription } = initialForm.value;

      return (
          name !== initName ||
          phone !== initPhone ||
          address !== initAddress ||
          description !== initDescription
      );
    });

    const handleSubmit = () => {
      const updatedBranch = {
        ...form.value,
        id: props.branchId,
      };
      store.dispatch('branch/updateBranch', updatedBranch);
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
