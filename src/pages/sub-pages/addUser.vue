<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import UserForm from '@/components/small ui/log in/forms/userForm.vue'

const router = useRouter()
</script>

<template>
  <section class="add-user">

    <!-- header -->
    <header class="top">
      <button @click="router.back()">
        <Icon icon="hugeicons:arrow-left-01" />
      </button>
      <h1>Agregar usuario o administrador</h1>
    </header>

    <!-- form -->
    <UserForm
      mode="add"
      variant="admin"
      @success="router.push('/admin/users')"
    />
  </section>
</template>

<style scoped>
.add-user {
  padding: 24px;
  color: white;
}
.top {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>

