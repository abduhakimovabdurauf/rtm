<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kurs Nomi</label>
      <input
          v-model="newCourse.name"
          type="text"
          id="name"
          @input="validateField('name')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.name }"
      />
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
    </div>

    <div class="mb-4">
      <label for="duration" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Davomiyligi</label>
      <input
          v-model="newCourse.duration"
          type="text"
          id="duration"
          @input="validateField('duration')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.duration }"
      />
      <p v-if="errors.duration" class="text-red-500 text-sm mt-1">{{ errors.duration }}</p>
    </div>

    <div class="mb-4">
      <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Narxi</label>
      <input
          v-model="newCourse.price"
          type="number"
          id="price"
          @input="validateField('price')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.price }"
      />
      <p v-if="errors.price" class="text-red-500 text-sm mt-1">{{ errors.price }}</p>
    </div>

    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
      <textarea
          v-model="newCourse.description"
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
          v-model="newCourse.status"
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
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const newCourse = reactive({
      name: '',
      duration: '',
      price: '',
      description: '',
      status: 'active',
    });

    const errors = reactive({
      name: '',
      duration: '',
      price: '',
      description: '',
      status: '',
    });

    const isFormValid = computed(() => {
      return Object.values(errors).every((error) => !error) &&
          Object.values(newCourse).every((field) => field.trim?.() || field > 0);
    });

    const validateField = (field) => {
      if (!newCourse[field]?.trim()) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} bo'sh bo'lmasligi kerak.`;
      } else {
        errors[field] = '';
      }
    };

    const handleSubmit = async () => {
      try {
        if (!isFormValid.value) return;
        const formData = new FormData();
        Object.entries(newCourse).forEach(([key, value]) => {
          formData.append(key, value);
        });
        await store.dispatch('course/addCourse', formData);
        Object.keys(newCourse).forEach((key) => {
          newCourse[key] = key === 'status' ? 'active' : '';
        });
      } catch (e) {
        console.error(e);
      }
    };

    return {
      newCourse,
      errors,
      validateField,
      handleSubmit,
      isFormValid,
    };
  },
};
</script>
