import type { User } from '@/types/user'

const KEY = 'users'

// inicializa desde users.json SOLO una vez
export async function initUsers() {
  const exists = localStorage.getItem(KEY)
  if (exists) return

  const res = await fetch('/public/data/users.json')
  if (!res.ok) {
    throw new Error('Error loading users.json')
  }

  const data: User[] = await res.json()

  // aseguramos likedPosts
  const normalized = data.map(u => ({
    ...u,
    likedPosts: u.likedPosts ?? [],
  }))

  localStorage.setItem(KEY, JSON.stringify(normalized))
}

export function getUsers(): User[] {
  const data = localStorage.getItem(KEY)
  return data ? JSON.parse(data) : []
}

export function saveUsers(users: User[]) {
  localStorage.setItem(KEY, JSON.stringify(users))
}

export function addUser(user: User) {
  const users = getUsers()
  users.push(user)
  saveUsers(users)
}

export function deleteUserById(id: number) {
  const users = getUsers().filter(u => u.id !== id)
  saveUsers(users)
}
