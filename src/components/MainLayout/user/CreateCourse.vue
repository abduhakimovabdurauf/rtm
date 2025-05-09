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
      <label for="tag" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Qisqartirligan Nomi</label>
      <input
          v-model="newCourse.tag"
          type="text"
          id="tag"
          @input="validateField('tag')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.tag }"
      />
      <p v-if="errors.tag" class="text-red-500 text-sm mt-1">{{ errors.tag }}</p>
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
      />
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
          class="w-full bg-blue-600 text-white px-4 py-2 mb-14 rounded-lg"
          :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
      >
        Qo'shish
      </button>
    </div>
  </form>
</template>

<script>
import {reactive, computed,} from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    branchId: {
      required: true,
      type: Number
    }
  },
  setup(props) {
    const store = useStore();
    const activeUser = JSON.parse(localStorage.getItem("user"))
    const newCourse = reactive({
      name: '',
      duration: '',
      tag: '',
      price: '',
      description: '',
      branch_id: props.branchId,
      user_id: activeUser.id,
      status: 'active',
    });

    const errors = reactive({
      name: '',
      duration: '',
      price: '',
      description: '',
      status: '',
      tag: '',
    });



    const isFormValid = computed(() => {
      return (
          Object.values(errors).every(error => !error) &&
          newCourse.name.trim() &&
          newCourse.tag.trim() &&
          newCourse.description.trim() &&
          newCourse.branch_id &&
          newCourse.status &&
          !isNaN(newCourse.price) && newCourse.price > 0 &&
          !isNaN(newCourse.duration) && newCourse.duration > 0
      );
    });


    const validateField = (field) => {
      const value = newCourse[field];

      if (typeof value === 'string' && !value.trim()) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} bo'sh bo'lmasligi kerak.`;
      } else if (['price', 'duration'].includes(field) && (isNaN(value) || value <= 0)) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} musbat son bo‘lishi kerak.`;
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
