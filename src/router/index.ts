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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

