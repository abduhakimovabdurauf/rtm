<template>
  <div>
    <form @submit.prevent="handleSubmit" class="overflow-scroll pb-2">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nomi</label>
        <input
            type="text"
            id="name"
            v-model="form.name"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
        />
      </div>

      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon Raqami</label>
        <input
            type="number"
            id="phone"
            v-model="form.phone"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
        />
      </div>

      <div>
        <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Manzili</label>
        <input
            type="text"
            id="address"
            v-model="form.address"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
        />
      </div>

      <div>
        <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
        <select
            id="status"
            v-model="form.status"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
        >
          <option value="active">Faol</option>
          <option value="inactive">Faol emas</option>
        </select>
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
        <textarea
            id="description"
            v-model="form.description"
            rows="4"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
        ></textarea>
      </div>

      <div>
        <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Image</label>
        <input
            type="file"
            id="image"
            @change="handleImageChange"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
            accept="image/*"
        />
        <div v-if="imagePreview" class="mt-2">
          <img :src="imagePreview" alt="Image Preview" class="w-full h-auto rounded-md" />
        </div>
      </div>

      <div class="flex justify-between items-center">
        <button
            type="submit"
            :disabled="!isFormChanged"
            class="w-full px-6 py-2 bg-indigo-600 dark:bg-indigo-700 text-white font-semibold rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
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
    companyId: {
      type: Number,
      required: true,
    },
  },
  emits: ['close'],
  setup(props,{ emit }) {
    const store = useStore();

    const selectedCompany = computed(() =>
        store.state.company.companies.find((company) => company.id === props.companyId)
    );

    const form = ref({
      name: '',
      phone: '',
      address: '',
      description: '',
      id: props.companyId,
      status: '',
      image: null,
    });

    const initialForm = ref({});

    const imagePreview = ref(null);

    watch(
        selectedCompany,
        (company) => {
          if (company) {
            form.value = { ...company };
            initialForm.value = { ...company };
            imagePreview.value =
                company.image && `http://192.168.11.71:8000/storage/${company.image}`;
          }
        },
        { immediate: true }
    );

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        form.value.image = file;
        const reader = new FileReader();
        reader.onload = () => {
          imagePreview.value = reader.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const isFormChanged = computed(() => {
      const { name, phone, address, description, status } = form.value;
      const { name: initName, phone: initPhone, address: initAddress, description: initDescription, status: initStatus } = initialForm.value;

      return (
          name !== initName ||
          phone !== initPhone ||
          address !== initAddress ||
          description !== initDescription ||
          status !== initStatus ||
          form.value.image !== initialForm.value.image
      );
    });

    const handleSubmit = () => {
      const updatedCompany = {
        ...form.value,
        id: props.companyId,
      };
      store.dispatch('company/updateCompany', updatedCompany);
      closeModal();
    };

    function closeModal() {
      emit('close');
    }

    return {
      form,
      imagePreview,
      handleSubmit,
      handleImageChange,
      isFormChanged,
    };
  },
};
</script>
