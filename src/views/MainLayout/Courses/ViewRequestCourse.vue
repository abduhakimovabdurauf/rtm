<template>
  <div class="relative mx-auto w-1/2 overflow-x-auto bg-white shadow-md sm:rounded-lg p-4 mt-6">
    <div v-if="data" class="space-y-2">
      <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 duration-300">
        <span class="text-sm text-gray-500">Nomi:</span>
        <span class="text-lg font-semibold text-gray-900">{{ data.name }}</span>
      </div>

      <div class="flex justify-between items-start border-b p-2 hover:bg-gray-200 duration-300">
        <span class="text-sm text-gray-500">Tavsif:</span>
        <span class="text-lg font-medium text-gray-700 max-w-md leading-relaxed">{{ data.description }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 duration-300">
        <span class="text-sm text-gray-500">Narxi:</span>
        <span class="text-lg font-semibold text-gray-900">{{ formatPrice(data.price) }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 duration-300">
        <span class="text-sm text-gray-500">Davomiyligi:</span>
        <span class="text-lg font-semibold text-gray-900">{{ data.duration }} oy</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 duration-300">
        <span class="text-sm text-gray-500">Status:</span>
        <span
            :class="data.status === 'active' ? 'text-green-600' : 'text-red-600'"
            class="text-lg font-semibold">
          {{ data.status === 'active' ? 'Faol' : 'Faol emas' }}
        </span>
      </div>

      <img
          :src="data.image ? `https://api.mrtm.uz/storage/` + data.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFrS3DfXBwOlJdjx8cnKEiSIxaPPnoMOgOvGbhNGz_7rY0DiQUcAcMkiCf_5kkpkH7E18&usqp=CAU'"
          alt="Rasm mavjud emas"
          class="w-1/4 h-auto rounded-lg mt-4"
      />
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
        const response = await store.dispatch('course/getCourseById', route.params.id);
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
      formatPrice,
    };
  },
};
</script>
