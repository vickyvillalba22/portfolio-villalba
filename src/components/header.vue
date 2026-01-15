<script setup lang="ts">

import { Icon } from '@iconify/vue'

const props = defineProps<{
  isHome: boolean;
}>();

</script>

<template>
  <header class="header" :class="[{ 'header-home': isHome, 'header-default': !isHome }]">

    <nav class="nav">

      <router-link v-if="!isHome" to="/" class="item blanco">
        <span>Home</span>
      </router-link>

      <router-link to="/about" class="item blanco">
        <Icon icon="hugeicons:arrow-right-02" class="i-mob" />
        <span>About Me</span>
      </router-link>

      <router-link to="/projects" class="item blanco">
        <Icon icon="hugeicons:arrow-right-02" class="i-mob" />
        <span>Projects</span>
      </router-link>

      <router-link to="/research" class="item blanco">
        <Icon icon="hugeicons:arrow-right-02" class="i-mob" />
        <span>Research</span>
      </router-link>

      <router-link to="/contact" class="item blanco">
        <Icon icon="hugeicons:arrow-right-02" class="i-mob" />
        <span>Contact</span>
      </router-link>

      <router-link to="/login" class="item blanco">
        <Icon icon="hugeicons:arrow-right-02" class="i-mob" />
        <span>Log in</span>
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
  width: 100%; 
  height: fit-content;
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

</style>