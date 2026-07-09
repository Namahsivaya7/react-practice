import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth)
  const isAuthenticated = Boolean(user)
  const location = useLocation()

  if (loading) {
    return (
      <div className="auth-loading">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />
  }

  return children
}

export default ProtectedRoute
