import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Home from "../pages/home.vue";
import About from "../pages/about.vue";
import Projects from "../pages/projects.vue";
import Contact from "../pages/contact.vue";

// Tipado fuerte de las rutas
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
    path: '/contact',
    name: 'contact',
    component: Contact
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

