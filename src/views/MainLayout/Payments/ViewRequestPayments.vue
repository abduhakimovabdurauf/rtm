<template>
  <div class="flex justify-between">
    <div v-if="data" class="space-y-6 w-1/3 p-6 bg-white rounded-xl mt-6">
      <h1>Tolov malumoti</h1>
      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Oquvchi ismi:</span>
        <span class="text-lg font-semibold text-gray-900">{{ data.student.full_name }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Summasi:</span>
        <span class="text-lg font-semibold text-gray-900">{{ data.summa }}</span>
      </div>

      <div class="flex justify-between items-start border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Sanasi:</span>
        <span class="text-lg font-medium text-gray-700 max-w-md leading-relaxed">{{ data.payment_date }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Chegirma:</span>
        <span class="text-lg font-semibold text-gray-900">{{ data.discount }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Status:</span>
        <span
            :class="data.status === 'active' ? 'text-green-600' : 'text-red-600'"
            class="text-lg font-semibold">
          {{ data.status === 'active' ? 'Faol' : 'Faol emas' }}
        </span>
      </div>

    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const data = ref(null);
    const payments = ref(null)
    onMounted(async () => {
      try {
        const response = await store.dispatch('payment/getPaymentById', route.params.id);
        if (response) {
          data.value = response;
          payments.value= response.payments
          console.log(data.value)
        } else {
          console.error("Ma'lumot topilmadi.");
        }
      } catch (error) {
        console.error("Ma'lumot yuklashda xatolik:", error);
      }
    });

    const isPrimitiveOrFormatted = (value) => {
      if (
          value === null ||
          ["string", "number", "boolean", "undefined"].includes(typeof value)
      ) {
        return true;
      }

      try {
        const parsed = JSON.parse(value);
        return typeof parsed !== "object" || parsed === null;
      } catch (e) {
        return false;
      }
    };

    const formatKey = (key) => {
      return key.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase());
    };

    const formatData = (value, key) => {
      try {
        const parsedValue = JSON.parse(value);
        if (typeof parsedValue === "object" && parsedValue !== null) {
          return "Ma'lumot mavjud emas";
        }
      } catch (e) {

      }

      if (key === 'status') {
        return value === 'active' ? 'Faol' : 'Faol emas';
      }
      if (key === 'birthday' || key === 'work_start' || key === 'work_end') {
        return new Date(value).toLocaleDateString();
      }
      return value || "Ma'lumot mavjud emas";
    };

    return {
      data,
      isPrimitiveOrFormatted,
      formatKey,
      formatData,
      payments,
    };
  },
};
</script>

