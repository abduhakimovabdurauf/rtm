  <template>
    <div class="flex w-[90%] mx-auto justify-between flex-wrap">
      <actionSidebar
          :title="sidebarTitle"
          @closeBranchSidebar="closeBranchSidebar"
      >
        <CreateBranch
          v-if="isBranching"
          :companyId="companyId"
          @close="closeBranchSidebar"
        />
        <UpdateCompany
          v-if="data && data.id && isUpdating"
          :companyId="companyId"
          @close="closeUpdateSidebar"
        />
        <CreatePermission
          v-if="isPermission"
          :companyId="companyId"
          @close="closePermissionSidebar"
        />
        <CreateNotification
            v-if="isNotification"
            :companyId="companyId"
            @close="closeNotificationSidebar"
        />
        <CreateRole
            v-if="isRoling"
            :companyId="companyId"
            @close="closeNotificationSidebar"
        />
      </actionSidebar>

      <!--   Starting companies section   -->
      <div class="w-1/3 overflow-x-auto bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4 mt-6">
        <div v-if="data" class="space-y-2">
          <div class="flex justify-between">
            <h1 class="text-lg text-gray-900 dark:text-gray-200">Kompaniya ma'lumotlari</h1>
          </div>

          <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 dark:hover:bg-gray-700 duration-300">
            <span class="text-sm text-gray-500 dark:text-gray-400">Nomi:</span>
            <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ data.name }}</span>
          </div>

          <div class="flex justify-between items-start border-b p-2 hover:bg-gray-200 dark:hover:bg-gray-700 duration-300">
            <span class="text-sm text-gray-500 dark:text-gray-400">Tavsif:</span>
            <span class="text-lg font-medium text-gray-700 dark:text-gray-300 max-w-md leading-relaxed">
        {{ data.description || 'Tafsif topilmadi' }}
      </span>
          </div>

          <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 dark:hover:bg-gray-700 duration-300">
            <span class="text-sm text-gray-500 dark:text-gray-400">Telefon:</span>
            <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ data.phone || 'Telefon topilmadi' }}</span>
          </div>

          <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 dark:hover:bg-gray-700 duration-300">
            <span class="text-sm text-gray-500 dark:text-gray-400">Manzili:</span>
            <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ data.address || 'Manzil topilmadi' }}</span>
          </div>

          <div class="flex justify-between items-center border-b p-2 hover:bg-gray-200 dark:hover:bg-gray-700 duration-300">
            <span class="text-sm text-gray-500 dark:text-gray-400">Status:</span>
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
                @click="deleteById(companyId)"
                class="transition ml-2 text-white bg-red-500 hover:bg-red-600 p-2 py-1 rounded duration-200"
            >
              <i class="bx bxs-trash-alt"></i>
            </button>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-900 dark:text-gray-200">Ma'lumot topilmadi yoki yuklashda xatolik yuz berdi.</p>
        </div>
      </div>
      <!--   Ending companies section   -->





      <!--  Starting branches section   -->
      <div class="w-3/5 bg-white dark:bg-gray-800 rounded-l mt-6 overflow-hidden overflow-y-scroll">
        <div class="w-full flex justify-between">
          <h1 class="text-2xl text-bold m-2 text-gray-900 dark:text-gray-200">Filial ma'lumotlari</h1>

          <button
              @click="openBranchSidebar"
              class="transition scale-75 p-2 text-white bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 rounded duration-200"
          >
            Filial qo'shish <i class='bx bx-git-branch'></i>
          </button>
        </div>
        <table class="w-full text-sm">
          <thead class="h-10 bg-gray-700 dark:bg-gray-900 text-white">
          <tr>
            <th class="px-6 py-4 text-left">№</th>
            <th class="px-6 py-4 text-left">Filial nomi</th>
            <th class="px-6 py-4 text-left">Telefon</th>
            <th class="px-6 py-4 text-left">Manzil</th>
            <th class="px-6 py-4 text-left">Holat</th>
            <th class="px-6 py-4 text-right">Amallar</th>
          </tr>
          </thead>
          <tbody v-if="data && data.branches && data.branches.length">
          <tr
              v-for="(branch, index) in data.branches"
              :key="branch.id"
              class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">{{ index + 1 }}</td>
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">{{ branch.name }}</td>
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">{{ branch.phone }}</td>
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">{{ branch.address }}</td>
            <td class="px-6 py-4 font-semibold text-xs">
              <StatusBadge :status="branch.status"/>
            </td>
            <td class="px-6 py-4 font-semibold">
              <router-link
                  :to="{ name: 'WatchBranch', params: { id: branch.id } }"
                  class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 p-3 py-2 rounded duration-200"
              >
                <i class="bx bxs-show"></i>
              </router-link>
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr>
            <td colspan="5" class="text-center py-4 text-gray-500 dark:text-gray-400">Filial ma'lumotlari mavjud emas.</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--  Ending branches section   -->


      <!--  Starting permission section   -->
      <div class="w-1/2 bg-white dark:bg-gray-800 rounded-l mt-6 overflow-hidden overflow-y-scroll">
        <div class="w-full flex justify-between">
          <h1 class="text-2xl text-bold m-2 text-gray-900 dark:text-gray-200">Huquq ma'lumotlari</h1>

          <button
              @click="openPermissionSidebar"
              class="transition scale-75 p-2 text-white bg-green-500 hover:bg-green-600 rounded duration-200"
          >
            Huquq qo'shish <i class='bx bx-git-permission'></i>
          </button>
        </div>
        <table class="w-full text-sm">
          <thead class="h-10">
          <tr class="bg-gray-700 dark:bg-gray-900 text-white">
            <th class="px-6 py-4 text-left">№</th>
            <th class="px-6 py-4 text-left">Huquq nomi</th>
            <th class="px-6 py-4 text-left">Holat</th>
            <th class="px-6 py-4 text-right">Amallar</th>
          </tr>
          </thead>
          <tbody v-if="data && data.permissions && data.permissions.length">
          <tr
              v-for="(permission, index) in data.permissions"
              :key="permission.id"
              class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">{{ index + 1 }}</td>
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">{{ permission.name }}</td>
            <td class="px-6 py-4 font-semibold text-xs text-gray-900 dark:text-gray-200">
              <StatusBadge :status="permission.status"/>
            </td>
            <td class="px-6 py-4 font-semibold">
              <router-link
                  :to="{ name: 'watchPermission', params: { id: permission.id } }"
                  class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 p-3 py-2 rounded duration-200"
              >
                <i class="bx bxs-show"></i>
              </router-link>
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr>
            <td colspan="5" class="text-center py-4 text-gray-500 dark:text-gray-400">Huquq ma'lumotlari mavjud emas.</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--  Ending permission section   -->




      <!--  Starting notification section   -->
      <div class="w-1/2 bg-white dark:bg-gray-800 rounded-l mt-6 overflow-hidden overflow-y-scroll">
        <div class="w-full flex justify-between">
          <h1 class="text-2xl text-bold m-2 text-gray-900 dark:text-gray-200">Bildirishnoma ma'lumotlari</h1>

          <button
              @click="openNotificationSidebar"
              class="transition scale-75 p-2 text-white bg-green-500 hover:bg-green-600 rounded duration-200"
          >
            Bildirishnoma qo'shish <i class='bx bx-git-notification'></i>
          </button>
        </div>
        <table class="w-full text-sm">
          <thead class="h-10">
          <tr class="bg-gray-700 dark:bg-gray-900 text-white">
            <th class="px-6 py-4 text-left">№</th>
            <th class="px-6 py-4 text-left">Sarlavha</th>
            <th class="px-6 py-4 text-left">Holat</th>
            <th class="px-6 py-4 text-right">Amallar</th>
          </tr>
          </thead>
          <tbody v-if="data && data.notifications && data.notifications.length">
          <tr
              v-for="(notification, index) in data.notifications"
              :key="notification.id"
              class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">{{ index + 1 }}</td>
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">{{ notification.title }}</td>
            <td class="px-6 py-4 font-semibold text-xs text-gray-900 dark:text-gray-200">
              <StatusBadge :status="notification.status"/>
            </td>
            <td class="px-6 py-4 font-semibold">
              <router-link
                  :to="{ name: 'watchNotification', params: { id: notification.id } }"
                  class="mr-0.5 transition text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 p-3 py-2 rounded duration-200"
              >
                <i class="bx bxs-show"></i>
              </router-link>
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr>
            <td colspan="5" class="text-center py-4 text-gray-500 dark:text-gray-400">Bildirishnoma ma'lumotlari mavjud emas.</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--  Ending notification section   -->


      <!--  Starting role section   -->
      <div class="w-1/2 bg-white dark:bg-gray-800 rounded-l mt-6 overflow-hidden overflow-y-scroll">
        <div class="w-full flex justify-between">
          <h1 class="text-2xl text-bold m-2 text-gray-900 dark:text-gray-200">Lavozim ma'lumotlari</h1>

          <button
              @click="openRoleSidebar"
              class="transition scale-75 p-2 text-white bg-green-500 hover:bg-green-600 rounded duration-200"
          >
            Lavozim qo'shish <i class='bx bx-git-role'></i>
          </button>
        </div>
        <table class="w-full text-sm">
          <thead class="h-10">
          <tr class="bg-gray-700 dark:bg-gray-900 text-white">
            <th class="px-6 py-4 text-left">№</th>
            <th class="px-6 py-4 text-left">Nomi</th>
            <th class="px-6 py-4 text-left">Holat</th>
          </tr>
          </thead>
          <tbody v-if="data && data.roles && data.roles.length">
          <tr
              v-for="(role, index) in data.roles"
              :key="role.id"
              class="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">{{ index + 1 }}</td>
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">{{ role.name }}</td>
            <td class="px-6 py-4 font-semibold text-xs text-gray-900 dark:text-gray-200">
              <StatusBadge :status="role.status"/>
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr>
            <td colspan="5" class="text-center py-4 text-gray-500 dark:text-gray-400">Lavozim ma'lumotlari mavjud emas.</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--  Ending role section   -->



    </div>

  </template>


  <script>
  import { useRoute } from "vue-router";
  import {computed, onMounted, ref} from "vue";
  import { useStore } from "vuex";

  import actionSidebar from "@/components/MainLayout/ui/ActionSidebar.vue";
  import CreateBranch from "@/components/MainLayout/company/CreateBranch.vue";
  import StatusBadge from "@/components/MainLayout/ui/StatusBadge.vue";
  import CreatePermission from "@/components/MainLayout/company/CreatePermission.vue";
  import UpdateCompany from "@/components/MainLayout/company/UpdateCompany.vue";
  import CreateNotification from "@/components/MainLayout/company/CreateNotification.vue";
  import CreateRole from "@/components/MainLayout/company/CreateRole.vue";
  export default {
    components: {
      StatusBadge,
      actionSidebar,
      CreateBranch,
      CreatePermission,
      UpdateCompany,
      CreateNotification,
      CreateRole,
    },
    setup() {
      const route = useRoute();
      const store = useStore();
      const data = ref(null);
      const companyId = Number(route.params.id)
      const isBranching = ref(false)
      const isPermission = ref(false)
      const isNotification = ref(false)
      const isUpdating = ref(false)
      const isRoling = ref(false)
      const sidebarTitle = computed(() => {
        if (isBranching.value) return "Filial qoshish";
        if (isPermission.value) return "Huquq qoshish";
        if (isUpdating.value) return "Kompaniya malumotlarini ozgartirish";
        if (isNotification.value) return "Bildrishnoma qoshish";
        if (isRoling.value) return "Lavozim qoshish";
        return "";
      });

      const openNotificationSidebar = ()=> {
        isUpdating.value = false;
        isBranching.value = false;
        isPermission.value = false
        isNotification.value = true
        store.dispatch("toggleSidebar", true);
      }

      const closeNotificationSidebar = ()=> {
        isNotification.value = false
        store.dispatch("toggleSidebar", false);
      }

      const openPermissionSidebar = ()=> {
        isUpdating.value = false;
        isBranching.value = false;
        isPermission.value = true;
        store.dispatch("toggleSidebar", true);
      }

      const closePermissionSidebar = ()=> {
        isPermission.value = false;
        store.dispatch("toggleSidebar", false);
      }

      const openRoleSidebar = ()=> {
        isRoling.value = false;
        isUpdating.value = false;
        isBranching.value = false;
        isPermission.value = false;
        store.dispatch("toggleSidebar", true);
      }

      const closeRoleSidebar = ()=> {
        isRoling.value = false;
        store.dispatch("toggleSidebar", false);
      }

      const openUpdateSidebar = ()=> {
        isUpdating.value = true;
        isBranching.value = false;
        isPermission.value = false;
        store.dispatch("toggleSidebar", true);
      }

      const closeUpdateSidebar = ()=> {
        isUpdating.value = false;
        store.dispatch("toggleSidebar", false);
      }

      const openBranchSidebar = ()=> {
        isBranching.value = true;
        isPermission.value = false;
        isUpdating.value = false;
        store.dispatch("toggleSidebar", true);
      }
      const closeBranchSidebar = ()=> {
        store.dispatch("toggleSidebar", false);
      }

      const deleteById = (id) => {
        if (!id) return console.error("Invalid company ID");
        store.dispatch("company/deleteCompany", id);
      };

      onMounted(async () => {
        console.log('id: ',typeof companyId)
        try {
          const response = await store.dispatch('company/getCompanyById', route.params.id);
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
        companyId,
        openBranchSidebar,
        closeBranchSidebar,
        openUpdateSidebar,
        closeUpdateSidebar,
        openPermissionSidebar,
        closePermissionSidebar,
        openNotificationSidebar,
        closeNotificationSidebar,
        openRoleSidebar,
        closeRoleSidebar,
        sidebarTitle,
        isBranching,
        isUpdating,
        isPermission,
        isNotification,
        isRoling,
        deleteById
      };
    },
  };
  </script>
