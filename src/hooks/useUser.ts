import { create } from 'zustand'

interface User {
  id: number
  name: string
  color: string
}

interface UserState {
  user: User
  setUser: (user: User) => void
  removeUser: () => void
}

export const useUser = create<UserState>((set) => ({
  user: {
    id: 0,
    name: '',
    color: '',
  },
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: { id: 0, name: '', color: '' } }),
}))