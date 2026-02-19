<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>

  <div class="unauthorized-container">

    <div class="unauthorized-card sectionDesktop">

        <Icon icon="hugeicons:shield-02" class="i-mob"></Icon>

        <h2>Access Restricted</h2>
        <p>
            This section is available only for administrators.
        </p>
        <button class="back-btn" @click="goHome">
            Go back to home
        </button>

    </div>

  </div>

</template>

<style scoped>
.unauthorized-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.unauthorized-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 2rem;
  border-radius: 12px;
  background: var(--negro);
  max-width: 100%;
}

.back-btn {
  padding: 8px 16px;
  border: 1px solid var(--color-texto-secundario);
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--font-princ);
  width: fit-content;
}
.back-btn:hover{
    background-color: var(--blanco-suave);
}
.i-mob{
    color: var(--rosa);
}
</style>
