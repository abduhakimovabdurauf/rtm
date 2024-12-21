<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-xl mt-6 shadow-md">
    <div v-if="data" class="space-y-6">
      <div class="flex justify-center py-6">
        <img
            :src="data.image ? `https://api.mrtm.uz/storage/` + data.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFrS3DfXBwOlJdjx8cnKEiSIxaPPnoMOgOvGbhNGz_7rY0DiQUcAcMkiCf_5kkpkH7E18&usqp=CAU'"
            alt="User Image"
            class="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
        />
      </div>

      <div v-for="(value, key) in data" :key="key" class="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
        <span class="text-sm text-gray-600 capitalize">{{ formatKey(key) }}:</span>
        <span class="text-lg font-semibold text-gray-800">{{ formatData(value, key) }}</span>
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
        const response = await store.dispatch('student/getStudentById', route.params.id);
        console.log(response)
        if (response) {
          data.value = response;
        } else {
          console.error("Ma'lumot topilmadi.");
        }
      } catch (error) {
        console.error("Ma'lumot yuklashda xatolik:", error);
      }
    });

    const formatKey = (key) => {
      return key.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase());
    };

    const formatData = (value, key) => {
      if (key === 'status') {
        return value === 'active' ? 'Faol' : 'Faol emas';
      }
      if (key === 'birthday' || key === 'work_start' || key === 'work_end') {
        return new Date(value).toLocaleDateString();
      }
      return value || 'Ma\'lumot mavjud emas';
    };

    return {
      data,
      formatKey,
      formatData
    };
  },
};
</script>

<style scoped>
img {
  transition: transform 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.05);
}

div {
  transition: background-color 0.3s ease;
}

div:hover {
  background-color: #f9fafb;
}
</style>
