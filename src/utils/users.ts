import { User } from '@/types/user'

const KEY = 'users'

function toUserInstance(u: any): User {
  return new User(
    u.id,
    u.name,
    u.usuario,
    u.email,
    u.password,
    u.role,
    u.isSubscribed,
    u.registerDate,
    u.likedPosts ?? []
  )
}

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
  if (!data) return []

  const raw = JSON.parse(data)
  return raw.map(toUserInstance)
  
}

export function getSubscribedUsers(): User[] {
  return getUsers().filter(u =>
    u.role === 'user' && u.isSubscribed
  )
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

export function updateUser(updated: User) {
  const users = getUsers().map(u =>
    u.id === updated.id ? updated : u
  )
  saveUsers(users)
}

export async function resetUsers() {
  const res = await fetch('/public/data/users.json')
  if (!res.ok) {
    throw new Error('Error loading users.json')
  }

  const data: User[] = await res.json()

  const normalized = data.map(u => ({
    ...u,
    likedPosts: u.likedPosts ?? [],
  }))

  localStorage.setItem(KEY, JSON.stringify(normalized))
}

export async function resetUserById(id: number): Promise<User | null> {
  const res = await fetch('/public/data/users.json')
  if (!res.ok) {
    throw new Error('Error loading users.json')
  }

  const data: User[] = await res.json()

  const original = data.find(u => u.id === id)
  if (!original) return null

  const restored = toUserInstance(original)

  const users = getUsers().map(u =>
    u.id === id ? restored : u
  )

  saveUsers(users)
  return restored
}

