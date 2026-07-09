import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  clearStoredToken,
  getMe,
  getStoredToken,
  setStoredToken,
} from '../api/authApi'

export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async (_, { rejectWithValue }) => {
    const token = getStoredToken()
    if (!token) {
      return null
    }

    try {
      const data = await getMe()
      return data.user
    } catch (error) {
      clearStoredToken()
      return rejectWithValue(
        error.response?.data?.message || 'Authentication failed'
      )
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: true,
  },
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload
      setStoredToken(token)
      state.user = user
    },
    logout: (state) => {
      clearStoredToken()
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.user = null
        state.loading = false
      })
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
