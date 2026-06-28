import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const signup = async (payload) => {
  const { data } = await api.post('/auth/signup', payload)
  return data
}
