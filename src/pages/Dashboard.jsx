import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import './styles/Dashboard.css'

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function Dashboard() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/signin', { replace: true })
  }

  if (!user) {
    return null
  }

  return (
    <div className="dashboard-card">
      <div className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <p className="dashboard-subtitle">Your account overview</p>
        </div>
        <div className="users-nav">
          <Link to="/users" className="users-link">
            All users
          </Link>
          <button type="button" className="dashboard-logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      <div className="dashboard-profile">
        <div className="dashboard-avatar" aria-hidden="true">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="dashboard-details">
          <div className="dashboard-row">
            <span className="dashboard-label">Name</span>
            <span className="dashboard-value">{user.name}</span>
          </div>
          <div className="dashboard-row">
            <span className="dashboard-label">Email</span>
            <span className="dashboard-value">{user.email}</span>
          </div>
          <div className="dashboard-row">
            <span className="dashboard-label">Member since</span>
            <span className="dashboard-value">{formatDate(user.createdAt)}</span>
          </div>
        </div>
      </div>

      <p className="auth-switch">
        Need another account? <Link to="/signup">Create one</Link>
      </p>
    </div>
  )
}

export default Dashboard
