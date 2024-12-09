<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <transition name="bounce">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-lg font-semibold mb-4">Kurs Qo'shish</h2>
        <form @submit.prevent="handleSubmit" >
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
            <button type="button" @click="closeModal" class="text-gray-500 dark:text-gray-300 mr-4">Orqaga</button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg">Qo'shish</button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import { reactive } from 'vue';
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

    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append('name', newCourse.name);
        formData.append('duration', newCourse.duration);
        formData.append('price', newCourse.price);
        formData.append('description', newCourse.description);
        formData.append('status', newCourse.status);
        if (newCourse.image) formData.append('image', newCourse.image);
        console.log(1,formData)
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
    };
  },
};
</script>

<style scoped>
@keyframes bounce-in-left {
  0% {
    opacity: 0;
    transform: translateY(-300px);
  }
  60% {
    opacity: 1;
    transform: translateY(25px);
  }
  80% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.bounce-enter-active {
  animation: bounce-in-left 0.6s ease forwards;
}
.bounce-leave-active {
  animation: bounce-in-left 0.6s ease reverse forwards;
}
</style>
