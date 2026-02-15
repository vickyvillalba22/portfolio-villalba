<script setup lang="ts">

import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { Icon } from '@iconify/vue'
import { navItems } from '@/utils/navItems'
import { currentUser } from '@/utils/session'

const user = currentUser
const isMobileMenuOpen = ref(false)
const navRef = ref<HTMLElement | null>(null)
const isScrolled = ref(false)

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

const handleClickOutside = (event: MouseEvent) => {
  if (!isMobileMenuOpen.value) return

  const target = event.target as Node

  if (navRef.value && !navRef.value.contains(target)) {
    isMobileMenuOpen.value = false
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)
})


</script>

<template>

  <header 
    class="header"
    :class="[
      { 'header-home': isHome, 'header-mobile': !isHome },
      { 'is-fixed': isScrolled }
    ]"
  >

    <div
      v-if="isMobileMenuOpen && !isHome"
      class="backdrop"
      @click="isMobileMenuOpen = false"
    />

    <!--boton hamburguesa-->
    <div class="contI" v-if="!isHome">
      <Icon icon="hugeicons:menu-11" class="i-mob" @click.stop="isMobileMenuOpen = !isMobileMenuOpen" />
    </div>

    <!--nav-->
    <nav ref="navRef" class="nav close" :class="[{ open: isMobileMenuOpen || isHome, 'nav-mobile': isMobileMenuOpen }]">

      <div class="contI" v-if="!isHome">
        <Icon icon="hugeicons:cancel-01" class="i-mob cerrar" @click.stop="isMobileMenuOpen = !isMobileMenuOpen" />
      </div>

      <transition-group
        name="slide-left"
        tag="div"
        appear
        class="header-items"
      >

        <router-link 
          v-for="(item, index) in visibleItems"
          :key="item.path" 
          :to="item.path"
          class="item escondido"
          :style="{ transitionDelay: `${index * 100}ms` }"
          @click="isMobileMenuOpen = false"
        > 

          <Icon v-if="isHome" icon="hugeicons:arrow-right-02" class="i-mob" />

          <p>{{ item.label }}</p>

        </router-link>

      </transition-group>

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
  color: var(--blanco);
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
  background-color: var(--blanco);
}

.header-items{
  display: flex;
  flex-direction: column;
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
  z-index: 2;
  padding-top: 20px;
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
  color: var(--color-texto-secundario);
  width: 100%;
}

.header-mobile .router-link-active p{
  color: var(--color-texto-principal);
}

.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  z-index: 1;
  transition: opacity 0.3s ease;
}

@media (min-width: 920px){

.header-mobile{
  background-color: var(--negro);
  position: relative;
  z-index: 3;
  height: 10vh;
  margin: 0;
}

.is-fixed{
  position: fixed;
  top: 0;
  width: 100%;
}

.header-home{
  width: 40%;
}

.header-home .item::after {
  width: 30%;
}

.i-mob{
  width: 24px;
  height: 24px;
}

.header-mobile .contI {
  display: none;
}

.header-mobile .header-items{
  flex-direction: row;
  gap: 20px;
}

.header-mobile .nav {
  display: flex;
  flex-direction: row;
  z-index: 3;
  height: auto;
  width: auto;
  margin-right: 5%;
  gap: 20px;
}

.header-mobile p {
  color: var(--color-texto-secundario);
  font-size: 0.9em;
}
.backdrop {
  display: none;
}

}

</style>