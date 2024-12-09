<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kurs Nomi</label>
      <input
          v-model="newCourse.name"
          type="text"
          id="name"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="duration" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Davomiyligi</label>
      <input
          v-model="newCourse.duration"
          type="text"
          id="duration"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Narxi</label>
      <input
          v-model="newCourse.price"
          type="number"
          id="price"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
      <textarea
          v-model="newCourse.description"
          id="description"
          required
          rows="3"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      ></textarea>
    </div>
    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newCourse.status"
          id="status"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="active">Faol</option>
        <option value="inactive">Faol emas</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Rasm Yuklash</label>
      <input
          type="file"
          id="image"
          ref="image"
          @change="handleImageUpload"
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
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useStore();
    const newCourse = reactive({
      name: '',
      duration: '',
      price: '',
      description: '',
      status: 'active',
      image: null,
    });

    const isFormValid = computed(() => {
      return (
          newCourse.name.trim() &&
          newCourse.duration.trim() &&
          newCourse.price > 0 &&
          newCourse.description.trim() &&
          newCourse.status.trim()
      );
    });

    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append('name', newCourse.name);
        formData.append('duration', newCourse.duration);
        formData.append('price', newCourse.price);
        formData.append('description', newCourse.description);
        formData.append('status', newCourse.status);
        if (newCourse.image) formData.append('image', newCourse.image);

        await store.dispatch('course/addCourse', formData);
        closeModal();

        newCourse.name = '';
        newCourse.duration = '';
        newCourse.price = '';
        newCourse.description = '';
        newCourse.status = 'active';
        newCourse.image = null;
      } catch (e) {
        console.error(e);
      }
    };

    const handleImageUpload = (event) => {
      newCourse.image = event.target.files[0];
    };

    function closeModal() {
      emit('close');
    }

    return {
      newCourse,
      handleSubmit,
      closeModal,
      handleImageUpload,
      isFormValid,
    };
  },
};
</script>
