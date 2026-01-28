<script setup lang="ts">

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '@/types/user'

const router = useRouter()

const user = ref<User | null>(null)

const storedUser = localStorage.getItem('session')
if (storedUser) {
  user.value = JSON.parse(storedUser)
}

const isAdmin = computed(() => user.value?.role === 'admin')

const logout = () => {
  localStorage.removeItem('session')
  router.push('/login')
}

</script>

<template>

    <section class="profile">

    <div v-if="user" class="profile-card">

      <!-- Avatar -->
      <div class="avatar">
        <span>{{ user.name.charAt(0) }}</span>
      </div>

      <!-- Info -->
      <h3 class="name">{{ user.name }}</h3>
      <p class="username">@{{ user.usuario }}</p>

      <!-- ACTIONS -->
      <div class="actions">

        <!-- ADMIN -->
        <template v-if="isAdmin">
          <button class="action">Administrar usuarios</button>
          <button class="action">Administrar contenido</button>
        </template>

        <!-- USER -->
        <template v-else>
          <button class="action">
            Likes ({{ user.likedPosts.length }})
          </button>
        </template>

        <button class="action logout" @click="logout">
          Cerrar sesión
        </button>
      </div>

    </div>

    <p v-else class="error">
      No hay usuario logueado
    </p>

  </section>

</template>

<style scoped>

.profile {
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.profile-card {
  text-align: center;
  width: 260px;
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
  margin: 0 auto 1rem;
}

.name {
  font-weight: 600;
}

.username {
  font-size: 0.85rem;
  opacity: 0.6;
}

.actions {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action {
  background: none;
  border: 1px solid #333;
  padding: 0.6rem;
  cursor: pointer;
}

.logout {
  opacity: 0.6;
}


</style>