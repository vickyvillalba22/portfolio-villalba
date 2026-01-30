<script setup lang="ts">

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '@/types/user'
import ProfileCard from '@/components/small ui/log in/profileCard.vue'

const router = useRouter()

const user = ref<User | null>(null)

const storedUser = localStorage.getItem('session')
if (storedUser) {
  user.value = JSON.parse(storedUser)
}

</script>

<template>

    <section class="profile">

    <ProfileCard v-if="user" :user="user" />

    <p v-else class="error">
      No hay usuario logueado
    </p>

  </section>

</template>

<style scoped>

.profile {
  display: flex;
  justify-content: center;
  height: 90vh;
  align-items: center;
}


</style>