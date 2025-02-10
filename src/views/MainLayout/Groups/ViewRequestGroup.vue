<template>
  <actionSidebar
      :title="sidebarTitle"
      @closeSidebar="closeUpdateSidebar"
  >
    <updateGroup
        v-if="isUpdating"
        @close="closeUpdateSidebar"
        :groupId="groupId"
    />

  </actionSidebar>
  <div class="flex justify-evenly flex-wrap">
    <div v-if="data" class="space-y-6 w-1/3 p-6 bg-white rounded-xl mt-6">
      <h1>Guruh malumotlari</h1>
      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Nomi:</span>
        <span class="text-lg font-semibold text-gray-900">{{ data.name }}</span>
      </div>

      <div class="flex justify-between items-start border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Kurs:</span>
        <span class="text-lg font-medium text-gray-700 max-w-md leading-relaxed">{{ data.course.name }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200" v-if="data.number">
        <span class="text-sm text-gray-500">Boshlanish vaqti:</span>
        <span class="text-lg font-semibold text-gray-900">{{ data.start_time }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Boshlangan sana:</span>
        <span class="text-lg font-semibold text-gray-900">{{ data.start_date }}</span>
      </div>

      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">
        <span class="text-sm text-gray-500">Status:</span>
        <StatusBadge :status="data.status" />
      </div>
      <div class="flex justify-end">
        <button
            @click="openUpdateSidebar"
            class="transition ml-2 text-white bg-green-500 hover:bg-green-600 p-2 py-1 rounded duration-200"
        >
          <i class="bx bxs-edit-alt"></i>
        </button>

        <button
            @click="deleteById(groupId)"
            class="transition ml-2 text-white bg-red-500 hover:bg-red-600 p-2 py-1 rounded duration-200"
        >
          <i class="bx bxs-trash-alt"></i>
        </button>
      </div>
    </div>



    <div class="w-2/4 bg-white rounded-l mt-6 overflow-hidden overflow-y-scroll">
      <table class="w-full text-sm">
        <thead class="h-10">
        <tr class="bg-gray-700 text-white">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Oquvchi ismi</th>
          <th class="px-6 py-4 text-left">Email</th>
          <th class="px-6 py-4 text-left">Holat</th>
          <th class="px-6 py-4 text-right">Amallar</th>
        </tr>
        </thead>
        <tbody v-if="data && data.students && data.students.length">
        <tr
            v-for="(students, index) in data.students"
            :key="students.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-4 font-semibold">{{ index + 1 }}</td>
          <td class="px-6 py-4 font-semibold">{{ students.full_name }}</td>
          <td class="px-6 py-4 font-semibold">{{ students.email }}</td>
          <td class="px-6 py-4 font-semibold">
            <StatusBadge :status="students.status" />
          </td>
          <td class="px-6 py-4 font-semibold">
            <router-link
                :to="{ name: 'WatchStudent', params: { id: students.id } }"
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
          <th class="px-6 py-4 text-left">Tolov</th>
          <th class="px-6 py-4 text-left">Holat</th>
          <th class="px-6 py-4 text-right">Amallar</th>
        </tr>
        </thead>
        <tbody v-if="data && data.payments && data.payments.length">
        <tr
            v-for="(payment, index) in data.payments"
            :key="payment.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-4 font-semibold">{{ index + 1 }}</td>
          <td class="px-6 py-4 font-semibold">{{ payment.summa }}</td>
          <td class="px-6 py-4 font-semibold">
            <StatusBadge :status="payment.status" />
          </td>
          <td class="px-6 py-4 font-semibold">
            <router-link
                :to="{ name: 'WatchPayment', params: { id: payment.id } }"
                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-show"></i>
            </router-link>
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="5" class="text-center py-4 text-gray-500">To'lov ma'lumotlari mavjud emas.</td>
        </tr>
        </tbody>

      </table>
    </div>

    <div class="w-2/4 bg-white rounded-l mt-6 overflow-hidden overflow-y-scroll">
      <table class="w-full text-sm">
        <thead class="h-10">
        <tr class="bg-gray-700 text-white">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Xona</th>
          <th class="px-6 py-4 text-left">Raqami</th>
          <th class="px-6 py-4 text-left">Holat</th>
          <th class="px-6 py-4 text-right">Amallar</th>
        </tr>
        </thead>
        <tbody v-if="data && data.room && data.room.length">
        <tr
            v-for="(room, index) in data.room"
            :key="room.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-4 font-semibold">{{ index + 1 }}</td>
          <td class="px-6 py-4 font-semibold">{{ room.name }}</td>
          <td class="px-6 py-4 font-semibold">{{ room.number }}</td>
          <td class="px-6 py-4 font-semibold">
            <StatusBadge :status="room.status" />
          </td>
          <td class="px-6 py-4 font-semibold">
            <router-link
                :to="{ name: 'Watchroom', params: { id: room.id } }"
                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-show"></i>
            </router-link>
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="5" class="text-center py-4 text-gray-500">Xona ma'lumotlari mavjud emas.</td>
        </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import {computed, onMounted, ref} from "vue";
import { useStore } from "vuex";
import StatusBadge from "@/components/MainLayout/ui/StatusBadge.vue";
import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import updateGroup from "@/components/MainLayout/groups/updateGroup.vue";
import UpdateCourse from "@/components/MainLayout/course/updateCourse.vue";
import CreateGroup from "@/components/MainLayout/course/CreateGroup.vue";
export default {
  components: {
    CreateGroup, UpdateCourse,
    StatusBadge,
    actionSidebar,
    updateGroup,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const data = ref(null);
    const payments = ref(null)
    const groupId = Number(route.params.id);
    const isUpdating = ref(false)
    const sidebarTitle = computed(() => {
      if (isUpdating.value) return "O'zgartirish";
      return "";
    });

    const openUpdateSidebar = ()=> {
      isUpdating.value = true;
      store.dispatch("toggleSidebar", true);
    }

    const closeUpdateSidebar = ()=> {
      isUpdating.value = false;
      store.dispatch("toggleSidebar", false);
    }

    const deleteById = (id) => {
      if (!id) return console.error("Invalid company ID");
      store.dispatch("course/deleteCourse", id);
    };

    onMounted(async () => {
      try {
        const response = await store.dispatch('group/getGroupById', route.params.id);
        if (response) {
          data.value = response;
          payments.value= response.payments
          console.log(data.value)
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
      sidebarTitle,
      isUpdating,
      openUpdateSidebar,
      closeUpdateSidebar,
      isPrimitiveOrFormatted,
      formatKey,
      formatData,
      payments,
      groupId,
      deleteById,
    };
  },
};
</script>

