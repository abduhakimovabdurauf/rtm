<template>
  <actionSidebar
      :title="sidebarTitle"
      @closeSidebar="closeUpdateSidebar"
  >
    <updateUser
        v-if="isUpdating"
        @close="closeUpdateSidebar"
        :userId="userId"
    />
  </actionSidebar>

  <div class="flex justify-evenly flex-wrap">
    <div v-if="data" class="w-1/3 border-2 p-6 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl mt-6 transition">
      <div class="flex justify-center py-6">
        <img
            :src="data.image ? `https://api.mrtm.uz/storage/users/` + data.image : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'"
            alt="User Image"
            class="w-32 h-32 object-cover rounded-full border-2 border-gray-300 dark:border-gray-600"
        />
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300">
        <span class="text-sm text-gray-500 dark:text-gray-400">Ismi:</span>
        <span class="text-lg font-semibold text-gray-900 dark:text-white">{{ data.full_name }}</span>
      </div>

      <div class="flex justify-between items-start border-b p-2 duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300">
        <span class="text-sm text-gray-500 dark:text-gray-400">Email:</span>
        <span class="text-lg font-medium text-gray-700 dark:text-gray-200 max-w-md leading-relaxed">{{ data.email }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300" v-if="data.phone">
        <span class="text-sm text-gray-500 dark:text-gray-400">Telefon:</span>
        <span class="text-lg font-semibold text-gray-900 dark:text-white">{{ data.phone }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300">
        <span class="text-sm text-gray-500 dark:text-gray-400">Tug'ilgan sana:</span>
        <span class="text-lg font-semibold text-gray-900 dark:text-white">{{ data.birthday }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300">
        <span class="text-sm text-gray-500 dark:text-gray-400">Ish boshlagan sana:</span>
        <span class="text-lg font-semibold text-gray-900 dark:text-white">{{ data.work_start }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300">
        <span class="text-sm text-gray-500 dark:text-gray-400">Status:</span>
        <span
            :class="data.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
            class="text-lg font-semibold"
        >
          {{ data.status === 'active' ? 'Faol' : 'Faol emas' }}
        </span>
      </div>

      <div class="flex justify-end">
        <button
            @click="openUpdateSidebar"
            class="transition ml-2 text-white bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 p-2 py-1 rounded duration-200"
        >
          <i class="bx bxs-edit-alt"></i>
        </button>

        <button
            @click="deleteById(userId)"
            class="transition ml-2 text-white bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 p-2 py-1 rounded duration-200"
        >
          <i class="bx bxs-trash-alt"></i>
        </button>
      </div>
    </div>

    <div class="w-2/4 bg-white dark:bg-gray-800 rounded-l mt-6 overflow-hidden overflow-y-scroll transition">
      <table class="w-full text-sm">
        <thead class="h-10">
        <tr class="bg-gray-700 dark:bg-slate-700 text-white">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Kurs nomi</th>
          <th class="px-6 py-4 text-left">Narxi</th>
          <th class="px-6 py-4 text-left">Holat</th>
          <th class="px-6 py-4 text-right">Amallar</th>
        </tr>
        </thead>
        <tbody v-if="data && data.my_courses && data.my_courses.length">
        <tr
            v-for="(course, index) in data.my_courses"
            :key="course.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-300 transition"
        >
          <td class="px-6 py-4 font-semibold">{{ index + 1 }}</td>
          <td class="px-6 py-4 font-semibold">{{ course.name }}</td>
          <td class="px-6 py-4 font-semibold">{{ course.price }}</td>
          <td class="px-6 py-4 font-semibold">{{ course.status }}</td>
          <td class="px-6 py-4 font-semibold">
            <router-link
                :to="{ name: 'WatchCourse', params: { id: course.id } }"
                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-show"></i>
            </router-link>
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="5" class="text-center py-4 text-gray-500 dark:text-gray-400">Kurs ma'lumotlari mavjud emas.</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="w-1/3 bg-white dark:bg-gray-800 rounded-l mt-6 overflow-hidden overflow-y-scroll">
      <table class="w-full text-sm">
        <thead class="h-10 bg-gray-700 text-white dark:bg-slate-700">
        <tr>
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Lavozim</th>
        </tr>
        </thead>
        <tbody v-if="data && data.roles && data.roles.length">
        <tr
            v-for="(role, index) in data.roles"
            :key="role.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-600 transition dark:text-white"
        >
          <td class="px-6 py-4 font-semibold">{{ index + 1 }}</td>
          <td class="px-6 py-4 font-semibold">{{ role.name }}</td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="5" class="text-center py-4 text-gray-500 dark:text-gray-400">
            Vazifalar mavjud emas.
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="w-2/4 bg-white dark:bg-gray-800 rounded-l mt-6 overflow-hidden overflow-y-scroll">
      <table class="w-full text-sm">
        <thead class="h-10 bg-gray-700 text-white dark:bg-slate-700">
        <tr>
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Topshiriqlar</th>
          <th>Holat</th>
        </tr>
        </thead>
        <tbody v-if="data && data.tasks && data.tasks.length">
        <tr
            v-for="(task, index) in data.tasks"
            :key="task.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-600 transition dark:text-white"
        >
          <td class="px-6 py-4 font-semibold">{{ index + 1 }}</td>
          <td class="px-6 py-4 font-semibold">{{ task.text }}</td>
          <td class="px-6 py-4 font-semibold">{{ task.status }}</td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="5" class="text-center py-4 text-gray-500 dark:text-gray-400">
            Topshiriqlar mavjud emas.
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { useRoute } from "vue-router";
import {computed, onMounted, ref, watch} from "vue";
import { useStore } from "vuex";

import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import updateUser from "@/components/MainLayout/user/UpdateUser.vue";
import updateGroup from "@/components/MainLayout/groups/updateGroup.vue";

export default {
  components: {
    updateGroup,
    actionSidebar,
    updateUser,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const data = ref(null);
    const isUpdating = ref(false)
    const userId = ref(null)
    const sidebarTitle = computed(() => {
      if (isUpdating.value) return "O'zgartirish";
      return "";
    });

    const openUpdateSidebar = ()=> {
      try {
        watch(() => route.params.id, (newId) => {
          userId.value = Number(newId);
        });
        isUpdating.value = true;
        store.dispatch("toggleSidebar", true);
      } catch (e) {

      }
    }

    const closeUpdateSidebar = ()=> {
      isUpdating.value = false;
      store.dispatch("toggleSidebar", false);
    }

    const deleteById = (id) => {
      if (!id) return console.error("Invalid company ID");
      store.dispatch("user/deleteUser", id);
    };

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
      formatData,
      userId,
      isUpdating,
      openUpdateSidebar,
      closeUpdateSidebar,
      sidebarTitle,
      deleteById,
    };
  },
};
</script>
