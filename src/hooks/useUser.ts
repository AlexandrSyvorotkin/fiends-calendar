import { create } from 'zustand'

interface User {
  id: number
  name: string
  color: string
}

interface UserState {
  user: User
  setUser: (user: User) => void
  setColor: (color: string) => void
  removeUser: () => void
}

// Получаем начальное состояние из localStorage
const getInitialState = (): User => {
  try {
    const stored = localStorage.getItem('user')
    if (stored) {
      const { value, timestamp } = JSON.parse(stored)
      // Проверяем, не истекли ли сутки
      if (Date.now() - timestamp <= 24 * 60 * 60 * 1000) {
        return value
      } else {
        localStorage.removeItem('user')
      }
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error)
  }
  return { id: 0, name: '', color: '' }
}

export const useUser = create<UserState>((set) => ({
  user: getInitialState(),
  setUser: (user) => set({ user }),
  setColor: (color: string) => set((state) => ({
    user: { ...state.user, color }
  })),
  removeUser: () => {
    localStorage.removeItem('user')
    set({ user: { id: 0, name: '', color: '' } })
  },
}))