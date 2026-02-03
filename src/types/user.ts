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

  //props de uso en la app
  likedPosts: number[]
}