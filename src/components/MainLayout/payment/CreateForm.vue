<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tolov summasi</label>
      <input
          v-model="newPayment.summa"
          type="text"
          id="name"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
      <textarea
          v-model="newPayment.description"
          id="description"
          required
          rows="3"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      ></textarea>
    </div>
    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newPayment.status"
          id="status"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="active">Faol</option>
        <option value="inactive">Faol emas</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="payment_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Guruh ID</label>
      <select
          id="payment_id"
          required
          v-model="newPayment.payment_id"
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
    </div>
    <div class="mb-4">
      <label for="student_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Oquvchi ID</label>
      <select
          id="student_id"
          required
          v-model="newPayment.student_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option
            v-for="student in students.data.data.students.data"
            :key="student.id"
            :value="student.id"
        >
          {{ student.name }}
        </option>
      </select>
    </div>
    <div class="flex justify-end">
      <button
          type="submit"
          :disabled="!isFormValid"
          class="w-full px-4 py-2 rounded-lg"
          :class="{
            'bg-blue-600 text-white': isFormValid,
            'bg-gray-400 text-gray-700 cursor-not-allowed': !isFormValid
          }"
      >
        Qo'shish
      </button>
    </div>
  </form>
</template>

<script>
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  emits: ["close"],
  setup(_, { emit }) {
    const store = useStore();

    const newPayment = reactive({
      user_id: "",
      payment_id: "",
      student_id: "",
      summa: "",
      status: "active",
      description: "",
    });

    const groups = reactive({ data: [] });
    const students = reactive({ data: {data:{students:{data:[]}}} });

    const fetchData = async () => {
      try {
        groups.data = await store.dispatch('payment/getAllGroups', {
          page: 1,
          perPage: 5,
          sortBy: 'id',
          orderBy: 'desk',
        });
        students.data = await store.dispatch('student/getAllStudents', {
          page: 1,
          perPage: 5,
          sortBy: 'id',
          orderBy: 'desc',
        });
        console.log('oquvchilar',students.data)
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    onMounted(fetchData);

    const isFormValid = computed(() => {
      return (
          newPayment.summa.trim() &&
          newPayment.description.trim() &&
          newPayment.status.trim() &&
          newPayment.group_id &&
          newPayment.student_id
      );
    });

    const handleSubmit = async () => {
      try {
        await store.dispatch("payment/addPayment", {...newPayment});
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
        name: "",
        status: "active",
        description: "",
      });
    };

    return {
      newPayment,
      handleSubmit,
      isFormValid,
      groups,
      students,
    };
  },
};
</script>
