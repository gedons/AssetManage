import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Index.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import UserManagement from '../components/Admin/UserManagement.vue';
import AssetManagement from '../components/Admin/AssetManagement.vue';
import Reports from '../components/Admin/Reports.vue';
import UserDashboard from '../views/UserDashboard.vue';
import store from '../store';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    {
        path: '/admin',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true, role: 'admin' },
        children: [
          { path: 'user-management', name: 'UserManagement', component: UserManagement },
          { path: 'asset-management', name: 'AssetManagement', component: AssetManagement },
          { path: 'reports', name: 'Reports', component: Reports },
        ],
    },
    {
      path: '/user',
      name: 'UserDashboard',
      component: UserDashboard,
      meta: { requiresAuth: true, role: 'user' },
    },
  ];
 
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const user = store.state.user;
    
    if (requiresAuth && !user) {
      next('/login');
    } else if (requiresAuth && to.meta.role && to.meta.role !== user.role) {
      next('/');
    } else {
      next();
    }
});
  

export default router;