<template>
  <div class="flex justify-between">
    <div v-if="data" class="space-y-6 w-1/2 mx-auto p-6 bg-white rounded-xl mt-6">
      <div class="flex justify-center py-6">
        <img
            :src="data.image ? `https://api.mrtm.uz/storage/` + data.image : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'"
            alt="User Image"
            class="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
        />
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Ismi:</span>
        <span class="text-lg font-semibold text-gray-900">{{ data.full_name }}</span>
      </div>

      <div class="flex justify-between items-start border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Email:</span>
        <span class="text-lg font-medium text-gray-700 max-w-md leading-relaxed">{{ data.email }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200" v-if="data.phone">
        <span class="text-sm text-gray-500">Telefon:</span>
        <span class="text-lg font-semibold text-gray-900">{{ data.phone }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Tug'ulgan sana:</span>
        <span class="text-lg font-semibold text-gray-900">{{ data.birthday }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Ish boshlagan sana:</span>
        <span class="text-lg font-semibold text-gray-900">{{ data.work_start }}</span>
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
<!--    <div class="overflow-x-auto bg-white rounded-lg">-->
<!--      <table class="w-1/3 bg-white dark:bg-gray-800 text-sm rounded-lg text-gray-700 dark:text-gray-300">-->
<!--        <thead>-->
<!--        <tr class="bg-gray-700 text-white">-->
<!--          <th class="px-6 py-4 text-left">№</th>-->
<!--          <th class="px-6 py-4 text-left">Kurs nomi</th>-->
<!--          <th class="px-6 py-4 text-left">Holat</th>-->
<!--          <th class="px-6 py-4 text-right">Amallar</th>-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--        <tr-->
<!--            v-for="(course, index) in data.courses"-->
<!--            :key="course.id"-->
<!--            class="hover:bg-gray-100 dark:hover:bg-gray-700 transition"-->
<!--        >-->
<!--          <td class="px-6 py-4 font-semibold text-gray-800 dark:text-white">{{ index + 1 }}</td>-->
<!--          <td class="px-6 py-4 font-semibold">{{ course.name }}</td>-->
<!--          <td class="px-6 py-4">-->
<!--                <span-->
<!--                    :class="{-->
<!--                    'px-3 py-1 text-xs font-medium rounded-full shadow-sm': true,-->
<!--                    'bg-green-200 text-green-800': course.status === 'Active',-->
<!--                    'bg-red-200 text-red-800': course.status === 'Inactive',-->
<!--                  }"-->
<!--                >-->
<!--                  {{ course.status }}-->
<!--                </span>-->
<!--          </td>-->
<!--          <td class="px-6 py-4 space-x-3 text-right">-->
<!--            <router-link-->
<!--                :to="{ name: 'WatchCourse', params: { id: course.id } }"-->
<!--                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"-->
<!--            >-->
<!--              <i class="bx bxs-show"></i>-->
<!--            </router-link>-->
<!--          </td>-->
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

export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const data = ref(null);

    onMounted(async () => {
      try {
        const response = await store.dispatch('user/getUserById', route.params.id);
        if (response) {
          data.value = response.user;
          console.log(data.value)
        } else {
          console.error("Ma'lumot topilmadi.");
        }
      } catch (error) {
        console.error("Ma'lumot yuklashda xatolik:", error);
      }
    });

    const formatKey = (key) => {
      return key.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase()); // Format key for better readability
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
