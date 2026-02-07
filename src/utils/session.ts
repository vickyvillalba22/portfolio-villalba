import { ref } from 'vue'
import { User } from '@/types/user'

export const currentUser = ref<User | null>(null)
