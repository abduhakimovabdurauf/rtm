<template>
  <div>
    <form @submit.prevent="handleSubmit" class="overflow-scroll pb-2">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Ismi</label>
        <input
            type="text"
            id="name"
            v-model="form.full_name"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="login" class="block text-sm font-medium text-gray-700">Login</label>
        <input
            type="text"
            id="login"
            v-model="form.login"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
            type="text"
            id="email"
            v-model="form.email"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">Telefon raqami</label>
        <input
            type="text"
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
        <label for="links" class="block text-sm font-medium text-gray-700">Havolalar</label>
        <input
            type="text"
            id="links"
            v-model="form.links"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="birthday" class="block text-sm font-medium text-gray-700">Tug`ilgan sana</label>
        <input
            type="text"
            id="birthday"
            v-model="form.birthday"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="work_start" class="block text-sm font-medium text-gray-700">Ish boshlagan sana</label>
        <input
            type="text"
            id="work_start"
            v-model="form.work_start"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="work_end" class="block text-sm font-medium text-gray-700">Ish tugallagan sana</label>
        <input
            type="text"
            id="work_end"
            v-model="form.work_end"
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

      <div>
        <label for="image" class="block text-sm font-medium text-gray-700">Upload Image</label>
        <input
            type="file"
            id="image"
            @change="handleImageChange"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
import isEqual from 'lodash/isEqual';

export default {
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useStore();

    const selectedUser = computed(() =>
        store.state.user.users.find((user) => user.id === props.userId)
    );

    const form = ref({
      full_name: '',
      login: '',
      email: '',
      phone: '',
      address: '',
      links: '',
      birthday: '',
      work_start: '',
      work_end: '',
      id: props.userId,
      description: '',
      status: '',
      image: null,
    });

    const initialForm = ref({});

    const imagePreview = ref(null);

    watch(
        selectedUser,
        (user) => {
          if (user) {
            Object.assign(form.value, user);
            Object.assign(initialForm.value, user);
            imagePreview.value = user.image
                ? `https://api.mrtm.uz/storage/${user.image}`
                : null;
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
      return !isEqual(form.value, initialForm.value);
    });


    const handleSubmit = () => {
      const updatedUser = { ...form.value };
      store.dispatch('user/updateUser', updatedUser);
      initialForm.value = { ...form.value };
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

