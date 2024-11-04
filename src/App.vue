<template>

   <component :is="layout+'-layout'"></component>

</template>

<script>
  import MainLayout from "@/layouts/MainLayout.vue";
  import HomeLayout from "@/layouts/HomeLayout.vue";
  import AuthLayout from "@/layouts/AuthLayout.vue";
  import {useRoute} from "vue-router";
  import {computed} from "vue";

  export default {
    components: {
      MainLayout,
      HomeLayout,
      AuthLayout,
    },

    setup() {
      const route = useRoute()

      return {
        layout: computed(() => route.meta.layout),
      }
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