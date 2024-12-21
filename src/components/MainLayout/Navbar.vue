<template>
  <nav class="flex flex-col sm:flex-row items-center justify-between p-2 bg-white shadow-md w-full">
    <div class="hidden items-center xl:flex flex-wrap">
      <input
          type="text"
          placeholder="Search..."
          class="flex-grow scale-y-95 sm:w-auto border-r-0 rounded-r-none px-2 py-1.5 rounded-md border border-gray-300 focus:outline-none"
      />
      <button class="px-2 py-2 bg-blue-500 text-white text-sm rounded-md hidden sm:block rounded-l-none">Search</button>
    </div>

    <div class="flex items-center gap-4 mt-4 sm:mt-0 w-auto justify-between">
      <i class="bx bx-bell text-xl sm:text-2xl text-gray-500 cursor-pointer"></i>
      <i class="bx bx-cog text-xl sm:text-2xl text-gray-500 cursor-pointer"></i>
      <router-link to="/profile">
        <div class="flex items-center gap-2 p-2 bg-gray-100 hover:bg-blue-100 rounded-md cursor-pointer transition-all duration-300">
          <img
              :src="user.image ? 'https:/api.mrtm.uz/storage/'+user.images[0] : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'"
              alt="User Avatar"
              class="w-8 h-8 rounded-full border border-gray-300"
          />
          <span class="text-gray-800 font-medium">{{ user.full_name }}</span>
        </div>
      </router-link>

      <button @click.prevent="logout" class="p-2 bg-blue-500 rounded-md text-white focus:outline-none">
        Chiqish
      </button>
    </div>
  </nav>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Navbar",
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = JSON.parse(localStorage.getItem("user"));

    return {
      user,
      logout: () => {
        store.dispatch('auth/logout');
        router.push('/login');
      }
    }
  }
};
</script>
