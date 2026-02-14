<script setup lang="ts">

import { useRouter } from 'vue-router'
import { ref } from 'vue'

import { Icon } from '@iconify/vue'
import UserForm from '@/components/small ui/log in/forms/userForm.vue'
import ModalAviso from '@/components/small ui/log in/modals/modalAviso.vue'

const router = useRouter()

const isSuccessModalOpen = ref(false)

const handleSuccess = () => {
  isSuccessModalOpen.value = true
}

const goBackToUsers = () => {
  router.push('/admin/users')
}

</script>

<template>

  <section class="add-user sectionDesktop">

    <header class="top">
      <button @click="router.back()">
        <Icon icon="hugeicons:arrow-left-02" class="i-mob" />
      </button>
      <h3 class="subtitulo">Add user or administrator</h3>
    </header>

    <UserForm
      mode="add"
      variant="admin"
      @success="handleSuccess"
    />

    <ModalAviso
      v-model="isSuccessModalOpen"
      message="User created successfully!"
      buttonText="Back to users"
      buttonColor="success"
      :action="goBackToUsers"
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

@media (min-width: 920px){

.sectionDesktop{
  width: 35%;
  height: fit-content;
}

}

</style>

