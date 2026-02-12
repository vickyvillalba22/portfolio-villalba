<script setup lang="ts">

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import type { User } from '@/types/user'
import { updateUser, resetUserById } from '@/utils/users'
import { clearSession, saveSession, currentUser } from '@/utils/session'
import ModalPregunta from '@/components/small ui/log in/modals/modalPregunta.vue'

import { Icon } from '@iconify/vue';

const router = useRouter()

const props = defineProps<{
    user: User
}>()

const emit = defineEmits<{
  (e: 'action', value: string | null): void
}>()

const isAdmin = computed(() => props.user.role === 'admin')
const isLogoutModalOpen = ref(false)
const isSubscribeModalOpen = ref(false)

//manejo de menu 
const userActions = computed(() => {
  const subscribed = currentUser.value?.isSubscribed

  return [
    { label: 'Liked posts', icon: 'hugeicons:heart-check', action: 'likes' },
    { 
      label: subscribed 
        ? 'Unsubscribe from portfolio' 
        : 'Subscribe to portfolio',
      icon: subscribed 
        ? 'hugeicons:user-remove-01' 
        : 'hugeicons:user-add-01',
      action: 'subscribe'
    },
    { label: 'Edit profile', icon: 'hugeicons:user-edit-01', action: 'edit' },
    { label: 'Log out', icon: 'hugeicons:logout-04', action: 'logout' }
  ]
})

const adminActions = [
  { label: 'Manage users', icon: 'hugeicons:user-edit-01', action: 'users' },
  { label: 'Subscribed users', icon: 'hugeicons:user-check-01', action: 'subscribed' },
  { label: 'Manage projects', icon: 'hugeicons:pencil-edit-02', action: 'content' },
  { label: 'Log out', icon: 'hugeicons:logout-04', action: 'logout' },
  

]

//elije el array a usar
const actions = computed(() =>
  props.user.role === 'admin'
    ? adminActions
    : userActions.value
)

const activeAction = ref<string | null>(null)

//mapa de acciones
const actionHandlers: Record<string, () => void> = {

  users: () => {
    router.push('/admin/users')
  },
  content: ()=>{
    router.push('/admin/projects')
  },

  logout: () => {
    isLogoutModalOpen.value = true
  },

  subscribe: () => {
    isSubscribeModalOpen.value = true
  },

  edit: () => {
    router.push('/profile/edit')
  }
}

const confirmLogout = () => {
  clearSession() 
  router.push('/login')
}
const confirmSubscribe = () => {
  if (!currentUser.value) return

  currentUser.value.toggleSubscription()
  saveSession(currentUser.value)
  updateUser(currentUser.value)
}

const handleAction = (action: string) => {
  activeAction.value =
    activeAction.value === action ? null : action

  emit('action', activeAction.value)

  const handler = actionHandlers[action]
  if (handler) handler()
}

/*reset*/
const resetProfile = async () => {
  if (!currentUser.value) return

  const restored = await resetUserById(currentUser.value.id)
  if (!restored) return

  currentUser.value = restored
  saveSession(restored)
}

</script>

<template>

<section class="profile-card" :class="props.user.role">

      <div class="info">

        <div class="avatar">
          <img
            v-if="user.avatar"
            :src="user.avatar"
          />
          <span v-else>
            {{ user.name.charAt(0) }}
          </span>
        </div>

        <h3 class="name">{{ user.name }}</h3>
        <p class="username">@{{ user.usuario }}</p>
        <!--LA FECHA NO SE RENDERIZA-->
        <p class="date">Register date: {{ user.registerDate }}</p>

      </div>

      <div class="actions">

        <!--AGREGAR FUNCIONES-->
            <button
                v-for="item in actions"
                :key="item.action"
                class="menu-item"
                :class="{ active: activeAction === item.action }"
                @click="handleAction(item.action)"
            >
                <Icon :icon="item.icon" class="i-mob" />
                <span>{{ item.label }}</span>
            </button>

      </div>

      <button
        class="reset-profile"
        @click="resetProfile"
      >
        <Icon icon="hugeicons:reload" class="i-mob"/>
        Reset profile
      </button>

      <ModalPregunta
        v-model="isLogoutModalOpen"
        question="Are you sure you want to log out?"
        confirmText="Log out"
        cancelText="Cancel"
        confirmColor="error"
        :onConfirm="confirmLogout"
      />

      <ModalPregunta
        v-model="isSubscribeModalOpen"
        :question="currentUser?.isSubscribed 
          ? 'Do you want to unsubscribe from the portfolio?' 
          : 'Do you want to subscribe to the portfolio?'"
        :confirmText="currentUser?.isSubscribed ? 'Unsubscribe' : 'Subscribe'"
        cancelText="Cancel"
        confirmColor="user"
        :onConfirm="confirmSubscribe"
      />

    </section>

</template>

<style scoped>

.profile-card {
    text-align: center;
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: var(--color-texto-secundario);
  color: var(--color-texto-principal);
  display: grid;
  place-items: center;
  font-size: 2rem;
  
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

.info{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.name {
  font-weight: 600;
}

.username {
  font-size: 1em;
  opacity: 0.6;
}
.date{
  color: var(--color-texto-secundario);
  font-size: 0.8em;
}

.actions {
  display: flex;
}
.action {
  cursor: pointer;
}

.menu-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    padding: 5px 10px;
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.menu-item.active span {
  font-weight: 600;
}

.profile-card.user svg {
  color: var(--azul);
}

.profile-card.admin svg {
  color: var(--rosa);
}

/*reset*/
.reset-profile {
  background: transparent;
  border: none;
  font-family: var(--font-princ);
  font-size: 0.8em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  align-self: center;
  color: var(--color-texto-secundario);
}
.reset-profile .i-mob{
  width: 24px;
  height: 24px;
  opacity: 0.6;
}


</style>