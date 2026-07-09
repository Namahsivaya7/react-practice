import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import SignInForm from './pages/SignInForm'
import SignupForm from './pages/SignupForm'
import TableView from './pages/TableView'
import UserDetail from './pages/UserDetail'
import ProductView from './pages/ProductView'
import ProductDetail from './pages/ProductDetail'
import CartView from './pages/CartView'
import { initializeAuth } from './store/authSlice'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.auth)
  const isAuthenticated = Boolean(user)

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])


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
    <>
      {isAuthenticated && <Navbar />}
      <section id="center" style={isAuthenticated ? { placeContent: 'start', padding: '24px 0', gap: '0' } : undefined}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? '/products' : '/signin'} replace />}
          />
          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate to="/products" replace /> : <SignInForm />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/products" replace /> : <SignupForm />}
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartView />
              </ProtectedRoute>
            }
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
    </>
  )
}

export default App

