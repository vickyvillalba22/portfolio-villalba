<script setup lang="ts">

import { useRouter } from 'vue-router'
import { ref } from 'vue'

import UserForm from '@/components/small ui/log in/forms/userForm.vue'
import { currentUser, saveSession } from '@/utils/session'
import { updateUser } from '@/utils/users'
import type { User } from '@/types/user'
import ModalAviso from '@/components/small ui/log in/modals/modalAviso.vue'

import { Icon } from '@iconify/vue'

const router = useRouter()

const isSuccessModalOpen = ref(false)

function handleSuccess(user: User) {
  saveSession(user)
  updateUser(user)
  isSuccessModalOpen.value = true
}

function goBackToProfile() {
  router.push('/profile')
}

</script>

<template>

    <section>

        <button class="back" @click="goBackToProfile">
            <Icon icon="hugeicons:arrow-left-02" class="i-mob" />
        </button>

        <UserForm
            v-if="currentUser"
            mode="profile"
            variant="user"
            :user="currentUser"
            @success="handleSuccess"
        />

        <ModalAviso
            v-model="isSuccessModalOpen"
            message="Profile updated successfully!"
            buttonText="Back to profile"
            buttonColor="success"
            :action="goBackToProfile"
        />

  </section>

</template>

<style scoped>

section{
    width: 90%;
    height: 90vh;
}

</style>
