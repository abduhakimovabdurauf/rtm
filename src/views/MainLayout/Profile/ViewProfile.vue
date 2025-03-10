<template>

  <actionSidebar
    title="Profilni ozgartirish"
    @closeSidebar="toggleSidebar"
  >
    <updateUser
      :userId="userId"
    >

    </updateUser>
  </actionSidebar>
  <div class="flex flex-col items-center p-6 min-h-screen dark:bg-gray-900">
    <div class="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 dark:bg-gray-800 dark:text-white">
      <div class="flex items-center space-x-6">
        <img
            :src="data?.image ? `https://api.mrtm.uz/storage/users/` + data?.image : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'"
            alt="User Image"
            class="w-32 h-32 object-cover rounded-full border-4 border-gray-300 dark:border-gray-600"
        />
        <div>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ data?.full_name }}</h2>
          <p class="text-gray-500 dark:text-gray-400">{{ data?.email }}</p>
          <p class="text-gray-500 dark:text-gray-400" v-if="data?.phone">{{ data?.phone }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mt-6">
        <div class="p-3 bg-gray-50 rounded-lg shadow-sm dark:bg-gray-700" v-if="data?.companies && data?.companies.length>0">
          <span class="text-sm text-gray-500 dark:text-gray-400">Kompaniya</span>
          <p class="text-lg font-semibold text-gray-900 dark:text-white" v-for="company in data?.companies">
            {{ company.name }}
          </p>
        </div>
        <div class="p-3 bg-gray-50 rounded-lg shadow-sm dark:bg-gray-700" v-if="data?.branches && data?.branches.length>0">
          <span class="text-sm text-gray-500 dark:text-gray-400">Filial</span>
          <p class="text-lg font-semibold text-gray-900 dark:text-white" v-for="branch in data?.branches">
            {{ branch.name }}
          </p>
        </div>
        <div class="p-3 bg-gray-50 rounded-lg shadow-sm dark:bg-gray-700" v-if="data?.birthday">
          <span class="text-sm text-gray-500 dark:text-gray-400">Tug'ilgan sana</span>
          <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ data?.birthday }}</p>
        </div>
        <div class="p-3 bg-gray-50 rounded-lg shadow-sm dark:bg-gray-700" v-if="data?.work_start">
          <span class="text-sm text-gray-500 dark:text-gray-400">Ish boshlagan sana</span>
          <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ data?.work_start }}</p>
        </div>
        <div class="p-3 bg-gray-50 rounded-lg shadow-sm dark:bg-gray-700" v-if="data?.roles && data?.roles.length>0">
          <span class="text-sm text-gray-500 dark:text-gray-400">Lavozimi</span>
          <p class="text-lg font-semibold text-gray-900 dark:text-white" v-for="role in data?.roles">
            {{ role.name }}
          </p>
        </div>
        <div class="p-3 bg-gray-50 rounded-lg shadow-sm dark:bg-gray-700">
          <span class="text-sm text-gray-500 dark:text-gray-400">Status</span>
          <p :class="data?.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'" class="text-lg font-semibold">
            {{ data?.status === 'active' ? 'Faol' : 'Faol emas' }}
          </p>
        </div>
      </div>

      <div class="flex justify-end mt-6 space-x-2">
        <button @click="openUpdateSidebar" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded dark:bg-green-600 dark:hover:bg-green-700">
          <i class="bx bxs-edit-alt"></i> Edit profile
        </button>
      </div>
    </div>

    <div class="w-full max-w-4xl mt-6" v-if="data?.my_courses && data?.my_courses.length>0">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Kurslar</h3>
      <table class="w-full bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-800">
        <thead class="bg-gray-700 text-white dark:bg-gray-700">
        <tr>
          <th class="px-4 py-2 text-left">№</th>
          <th class="px-4 py-2 text-left">Kurs nomi</th>
          <th class="px-4 py-2 text-left">Narxi</th>
          <th class="px-4 py-2 text-left">Holat</th>
          <th class="px-4 py-2 text-right">Amallar</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(course, index) in data?.my_courses" :key="course.id" class="border-b hover:bg-gray-100 dark:hover:bg-gray-500">
          <td class="px-4 py-2 dark:text-white">{{ index + 1 }}</td>
          <td class="px-4 py-2 dark:text-white">{{ course.name }}</td>
          <td class="px-4 py-2 dark:text-white">{{ course.price }}</td>
          <td class="px-4 py-2 dark:text-white">{{ course.status }}</td>
          <td class="px-4 py-2 text-right">
            <router-link :to="{ name: 'WatchCourse', params: { id: course.id } }" class="text-blue-500 dark:text-blue-400">
              <i class="bx bxs-show"></i>
            </router-link>
          </td>
        </tr>
        <tr v-if="!data?.my_courses.length">
          <td colspan="5" class="text-center py-4 text-gray-500 dark:text-gray-400">Kurs ma'lumotlari mavjud emas.</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>


<script>
import { onMounted, ref, watch} from "vue";
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
    const store = useStore();
    const user = JSON.parse(localStorage.getItem("user"));
    const data = ref(null);
    const isUpdating = ref(false)
    const userId = ref(null)

    const openUpdateSidebar = ()=> {
      try {
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
        const response = await store.dispatch('user/getUserById', user.id);
        if (response) {
          data.value = response.user;
          userId.value = response.user.id
        } else {
          console.error("Ma'lumot topilmadi.");
        }
      } catch (error) {
        console.error("Ma'lumot yuklashda xatolik:", error);
      }
    });

    const toggleSidebar = () => {
      store.dispatch("toggleSidebar", false);
    };

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
      toggleSidebar,
      deleteById,
    };
  },
};
</script>
