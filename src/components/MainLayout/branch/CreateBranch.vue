<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="company_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kompaniya</label>
      <select
          id="company_id"
          required
          v-if="companies && companies.data && companies.data.length > 0"
          v-model="newBranch.company_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option v-for="company in companies.data" :key="company.id" :value="company.id" selected>
          {{ company.name }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filial Nomi</label>
      <input
          v-model.trim="newBranch.name"
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
          type="number"
          id="phone"
          @input="validateField('phone')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      />
    </div>

    <div class="mb-4">
      <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Manzili</label>
      <input
          v-model="newBranch.address"
          type="text"
          id="address"
          @input="validateField('address')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      />
    </div>

    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
      <textarea
          v-model="newBranch.description"
          id="description"
          @input="validateField('description')"
          rows="3"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      ></textarea>
    </div>

    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newBranch.status"
          id="status"
          @change="validateField('status')"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      >
        <option value="active">Faol</option>
        <option value="inactive">Faol emas</option>
      </select>
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
import {reactive, ref, computed, onMounted} from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const newBranch = reactive({
      name: "",
      phone: "",
      address: "",
      description: "",
      company_id: "",
      status: "active",
      users: [],
    });
    
    const companies = ref(null)

    const fetchData = async () => {
      try {
        companies.value = await store.dispatch("company/getAllCompanies");
        if (companies.value && companies.value.data && companies.value.data.length > 0) {
          newBranch.company_id = companies.value.data[0].id;
        }
      } catch (error) {
        console.error(error);
      }
    };


    onMounted(fetchData);
    
    const errors = reactive({
      name: "",
      company_id: "",
    });

    const isFormValid = computed(() => {
      const fieldsValid = Object.keys(errors).every((key) => !errors[key]);
      const requiredFieldsFilled =
          newBranch.name &&
          newBranch.company_id;
      return fieldsValid && requiredFieldsFilled;
    });

    const validateField = (field) => {
      const value = newBranch[field]?.trim?.() || newBranch[field];

      if ((field === "name" || field === "company_id") && !value) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} bo'sh bo'lmasligi kerak.`;
      } else if (field === "phone" && value && !/^\+?\d{9,15}$/.test(value)) {
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
      companies,
    };
  },
};
</script>
