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
        <Icon icon="hugeicons:arrow-left-02" class="i-mob" />
      </button>
      <h3 class="subtitulo">Agregar usuario o administrador</h3>
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
    width: 90%;
    height: 90vh;
    color: var(--color-texto-principal);
    display: flex;
    flex-direction: column;
    gap: 30px;
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

