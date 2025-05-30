<template>
  <nav class="flex z-[99] flex-col sm:flex-row items-center justify-between p-2 bg-white dark:bg-gray-800 shadow-md w-full">
    <div class="hidden items-center xl:flex flex-wrap">
      <input
          type="text"
          placeholder="Search..."
          class="flex-grow scale-y-95 sm:w-auto border-r-0 rounded-r-none px-2 py-1.5 rounded-md
          border border-gray-300 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
      />
      <button class="px-2 py-2 bg-blue-500 text-white text-sm rounded-md hidden sm:block rounded-l-none">Search</button>
    </div>

    <div class="flex items-center gap-4 mt-4 sm:mt-0 w-auto justify-between relative">
      <!-- Dark Mode Toggle -->
      <ThemeToggle />

      <!-- Bell icon -->
      <div class="relative">
        <i class="bx bx-bell text-xl sm:text-2xl text-gray-500 dark:text-gray-300 cursor-pointer" @click="toggleNotificationPopup"></i>
        <span v-if="notifications?.length"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 scale-75 py-0.5 rounded-full">
          {{ notifications?.length }}
        </span>

        <transition name="fade">
          <div v-show="showNotifications"
               class="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-50">
            <div v-if="notifications?.length">
              <div
                  v-for="(notification, index) in notifications"
                  :key="index"
                  class="p-2 border-b dark:border-gray-600 last:border-0 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center"
              >
                <div>
                  <p class="text-sm text-gray-700 dark:text-gray-300">{{ notification?.title }}</p>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ notification?.text }}</span>
                </div>
                <button
                    class="text-xs bg-blue-500 text-white px-2 py-1 rounded-md"
                    @click="markAsRead(notification.id)"
                >
                  O'qildi
                </button>
              </div>
            </div>
            <div v-else class="p-2 text-center text-gray-500 dark:text-gray-400">
              Bildirishnomalar yo'q :(
            </div>
          </div>
        </transition>
      </div>

      <!-- Settings icon -->
      <i class="bx bx-cog text-xl sm:text-2xl text-gray-500 dark:text-gray-300 cursor-pointer"></i>

      <!-- User Profile -->
      <router-link to="/profile" class="bg-white dark:bg-gray-800">
        <div class="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-900 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md cursor-pointer transition-all duration-300">
          <img
              :src="user.image ? 'https:/api.mrtm.uz/storage/user/'+user.images[0] : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'"
              alt="User Avatar"
              class="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
          />
          <div class="flex flex-col">
            <span class="text-gray-800 dark:text-white font-medium text-base">{{ user?.full_name }}</span>
            <span class="text-gray-800 dark:text-gray-400 text-sm">{{ user?.roles[0]?.name }}</span>
          </div>
        </div>
      </router-link>

      <!-- Logout button -->
      <button @click.prevent="logout" class="p-2 bg-blue-500 rounded-md text-white focus:outline-none">
        Chiqish
      </button>
    </div>
  </nav>
</template>


<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import ThemeToggle from "@/components/MainLayout/ui/ThemeToggle.vue";
export default {
  components: {
      ThemeToggle
  },
  name: "Navbar",
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = JSON.parse(localStorage.getItem("user"));

    const showNotifications = ref(false);
    const notifications = ref([]);

    const toggleNotificationPopup = () => {
      showNotifications.value = !showNotifications.value;
    };

    const markAsRead = async (id) => {
      try {
        await store.dispatch("notification/markNotificationAsRead", id);
        notifications.value = notifications.value.filter(n => n?.id !== id);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    onMounted(async () => {
      try {
        const response = await store.dispatch('user/getUserById', user.id);
        if (response) {
          notifications.value = response.user.notifications;
        } else {
          console.error("Ma'lumot topilmadi.");
        }
      } catch (error) {
        console.error("Ma'lumot yuklashda xatolik:", error);
      }
    });

    return {
      user,
      showNotifications,
      notifications,
      toggleNotificationPopup,
      markAsRead,
      logout: () => {
        store.dispatch("auth/logout");
        router.push("/login");
      }
    };
  }
};
</script>