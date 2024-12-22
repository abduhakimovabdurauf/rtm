<template>
  <div class="flex justify-evenly flex-wrap">
    <div v-if="data" class="w-1/3 p-6 bg-white rounded-xl mt-6">
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

    <div class="w-2/4 bg-white rounded-l mt-6 overflow-hidden overflow-y-scroll">
      <table class="w-full text-sm">
        <thead class="h-10">
        <tr class="bg-gray-700 text-white">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Kurs nomi</th>
          <th class="px-6 py-4 text-left">Narxi</th>
          <th class="px-6 py-4 text-left">Holat</th>
          <th class="px-6 py-4 text-right">Amallar</th>
        </tr>
        </thead>
        <tbody v-if="data && data.courses && data.courses.length">
        <tr
            v-for="(course, index) in data.courses"
            :key="course.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-4 font-semibold">{{ index + 1 }}</td>
          <td class="px-6 py-4 font-semibold">{{ course.name }}</td>
          <td class="px-6 py-4 font-semibold">{{ course.price }}</td>
          <td class="px-6 py-4 font-semibold">{{ course.status }}</td>
          <td class="px-6 py-4 font-semibold">
            <router-link
                :to="{ name: 'WatchCourse', params: { id: course.id } }"
                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-show"></i>
            </router-link>
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="5" class="text-center py-4 text-gray-500">Kurs ma'lumotlari mavjud emas.</td>
        </tr>
        </tbody>

      </table>
    </div>

    <div class="w-1/3 bg-white rounded-l mt-6 overflow-hidden overflow-y-scroll">
      <table class="w-full text-sm">
        <thead class="h-10">
        <tr class="bg-gray-700 text-white">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Vazifalar</th>
        </tr>
        </thead>
        <tbody v-if="data && data.roles && data.roles.length">
        <tr
            v-for="(role, index) in data.roles"
            :key="role.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-4 font-semibold">{{ index + 1 }}</td>
          <td class="px-6 py-4 font-semibold">{{ role.name }}</td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="5" class="text-center py-4 text-gray-500">Vazifalar mavjud emas.</td>
        </tr>
        </tbody>

      </table>
    </div>

    <div class="w-2/4 bg-white rounded-l mt-6 overflow-hidden overflow-y-scroll">
      <table class="w-full text-sm">
        <thead class="h-10">
        <tr class="bg-gray-700 text-white">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Topshiriqlar</th>
          <th>Holat</th>
        </tr>
        </thead>
        <tbody v-if="data && data.tasks && data.tasks.length">
        <tr
            v-for="(task, index) in data.tasks"
            :key="task.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-4 font-semibold">{{ index + 1 }}</td>
          <td class="px-6 py-4 font-semibold">{{ task.text }}</td>
          <td class="px-6 py-4 font-semibold">{{ task.status }}</td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="5" class="text-center py-4 text-gray-500">Topshiriqlar mavjud emas.</td>
        </tr>
        </tbody>

      </table>
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
