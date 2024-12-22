import { createRouter, createWebHistory } from 'vue-router';
import ViewHome from '../views/HomeLayout/ViewHome.vue'
import ViewLogin from "@/views/AuthLayout/ViewLogin.vue";
import store from "../store";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ViewHome,
    meta: {
      layout: 'home',
      auth: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: ()=> import('../views/MainLayout/ViewDashboard.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: ViewLogin,
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: ()=> import('../views/MainLayout/Courses/ViewCourse.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/roles',
    name: 'Roles',
    component: ()=> import('../views/MainLayout/Roles/ViewRole.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: ()=> import('../views/MainLayout/Rooms/ViewRoom.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: ()=> import('../views/MainLayout/Users/ViewUser.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/students',
    name: 'Students',
    component: ()=> import('@/views/MainLayout/Students/ViewStudents.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/groups',
    name: 'Groups',
    component: ()=> import('../views/MainLayout/Groups/ViewGroup.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/payments',
    name: 'Payments',
    component: ()=> import('../views/MainLayout/Payments/ViewPayments.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/watchcourse/:id?',
    name: 'WatchCourse',
    component: ()=> import('../views/MainLayout/Courses/ViewRequestCourse.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/watchroom/:id?',
    name: 'WatchRoom',
    component: ()=> import('../views/MainLayout/Rooms/ViewRequestRoom.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/watchUser/:id?',
    name: 'WatchUser',
    component: ()=> import('../views/MainLayout/Users/ViewRequestUser.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/watchStudent/:id?',
    name: 'WatchStudent',
    component: () => import('../views/MainLayout/Students/ViewRequestStudent.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
     path: '/watchGroup/:id?',
     name: 'WatchGroup',
     component: ()=> import('../views/MainLayout/Groups/ViewRequestGroup.vue'),
     meta: {
       layout: 'main',
       auth: true
     }
  },
  {
    path: '/watchPayment/:id?',
    name: 'WatchPayment',
    component: ()=> import('../views/MainLayout/Payments/ViewRequestPayments.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ()=> import('../views/MainLayout/Profile/ViewProfile.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass:'bg-gray-700',
  linkExactActiveClass:'bg-gray-700',
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth;

  if (store.getters['auth/isAuthenticated'] && to.name === 'login') {
    next(false);
  }
  else if (requireAuth && store.getters['auth/isAuthenticated']) {
    next();
  }
  else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/login?message=auth');
  }
  else {
    next();
  }

  const routeExists = router.getRoutes().some(route => route.name === to.name);

  if (!routeExists) {
    console.warn(`Sahifa mavjud emas: ${to.name}`);
    next(false);
  }
});


export default router;
