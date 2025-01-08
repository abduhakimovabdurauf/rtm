<template>

   <component :is="layout+'-layout'"></component>

</template>

<script>
  import MainLayout from "@/layouts/MainLayout.vue";
  import HomeLayout from "@/layouts/HomeLayout.vue";
  import AuthLayout from "@/layouts/AuthLayout.vue";
  import {computed, onMounted} from "vue";
  import {useRoute} from "vue-router";
  import {useStore} from "vuex";

  export default {
    components: {
      MainLayout,
      HomeLayout,
      AuthLayout,
    },

    setup() {
      const route = useRoute()
      const store = useStore()
      onMounted(()=> {
        store.dispatch('auth/checkToken');
      })
      return {
        layout: computed(() => route.meta.layout ),
      }
    }
  }
</script>

<style>


</style>