import { User } from '@/types/user'

export async function loginUser(
  usuario: string,
  password: string
): Promise<User | null> {
  const res = await fetch('/data/users.json')
  const users = await res.json()

  const raw = users.find(
    (u: any) => u.usuario === usuario && u.password === password
  )

  if (!raw) return null

  return new User(
    raw.id,
    raw.name,
    raw.usuario,
    raw.email ?? '',
    raw.password,
    raw.role,
    raw.isSubscribed ?? false,
    raw.registerDate ?? '',
    raw.likedPosts ?? []
  )
}



