<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="branch_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filial ID</label>
      <select
          id="branch_id"
          required
          v-if="branches && branches.data && branches.data.length > 0"
          v-model="newDiscount.branch_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option v-for="branch in branches.data" :key="branch.id" :value="branch.id">
          {{ branch.name }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Chegirma Nomi</label>
      <input
          v-model="newDiscount.name"
          type="text"
          id="name"
          @input="validateField('name')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.name }"
      />
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
    </div>

    <div class="mb-4">
      <label for="percent" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Foiz</label>
      <input
          v-model="newDiscount.percent"
          type="text"
          id="percent"
          @input="validateField('percent')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.percent }"
      />
      <p v-if="errors.percent" class="text-red-500 text-sm mt-1">{{ errors.percent }}</p>
    </div>

    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
      <textarea
          v-model="newDiscount.description"
          id="description"
          @input="validateField('description')"
          rows="3"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.description }"
      ></textarea>
      <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
    </div>

    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newDiscount.status"
          id="status"
          @change="validateField('status')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.status }"
      >
        <option value="active">Faol</option>
        <option value="inactive">Faol emas</option>
      </select>
      <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
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
import { reactive, computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const activeUser = JSON.parse(localStorage.getItem("user"))
    const newDiscount = reactive({
      name: '',
      percent: '',
      description: '',
      status: 'active',
      user_id: activeUser.id,
      branch_id: '',
    });
    const branches = ref(null);
    const fetchData = async () => {
      try {
        branches.value = await store.dispatch("branch/getAllBranches");
        // console.log(branches.value)

        newDiscount.branch_id = branches.value.data[0].id;
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    onMounted(fetchData);
    const errors = reactive({
      name: '',
      percent: '',
      description: '',
      status: '',
    });

    const isFormValid = computed(() => {
      return Object.values(errors).every((error) => !error) &&
          Object.values(newDiscount).every((field) => field.trim?.() || field > 0);
    });

    const validateField = (field) => {
      if (!newDiscount[field]?.trim()) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} bo'sh bo'lmasligi kerak.`;
      } else {
        errors[field] = '';
      }
    };

    const handleSubmit = async () => {
      try {
        if (!isFormValid.value) return;
        const formData = new FormData();
        Object.entries(newDiscount).forEach(([key, value]) => {
          formData.append(key, value);
        });
        await store.dispatch('discount/addDiscount', formData);
        Object.keys(newDiscount).forEach((key) => {
          newDiscount[key] = key === 'status' ? 'active' : '';
        });
      } catch (e) {
        console.error(e);
      }
    };

    return {
      newDiscount,
      errors,
      validateField,
      handleSubmit,
      isFormValid,
      branches
    };
  },
};
</script>
