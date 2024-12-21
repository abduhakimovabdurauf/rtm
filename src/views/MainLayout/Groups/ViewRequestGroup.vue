<template>
  <div class="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg mt-6 border border-gray-200">
    <div v-if="data" class="space-y-4 overflow-hidden">

      <!-- Rasm -->
      <div class="flex justify-center py-4" v-if="data.image">
        <img
            :src="data.image ? `https://api.mrtm.uz/storage/` + data.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFrS3DfXBwOlJdjx8cnKEiSIxaPPnoMOgOvGbhNGz_7rY0DiQUcAcMkiCf_5kkpkH7E18&usqp=CAU'"
            alt="User Image"
            class="w-24 h-24 object-cover rounded-full border-4 border-gray-200"
        />
      </div>

      <div class="flex justify-start items-center space-x-6 py-4 border-b border-gray-200" v-for="(value, key) in data" :key="key">
        <span class="text-sm text-gray-600 capitalize font-medium w-36">{{ formatKey(key) }}:</span>
        <span class="text-lg font-semibold text-gray-800">{{ formatData(value, key) }}</span>
      </div>

    </div>
  </div>


  <div class="w-5/6 flex justify-between flex-wrap">

  </div>
  <div
      v-for="(payment, index) in payments"
      :key="index"
      class="w-1/2 bg-white rounded-xl mt-6 shadow-lg overflow-hidden"
  >
    <div class="text-black text-lg font-semibold py-4 px-6">
      To'lov ma'lumotlari
    </div>
    <table class="w-full table-auto text-left border-collapse">
      <thead>
      <tr class="bg-gray-700 text-white text-sm uppercase tracking-wide">
        <th class="px-6 py-3 border-b">Summa</th>
        <th class="px-6 py-3 border-b">Sanasi</th>
        <th class="px-6 py-3 border-b">To'lov turi</th>
      </tr>
      </thead>
      <tbody>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 text-gray-800 border-b">{{ payment.summa }}</td>
        <td class="px-6 py-4 text-gray-800 border-b">{{ payment.payment_date }}</td>
        <td class="px-6 py-4 text-gray-800 border-b">{{ payment.payment_method }}</td>
      </tr>
      </tbody>
    </table>
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
        const response = await store.dispatch('group/getGroupById', route.params.id);
        if (response) {
          data.value = response;
          payments.value= response.payments
          console.log("payments: ", typeof payments.value)
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

