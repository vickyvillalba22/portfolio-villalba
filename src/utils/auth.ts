export interface User {
  id: number
  name: string
  usuario: string
  role: 'admin' | 'user'
}

interface RawUser {
  id: number
  name: string
  usuario: string
  password: string
  role: string
}

export async function loginUser(
  usuario: string,
  password: string
): Promise<User | null> {
  const res = await fetch('/data/users.json')
  const users: RawUser[] = await res.json()

  const user = users.find(
    (u) => u.usuario === usuario && u.password === password
  )

  if (!user) return null

  return {
    id: user.id,
    name: user.name,
    usuario: user.usuario,
    role: user.role as 'admin' | 'user',
  }
}


