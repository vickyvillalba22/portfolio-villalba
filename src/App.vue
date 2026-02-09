<script setup lang="ts">

import { useProjectsProvider } from './utils/projectsProvider'
useProjectsProvider()

import Header from './components/header.vue';

import { useRoute } from 'vue-router';
import { computed } from 'vue';

import { loadSession } from '@/utils/session'
import { User } from '@/types/user'

const raw = localStorage.getItem('session')
if (raw) {
  loadSession()
}

const route = useRoute();

//tipado de las rutas
type RouteNames = 'home' | 'about' | 'projects' | 'contact';

const isHome = computed(() => route.name === 'home')

</script>

<template>
  <Header v-if="!isHome" :isHome="isHome" />
  <router-view />
</template>


<!--estilos generales-->
<style>

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: sans-serif;
}

#app{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


body{
  background-color: #181818;

  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
