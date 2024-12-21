<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ismi</label>
        <input
            v-model="form.full_name"
            type="text"
            id="name"
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Parol</label>
        <input
            v-model="form.password"
            type="text"
            id="password"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
            v-model="form.email"
            type="email"
            id="email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon</label>
        <input
            v-model="form.phone"
            type="text"
            id="phone"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Manzili</label>
        <input
            v-model="form.address"
            type="text"
            id="address"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="links" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Havolalar</label>
        <input
            v-model="form.links"
            type="text"
            id="links"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="birthday" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tug'ilgan sana</label>
        <input
            v-model="form.birthday"
            type="date"
            id="birthday"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="work_start" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ish boshlagan vaqti</label>
        <input
            v-model="form.work_start"
            type="date"
            id="work_start"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="work_end" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ish tamomlagan vaqti</label>
        <input
            v-model="form.work_end"
            type="date"
            id="work_end"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
        <textarea
            v-model="form.description"
            id="description"
            rows="3"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="from" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Dan</label>
        <select
            v-model="form.from"
            id="gender"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="tanish">tanish</option>
          <option value="maktab">maktab</option>
          <option value="telegram">telegram</option>
          <option value="instagram">instagram</option>
          <option value="facebook">facebook</option>
          <option value="ota-onam">ota-onam</option>
          <option value="tashqi reklama">tashqi reklama</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="gender" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Jinsi</label>
        <select
            v-model="form.gender"
            id="gender"
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="man">Erkak</option>
          <option value="woman">Ayol</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
        <select
            v-model="form.status"
            id="status"
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
            multiple
            ref="image"
            @change="handleImageChange"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="flex justify-end mb-20">
        <button
            type="submit"
            :disabled="!isFormChanged"
            class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
            :class="{ 'opacity-50 cursor-not-allowed': !isFormChanged }"
        >
          O`zgartirish
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
    studentId: {
      type: Number,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useStore();

    const selectedStudent = computed(() =>
        store.state.student.students.find((student) => student.id === props.studentId)
    );
    console.log('student: ',selectedStudent.value);
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
      id: props.studentId,
      description: '',
      status: '',
      image: null,
    });

    const initialForm = ref({});

    const imagePreview = ref(null);

    watch(
        selectedStudent,
        (student) => {
          if (student) {
            Object.assign(form.value, student);
            Object.assign(initialForm.value, student);
            imagePreview.value = student.image
                ? `https://api.mrtm.uz/storage/${student.image}`
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
      const updatedStudent = { ...form.value };
      store.dispatch('student/updateStudent', updatedStudent);
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

