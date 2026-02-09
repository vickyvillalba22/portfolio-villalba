<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import UserForm from '@/components/small ui/log in/forms/userForm.vue'
import type { User } from '@/types/user'
import { getUsers } from '@/utils/users'

import { Icon } from '@iconify/vue'

const route = useRoute()
const router = useRouter()

const user = ref<User | null>(null)

onMounted(() => {
  const id = Number(route.params.id)
  user.value = getUsers().find(u => u.id === id) || null
})

const onSuccess = (updated: User) => {
  router.push('/admin/users')
}

</script>

<template>

  <section v-if="user">

    <header class="top">
      <button @click="router.back()">
        <Icon icon="hugeicons:arrow-left-02" class="i-mob" />
      </button>
      <h3 class="subtitulo">Editar usuario</h3>
    </header>

    <UserForm
      mode="edit"
      variant="admin"
      :user="user"
      @success="onSuccess"
    />

  </section>

</template>

<style scoped>

section{
  width: 90%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  color: var(--color-texto-principal);
}

.top {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.i-mob{
  display: flex;
  width: 24px;
}

</style>