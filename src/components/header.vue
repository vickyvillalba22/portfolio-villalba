<script setup lang="ts">

import { Icon } from '@iconify/vue'

const props = defineProps<{
  isHome: boolean;
}>();

</script>

<template>
  <header class="header" :class="[{ 'header-home': isHome, 'header-default': !isHome }]">
    <nav class="nav">

      <router-link v-if="!isHome" to="/" class="item">
        <span>Home</span>
      </router-link>

      <router-link to="/about" class="item">
        <Icon icon="hugeicons:arrow-right-02" class="i-mob" />
        <span>About Me</span>
      </router-link>

      <router-link to="/projects" class="item">
        <Icon icon="hugeicons:arrow-right-02" class="i-mob" />
        <span>Projects</span>
      </router-link>

      <router-link to="/contact" class="item">
        <Icon icon="hugeicons:arrow-right-02" class="i-mob" />
        <span>Contact</span>
      </router-link>
    </nav>
  </header>
</template>

<style scoped>

header{
    height: 10vh;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
}

nav{
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
}

.item{
    color: rgb(255, 255, 255);
    font-weight: 300;
    font-size: 0.9em;
    padding: 5px 15px;
    border-radius: 8px;
}
.router-link-active {
    background: #eaeaea;
    color: black;
}

/*HEADER HOME*/
.header-home {
  width: 25%; 
}

.header-home nav {
  flex-direction: column;
  width: 100%;
  gap: 20px;
}

.header-home .item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2em;
  font-weight: 400;
  color: rgb(255, 255, 255); 
}

/* flechita */
.header-home .arrow {
  font-size: 1.2em;
  display: flex;
}

/* línea horizontal debajo de cada item */
.header-home .item {
  position: relative;
  padding-bottom: 10px;
  padding-top: 10px;
}

.header-home .item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.5px;
  background-color: rgb(255, 255, 255);
}

/*animacion*/
/* Flecha y texto independientes */
.header-home .item .arrow,
.header-home .item span {
  transition: transform 0.25s ease;
}
/* Hover: mover ambos hacia la derecha */
.header-home .item:hover .arrow,
.header-home .item:hover span {
  transform: translateX(170px);
}

@media (max-width: 600px) {
  nav{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .header-home {
    width: 100%; 
  }
  .header-default{
    margin-top: 30px;
  }
}

</style>