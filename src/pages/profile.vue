<script setup lang="ts">

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '@/types/user'
import { currentUser } from '@/utils/session'
import ProfileCard from '@/components/small ui/log in/profileCard.vue'
import LikedPosts from '@/components/small ui/log in/likedPosts.vue'
import SubscribedUsers from '@/components/small ui/log in/subscribedUsers.vue'

const router = useRouter()

const user = currentUser

//actions
const activeSection = ref<string | null>(null)

const handleAction = (action: string | null) => {
  activeSection.value = action
}

</script>

<template>

    <section class="profile">

    <ProfileCard v-if="user" :user="user" @action="handleAction" />

    <p v-else class="error">
      No hay usuario logueado
    </p>

    <LikedPosts
      v-if="user && activeSection === 'likes'"
      :user="user"
    />

    <SubscribedUsers v-if="user && activeSection === 'subscribed'" />

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

@media (min-width: 920px){
  .profile{
    width: 90%;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 6em;
  }
}

</style>