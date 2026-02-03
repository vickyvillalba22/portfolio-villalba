import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Home from "../pages/home.vue";
import About from "../pages/about.vue";
import Projects from "../pages/projects.vue";
import Contact from "../pages/contact.vue";
import Research from "@/pages/research.vue";
import Login from "@/pages/login.vue";
import Profile from "@/pages/profile.vue";

//tipado de las rutas
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
  {
    path: '/research',
    name: 'research',
    component: Research
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../pages/sub-pages/adminUsers.vue'),
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/users/add',
    name: 'add-user',
    component: () => import('../pages/sub-pages/addUser.vue'),
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/users/edit/:id',
    name: 'edit-user',
    component: () => import('../pages/sub-pages/editUser.vue'),
    meta: { requiresAdmin: true },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

//guard global
//AGREGARLE PAGINA UNAUTHORIZED
router.beforeEach((to, from, next) => {
  const session = localStorage.getItem('session')

  if (!session && to.path !== '/login') {
    return next('/login')
  }

  if (to.meta.requiresAdmin) {
    const user = session ? JSON.parse(session) : null

    if (!user || user.role !== 'admin') {
      return next('/profile')
    }
  }

  next()
})

export default router;

