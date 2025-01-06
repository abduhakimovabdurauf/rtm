<template>
  <form @submit.prevent="handleSubmit" v-if="!isLoading">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tolov summasi</label>
      <input
          v-model.trim="newPayment.summa"
          type="number"
          id="name"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="payment_method" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        To'lov usuli
      </label>
      <select
          v-model.trim="newPayment.payment_method"
          id="payment_method"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="cash">Naqd</option>
        <option value="card">Karta</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="contract_n" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Shartnoma raqami
      </label>
      <input
          v-model.trim="newPayment.contract_n"
          type="text"
          id="contract_n"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>

    <div class="mb-4">
      <label for="payment_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        To'lov sanasi
      </label>
      <input
          v-model.trim="newPayment.payment_date"
          type="date"
          id="payment_date"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="group_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Guruh ID</label>
      <select
          id="group_id"
          required
          v-model.trim="newPayment.group_id"
          v-if="groups && groups.data && groups.data.length > 0"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option
            v-for="payment in groups.data"
            :key="payment.id"
            :value="payment.id"
        >
          {{ payment.name }}
        </option>
      </select>
      <p v-else class="text-gray-500">No groups available</p>
    </div>
    <div class="mb-4">
      <label for="student_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Oquvchi ID</label>
      <select
          id="student_id"
          required
          v-if="students && students.data && students.data.length > 0"
          v-model.trim="newPayment.student_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option
            v-for="student in students.data"
            :key="student.id"
            :value="student.id"
        >
          {{ student.full_name }}
        </option>
      </select>
      <p v-else class="text-gray-500">O'quvchilar yo'q</p>
    </div>
    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model.trim="newPayment.status"
          id="status"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="completed">Tasdiqlandi</option>
        <option value="failed">Tasdiqlanmadi</option>
        <option value="pending">Ko'rib chiqilmoqda</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
      <textarea
          v-model.trim="newPayment.description"
          id="description"
          required
          rows="3"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      ></textarea>
    </div>
    <div class="flex justify-end">
      <button
          type="submit"
          class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg mb-12"
      >
        Qo'shish
      </button>
    </div>
  </form>
</template>

<script>
import { reactive, ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  emits: ["close"],
  setup(_, { emit }) {
    const store = useStore();
    const isLoading = computed(() => store.getters.isLoading);
    const newPayment = reactive({
      group_id: "",
      student_id: "",
      discount_id: "",
      summa: "",
      payment_method: "cash",
      payment_date: "",
      status: "active",
      description: "",
      contract_n: "",
    });
    const groups = ref(null);
    const students = ref(null);
    const discounts = ref(null);

    const fetchData = async () => {
      try {
        groups.value = await store.dispatch('group/getAllGroups', {
          page: 1,
          perPage: 5,
          sortBy: 'id',
          orderBy: 'desc',
        });
        students.value = await store.dispatch('student/getAllStudents', {
          page: 1,
          perPage: 5,
          sortBy: 'id',
          orderBy: 'desc',
        });
        discounts.value = await store.dispatch('discount/getAllDiscounts', {
          page: 1,
          perPage: 5,
          sortBy: 'id',
          orderBy: 'desc',
        });
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    onMounted(fetchData);

    const isFormValid = computed(() => {
      return (
          newPayment.summa &&
          newPayment.description &&
          newPayment.status !== "" &&
          newPayment.group_id &&
          newPayment.student_id &&
          newPayment.payment_method &&
          newPayment.payment_date &&
          newPayment.contract_n
      );
    });

    const handleSubmit = async () => {
      try {
        await store.dispatch("payment/addPayment", { ...newPayment });
        resetForm();
        emit("close");
      } catch (error) {
        alert("Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
        console.error(error);
      }
    };

    const resetForm = () => {
      Object.assign(newPayment, {
        group_id: "",
        student_id: "",
        summa: "",
        payment_method: "cash",
        payment_date: "",
        status: "active",
        description: "",
        contract_n: "",
      });
    };

    return {
      newPayment,
      handleSubmit,
      isFormValid,
      groups,
      students,
      isLoading
    };
  },
};
</script>
