import axios from 'axios'

const TOKEN_KEY = 'auth_token'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY)

export const setStoredToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const clearStoredToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const signup = async (payload) => {
  const { data } = await api.post('/auth/signup', payload)
  return data
}

export const signin = async (payload) => {
  const { data } = await api.post('/auth/signin', payload)
  return data
}

export const getMe = async () => {
  const { data } = await api.get('/auth/me')
  return data
}
