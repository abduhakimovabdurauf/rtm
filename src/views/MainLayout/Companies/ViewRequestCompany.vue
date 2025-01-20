<template>
  <div class="flex justify-evenly flex-wrap">
    <div class="w-1/2 overflow-x-auto bg-white shadow-md sm:rounded-lg p-4 mt-6">
      <div v-if="data" class="space-y-2">
        <h1>Kompaniya malumotlari</h1>
        <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 duration-300">
          <span class="text-sm text-gray-500">Nomi:</span>
          <span class="text-lg font-semibold text-gray-900">{{ data.name }}</span>
        </div>

        <div class="flex justify-between items-start border-b p-2 hover:bg-gray-200 duration-300">
          <span class="text-sm text-gray-500">Tavsif:</span>
          <span class="text-lg font-medium text-gray-700 max-w-md leading-relaxed">{{ data.description }}</span>
        </div>

        <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 duration-300">
          <span class="text-sm text-gray-500">Telefon:</span>
          <span class="text-lg font-semibold text-gray-900">{{ formatPrice(data.phone) }}</span>
        </div>

        <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 duration-300">
          <span class="text-sm text-gray-500">Manzili:</span>
          <span class="text-lg font-semibold text-gray-900">{{ data.address }}</span>
        </div>

        <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 duration-300">
          <span class="text-sm text-gray-500">Status:</span>
          <StatusBadge :status="data.status" />
        </div>

        <img
            :src="data.image ? `https://api.mrtm.uz/storage/` + data.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFrS3DfXBwOlJdjx8cnKEiSIxaPPnoMOgOvGbhNGz_7rY0DiQUcAcMkiCf_5kkpkH7E18&usqp=CAU'"
            alt="Rasm mavjud emas"
            class="w-1/4 h-auto rounded-lg mt-4"
        />
      </div>
    </div>
<!--    <div class="w-2/3 bg-white rounded-l mt-6 overflow-hidden overflow-y-scroll">-->
<!--      <table class="w-full text-sm">-->
<!--        <thead class="h-10">-->
<!--        <tr class="bg-gray-700 text-white">-->
<!--          <th class="px-6 py-4 text-left">№</th>-->
<!--          <th class="px-6 py-4 text-left">Guruhlar</th>-->
<!--          <th class="px-6 py-4 text-left">Vaqti</th>-->
<!--          <th class="px-6 py-4 text-left">Holat</th>-->
<!--          <th class="px-6 py-4 text-right">Amallar</th>-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody v-if="data && data.groups && data.groups.length">-->
<!--        <tr-->
<!--            v-for="(group, index) in data.groups"-->
<!--            :key="group.id"-->
<!--            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"-->
<!--        >-->
<!--          <td class="px-6 py-4 font-semibold">{{ index + 1 }}</td>-->
<!--          <td class="px-6 py-4 font-semibold">{{ group.name }}</td>-->
<!--          <td class="px-6 py-4 font-semibold">{{ group.start_time }}</td>-->
<!--          <td class="px-6 py-4 font-semibold">-->
<!--            <StatusBadge :status="group.status" />-->
<!--          </td>-->
<!--          <td class="px-6 py-4 font-semibold">-->
<!--            <router-link-->
<!--                :to="{ name: 'WatchGroup', params: { id: group.id } }"-->
<!--                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"-->
<!--            >-->
<!--              <i class="bx bxs-show"></i>-->
<!--            </router-link>-->
<!--          </td>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--        <tbody v-else>-->
<!--        <tr>-->
<!--          <td colspan="5" class="text-center py-4 text-gray-500">Guruh ma'lumotlari mavjud emas.</td>-->
<!--        </tr>-->
<!--        </tbody>-->

<!--      </table>-->
<!--    </div>-->
  </div>

</template>


<script>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import StatusBadge from "@/components/MainLayout/ui/StatusBadge.vue";
export default {
  components: {
    StatusBadge,
  },
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
