<template>
  <form @submit.prevent="handleSubmit">
    <!-- Kompaniya Nomi -->
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kompaniya Nomi</label>
      <input
          v-model="newCompany.name"
          type="text"
          id="name"
          @input="validateField('name')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.name }"
      />
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
    </div>

    <!-- Telefon Raqami -->
    <div class="mb-4">
      <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon Raqami</label>
      <input
          v-model="newCompany.phone"
          type="text"
          id="phone"
          @input="validateField('phone')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.phone }"
      />
      <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
    </div>

    <!-- Manzil -->
    <div class="mb-4">
      <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Manzili</label>
      <input
          v-model="newCompany.address"
          type="text"
          id="address"
          @input="validateField('address')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.address }"
      />
      <p v-if="errors.address" class="text-red-500 text-sm mt-1">{{ errors.address }}</p>
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
          :class="{ 'border-red-500': errors.description }"
      ></textarea>
      <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
    </div>

    <!-- Holat -->
    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newCompany.status"
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

    <div class="mb-4">
      <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Rasm Yuklash</label>
      <input
          type="file"
          id="image"
          ref="image"
          @change="handleImageUpload"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          :class="{ 'border-red-500': errors.image }"
      />
      <p v-if="errors.image" class="text-red-500 text-sm mt-1">{{ errors.image }}</p>
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
      phone: "",
      address: "",
      description: "",
      image: "",
      status: "",
    });

    const isFormValid = computed(() => {
      const fieldsValid = Object.keys(errors).every((key) => !errors[key]);
      const requiredFieldsFilled =
          newCompany.name.trim() &&
          newCompany.phone.trim() &&
          newCompany.address.trim() &&
          newCompany.description.trim() &&
          newCompany.status;
      return fieldsValid && requiredFieldsFilled;
    });

    const validateField = (field) => {
      const value = newCompany[field]?.trim?.() || newCompany[field];
      if (!value) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} bo'sh bo'lmasligi kerak.`;
      } else if (field === "phone" && !/^\+?\d{9,15}$/.test(value)) {
        errors[field] = "'+998901234567' yoki '901234567' formatida bolishi kerak!";
      } else {
        errors[field] = "";
      }
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
        if (!isFormValid.value || !newCompany.image) {
          if (!newCompany.image) {
            errors.image = "Rasm yuklash shart.";
          }
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
    };
  },
};
</script>
