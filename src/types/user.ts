export type UserRole = 'admin' | 'user'

export interface User {
  id: number
  name: string
  usuario: string
  email: string
  password: string
  role: UserRole
  isSubscribed: boolean
  registerDate: string

  // ⬇️ PROPIEDADES DE USO EN LA APP
  likedPosts: number[]
}