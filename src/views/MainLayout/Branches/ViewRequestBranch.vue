<template>
  <div class="flex w-[95%] mx-auto justify-between flex-wrap">
    <actionSidebar
        :title="sidebarTitle"
        @closeSidebar="closeUpdateSidebar"
    >
      <updateBranch
        v-if="isUpdating"
        @close="closeUpdateSidebar"
        :branchId="id"
      />
      <CreateCourse
          v-if="isCoursing"
          :branchId="id"
          @close="closeCourseSidebar"
      />
      <CreateDiscount
        v-if="isDiscounting"
        :branchId="id"
        @close="closeDiscountSidebar"
      />
      <CreateStudent
        v-if="isStudenting"
        :branchId="id"
        @close="closeStudentSidebar"
      />
      <CreateRoom
          v-if="isRooming"
          :branchId="id"
          @close="closeRoomSidebar"
      />
      <CreateUser
          v-if="isUsering"
          :branchId="id"
          @close="closeRoomSidebar"
      />


<!--      <updateCourse-->
<!--        v-if="isUpdateCourse"-->
<!--        :courseId="selectedCourseId"-->
<!--        @close="closeUpdateCourseSidebar"-->
<!--      />-->
<!--      -->
<!--      <updateDiscount-->
<!--        v-if="isUpdateDiscount"-->
<!--        :discountId="selectedDiscountId"-->
<!--        @close="closeUpdateDiscountSidebar"-->
<!--      />-->
<!--      -->
<!--      <updateRoom-->
<!--        v-if="isUpdateRoom"-->
<!--        :roomId="selectedRoomId"-->
<!--        @close="closeUpdateRoomSidebar"-->
<!--      />-->
<!--      -->
<!--      <updateUser-->
<!--        v-if="isUpdateUser"-->
<!--        :userId="selectedUserId"-->
<!--        @close="closeUpdateUserSidebar"-->
<!--      />-->
      
    </actionSidebar>
    <div class="w-1/3 overflow-x-auto bg-white shadow-md sm:rounded-lg p-4 mt-6">
      <div v-if="data" class="space-y-2">
        <h1>Filial malumotlari</h1>
        <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 duration-300">
          <span class="text-sm text-gray-500">Nomi:</span>
          <span class="text-lg font-semibold text-gray-900">{{ data.name }}</span>
        </div>

        <div class="flex justify-between items-start border-b p-2 hover:bg-gray-200 duration-300">
          <span class="text-sm text-gray-500">Tavsif:</span>
          <span class="text-lg font-medium text-gray-700 max-w-md leading-relaxed">{{ data.description || 'Tafsif topilmadi' }}</span>
        </div>

        <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 duration-300">
          <span class="text-sm text-gray-500">Telefon:</span>
          <span class="text-lg font-semibold text-gray-900">{{ data.phone || 'Telefon topilmadi' }}</span>
        </div>

        <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 duration-300">
          <span class="text-sm text-gray-500">Manzili:</span>
          <span class="text-lg font-semibold text-gray-900">{{ data.address || 'Manzil topilmadi' }}</span>
        </div>

        <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 duration-300">
          <span class="text-sm text-gray-500">Status:</span>
          <StatusBadge :status="data.status" />
        </div>

        <img
            :src="data.image ? `https://api.mrtm.uz/storage/companies/` + data.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFrS3DfXBwOlJdjx8cnKEiSIxaPPnoMOgOvGbhNGz_7rY0DiQUcAcMkiCf_5kkpkH7E18&usqp=CAU'"
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
              @click="deleteById(id)"
              class="transition ml-2 text-white bg-red-500 hover:bg-red-600 p-2 py-1 rounded duration-200"
          >
            <i class="bx bxs-trash-alt"></i>
          </button>
        </div>
      </div>
      <div v-else>
        <p>Ma'lumot topilmadi yoki yuklashda xatolik yuz berdi.</p>
      </div>
    </div>


    <!--  Starting course section   -->
    <div class="w-3/5 bg-white rounded-l mt-6 overflow-hidden overflow-y-scroll">
      <div class="w-full flex justify-between">
        <h1 class="text-2xl text-bold m-2">Kurs malumotlari</h1>

        <button
            @click="openCourseSidebar"
            class="transition scale-75 p-2 text-white bg-green-500 hover:bg-green-600 rounded duration-200"
        >
          Kurs qo'shish <i class='bx bx-git-course'></i>
        </button>
      </div>
      <table class="w-full text-sm">
        <thead class="h-10">
        <tr class="bg-gray-700 text-white">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Kurs nomi</th>
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
          <td class="px-6 py-2 font-semibold">{{ index + 1 }}</td>
          <td class="px-6 py-2 font-semibold">{{ course.name }}</td>
          <td class="px-6 py-2 font-semibold text-xs">
            <StatusBadge :status="course.status"/>
          </td>
          <td class="px-6 py-2 font-semibold">
            <router-link
                :to="{ name: 'WatchCourse', params: { id: course.id } }"
                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-show"></i>
            </router-link>
            <button
                @click="deleteCourseById(course.id)"
                class="mr-0.5 transition text-white bg-red-500 hover:bg-red-600 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-trash-alt"></i>
            </button>

<!--            <button-->
<!--                @click="openUpdateCourseSidebar(course.id)"-->
<!--                class="mr-0.5 transition text-white bg-green-500 hover:bg-green-600 p-3 py-2 rounded duration-200"-->
<!--            >-->
<!--              <i class='bx bxs-edit-alt'></i>-->
<!--            </button>-->
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
    <!--  ending course section   -->


    <div>
<!--      &lt;!&ndash;  Starting student section   &ndash;&gt;-->
<!--      <div class="w-1/2 bg-white rounded-l mt-6 overflow-x-hidden overflow-y-scroll">-->
<!--        <div class="w-full flex justify-between">-->
<!--          <h1 class="text-2xl text-bold m-2">O'quvchi malumotlari</h1>-->

<!--          <button-->
<!--              @click="openStudentSidebar"-->
<!--              class="transition scale-75 p-2 text-white bg-green-500 hover:bg-green-600 rounded duration-200"-->
<!--          >-->
<!--            O'quvchi qo'shish <i class='bx bx-git-student'></i>-->
<!--          </button>-->
<!--        </div>-->
<!--        <table class="w-full text-sm">-->
<!--          <thead class="h-10">-->
<!--          <tr class="bg-gray-700 text-white">-->
<!--            <th class="px-6 py-4 text-left">№</th>-->
<!--            <th class="px-6 py-4 text-left">Ismi</th>-->
<!--            <th class="px-6 py-4 text-left">Holat</th>-->
<!--            <th class="px-6 py-4 text-right">Amallar</th>-->
<!--          </tr>-->
<!--          </thead>-->
<!--          <tbody v-if="data && data.students && data.students.length">-->
<!--          <tr-->
<!--              v-for="(student, index) in data.students"-->
<!--              :key="student.id"-->
<!--              class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"-->
<!--          >-->
<!--            <td class="px-6 py-4 font-semibold">{{ index + 1 }}</td>-->
<!--            <td class="px-6 py-4 font-semibold">{{ student.full_name }}</td>-->
<!--            <td class="px-6 py-4 font-semibold text-xs">-->
<!--              <StatusBadge :status="student.status"/>-->
<!--            </td>-->
<!--            <td class="px-6 py-4 font-semibold">-->
<!--              <router-link-->
<!--                  :to="{ name: 'WatchStudent', params: { id: student.id } }"-->
<!--                  class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"-->
<!--              >-->
<!--                <i class="bx bxs-show"></i>-->
<!--              </router-link>-->

<!--              <button-->
<!--                  @click="deleteStudentById(student.id)"-->
<!--                  class="mr-0.5 transition text-white bg-red-500 hover:bg-red-600 p-3 py-2 rounded duration-200"-->
<!--              >-->
<!--                <i class="bx bxs-trash-alt"></i>-->
<!--              </button>-->
<!--            </td>-->
<!--          </tr>-->
<!--          </tbody>-->
<!--          <tbody v-else>-->
<!--          <tr>-->
<!--            <td colspan="5" class="text-center py-4 text-gray-500">Chegirma ma'lumotlari mavjud emas.</td>-->
<!--          </tr>-->
<!--          </tbody>-->

<!--        </table>-->
<!--      </div>-->
<!--      &lt;!&ndash;  ending student section   &ndash;&gt;-->
    </div>



    <!--  Starting discount section   -->
    <div class="w-[45%] bg-white rounded-l mt-6 overflow-hidden overflow-y-scroll">
      <div class="w-full flex justify-between">
        <h1 class="text-2xl text-bold m-2">Chegirma malumotlari</h1>

        <button
            @click="openDiscountSidebar"
            class="transition scale-75 p-2 text-white bg-green-500 hover:bg-green-600 rounded duration-200"
        >
          Chegirma qo'shish <i class='bx bx-git-discount'></i>
        </button>
      </div>
      <table class="w-full text-sm">
        <thead class="h-10">
        <tr class="bg-gray-700 text-white">
          <th class="px-6 py-4 text-left">№</th>
          <th class="px-6 py-4 text-left">Chegirma nomi</th>
          <th class="px-6 py-4 text-left">Holat</th>
          <th class="px-6 py-4 text-right">Amallar</th>
        </tr>
        </thead>
        <tbody v-if="data && data.discounts && data.discounts.length">
        <tr
            v-for="(discount, index) in data.discounts"
            :key="discount.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-2 font-semibold">{{ index + 1 }}</td>
          <td class="px-6 py-2 font-semibold">{{ discount.name }}</td>
          <td class="px-6 py-2 font-semibold text-xs">
            <StatusBadge :status="discount.status"/>
          </td>
          <td class="px-6 py-2 font-semibold">
            <router-link
                :to="{ name: 'WatchDiscount', params: { id: discount.id } }"
                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-show"></i>
            </router-link>

            <button
                @click="deleteDiscountById(discount.id)"
                class="mr-0.5 transition text-white bg-red-500 hover:bg-red-600 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-trash-alt"></i>
            </button>

<!--            <button-->
<!--                @click="openUpdateDiscountSidebar(discount.id)"-->
<!--                class="mr-0.5 transition text-white bg-green-500 hover:bg-green-600 p-3 py-2 rounded duration-200"-->
<!--            >-->
<!--              <i class='bx bxs-edit-alt'></i>-->
<!--            </button>-->
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
    <!--  ending discount section   -->

    <!--  Starting room section   -->
    <div class="w-1/2 bg-white rounded-l mt-6 overflow-hidden overflow-y-scroll">
      <div class="w-full flex justify-between">
        <h1 class="text-2xl text-bold m-2">Xona malumotlari</h1>

        <button
            @click="openRoomSidebar"
            class="transition scale-75 p-2 text-white bg-green-500 hover:bg-green-600 rounded duration-200"
        >
          Xona qo'shish <i class='bx bx-git-room'></i>
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
        <tbody v-if="data && data.rooms && data.rooms.length">
        <tr
            v-for="(room, index) in data.rooms"
            :key="room.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-2 font-semibold">{{ index + 1 }}</td>
          <td class="px-6 py-2 font-semibold">{{ room.name }}</td>
          <td class="px-6 py-2 font-semibold text-xs">
            <StatusBadge :status="room.status"/>
          </td>
          <td class="px-6 py-2 font-semibold">
            <router-link
                :to="{ name: 'WatchRoom', params: { id: room.id } }"
                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-show"></i>
            </router-link>

            <button
                @click="deleteRoomById(room.id)"
                class="mr-0.5 transition text-white bg-red-500 hover:bg-red-600 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-trash-alt"></i>
            </button>


<!--            <button-->
<!--                @click="openUpdateRoomSidebar(room.id)"-->
<!--                class="mr-0.5 transition text-white bg-green-500 hover:bg-green-600 p-3 py-2 rounded duration-200"-->
<!--            >-->
<!--              <i class='bx bxs-edit-alt'></i>-->
<!--            </button>-->
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
    <!--  ending room section   -->


    <!--  Starting user section   -->
    <div class="w-1/2 bg-white rounded-l mt-6 overflow-hidden overflow-y-scroll">
      <div class="w-full flex justify-between">
        <h1 class="text-2xl text-bold m-2">Xodim malumotlari</h1>

        <button
            @click="openUserSidebar"
            class="transition scale-75 p-2 text-white bg-green-500 hover:bg-green-600 rounded duration-200"
        >
          Xodim qo'shish <i class='bx bx-git-user'></i>
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
        <tbody v-if="data && data.users && data.users.length">
        <tr
            v-for="(user, index) in data.users"
            :key="user.id"
            class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <td class="px-6 py-2 font-semibold">{{ index + 1 }}</td>
          <td class="px-6 py-2 font-semibold">{{ user.full_name }}</td>
          <td class="px-6 py-2 font-semibold text-xs">
            <StatusBadge :status="user.status"/>
          </td>
          <td class="px-6 py-2 font-semibold">
            <router-link
                :to="{ name: 'WatchUser', params: { id: user.id } }"
                class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-show"></i>
            </router-link>

            <button
                @click="deleteUserById(user.id)"
                class="mr-0.5 transition text-white bg-red-500 hover:bg-red-600 p-3 py-2 rounded duration-200"
            >
              <i class="bx bxs-trash-alt"></i>
            </button>

<!--            <button-->
<!--                @click="openUpdateUserSidebar(user.id)"-->
<!--                class="mr-0.5 transition text-white bg-green-500 hover:bg-green-600 p-3 py-2 rounded duration-200"-->
<!--            >-->
<!--              <i class='bx bxs-edit-alt'></i>-->
<!--            </button>-->
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
    <!--  ending user section   -->
    
  </div>

</template>


<script>
import { useRoute } from "vue-router";
import {computed, onMounted, ref} from "vue";
import { useStore } from "vuex";

import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
import updateBranch from "@/components/MainLayout/branch/updateBranch.vue";
import CreateCourse from "@/components/MainLayout/branch/CreateCourse.vue";
import StatusBadge from "@/components/MainLayout/ui/StatusBadge.vue";
import CreateDiscount from "@/components/MainLayout/branch/CreateDiscount.vue";
import CreateStudent from "@/components/MainLayout/students/CreateStudent.vue";
import CreateRoom from "@/components/MainLayout/branch/CreateRoom.vue";
import CreateUser from "@/components/MainLayout/branch/CreateUser.vue"


// import updateCourse from "@/components/MainLayout/course/updateCourse.vue";
// import updateDiscount from "@/components/MainLayout/discount/updateDiscount.vue";
// import updateRoom from "@/components/MainLayout/room/updateRoom.vue";
// import updateUser from "@/components/MainLayout/user/UpdateUser.vue";
export default {
  components: {
    CreateStudent,
    StatusBadge,
    actionSidebar,
    CreateCourse,
    updateBranch,
    CreateDiscount,
    CreateRoom,
    CreateUser,
    
    // updateUser,
    // updateCourse,
    // updateDiscount,
    // updateRoom,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const data = ref(null);
    const id = Number(route.params.id)
    const isUpdating = ref(false)
    const isCoursing = ref(false)
    const isDiscounting = ref(false)
    const isStudenting = ref(false)
    const isRooming = ref(false)
    const isUsering = ref(false)

    // const isUpdateCourse = ref(false)
    // const isUpdateDiscount = ref(false)
    // const isUpdateRoom = ref(false)
    // const isUpdateUser = ref(false)
    //
    // const selectedCourseId = ref(null);
    // const selectedDiscountId = ref(null);
    // const selectedRoomId = ref(null);
    // const selectedUserId = ref(null);
    
    const sidebarTitle = computed(() => {
      if (isUpdating.value) return "O'zgartirish";
      if (isCoursing.value) return "Kurs qo'shish";
      if (isDiscounting.value) return "Chegirma qo'shish";
      if (isStudenting.value) return "O'quvchi qo'shish";
      if (isRooming.value) return "Xona qo'shish";
      if (isUsering.value) return "Xodim qo'shish";

      // if (isUpdateCourse.value) return "Kurs o'zgartirish";
      // if (isUpdateDiscount.value) return "Chegirma o'zgartirish";
      // if (isUpdateRoom.value) return "Xona malumotlarini o'zgartirish";
      // if (isUpdateUser.value) return "Xodim o'zgartirish";
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

    const openCourseSidebar = ()=> {
      isCoursing.value = true;
      isUpdating.value = false;
      isDiscounting.value = false;
      isStudenting.value = false;
      isRooming.value = false;
      isUsering.value = false;
      store.dispatch("toggleSidebar", true);
    }

    const closeCourseSidebar = () => {
      isCoursing.value = false;
      store.dispatch("toggleSidebar", false);
    }

    const openDiscountSidebar = () => {
      isCoursing.value = false;
      isUpdating.value = false;
      isDiscounting.value = true;
      isStudenting.value = false;
      isRooming.value = false;
      isUsering.value = false;
      store.dispatch("toggleSidebar", true);
    }

    const closeDiscountSidebar = () => {
      isDiscounting.value = false;
      store.dispatch("toggleSidebar", false);
    }

    const openStudentSidebar = () => {
      isCoursing.value = false;
      isUpdating.value = false;
      isDiscounting.value = false;
      isStudenting.value = true;
      isRooming.value = false;
      isUsering.value = false;
      store.dispatch("toggleSidebar", true);
    }

    const closeStudentSidebar = () => {
      isStudenting.value = false;
      store.dispatch("toggleSidebar", false);
    }

    const openRoomSidebar = ()=> {
      isCoursing.value = false;
      isUpdating.value = false;
      isDiscounting.value = false;
      isStudenting.value = false;
      isRooming.value = true;
      isUsering.value = false;
      store.dispatch("toggleSidebar", true);
    }

    const closeRoomSidebar = () => {
      isRooming.value = false;
      store.dispatch("toggleSidebar", false);
    }

    const openUserSidebar = () => {
      isCoursing.value = false;
      isUpdating.value = false;
      isDiscounting.value = false;
      isStudenting.value = false;
      isRooming.value = false;
      isUsering.value = true;
      store.dispatch("toggleSidebar", true);
    }

    const closeUserSidebar = ()=> {
      isUsering.value = false;
      store.dispatch("toggleSidebar", false);
    }





    // const openUpdateCourseSidebar = (id) => {
    //   selectedCourseId.value = id
    //   isUpdateCourse.value = true;
    //   console.log('isUpdateCourse', selectedCourseId.value)
    //   store.dispatch("toggleSidebar", true);
    // }
    //
    // const closeUpdateCourseSidebar = () => {
    //   isUpdateCourse.value = false;
    //   store.dispatch("toggleSidebar", false);
    // }
    //
    // const openUpdateDiscountSidebar = (id) => {
    //   selectedDiscountId.value = id
    //   isUpdateDiscount.value = true;
    //   store.dispatch("toggleSidebar", true);
    // }
    //
    // const closeUpdateDiscountSidebar = () => {
    //   isUpdateDiscount.value = false;
    //   store.dispatch("toggleSidebar", false);
    // }
    //
    // const openUpdateRoomSidebar = (id) => {
    //   selectedRoomId.value = id
    //   isUpdateRoom.value = true;
    //   store.dispatch("toggleSidebar", true);
    // }
    //
    // const closeUpdateRoomSidebar = () => {
    //   isUpdateRoom.value = false;
    //   store.dispatch("toggleSidebar", false);
    // }
    //
    // const openUpdateUserSidebar = (id) => {
    //   selectedUserId.value = id
    //   isUpdateUser.value = true;
    //   store.dispatch("toggleSidebar", true);
    // }
    //
    // const closeUpdateUserSidebar = () => {
    //   isUpdateUser.value = false;
    //   store.dispatch("toggleSidebar", false);
    // }

    //  delete

    const deleteById = (id) => {
      if (!id) return console.error("Invalid company ID");
      store.dispatch("branch/deleteBranch", id);
    };

    const deleteCourseById = (id) => {
      store.dispatch("course/deleteCourse", id);
    }

    const deleteStudentById = (id) => {
      store.dispatch("student/deleteStudent", id);
    }

    const deleteDiscountById = (id) => {
      store.dispatch("discount/deleteDiscount", id);
    }

    const deleteRoomById = (id) => {
      store.dispatch("room/deleteRoom", id);
    }

    const deleteUserById = (id) => {
      store.dispatch("user/deleteUser", id);
    }

    onMounted(async () => {
      try {
        const response = await store.dispatch('branch/getBranchById', route.params.id);
        if (response) {
          data.value = response;
          console.log(data.value)
        } else {
          console.error("Ma'lumot topilmadi.");
        }
      } catch (error) {
        console.error("Ma'lumot yuklashda xatolik:", error);
      } finally {
        console.log(data.value[0].branches)
      }
    });

    return {
      data,
      deleteById,
      deleteCourseById,
      deleteRoomById,
      deleteUserById,
      deleteStudentById,
      deleteDiscountById,
      isCoursing,
      isUpdating,
      isDiscounting,
      isStudenting,
      isRooming,
      isUsering,

      id,
      openUpdateSidebar,
      closeUpdateSidebar,
      openCourseSidebar,
      closeCourseSidebar,
      openDiscountSidebar,
      closeDiscountSidebar,
      openStudentSidebar,
      closeStudentSidebar,
      openRoomSidebar,
      closeRoomSidebar,
      openUserSidebar,
      closeUserSidebar,
      sidebarTitle,
      // isUpdateCourse,
      // isUpdateDiscount,
      // isUpdateRoom,
      // isUpdateUser,
      // openUpdateCourseSidebar,
      // closeUpdateCourseSidebar,
      // openUpdateDiscountSidebar,
      // closeUpdateDiscountSidebar,
      // openUpdateRoomSidebar,
      // closeUpdateRoomSidebar,
      // openUpdateUserSidebar,
      // closeUpdateUserSidebar,
      // selectedCourseId,
      // selectedDiscountId,
      // selectedRoomId,
      // selectedUserId,
    };
  },
};
</script>
