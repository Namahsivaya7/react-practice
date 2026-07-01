import { api } from './authApi'

export const getUsers = async () => {
  const { data } = await api.get('/users')
  return data
}

export const getUser = async (id) => {
  const { data } = await api.get(`/users/${id}`)
  return data
}

export const updateUser = async (id, payload) => {
  const { data } = await api.put(`/users/${id}`, payload)
  return data
}

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/users/${id}`)
  return data
}
