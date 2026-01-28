<script setup lang="ts">

import { ref, computed, onMounted } from 'vue';
import { Icon } from '@iconify/vue'
import { navItems } from '@/utils/navItems'
import type { User } from '@/utils/auth'

const props = defineProps<{
  isHome: boolean;
}>();

const visibleItems = computed(() =>

  navItems.filter(item => {

    // ocultar login si hay sesión
    if (item.path === '/login' && user.value) return false

    // ocultar perfil si NO hay sesión
    if (item.path === '/profile' && !user.value) return false

    return (
      (props.isHome && item.showOnHome) ||
      (!props.isHome && item.showOnDefault)
    )
  })
  
)

const isMobileMenuOpen = ref(false)

//log in
const user = ref<User | null>(null)

onMounted(() => {
  const session = localStorage.getItem('session')
  if (session) {
    user.value = JSON.parse(session) as User
  }
})

</script>

<template>

  <!--PONERLE POSITION FIXED-->

  <header class="header" :class="[{ 'header-home': isHome, 'header-mobile': !isHome }]">

    <!--boton hamburguesa-->
    <div class="contI" v-if="!isHome">
      <Icon icon="hugeicons:menu-11" class="i-mob blanco" @click="isMobileMenuOpen = !isMobileMenuOpen" />
    </div>

    <!--nav-->
    <nav class="nav close" :class="[{ open: isMobileMenuOpen || isHome, 'nav-mobile': isMobileMenuOpen }]">

      <div class="contI" v-if="!isHome">
        <Icon icon="hugeicons:cancel-01" class="i-mob blanco" @click="isMobileMenuOpen = !isMobileMenuOpen" />
      </div>
      
        <router-link 
          v-for="item in visibleItems"
          :key="item.path" 
          :to="item.path"
          class="item escondido"
          @click="isMobileMenuOpen = false"> 

          <Icon v-if="isHome" icon="hugeicons:arrow-right-02" class="i-mob" />

          <p>{{ item.label }}</p>

        </router-link>

    </nav>

  </header>

</template>

<style scoped>

.header-home{
  width: 100%;
}

.header-home .nav{
  width: 100%;
}

.item{
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 20px;
  color: #E8E8E8;
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
  width: 90%;
  height: 0.5px;
  background-color: rgb(255, 255, 255);
}

/*menu hamburguesa*/
.close{
  display: none;
}
.open{
  display: block;
  position: fixed;
}

.header-mobile{
  display: flex;
  width: 100%;
  justify-content: end;
  align-items: center;
  margin-top: 20px;
}

.contI{
  width: 100%;
  display: flex;
  justify-content: end;
  padding-right: 5%;
}

.nav-mobile{
  height: 100vh;
  width: 40%;
  top: 0;
  z-index: 1;
  margin-top: 20px;
  background-color: var(--negro);
}

.nav-mobile .contI{
  margin-bottom: 10px;
}

.nav-mobile .item{
  padding-right: 10%;
}

.nav-mobile p{
  text-align: right;
  color: #e8e8e869;
  width: 100%;
}

.header-mobile .router-link-active p{
  color: #E8E8E8;
}


</style>