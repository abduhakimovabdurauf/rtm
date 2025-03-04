<template>
  <actionSidebar
      :title="sidebarTitle"
      @closeSidebar="closeUpdateSidebar"
  >
    <UpdateCourse
        v-if="isUpdating"
        @close="closeUpdateSidebar"
        :courseId="courseId"
    />
    <CreateGroup
        v-if="isGrouping"
        @close="closeUpdateSidebar"
        :courseId="courseId"
        :branchId="branchId"
    />

  </actionSidebar>


  <div class="flex justify-between flex-wrap w-[90%] mx-auto">
    <div class="w-1/3 overflow-x-auto bg-white shadow-md sm:rounded-lg p-4 mt-6">
      <div v-if="data" class="space-y-2">
        <h1>Kurs malumotlari</h1>
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
          <StatusBadge :status="data.status" />
        </div>

        <img
            :src="data.image ? `https://api.mrtm.uz/storage/` + data.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFrS3DfXBwOlJdjx8cnKEiSIxaPPnoMOgOvGbhNGz_7rY0DiQUcAcMkiCf_5kkpkH7E18&usqp=CAU'"
            alt="Rasm mavjud emas"
            class="w-1/4 h-auto rounded-lg mt-4"
        />

        <div class="flex justify-end">
          <button
              @click="openUpdateSidebar"
              class="transition ml-2 text-white bg-green-500 hover:bg-green-600 p-2 py-1 rounded duration-200"
          >
            <i class="bx bxs-edit-alt"></i>
          </button>

          <button
              @click="deleteById(courseId)"
              class="transition ml-2 text-white bg-red-500 hover:bg-red-600 p-2 py-1 rounded duration-200"
          >
            <i class="bx bxs-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>

    <!--  Starting group section   -->
    <div class="w-3/5 bg-white rounded-l mt-6 overflow-hidden overflow-y-scroll">
      <div class="w-full flex justify-between">
        <h1 class="text-xl text-bold m-2">Guruh malumotlari</h1>

        <button
            @click="openGroupSidebar"
            class="transition scale-75 p-2 text-white bg-green-500 hover:bg-green-600 rounded duration-200"
        >
          Guruh qo'shish <i class='bx bx-git-group'></i>
        </button>
      </div>
      <table class="w-full text-sm">
        <thead class="h-10">
        <tr class="bg-gray-700 text-white">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Ismi</th>
          <th class="px-6 py-4 text-left">Holat</th>
          <th class="px-6 py-4 text-right">Amallar</th>
        </tr>
        </thead>
        <tbody v-if="data && data.groups && data.groups.length">
        <tr
            v-for="(group, index) in data.groups"
            :key="group.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-4 font-semibold">{{ index + 1 }}</td>
          <td class="px-6 py-4 font-semibold">{{ group.name }}</td>
          <td class="px-6 py-4 font-semibold text-xs">
            <StatusBadge :status="group.status"/>
          </td>
          <td class="px-6 py-4 font-semibold">
            <router-link
                :to="{ name: 'WatchGroup', params: { id: group.id } }"
                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-show"></i>
            </router-link>
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="5" class="text-center py-4 text-gray-500">Chegirma ma'lumotlari mavjud emas.</td>
        </tr>
        </tbody>

      </table>
    </div>
    <!--  ending group section   -->
  </div>

</template>


<script>
import { useRoute } from "vue-router";
import {computed, onMounted, ref} from "vue";
import { useStore } from "vuex";


import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import UpdateCourse from "@/components/MainLayout/course/updateCourse.vue";
import StatusBadge from "@/components/MainLayout/ui/StatusBadge.vue";
import CreateGroup from "@/components/MainLayout/course/CreateGroup.vue";
export default {
  components: {
    StatusBadge,
    actionSidebar,
    UpdateCourse,
    CreateGroup
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const data = ref(null);
    const isUpdating = ref(false)
    const isGrouping = ref(false)
    const courseId = ref(null)
    const branchId = ref(null)
    const sidebarTitle = computed(() => {
      if (isUpdating.value) return "O'zgartirish";
      if (isGrouping.value) return "Guruh qo'shish";
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



    const openGroupSidebar = () => {
      isGrouping.value = true;
      store.dispatch("toggleSidebar", true);
    }

    const closeGroupSidebar = () => {
      isGrouping.value = false;
      store.dispatch("toggleSidebar", false);
    }


    const deleteById = (id) => {
      if (!id) return console.error("Invalid company ID");
      store.dispatch("course/deleteCourse", id);
    };

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
          courseId.value = data.value.id
          branchId.value = data.value.branch.id
          console.log(data.value)
          console.log(courseId)
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
      isUpdating,
      isGrouping,
      sidebarTitle,
      openUpdateSidebar,
      closeUpdateSidebar,
      openGroupSidebar,
      closeGroupSidebar,
      deleteById,
      courseId,
      branchId,
    };
  },
};
</script>
