<script setup lang="ts">

import { computed } from 'vue'
import type { User } from '@/types/user'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue';

const router = useRouter()

const props = defineProps<{
    user: User
}>()

const isAdmin = computed(() => props.user.role === 'admin')

const logout = () => {
  localStorage.removeItem('session')
  router.push('/login')
}

//manejo de menu 
const userActions = [
  { label: 'Liked posts', icon: 'hugeicons:heart-check', action: 'likes' },
  { label: 'Subscribe to portfolio', icon: 'hugeicons:user-add-01', action: 'subscribe' },
  { label: 'Edit profile', icon: 'hugeicons:user-edit-01', action: 'edit' },
  { label: 'Log out', icon: 'hugeicons:logout-04', action: 'logout' },
]

const adminActions = [
  { label: 'Manage users', icon: 'hugeicons:user-edit-01', action: 'users' },
  { label: 'Manage projects', icon: 'hugeicons:pencil-edit-02', action: 'content' },
  { label: 'Log out', icon: 'hugeicons:logout-04', action: 'logout' },
]

//elije el array a usar
const actions = computed(() =>
  props.user.role === 'admin'
    ? adminActions
    : userActions
)

//mapa de acciones
const actionHandlers: Record<string, () => void> = {
  users: () => {
    router.push('/admin/users')
  },
  logout: () => {
    localStorage.removeItem('session')
    router.push('/login')
  },

  //SE IRÁN AJUSTANDO
  likes: () => {
    console.log('TODO: likes')
  },
  subscribe: () => {
    console.log('TODO: subscribe')
  },
  edit: () => {
    console.log('TODO: edit profile')
  },
}

const handleAction = (action: string) => {
  const handler = actionHandlers[action]
  if (handler) {
    handler()
  }
}

</script>

<template>

<div class="profile-card" :class="props.user.role">

    <!--PONER IMAGEN DINAMICA-->
      <div class="info">
        <div class="avatar">
            <span>{{ user.name.charAt(0) }}</span>
        </div>
        <h3 class="name">{{ user.name }}</h3>
        <p class="username">@{{ user.usuario }}</p>
        <!--LA FECHA NO SE RENDERIZA-->
        <p>{{ user.registerDate }}</p>
      </div>

      <div class="actions">

        <!--AGREGAR FUNCIONES-->
            <button
                v-for="item in actions"
                :key="item.action"
                class="menu-item"
                @click="handleAction(item.action)"
            >
                <Icon :icon="item.icon" class="i-mob" />
                <span>{{ item.label }}</span>
            </button>

      </div>

    </div>

</template>

<style scoped>

.profile-card {
    text-align: center;
    width: 70%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: #222;
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 2rem;
}

.info{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.name {
  font-weight: 600;
}

.username {
  font-size: 0.8em;
  opacity: 0.6;
}

.actions {
  display: flex;
  gap: 2em;
}

.action {
  cursor: pointer;
}

.menu-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    font-size: 14px;
}

.profile-card.user svg {
  color: var(--azul);
}

.profile-card.admin svg {
  color: var(--rosa);
}

</style>