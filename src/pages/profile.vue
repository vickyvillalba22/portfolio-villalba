<script setup lang="ts">

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '@/types/user'
import ProfileCard from '@/components/small ui/log in/profileCard.vue'
import LikedPosts from '@/components/small ui/log in/likedPosts.vue'

const router = useRouter()

const user = ref<User | null>(null)

const storedUser = localStorage.getItem('session')
if (storedUser) {
  user.value = JSON.parse(storedUser)
}

//liked posts
const showLikes = ref(false)

const toggleLikes = () => {
  showLikes.value = !showLikes.value
}

</script>

<template>

    <section class="profile">

    <ProfileCard v-if="user" :user="user" @likes="toggleLikes" />

    <p v-else class="error">
      No hay usuario logueado
    </p>

    <LikedPosts
      v-if="user && showLikes"
      :user="user"
    />

  </section>

</template>

<style scoped>

.profile {
  display: flex;
  flex-direction: column;
  height: 90vh;
  align-items: center;
  gap: 30px;
}

</style>