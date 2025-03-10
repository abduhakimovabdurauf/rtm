import { createRouter, createWebHistory } from 'vue-router';
import ViewHome from '../views/HomeLayout/ViewHome.vue'
import ViewLogin from "@/views/AuthLayout/ViewLogin.vue";
import store from "../store";
import {useToast} from "vue-toastification";


const toast = useToast()
const routes = [
  {
    path: '/',
    name: 'Home',
    component: ViewHome,
    meta: { layout: 'home', auth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: ()=> import('../views/MainLayout/ViewDashboard.vue'),
    meta: { layout: 'main', auth: true, roles: ['admin', 'Director'] }
  },
  {
    path: '/login',
    name: 'Login',
    component: ViewLogin,
    meta: { layout: 'home', auth: false, roles: ['all'] }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: ()=> import('../views/MainLayout/Courses/ViewCourse.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR', 'Teacher', 'Administrator']
    }
  },
  {
    path: '/roles',
    name: 'Roles',
    component: ()=> import('../views/MainLayout/Roles/ViewRole.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'HR']
    }
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: ()=> import('../views/MainLayout/Rooms/ViewRoom.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: ()=> import('../views/MainLayout/Users/ViewUser.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },
  {
    path: '/students',
    name: 'Students',
    component: ()=> import('@/views/MainLayout/Students/ViewStudents.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR','Reception','Teacher', 'Administrator']
    }
  },
  {
    path: '/groups',
    name: 'Groups',
    component: ()=> import('../views/MainLayout/Groups/ViewGroup.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR', 'Teacher', 'Reception', 'Administrator']
    }
  },
  {
    path: '/payments',
    name: 'Payments',
    component: ()=> import('../views/MainLayout/Payments/ViewPayments.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: ()=> import('../views/MainLayout/Tasks/ViewTasks.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },
  {
    path: '/discounts',
    name: 'Discounts',
    component: ()=> import('../views/MainLayout/Discounts/ViewDiscounts.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },
  {
    path: '/companies',
    name: 'Company',
    component: () => import('../views/MainLayout/Companies/ViewCompany.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director']
    }
  },
  {
    path: '/branches',
    name: 'Branch',
    component: () => import('../views/MainLayout/Branches/ViewBranches.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director',]
    }
  },

  {
    path: '/tenants',
    name: 'Tenants',
    component: () => import('../views/MainLayout/Tenants/ViewTenants.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },

  {
    path: '/permissions',
    name: 'Permissions',
    component: () => import('../views/MainLayout/Permissions/ViewPermissions.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },

  {
    path: '/callLogs',
    name: 'callLogs',
    component: () => import('../views/MainLayout/callLog/viewCallLog.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },

  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../views/MainLayout/Notifications/ViewNotifications.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },


  {
    path: '/watchcourse/:id?',
    name: 'WatchCourse',
    component: ()=> import('../views/MainLayout/Courses/ViewRequestCourse.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR', 'Administrator']
    }
  },
  {
    path: '/watchroom/:id?',
    name: 'WatchRoom',
    component: ()=> import('../views/MainLayout/Rooms/ViewRequestRoom.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },
  {
    path: '/watchUser/:id?',
    name: 'WatchUser',
    component: ()=> import('../views/MainLayout/Users/ViewRequestUser.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },
  {
    path: '/watchStudent/:id?',
    name: 'WatchStudent',
    component: () => import('../views/MainLayout/Students/ViewRequestStudent.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR', 'Administrator']
    }
  },
  {
     path: '/watchGroup/:id?',
     name: 'WatchGroup',
     component: ()=> import('../views/MainLayout/Groups/ViewRequestGroup.vue'),
     meta: {
       layout: 'main',
       auth: true,
       roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR', 'Administrator']
     }
  },
  {
    path: '/watchPayment/:id?',
    name: 'WatchPayment',
    component: ()=> import('../views/MainLayout/Payments/ViewRequestPayments.vue'),
    meta: {
      layout: 'main',
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },
  {
    path: '/watchTask/:id?',
    name: 'WatchTask',
    component: ()=> import('../views/MainLayout/Tasks/ViewRequestTask.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },
  {
    path: '/watchDiscount/:id?',
    name: 'WatchDiscount',
    component: ()=> import('../views/MainLayout/Discounts/ViewRequestDiscount.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },
  {
    path: '/watchCompany/:id?',
    name: 'WatchCompany',
    component: () => import('../views/MainLayout/Companies/ViewRequestCompany.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director']
    }
  },

  {
    path: '/watchBranch/:id?',
    name: 'WatchBranch',
    component: () => import('../views/MainLayout/Branches/ViewRequestBranch.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },

  {
    path: '/watchTenant/:id?',
    name: 'watchTenant',
    component: () => import('../views/MainLayout/Tenants/ViewRequestTenants.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },

  {
    path: '/watchPermission/:id?',
    name: 'watchPermission',
    component: () => import('../views/MainLayout/Permissions/ViewRequestPermission.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },

  {
    path: '/watchNotification/:id?',
    name: 'watchNotification',
    component: () => import('../views/MainLayout/Notifications/ViewRequestNotification.vue'),
    meta: {
      layout: 'main',
      auth: true,
      roles: ['admin', 'Director', 'Manager', 'Accountant', 'HR']
    }
  },



  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta:{
      layout: 'main',
      auth: true,
      roles: ['all']
    }
  },

  {
    path: '/profile',
    name: 'Profile',
    component: ()=> import('../views/MainLayout/Profile/ViewProfile.vue'),
    meta: { layout: 'main', auth: false, roles: ['all'] }
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass:'bg-gray-700',
  linkExactActiveClass:'bg-gray-700',
});
router.beforeEach((to, from, next) => {
  const requireAuth = to?.meta.auth;
  const user = JSON.parse(localStorage.getItem("user"));
  const userRoles = user?.roles?.map(r => r.name) || ['guest'];
  console.log('auth: ', requireAuth)
  store.commit('closeSidebar');

  if (store.getters['auth/isAuthenticated'] && to?.path === '/login') {
    next('/dashboard');
  }

  else if (requireAuth===true && store.getters['auth/isAuthenticated']) {
    const allowedRoles = to?.meta?.roles;
    const hasAccess = userRoles.some(r => allowedRoles.some(role => role === r)) || allowedRoles.includes('all');

    if (hasAccess) {
      next();
    }
    else {
      toast.warning('Sizga bu sahifa ga kirish ruhsati berilmagan!');
      next('/profile');
    }
  }


  else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/login');
    console.log('else: ', requireAuth)
  }

  // else if (requireAuth===false) {
  //   next('/');
  // }

  else {
    next();
  }
});





export default router;
