<template>
  <div class="flex h-screen bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-gray-100 w-full">
    <Sidebar/>
    <div class="flex-1 flex flex-col">
      <Navbar />
      <div class="flex-1 px-6 overflow-auto relative">
        <Loader v-if="isLoading" />
        <router-view/>
      </div>
    </div>
  </div>
</template>


<script>
import Sidebar from '@/components/MainLayout/Sidebar.vue';
import Navbar from '@/components/MainLayout/Navbar.vue';
import Loader from "@/components/MainLayout/ui/Loader.vue";
import { useStore } from "vuex";
import {computed, onMounted} from "vue";
export default {
  components: {
    Sidebar,
    Navbar,
    Loader
  },
  setup(){
    const store = useStore();
    const isLoading = computed(() =>store.getters.isLoading);

    onMounted(()=> {
      // store.dispatch('auth/checkToken');
      store.commit('closeSidebar')
    })
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
</style>
