<script setup lang="ts">

import { ref, computed, onMounted } from 'vue'
import router from '@/router'

import UserCard from '@/components/small ui/log in/userCard.vue'
import FilterTabs from '@/components/small ui/log in/filterTabs.vue'
import type { User } from '@/types/user'
import { initUsers, getUsers, deleteUserById, resetUsers } from '@/utils/users'
import ModalPregunta from '@/components/small ui/log in/modals/modalPregunta.vue'

import { Icon } from '@iconify/vue'

const users = ref<User[]>([])
const filter = ref<'all' | 'admin' | 'user'>('all')

const loading = ref(false)
const error = ref<string | null>(null)

const isDeleteModalOpen = ref(false)
const userToDelete = ref<number | null>(null)

onMounted(async () => {
  loading.value = true
  error.value = null

  try {
    await initUsers()
    users.value = getUsers()
  } catch (err) {
    error.value = 'No se pudieron cargar los usuarios'
    console.error(err)
  } finally {
    loading.value = false
  }
})


const filteredUsers = computed(() => {
  if (filter.value === 'all') return users.value
  return users.value.filter(u => u.role === filter.value)
})

const editUser = (user: User) => {
  console.log('EDIT USER REQUEST', {
    id: user.id,
    email: user.email,
    role: user.role,
  })
  router.push(`/admin/users/edit/${user.id}`)
}

const deleteUser = (id: number) => {
  userToDelete.value = id
  isDeleteModalOpen.value = true
}
const confirmDelete = () => {
  if (userToDelete.value === null) return

  deleteUserById(userToDelete.value)
  users.value = getUsers()

  userToDelete.value = null
}

const addUser = () => {
  router.push('/admin/users/add')
  console.log('ADD USER REQUEST')
}

const reset = async () => {
  await resetUsers()
  users.value = getUsers()
}

const goBack = () => {
  router.push('/profile')
}

</script>

<template>

  <section class="admin-users">

    <button class="back" @click="goBack">
      <Icon icon="hugeicons:arrow-left-02" class="i-mob" />
    </button>

    <h3 class="subtitulo">Manage users</h3>

    <FilterTabs v-model="filter" />

    <p v-if="loading">Cargando usuarios...</p>
    <p v-if="error">{{ error }}</p>

    <div v-if="!loading && !error" class="grid">
      <UserCard
        v-for="user in filteredUsers"
        :key="user.id"
        :user="user"
        @edit="editUser"
        @delete="deleteUser"
      />
    </div>

    <button class="reset flotante" @click="reset">
        <Icon icon="hugeicons:reload" class="i-mob"/>
    </button>

    <button class="add flotante" @click="addUser">
        <Icon icon="hugeicons:plus-sign" class="i-mob" />
    </button>

    <ModalPregunta
      v-model="isDeleteModalOpen"
      question="Are you sure you want to delete this user?"
      confirmText="Delete"
      cancelText="Cancel"
      confirmColor="error"
      :onConfirm="confirmDelete"
    />

  </section>
</template>

<style scoped>

.admin-users{
    height: 90vh;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 20px;
}

.grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.flotante{
  position: fixed;
  bottom: 5%;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add {
  right: 5%;
  background: var(--rosa);
}

.reset{
  left: 5%;
  background: var(--azul);
}

.i-mob{
    width: 32px;
    height: 32px;
}

.back{
  width: 100%;
  display: flex;
}

</style>
