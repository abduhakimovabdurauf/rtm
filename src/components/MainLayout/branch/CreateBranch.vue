<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kompaniya Nomi</label>
      <input
          v-model="newBranch.name"
          type="text"
          id="name"
          @input="validateField('name')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.name }"
      />
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
    </div>
    <div class="mb-4">
      <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon Raqami</label>
      <input
          v-model="newBranch.phone"
          type="text"
          id="phone"
          @input="validateField('phone')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.phone }"
      />
      <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
    </div>

    <div class="mb-4">
      <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Manzili</label>
      <input
          v-model="newBranch.address"
          type="text"
          id="address"
          @input="validateField('address')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.address }"
      />
      <p v-if="errors.address" class="text-red-500 text-sm mt-1">{{ errors.address }}</p>
    </div>

    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
      <textarea
          v-model="newBranch.description"
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
          v-model="newBranch.status"
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
import { reactive, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const activeUser = JSON.parse(localStorage.getItem("user"))

    const newBranch = reactive({
      name: "",
      phone: "",
      address: "",
      description: "",
      company_id: "",
      status: "active",
    });

    const errors = reactive({
      name: "",
      phone: "",
      address: "",
      description: "",
      status: "",
    });

    const isFormValid = computed(() => {
      const fieldsValid = Object.keys(errors).every((key) => !errors[key]);
      const requiredFieldsFilled =
          newBranch.name.trim() &&
          newBranch.phone.trim() &&
          newBranch.address.trim() &&
          newBranch.description.trim() &&
          newBranch.status;
      return fieldsValid && requiredFieldsFilled;
    });

    const validateField = (field) => {
      const value = newBranch[field]?.trim?.() || newBranch[field];
      if (!value) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} bo'sh bo'lmasligi kerak.`;
      } else if (field === "phone" && !/^\+?\d{9,15}$/.test(value)) {
        errors[field] = "Telefon raqami noto'g'ri formatda.";
      } else {
        errors[field] = "";
      }
    };

    const handleSubmit = async () => {
      try {
        if (!isFormValid.value) return;
        const formData = new FormData();
        Object.entries(newBranch).forEach(([key, value]) => {
          formData.append(key, value);
        });
        await store.dispatch("branch/addBranch", formData);
        Object.keys(newBranch).forEach((key) => {
          newBranch[key] = key === "status" ? "active" : "";
        });
      } catch (e) {
        console.error(e);
      }
    };

    return {
      newBranch,
      errors,
      validateField,
      handleSubmit,
      isFormValid,
    };
  },
};
</script>
