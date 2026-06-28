import { create } from 'zustand'
import {
  clearStoredToken,
  getMe,
  getStoredToken,
  setStoredToken,
} from '../api/authApi'

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  login: (token, userData) => {
    setStoredToken(token)
    set({ user: userData })
  },

  logout: () => {
    clearStoredToken()
    set({ user: null })
  },

  initializeAuth: async () => {
    const token = getStoredToken()
    if (!token) {
      set({ loading: false })
      return
    }

    try {
      const data = await getMe()
      set({ user: data.user, loading: false })
    } catch {
      clearStoredToken()
      set({ user: null, loading: false })
    }
  },
}))

export const useAuth = () => {
  const user = useAuthStore((state) => state.user)
  const loading = useAuthStore((state) => state.loading)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)

  return {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
  }
}
