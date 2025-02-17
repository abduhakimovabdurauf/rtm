<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="branch_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filial ID</label>
      <select
          id="branch_id"
          required
          v-if="branches && branches.data && branches.data.length > 0"
          v-model="newRoom.branch_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option v-for="branch in branches.data" :key="branch.id" :value="branch.id">
          {{ branch.name }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Xona Nomi</label>
      <input
          v-model.trim="newRoom.name"
          type="text"
          autocomplete="off"
          id="name"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="number" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Raqami</label>
      <input
          v-model.trim="newRoom.number"
          type="text"
          autocomplete="off"
          id="number"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="quantity" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Miqdori</label>
      <input
          v-model.trim="newRoom.quantity"
          type="text"
          autocomplete="off"
          id="quantity"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
      <textarea
          v-model.trim="newRoom.description"
          type="text"
          id="description"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      ></textarea>
    </div>
    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newRoom.status"
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
import { reactive, computed, ref, onMounted, } from 'vue';
import { useStore } from 'vuex';

export default {
  emits: ['close'],
  setup(_, { emit }) {
    const store = useStore();
    const activeUser = JSON.parse(localStorage.getItem("user"))
    const newRoom = reactive({
      branch_id: '',
      name: '',
      quantity: '',
      description: '',
      user_id: activeUser.id,
      number: '',
      status: 'active',
    });
    const branches = ref(null);
    const fetchData = async () => {
      try {
        branches.value = await store.dispatch("branch/getAllBranches");
        console.log(branches.value)
        if (branches.value.data.length > 0) {
          newRoom.branch_id = branches.value.data[0].id;
        }
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    onMounted(fetchData);
    const isFormValid = computed(() => {
      return (
          newRoom.name.trim().length > 0 &&
          /^[1-9][0-9]*$/.test(newRoom.quantity) &&
          newRoom.description.trim().length > 0 &&
          newRoom.status
      );
    });

    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append('name', newRoom.name);
        formData.append('branch_id', newRoom.branch_id);
        formData.append('number', newRoom.number);
        formData.append('quantity', newRoom.quantity);
        formData.append('description', newRoom.description);
        formData.append('status', newRoom.status);

        await store.dispatch('room/addRoom', formData);
        closeModal();

        Object.assign(newRoom, {
          name: '',
          quantity: '',
          description: '',
          number: '',
          status: 'active',
        });
      } catch (e) {
        console.error(e);
      }
    };

    function closeModal() {
      emit('close');
    }

    return {
      newRoom,
      handleSubmit,
      closeModal,
      isFormValid,
      branches,
    };
  },
};
</script>

