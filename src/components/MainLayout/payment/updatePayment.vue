<template>
  <form @submit.prevent="handleSubmit" v-if="!isLoading">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tolov summasi</label>
      <input
          v-model.trim="form.summa"
          type="text"
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
          v-model.trim="form.payment_method"
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
          v-model.trim="form.contract_n"
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
          v-model.trim="form.payment_date"
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
          v-model.trim="form.group_id"
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
      <p v-else class="text-gray-500">Guruhlar yoq</p>
    </div>
    <div class="mb-4">
      <label for="student_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Oquvchi ID</label>
      <select
          id="student_id"
          required
          v-if="students && students.data && students.data.length > 0"
          v-model.trim="form.student_id"
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
      <label for="discount_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Chegirma ID</label>
      <select
          id="discount_id"
          required
          v-if="discounts && discounts.data && discounts.data.length > 0"
          v-model.trim="form.discount_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option
            v-for="discount in discounts.data"
            :key="discount.id"
            :value="discount.id"
        >
          {{ discount.name }}
        </option>
      </select>
      <p v-else class="text-gray-500">Chegirmalar yo'q</p>
    </div>
    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model.trim="form.status"
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
          v-model.trim="form.description"
          id="description"
          required
          rows="3"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      ></textarea>
    </div>
    <div class="flex justify-end">
      <button
          type="submit"
          :disabled="!isFormValid"
          class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg mb-12"
      >
        Qo'shish
      </button>
    </div>
  </form>
</template>

<script>
import {reactive, computed, ref, onMounted, watch} from "vue";
import { useStore } from "vuex";

export default {
  props: {
    paymentId: {
      type: Number,
      required: true
    }
  },
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();
    const isLoading = computed(() => store.getters.isLoading);

    const selectedPayment = computed(() =>
        store.state.payment.payments.find(payment => payment.id === props.paymentId)
    );

    const form = reactive({
      group_id: "",
      student_id: "",
      discount_id: "",
      summa: "",
      id: props.paymentId,
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
        groups.value = await store.dispatch('group/getAllGroups', { page: 1, perPage: 5, sortBy: 'id', orderBy: 'desc' });
        students.value = await store.dispatch('student/getAllStudents', { page: 1, perPage: 5, sortBy: 'id', orderBy: 'desc' });
        discounts.value = await store.dispatch('discount/getAllDiscounts', { page: 1, perPage: 5, sortBy: 'id', orderBy: 'desc' });
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    onMounted(fetchData);

    watch(
        selectedPayment,
        (payment) => {
          if (payment) {
            form.group_id = payment.group_id || "";
            form.student_id = payment.student_id || "";
            form.discount_id = payment.discount_id || "";
            form.summa = payment.summa || "";
            form.payment_method = payment.payment_method || "cash";
            form.payment_date = payment.payment_date || "";
            form.status = payment.status || "active";
            form.description = payment.description || "";
            form.contract_n = payment.contract_n || "";
          }
        },
        { immediate: true }
    );

    const isFormValid = computed(() => {
      return (
          form.summa &&
          form.description &&
          form.status !== "" &&
          form.group_id &&
          form.student_id &&
          form.discount_id &&
          form.payment_method &&
          form.payment_date &&
          form.contract_n
      );
    });

    const handleSubmit = async () => {
      try {
        const updatedPayment = {...form};
        await store.dispatch("payment/updatePayment", updatedPayment);
        resetForm();
        emit("close");
      } catch (error) {
        alert("Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
        console.error(error);
      }
    };

    const resetForm = () => {
      Object.assign(form, {
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
    };

    return {
      form,
      handleSubmit,
      isFormValid,
      groups,
      students,
      discounts,
      isLoading
    };
  },
};
</script>
