<template>
  <div class="flex justify-evenly flex-wrap">
    <div class="w-1/3 overflow-x-auto bg-white shadow-md sm:rounded-lg p-4 mt-6">
      <div v-if="data" class="space-y-2">
        <h1>Chegirma malumotlari</h1>
        <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 duration-300">
          <span class="text-sm text-gray-500">Nomi:</span>
          <span class="text-lg font-semibold text-gray-900">{{ data.name }}</span>
        </div>

        <div class="flex justify-between items-start border-b p-2 hover:bg-gray-200 duration-300">
          <span class="text-sm text-gray-500">Foiz:</span>
          <span class="text-lg font-medium text-gray-700 max-w-md leading-relaxed">{{ data.percent }} %</span>
        </div>

        <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 duration-300">
          <span class="text-sm text-gray-500">Tavsif:</span>
          <span class="text-lg font-semibold text-gray-900">{{ data.description }}</span>
        </div>

        <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 duration-300">
          <span class="text-sm text-gray-500">Status:</span>
          <span
              :class="data.status === 'active' ? 'text-green-600' : 'text-red-600'"
              class="text-lg font-semibold">
            {{ data.status === 'active' ? 'Faol' : 'Faol emas' }}
          </span>
        </div>
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

    onMounted(async () => {
      try {
        const response = await store.dispatch('discount/getDiscountById', route.params.id);
        if (response) {
          data.value = response;

          console.log(data.value)
        } else {
          console.error("Ma'lumot topilmadi.");
        }
      } catch (error) {
        console.error("Ma'lumot yuklashda xatolik:", error);
      }
    });

    return {
      data,
    };
  },
};
</script>
