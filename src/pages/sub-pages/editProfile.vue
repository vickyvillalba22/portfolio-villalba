<script setup lang="ts">

import { useRouter } from 'vue-router'

import UserForm from '@/components/small ui/log in/forms/userForm.vue'
import { currentUser, saveSession } from '@/utils/session'
import { updateUser } from '@/utils/users'
import type { User } from '@/types/user'

import { Icon } from '@iconify/vue'

const router = useRouter()

function handleSuccess(user: User) {
  saveSession(user)
  updateUser(user)
  router.push('/profile')
}

function back(){
  router.push('/profile')
}

</script>

<template>

    <section>

        <button class="back" @click="back">
            <Icon icon="hugeicons:arrow-left-02" class="i-mob" />
        </button>

        <UserForm
            v-if="currentUser"
            mode="profile"
            variant="user"
            :user="currentUser"
            @success="handleSuccess"
        />

  </section>

</template>

<style scoped>

section{
    width: 90%;
    height: 90vh;
}

</style>
