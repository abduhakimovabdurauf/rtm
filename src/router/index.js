import { createRouter, createWebHistory } from 'vue-router';
import ViewHome from '../views/HomeLayout/ViewHome.vue'
import ViewLogin from "@/views/AuthLayout/ViewLogin.vue";
const routes = [
  {
    path: '/',
    name: 'Home',
    component: ViewHome,
    meta: {
      layout: 'home'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: ViewLogin,
    meta: {
      layout: 'auth'
    }
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
