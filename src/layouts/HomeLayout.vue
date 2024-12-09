<template>
  <Loader v-if="isLoading" />
  <router-view v-else></router-view>
  <scrollButton/>
</template>

<script>
import Loader from '@/components/HomeLayout/Loader.vue';
import ViewHome from "@/views/HomeLayout/ViewHome.vue";
import { onBeforeMount, ref} from 'vue'
import ScrollButton from "@/components/HomeLayout/ScrollButton.vue";
export default {
  components: {
    ScrollButton,
    Loader,
    ViewHome
  },

  setup() {
    const isLoading = ref(true);

    onBeforeMount(() => {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        isLoading.value = false;
        document.body.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden';
      }, 3000);
    });

    return {
      isLoading,
    };
  }

}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content__section {
  flex: 1;
}

.bottom__section {
  background-color: #f1f1f1;
}

</style>