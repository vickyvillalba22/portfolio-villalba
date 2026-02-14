<script setup lang="ts">

import { computed } from 'vue';
import type { User } from '@/types/user'
import { Icon } from '@iconify/vue';

defineProps<{
  user: User
}>()

const emit = defineEmits<{
  (e: 'edit', user: User): void
  (e: 'delete', id: number): void
}>()

</script>

<template>

  <article class="user-card">

    <div class="avatar">
      <img
        v-if="user.avatar"
        :src="user.avatar"
        alt="avatar"
      />
      <span v-else>
        {{ user.name.charAt(0) }}
      </span>
    </div>

    <h3>{{ user.name }}</h3>
    <p class="username">@{{ user.usuario }}</p>

    <span :class="['role', user.role]">
      {{ user.role === 'admin' ? 'Admin' : 'User' }}
    </span>

    <div class="actions">

      <button @click="emit('edit', user)" class="edit">
        <Icon icon="hugeicons:edit-02" class="i-mob edit" />
      </button>
      <button @click="emit('delete', user.id)" class="delete">
        <Icon icon="hugeicons:delete-02" class="i-mob delete" />
      </button>

    </div>

  </article>

</template>

<style scoped>

.user-card {
  background: var(--forms1);
  border-radius: 8px;
  padding: 16px;
  width: 40%;
  height: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
}
.avatar img,.avatar span{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.avatar img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar span{
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-texto-secundario);
  color: var(--color-texto-principal);
  font-size: 1.3em;
}

h3 {
  font-size: 16px;
}

.username {
  font-size: 12px;
  opacity: 0.7;
}

.role {
  font-size: 14px;
}

.role.admin {
  color: var(--rosa);
}

.role.user {
  color: var(--azul);
}

.actions {
  display: flex;
  justify-content: end;
  width: 100%;
  gap: 10px;
}

.actions button{
  background-color: var(--blanco-suave);
  padding: 8px;
  border-radius: 100%;
} 

.i-mob{
    width: 18px;
    height: 18px;
    display: flex;
}
.edit{
    color: var(--verde);
}
.delete{
    color: var(--rojo);
}

@media (min-width: 920px){

.user-card{
  width: 15%;
  height: 35vh;
}

}

</style>
