import { ref } from 'vue'
import { User } from '@/types/user'

export const currentUser = ref<User | null>(null)

export function hydrateUser(raw: any): User {
  return new User(
    raw.id,
    raw.name,
    raw.usuario,
    raw.email,
    raw.password ?? '',
    raw.role,
    raw.isSubscribed ?? false,
    raw.registerDate ?? '',
    raw.likedPosts ?? [],
    raw.avatar
  )
}

export function loadSession() {
  const raw = localStorage.getItem('session')
  if (!raw) return

  const parsed = JSON.parse(raw)
  currentUser.value = hydrateUser(parsed)
}

export function saveSession(user: User) {
  currentUser.value = user
  localStorage.setItem('session', JSON.stringify(user))
}

export function clearSession() {
  currentUser.value = null
  localStorage.removeItem('session')
}

