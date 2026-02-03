<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import UserCard from '@/components/small ui/log in/userCard.vue'
import FilterTabs from '@/components/small ui/log in/filterTabs.vue'
import type { User } from '@/types/user'
import { Icon } from '@iconify/vue'
import router from '@/router'
import { initUsers, getUsers, deleteUserById, resetUsers } from '@/utils/users'

const users = ref<User[]>([])
const filter = ref<'all' | 'admin' | 'user'>('all')

const loading = ref(false)
const error = ref<string | null>(null)

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
  deleteUserById(id)
  users.value = getUsers()
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
  router.back()
}

</script>

<template>

  <section class="admin-users">

    <button class="back" @click="goBack">
      ← Volver
    </button>

    <!--AJUSTAR PESO-->
    <h3>Administrar usuarios</h3>

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

    <button @click="reset">
      Reset users
    </button>

    <button class="add" @click="addUser">
        <Icon icon="hugeicons:plus-sign" class="i-mob" />
    </button>

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

.add {
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--rosa);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.i-mob{
    width: 32px;
    height: 32px;
    color: var(--negro);
}

</style>
