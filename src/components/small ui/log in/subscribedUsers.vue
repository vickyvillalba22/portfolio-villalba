<script setup lang="ts">
import { computed, ref } from 'vue'
import { getSubscribedUsers, resetUsers } from '@/utils/users'
import type { User } from '@/types/user'

import { Icon } from '@iconify/vue'

const refreshKey = ref(0)

const subscribedUsers = computed<User[]>(() => {
    refreshKey.value // dependencia reactiva
    return getSubscribedUsers()
})

const handleReset = async () => {
    await resetUsers()
    refreshKey.value++ // fuerza recompute
}

</script>

<template>
  <section class="subscribed-users">

    <div class="top">
        <h3>Subscribed users</h3>
        <button class="reset" @click="handleReset">
            <Icon icon="hugeicons:reload" class="i-mob"/>
        </button>
    </div>

    <p v-if="subscribedUsers.length === 0">
      No hay usuarios suscriptos todavía
    </p>

    <ul v-else class="user-list">
      <li
        v-for="user in subscribedUsers"
        :key="user.id"
        class="user-item"
      >
        <div class="avatar">
          {{ user.name.charAt(0) }}
        </div>

        <div class="info">
          <p class="name">{{ user.name }}</p>
          <p class="email">{{ user.email }}</p>
        </div>
      </li>
    </ul>

  </section>
</template>

<style scoped>
.subscribed-users {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
}

.top{
    display: flex;
    width: 100%;
    justify-content: space-between;
}
.i-mob{
    width: 24px;
    height: 24px;
    color: var(--color-texto-secundario);
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--rosa);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 600;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 600;
}

.email {
  font-size: 0.85em;
  opacity: 0.6;
}

@media (min-width: 920px){
  .subscribed-users{
    width: 40%;
  }
}

</style>
