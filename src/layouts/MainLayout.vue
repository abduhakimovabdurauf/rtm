<template>
  <div class="flex h-screen bg-gray-100 w-full">
    <Sidebar/>
    <div class="flex-1 flex flex-col">
      <Navbar />
      <div class="flex-1 px-6 overflow-auto">
        <Loader v-if="isLoading" />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/MainLayout/Sidebar.vue';
import Navbar from '@/components/MainLayout/Navbar.vue';
import Loader from "@/components/MainLayout/ui/Loader.vue";
import { useStore } from "vuex";
import {computed} from "vue";
export default {
  components: {
    Sidebar,
    Navbar,
    Loader
  },
  setup(){
    const store = useStore();
    const isLoading = computed(() =>store.getters.isLoading);
    // const isSidebarOpen = computed(() => store.state.isSidebarOpen);

    return {
      isLoading
    }
  }
};
</script>


<style scoped>
@keyframes bounce-in-left {
  0% {
    opacity: 0;
    transform: translateY(-300px);
  }
  60% {
    opacity: 1;
    transform: translateY(25px);
  }
  80% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.bounce-enter-active {
  animation: bounce-in-left 0.6s ease forwards;
}
.bounce-leave-active {
  animation: bounce-in-left 0.6s ease reverse forwards;
}
</style>
