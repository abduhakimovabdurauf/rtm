<template>
  <div class="relative w-1/2 mx-auto overflow-x-auto bg-white shadow-md sm:rounded-lg p-4 mt-6">
    <div v-if="data" class="space-y-4">
      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Nomi:</span>
        <span class="text-lg font-semibold text-gray-900">{{ data.name }}</span>
      </div>

      <div class="flex justify-between items-start border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Tavsif:</span>
        <span class="text-lg font-medium text-gray-700 max-w-md leading-relaxed">{{ data.description }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200" v-if="data.number">
        <span class="text-sm text-gray-500">Raqami:</span>
        <span class="text-lg font-semibold text-gray-900">{{ data.number }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Miqdori:</span>
        <span class="text-lg font-semibold text-gray-900">{{ data.quantity }}</span>
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

    const formatPrice = (price) => {
      return new Intl.NumberFormat('uz-UZ', {
        style: 'currency',
        currency: 'UZS',
      }).format(price);
    };

    onMounted(async () => {
      console.log(route.params.id);
      try {
        const response = await store.dispatch('room/getRoomById', route.params.id);
        if (response) {
          data.value = response.room;
          console.log(response)
        } else {
          console.error("Ma'lumot topilmadi.");
        }
      } catch (error) {
        console.error("Ma'lumot yuklashda xatolik:", error);
      }
    });

    return {
      data,
      formatPrice,
    };
  },
};
</script>
