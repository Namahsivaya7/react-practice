import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import SignInForm from './pages/SignInForm'
import SignupForm from './pages/SignupForm'
import TableView from './pages/TableView'
import UserDetail from './pages/UserDetail'
import { useAuth, useAuthStore } from './store/authStore'
import './App.css'

function App() {
  const { isAuthenticated, loading } = useAuth()
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  if (loading) {
    return (
      <section id="center">
        <div className="auth-loading">
          <p>Loading...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="center">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? '/users' : '/signin'} replace />}
        />
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/users" replace /> : <SignInForm />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/users" replace /> : <SignupForm />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <TableView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <UserDetail />
            </ProtectedRoute>
          }
        />
        <Route path="/tableview" element={<Navigate to="/users" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </section>
  )
}

export default App
