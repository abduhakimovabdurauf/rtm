<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kompaniya Nomi</label>
      <input
          v-model="newCompany.name"
          type="text"
          id="name"
          @input="validateField('name')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
          :class="{ 'border-red-500': errors.name }"
      />
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
    </div>

    <div class="mb-4">
      <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon Raqami</label>
      <input
          v-model="newCompany.phone"
          type="text"
          id="phone"
          @input="newCompany.phone = formatPhone(newCompany.phone)"
          placeholder="00 000-00-00"
          maxlength="14"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      />
    </div>

    <div class="mb-4">
      <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Manzili</label>
      <input
          v-model="newCompany.address"
          type="text"
          id="address"
          @input="validateField('address')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      />
    </div>

    <!-- Tavsif -->
    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
      <textarea
          v-model="newCompany.description"
          id="description"
          @input="validateField('description')"
          rows="3"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      ></textarea>
    </div>

    <!-- Holat -->
    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newCompany.status"
          id="status"
          @change="validateField('status')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
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


    <!-- Qo'shish Tugmasi -->
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
import { reactive, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const newCompany = reactive({
      name: "",
      phone: "",
      address: "",
      description: "",
      status: "active",
      image: null,
    });

    const errors = reactive({
      name: "",
    });

    const isFormValid = computed(() => !!newCompany.name.trim());

    const validateField = (field) => {
      const value = newCompany[field]?.trim?.() || newCompany[field];
      if (!value && field !== "image") {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} bo'sh bo'lmasligi kerak.`;
      } else if (field === "phone" && !/^\+?\d{9,15}$/.test(value)) {
        errors[field] = "'+998901234567' yoki '901234567' formatida bo'lishi kerak!";
      } else {
        errors[field] = "";
      }
    };

    const formatPhone = (value) => {
      let digits = value.replace(/\D/g, '');
      let match = digits.match(/^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);

      if (!match) return value;

      return !match[2]
          ? match[1]
          : `(${match[1]}) ${match[2]}${match[3] ? '-' + match[3] : ''}${match[4] ? '-' + match[4] : ''}`;
    };


    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file && !['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        errors.image = "Rasm faqat jpg, jpeg yoki png formatda bo'lishi kerak.";
        newCompany.image = null;
      } else {
        errors.image = "";
        newCompany.image = file;
      }
    };

    const handleSubmit = async () => {
      try {
        if (!isFormValid.value) {
          return;
        }

        const formData = new FormData();
        Object.entries(newCompany).forEach(([key, value]) => {
          if (value !== null) {
            formData.append(key, value);
          }
        });


        await store.dispatch("company/addCompany", formData);

        Object.keys(newCompany).forEach((key) => {
          newCompany[key] = key === "status" ? "active" : "";
        });
        newCompany.image = null;
        Object.keys(errors).forEach((key) => (errors[key] = ""));
      } catch (e) {
        console.error(e);
      }
    };

    return {
      newCompany,
      errors,
      validateField,
      handleSubmit,
      handleImageUpload,
      isFormValid,
      formatPhone,
    };
  },
};

</script>
