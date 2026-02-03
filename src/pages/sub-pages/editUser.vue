<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserForm from '@/components/small ui/log in/forms/userForm.vue'
import type { User } from '@/types/user'
import { getUsers, updateUser } from '@/utils/users'

const route = useRoute()
const router = useRouter()

const user = ref<User | null>(null)

onMounted(() => {
  const id = Number(route.params.id)
  user.value = getUsers().find(u => u.id === id) || null
})

const onSuccess = (updated: User) => {
  updateUser(updated)
  router.push('/admin/users')
}
</script>

<template>
  <section v-if="user">
    <header class="top">
      <button @click="router.back()">←</button>
      <h1>Editar usuario</h1>
    </header>

    <UserForm
      mode="edit"
      variant="admin"
      :user="user"
      @success="onSuccess"
    />
  </section>
</template>
